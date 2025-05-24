import time
import board
import adafruit_dht

# DHT11 センサーを GPIO4（BCM）に接続（board.D4 は GPIO4 を意味する）
dht_device = adafruit_dht.DHT11(board.D4)

count = 0
print("DHT11 センサー読み取り開始")

while True:
    try:
        temperature = dht_device.temperature
        humidity = dht_device.humidity

        if temperature is not None and humidity is not None:
            print(f"{count+1}回目 → 温度: {temperature:.1f}°C, 湿度: {humidity:.1f}%")
        else:
            print(f"{count+1}回目 → センサーからのデータ取得に失敗しました。")

    except RuntimeError as e:
        print(f"{count+1}回目 → 読み取りエラー: {e}")

    count += 1
    if count >= 5:
        break

    time.sleep(5)

# センサー使用後に明示的に解放
dht_device.exit()
