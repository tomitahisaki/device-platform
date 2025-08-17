# フロントエンド（Nginx + React）セットアップガイド

## 概要

このフロントエンドは、本番環境を想定した Nginx ベースの構成になっています。
React アプリをビルドし、Nginx で静的ファイルとして配信します。

## 📁 構成ファイル

```
frontend/
├── nginx/
│   ├── nginx.conf       # メインのNginx設定
│   └── default.conf     # サーバーブロック設定（プロキシ含む）
├── Dockerfile           # 本番用マルチステージビルド
├── .dockerignore       # Dockerビルド除外ファイル
└── （その他のReactアプリファイル）
```

## 🚀 起動方法

### 1. 開発環境（Vite 使用）

```bash
cd frontend
npm install
npm run dev
```

アクセス: http://localhost:5173

### 2. 本番同等環境（Docker + Nginx）

```bash
# プロジェクトルートで実行
docker-compose up -d frontend
```

アクセス: http://localhost:3000

### 3. 本番環境

```bash
# 本番用compose設定を使用
docker-compose -f compose.prod.yml up -d
```

アクセス: http://localhost

## 🔧 Nginx 設定の詳細

### プロキシ設定

- `/api/v1/*` へのリクエストは自動的にバックエンド（Gin）にプロキシされます
- Docker Compose 環境では `backend:8080` にルーティングされます

### キャッシュ設定

- 静的ファイル（JS, CSS, 画像など）: 1 年間キャッシュ
- HTML ファイル: キャッシュ無効（SPA 対応）

### セキュリティヘッダー

- X-Frame-Options: SAMEORIGIN
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block

## 🏥 ヘルスチェック

Nginx のヘルスチェックエンドポイント:

```bash
curl http://localhost:3000/health
# レスポンス: "healthy"
```

## 🐳 Docker 操作

### ビルドのみ

```bash
docker build -t device-platform-frontend ./frontend
```

### ログ確認

```bash
docker-compose logs frontend
```

### コンテナ内に入る

```bash
docker-compose exec frontend sh
```

## 🔍 トラブルシューティング

### API 通信ができない場合

1. バックエンドサービスが起動しているか確認

   ```bash
   docker-compose ps backend
   ```

2. ネットワーク接続確認
   ```bash
   docker-compose exec frontend wget -qO- http://backend:8080/health
   ```

### Nginx の設定確認

```bash
# 設定ファイルの構文チェック
docker-compose exec frontend nginx -t

# 設定の再読み込み
docker-compose exec frontend nginx -s reload
```

## 📝 カスタマイズ

### 新しい API エンドポイントを追加する場合

`nginx/default.conf` の プロキシ設定を編集:

```nginx
# 新しいAPIパスを追加
location /api/v2/ {
    proxy_pass http://backend:8080;
    # ... その他の設定
}
```

### 環境変数の追加

React アプリで環境変数を使用する場合、`VITE_` プレフィックスを使用:

```bash
# .env
VITE_API_URL=http://localhost:3000/api/v1
```

## 🔐 セキュリティ設定

本番環境では以下を検討してください:

1. HTTPS 終端 (SSL/TLS)
2. CSP (Content Security Policy) ヘッダー
3. Rate Limiting
4. ファイアウォール設定

設定例は `compose.prod.yml` を参照してください。
