# VPS 本番環境セットアップ手順

## 1. システム準備

### スワップファイル作成（OOM 回避）

```bash
# 2GBのスワップファイル作成
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# 永続化設定
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# スワップ使用率調整（メモリ重視）
echo 'vm.swappiness=10' | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

### 必要パッケージのインストール

```bash
# システム更新
sudo apt update && sudo apt upgrade -y

# Docker & Docker Compose
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Docker Compose V2
sudo apt install docker-compose-plugin

# Nginx
sudo apt install nginx

# その他ツール
sudo apt install curl wget htop tree rsync
```

## 2. ディレクトリ構造作成

```bash
# アプリケーション用ディレクトリ
sudo mkdir -p /var/www/app/{current,releases,shared}
sudo chown -R $USER:www-data /var/www/app
sudo chmod -R 755 /var/www/app

# ログディレクトリ
sudo mkdir -p /var/log/nginx/device-platform
```

## 3. Nginx 設定

### サイト設定

```bash
# 設定ファイルコピー
sudo cp deploy/nginx/vps-nginx.conf /etc/nginx/sites-available/device-platform

# サイト有効化
sudo ln -sf /etc/nginx/sites-available/device-platform /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Nginx設定テスト
sudo nginx -t

# Nginx再起動
sudo systemctl restart nginx
sudo systemctl enable nginx
```

### Nginx 最適化設定

```bash
# /etc/nginx/nginx.conf に追加設定
sudo tee -a /etc/nginx/nginx.conf << 'EOF'

# パフォーマンス最適化
worker_processes auto;
worker_connections 1024;

# Gzip圧縮
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

# ファイルキャッシュ
open_file_cache max=1000 inactive=20s;
open_file_cache_valid 30s;
open_file_cache_min_uses 2;
open_file_cache_errors on;

# バッファサイズ
client_body_buffer_size 128k;
client_max_body_size 10m;
client_header_buffer_size 1k;
large_client_header_buffers 4 4k;
output_buffers 1 32k;
postpone_output 1460;
EOF
```

## 4. Docker 環境構築

### 環境変数設定

```bash
# 本番用環境変数ファイル作成
cat > ~/.env << 'EOF'
DB_USER=device_user
DB_PASSWORD=your_secure_password_here
ENV=production
EOF

# 権限設定
chmod 600 ~/.env
```

### Docker Compose 起動

```bash
# プロジェクトファイル配置
git clone https://github.com/your-username/device-platform.git ~/app
cd ~/app

# 環境変数読み込み
source ~/.env

# APIとDB起動（フロントエンドはNginxで配信）
docker-compose -f compose.vps.yml up -d

# ログ確認
docker-compose -f compose.vps.yml logs -f
```

## 5. SSL 証明書設定（Let's Encrypt）

```bash
# Certbot インストール
sudo apt install certbot python3-certbot-nginx

# 証明書取得
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# 自動更新設定
sudo crontab -e
# 以下を追加
0 12 * * * /usr/bin/certbot renew --quiet
```

## 6. 監視・ログ設定

### システム監視

```bash
# ログローテーション設定
sudo tee /etc/logrotate.d/device-platform << 'EOF'
/var/log/nginx/device-platform-*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 0644 www-data www-data
    postrotate
        systemctl reload nginx
    endscript
}
EOF
```

### Docker 監視

```bash
# Docker自動起動設定
sudo systemctl enable docker

# ヘルスチェック用cronジョブ
crontab -e
# 以下を追加（5分毎にヘルスチェック）
*/5 * * * * curl -f http://localhost/health > /dev/null 2>&1 || docker-compose -f ~/app/compose.vps.yml restart
```

## 7. パフォーマンス最適化

### システム設定

```bash
# ファイルディスクリプタ上限増加
echo 'fs.file-max = 65536' | sudo tee -a /etc/sysctl.conf

# ネットワーク最適化
sudo tee -a /etc/sysctl.conf << 'EOF'
net.core.rmem_max = 16777216
net.core.wmem_max = 16777216
net.ipv4.tcp_rmem = 4096 12582912 16777216
net.ipv4.tcp_wmem = 4096 12582912 16777216
EOF

sudo sysctl -p
```

## 8. バックアップ設定

```bash
# データベースバックアップスクリプト
mkdir -p ~/backups

cat > ~/backups/db_backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/home/$USER/backups"
DATE=$(date +%Y%m%d_%H%M%S)
DB_CONTAINER="device_platform_db"

# PostgreSQLダンプ
docker exec $DB_CONTAINER pg_dump -U device_user device_platform > $BACKUP_DIR/db_backup_$DATE.sql

# 古いバックアップ削除（7日間保持）
find $BACKUP_DIR -name "db_backup_*.sql" -mtime +7 -delete

echo "Backup completed: db_backup_$DATE.sql"
EOF

chmod +x ~/backups/db_backup.sh

# 毎日午前2時にバックアップ実行
crontab -e
# 以下を追加
0 2 * * * /home/$USER/backups/db_backup.sh
```

## 9. デプロイ設定

```bash
# デプロイスクリプトに実行権限付与
chmod +x deploy/deploy.sh

# デプロイスクリプトの設定値を実際の値に更新
vim deploy/deploy.sh
# VPS_HOST, VPS_USER, その他設定値を変更
```

## 10. セキュリティ設定

```bash
# UFWファイアウォール設定
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
sudo ufw --force enable

# fail2ban設定（ブルートフォース攻撃対策）
sudo apt install fail2ban
sudo systemctl enable fail2ban
```

## 使用方法

### 初回デプロイ

```bash
# ローカルから実行
./deploy/deploy.sh deploy
```

### API 更新のみ

```bash
./deploy/deploy.sh api
```

### ロールバック

```bash
./deploy/deploy.sh rollback
```

### ヘルスチェック

```bash
./deploy/deploy.sh check
```

## リソース監視コマンド

```bash
# システムリソース確認
htop
free -h
df -h

# Docker リソース確認
docker stats
docker system df

# Nginx アクセスログ確認
sudo tail -f /var/log/nginx/device-platform-access.log

# API ログ確認
docker-compose -f compose.vps.yml logs -f backend
```
