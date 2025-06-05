#!/bin/bash

SCRIPT_PATH="/home/hisakey/iot/device/send_data.py"
PYTHON_PATH="$(which python3)"
LOG_PATH="/home/hisakey/send_log.txt"

# cron: 毎日 0, 4, 8, 12, 16, 20 時に実行
CRON_JOB="0 */4 * * * $PYTHON_PATH $SCRIPT_PATH >> $LOG_PATH 2>&1"

# 登録済みか確認
(crontab -l 2>/dev/null | grep -F "$SCRIPT_PATH") && echo "[INFO] cron はすでに登録済みです。" && exit 0

# 登録処理
(
  crontab -l 2>/dev/null
  echo "$CRON_JOB"
) | crontab -
echo "[OK] cron 登録完了: $CRON_JOB"
