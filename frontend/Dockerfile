# make sure to use the correct platform for ARM64 architecture
FROM --platform=linux/arm64 node:20

WORKDIR /app

# キャッシュを効かせるため、依存ファイルだけ先にコピー
COPY package.json ./

# ここでLinux/ARM64向けにネイティブバイナリが入る
RUN npm install

# 残りのソースコードをコピー
COPY . .

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]

