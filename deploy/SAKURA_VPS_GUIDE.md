# さくらの VPS 設定ガイド

## 基本情報

- **ホスト名**: `ik1-339-29510.vs.sakura.ne.jp`
- **プロバイダー**: さくらインターネット
- **OS**: Ubuntu/CentOS (想定)

## さくらの VPS 特有の設定

### 1. SSH 接続設定

```bash
# SSH鍵での接続（推奨）
ssh-copy-id deploy@ik1-339-29510.vs.sakura.ne.jp

# SSH設定ファイル（~/.ssh/config）
Host sakura-vps
    HostName ik1-339-29510.vs.sakura.ne.jp
    User deploy
    IdentityFile ~/.ssh/id_rsa
    Port 22
```

### 2. ファイアウォール設定

```bash
# さくらのVPSではufwまたはiptablesを使用
sudo ufw allow 22/tcp      # SSH
sudo ufw allow 80/tcp      # HTTP
sudo ufw allow 443/tcp     # HTTPS
sudo ufw allow 3000/tcp    # 開発時のAPI直接アクセス（必要に応じて）
sudo ufw --force enable
```

### 3. デプロイ用ユーザー作成

```bash
# deployユーザー作成
sudo useradd -m -s /bin/bash deploy
sudo usermod -aG sudo deploy
sudo usermod -aG docker deploy

# パスワード設定（またはSSH鍵のみ）
sudo passwd deploy

# sudoをパスワードなしで実行可能にする（オプション）
echo 'deploy ALL=(ALL) NOPASSWD:ALL' | sudo tee /etc/sudoers.d/deploy
```

### 4. Nginx 設定の確認

```bash
# Nginx設定テスト
sudo nginx -t

# アクセスログの確認
sudo tail -f /var/log/nginx/device-platform-access.log

# エラーログの確認
sudo tail -f /var/log/nginx/device-platform-error.log
```

### 5. Let's Encrypt SSL 証明書

```bash
# Certbot設置
sudo apt update
sudo apt install snapd
sudo snap install core; sudo snap refresh core
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot

# 証明書取得
sudo certbot --nginx -d ik1-339-29510.vs.sakura.ne.jp

# 証明書確認
sudo certbot certificates

# 自動更新テスト
sudo certbot renew --dry-run
```

### 6. さくらの VPS 管理画面での設定

#### ポート開放確認

- **管理画面**: さくらのクラウド コントロールパネル
- **ファイアウォール**: 80, 443, 22 番ポートが開放されていることを確認

#### DNS 設定（独自ドメイン使用時）

```bash
# 独自ドメインを使用する場合
# A レコード: your-domain.com → VPSのIPアドレス
# CNAME レコード: www.your-domain.com → your-domain.com
```

### 7. 監視・メンテナンス

#### システムリソース監視

```bash
# CPU・メモリ使用率確認
htop

# ディスク使用量確認
df -h

# Docker リソース確認
docker stats

# ログローテーション確認
sudo logrotate -d /etc/logrotate.d/device-platform
```

#### 定期メンテナンス

```bash
# システム更新（月1回）
sudo apt update && sudo apt upgrade -y

# Docker不要イメージ削除（週1回）
docker system prune -f

# ログファイル確認・削除（必要に応じて）
sudo find /var/log -name "*.log" -mtime +30 -delete
```

## デプロイ手順（さくらの VPS 向け）

### 初回デプロイ

```bash
# 1. ローカルからVPSセットアップ
# VPS_SETUP.mdの手順を実行

# 2. SSH接続テスト
ssh deploy@ik1-339-29510.vs.sakura.ne.jp

# 3. 初回デプロイ
./deploy/deploy.sh deploy

# 4. ブラウザでアクセス確認
# http://ik1-339-29510.vs.sakura.ne.jp
```

### 日常的な更新

```bash
# フロントエンド更新
./deploy/deploy.sh deploy

# API のみ更新
./deploy/deploy.sh api

# 設定確認
./deploy/deploy.sh config

# ヘルスチェック
./deploy/deploy.sh check
```

## トラブルシューティング

### よくある問題

#### 1. SSH 接続エラー

```bash
# 鍵の権限確認
chmod 600 ~/.ssh/id_rsa
chmod 644 ~/.ssh/id_rsa.pub

# SSH設定確認
ssh -v deploy@ik1-339-29510.vs.sakura.ne.jp
```

#### 2. Nginx 設定エラー

```bash
# 設定ファイル構文チェック
sudo nginx -t

# Nginxプロセス確認
sudo systemctl status nginx

# ポート使用状況確認
sudo netstat -tlnp | grep :80
```

#### 3. Docker 接続エラー

```bash
# Docker サービス状態確認
sudo systemctl status docker

# コンテナ状態確認
docker ps -a

# ログ確認
docker-compose -f compose.vps.yml logs
```

#### 4. API 接続エラー

```bash
# API直接アクセステスト
curl http://127.0.0.1:3000/api/v1/sensor-data

# Nginx経由でのアクセステスト
curl http://ik1-339-29510.vs.sakura.ne.jp/api/v1/sensor-data

# ファイアウォール確認
sudo ufw status
```
