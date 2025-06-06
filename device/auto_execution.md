```md
# 自動実行の仕組み（cron + systemd）

このドキュメントでは、Raspberry Pi 上でセンサーデータ送信スクリプト `send_data.py` を **「電源ON時」と「定期的」** に自動実行させるための設定について説明します。

---

## ✅ 目的

- **電源ON時に1回だけ即時実行**（systemd）
- **その後、定期実行**（cron）

---

## ⚙️ 自動実行の仕組みとOSの流れ

### 1. OS起動時のプロセス

1. 電源ON
2. Raspberry Pi OS（Linux）がブート
3. `systemd` が起動
4. 登録されたサービス（.service）が実行される
5. ネットワーク確立後に `send_data.py` が実行される

➡ これにより **手動操作不要で1回目の送信が行われます**

---

### 2. cronによる定期実行

- OSの起動とともに `crond` デーモンも常駐
- `crontab` に記述されたスケジュールに従って `send_data.py` を定期的に実行

---

## 🧪 実装済みの構成ファイル

### 📌 `setup_cron.sh`

- cronに以下の内容を登録：

  ```cron
  0 */4 * * * /usr/bin/python3 /home/pi/iot/device/send_data.py >> /home/pi/send_log.txt 2>&1
  ```

### 📌 `sensor_sender.service`

- systemd に登録し、起動時に1回実行する `.service` ファイル
- `/etc/systemd/system/` に配置

### 📌 `install_systemd.sh`

- 上記 `.service` を登録・有効化するためのスクリプト

---

## 🧾 使用方法（初回のみ）

ラズパイで以下を実行：

```bash
cd ~/iot/device

chmod +x setup_cron.sh install_systemd.sh

./setup_cron.sh            # → 定期実行を登録
sudo ./install_systemd.sh  # → 電源ON時に自動実行される systemd を登録
```

---

## 🔄 これにより得られる動作

| タイミング         | 実行内容                         |
|--------------------|----------------------------------|
| 電源ON直後         | `send_data.py` が即1回実行される（systemd） |
| 起動後設定時間ごと     | `send_data.py` が定期実行される（cron）    |
| 再起動後           | 両者とも自動で再登録不要で動作     |

---

## 🛠 補足

- `systemd` による自動起動は OS の「ターゲット」機能に基づいています（`multi-user.target`）
- `cron` はユーザーベースで `/var/spool/cron/crontabs/` に記録されており、OS再起動でも保持されます

---

## 📁 この仕組みにより

> **ラズパイにスクリプトを一度設定しておけば、以降は電源ONだけで自動で送信が開始され、定期実行も継続されます。**
