#!/bin/bash

SCRIPT_PATH="/home/hisakey/device-platform/device/send_data.py"
PYTHON_PATH="/home/hisakey/venv/bin/python"
LOG_PATH="/home/hisakey/send_log.txt"

# cron: 毎日 0, 6, 12, 18時に実行
CRON_JOB="0 */6 * * * $PYTHON_PATH $SCRIPT_PATH >> $LOG_PATH 2>&1"

# 登録済みか確認
(crontab -l 2>/dev/null | grep -F "$SCRIPT_PATH") && echo "[INFO] cron はすでに登録済みです。" && exit 0

# 登録処理
(
  crontab -l 2>/dev/null
  echo "$CRON_JOB"
) | crontab -
echo "[OK] cron 登録完了: $CRON_JOB"
