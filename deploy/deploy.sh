#!/bin/bash

# ===================================
# VPS本番環境デプロイスクリプト
# ===================================

set -e  # エラー時に停止

# 設定値
VPS_HOST="your-vps-host.com"
VPS_USER="deploy"
DEPLOY_PATH="/var/www/app"
CURRENT_PATH="$DEPLOY_PATH/current"
RELEASES_PATH="$DEPLOY_PATH/releases"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
RELEASE_PATH="$RELEASES_PATH/$TIMESTAMP"

# カラー定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# ログ関数
log() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# ===================================
# ローカルビルド
# ===================================
build_frontend() {
    log "フロントエンドをビルド中..."
    
    cd frontend
    
    # 依存関係インストール
    if [ ! -d "node_modules" ]; then
        log "依存関係をインストール中..."
        npm ci
    fi
    
    # 本番ビルド実行
    log "本番ビルドを実行中..."
    npm run build
    
    # ビルド結果確認
    if [ ! -d "dist" ]; then
        error "ビルドに失敗しました"
        exit 1
    fi
    
    log "フロントエンドビルド完了"
    cd ..
}

# ===================================
# VPSへの配置
# ===================================
deploy_to_vps() {
    log "VPSへデプロイ中..."
    
    # リリースディレクトリ作成
    ssh $VPS_USER@$VPS_HOST "mkdir -p $RELEASE_PATH"
    
    # ビルド結果をアップロード
    log "ビルドファイルをアップロード中..."
    rsync -avz --delete \
        --exclude='.git' \
        --exclude='node_modules' \
        --exclude='src' \
        --exclude='public' \
        frontend/dist/ \
        $VPS_USER@$VPS_HOST:$RELEASE_PATH/
    
    # シンボリックリンク更新
    log "シンボリックリンクを更新中..."
    ssh $VPS_USER@$VPS_HOST "
        ln -nfs $RELEASE_PATH $CURRENT_PATH
        sudo systemctl reload nginx
    "
    
    # 古いリリースを削除（最新5個を保持）
    log "古いリリースを削除中..."
    ssh $VPS_USER@$VPS_HOST "
        cd $RELEASES_PATH
        ls -t | tail -n +6 | xargs -r rm -rf
    "
    
    log "デプロイ完了: $RELEASE_PATH"
}

# ===================================
# Docker API の更新
# ===================================
update_api() {
    log "APIコンテナを更新中..."
    
    # Docker Composeファイルをアップロード
    scp compose.vps.yml $VPS_USER@$VPS_HOST:~/
    scp -r backend/ $VPS_USER@$VPS_HOST:~/
    
    # APIコンテナ再ビルド・再起動
    ssh $VPS_USER@$VPS_HOST "
        cd ~/
        docker-compose -f compose.vps.yml pull
        docker-compose -f compose.vps.yml build --no-cache backend
        docker-compose -f compose.vps.yml up -d
        docker system prune -f
    "
    
    log "APIの更新完了"
}

# ===================================
# ヘルスチェック
# ===================================
health_check() {
    log "ヘルスチェック実行中..."
    
    # Nginx ヘルスチェック
    if curl -f http://$VPS_HOST/health >/dev/null 2>&1; then
        log "✓ Nginx正常"
    else
        error "✗ Nginx異常"
        return 1
    fi
    
    # API ヘルスチェック
    if curl -f http://$VPS_HOST/api/health >/dev/null 2>&1; then
        log "✓ API正常"
    else
        error "✗ API異常"
        return 1
    fi
    
    log "ヘルスチェック完了"
}

# ===================================
# ロールバック機能
# ===================================
rollback() {
    log "ロールバック実行中..."
    
    # 前回のリリースを取得
    PREVIOUS_RELEASE=$(ssh $VPS_USER@$VPS_HOST "
        cd $RELEASES_PATH
        ls -t | sed -n '2p'
    ")
    
    if [ -z "$PREVIOUS_RELEASE" ]; then
        error "ロールバック先がありません"
        exit 1
    fi
    
    # シンボリックリンクを前回のリリースに変更
    ssh $VPS_USER@$VPS_HOST "
        ln -nfs $RELEASES_PATH/$PREVIOUS_RELEASE $CURRENT_PATH
        sudo systemctl reload nginx
    "
    
    log "ロールバック完了: $PREVIOUS_RELEASE"
}

# ===================================
# メイン処理
# ===================================
main() {
    case "${1:-deploy}" in
        "build")
            build_frontend
            ;;
        "deploy")
            build_frontend
            deploy_to_vps
            health_check
            ;;
        "api")
            update_api
            health_check
            ;;
        "rollback")
            rollback
            health_check
            ;;
        "check")
            health_check
            ;;
        *)
            echo "使用方法: $0 [build|deploy|api|rollback|check]"
            echo ""
            echo "  build     - ローカルでフロントエンドをビルド"
            echo "  deploy    - フロントエンドをビルドしてVPSにデプロイ"
            echo "  api       - APIコンテナのみ更新"
            echo "  rollback  - 前回のリリースにロールバック"
            echo "  check     - ヘルスチェック実行"
            exit 1
            ;;
    esac
}

main "$@"
