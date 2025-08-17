# ===================================
# ステージ1: ビルドステージ
# ===================================
# Node.jsの公式イメージを使用してReactアプリをビルド
FROM node:18-alpine AS build

# 作業ディレクトリを設定
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー（依存関係のキャッシュ効率化）
COPY package*.json ./

# 依存関係をインストール
# ビルドに必要なdevDependenciesも含めて全ての依存関係をインストール
RUN npm ci

# ソースコードをコピー
COPY . .

# Reactアプリをビルド（本番用の最適化されたファイル群を生成）
RUN npm run build

# ===================================
# ステージ2: 本番ステージ
# ===================================
# Nginxの公式イメージを使用（軽量なAlpineベース）
FROM nginx:alpine

# メンテナー情報
LABEL maintainer="your-email@example.com"

# 不要なデフォルト設定ファイルを削除
RUN rm /etc/nginx/conf.d/default.conf

# カスタムNginx設定ファイルをコピー
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# ビルドステージからReactアプリのビルド結果をコピー
COPY --from=build /app/dist /usr/share/nginx/html

# ポート80を公開
EXPOSE 80

# Nginxをフォアグラウンドで実行
# デーモンモードを無効にしてDockerコンテナが終了しないようにする
CMD ["nginx", "-g", "daemon off;"]

# ===================================
# ヘルスチェック設定
# ===================================
# コンテナが正常に動作しているかを定期的にチェック
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/health || exit 1
