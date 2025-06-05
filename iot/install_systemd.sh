#!/bin/bash

SERVICE_NAME="sensor_sender.service"
SERVICE_PATH="/home/hisakey/iot/device/$SERVICE_NAME"
TARGET_PATH="/etc/systemd/system/$SERVICE_NAME"

# コピー
echo "[INFO] systemd ユニットファイルをコピー: $SERVICE_PATH → $TARGET_PATH"
sudo cp "$SERVICE_PATH" "$TARGET_PATH"

# 有効化と起動
echo "[INFO] systemd を再読込して有効化・起動"
sudo systemctl daemon-reexec
sudo systemctl enable "$SERVICE_NAME"
sudo systemctl start "$SERVICE_NAME"

echo "[OK] systemd 登録＆起動完了"
