#!/bin/bash

SCRIPT_PATH="/home/hisakey/device-platform/device/send_data.py"
PYTHON_PATH="/home/hisakey/venv/bin/python"
LOG_PATH="/home/hisakey/send_log.txt"

# cron: 毎日 0, 6, 12, 18時に実行
CRON_JOB="0 */6 * * * $PYTHON_PATH $SCRIPT_PATH >> $LOG_PATH 2>&1"

# 一時ファイルに現在のcronをバックアップしつつ、該当行を除外
TEMP_CRON=$(mktemp)
crontab -l 2>/dev/null | grep -vF "$SCRIPT_PATH" >"$TEMP_CRON"

# 新しいエントリを追加
echo "$CRON_JOB" >>"$TEMP_CRON"

# 更新
crontab "$TEMP_CRON"
rm "$TEMP_CRON"

echo "[OK] cron エントリを上書き登録しました:"
echo "$CRON_JOB"
