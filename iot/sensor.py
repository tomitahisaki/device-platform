import adafruit_dht
import time

sensor = adafruit_dht.DHT11
pin = 7
count = 0

print("DHT11　センサー読み取り開始")

while true:
    humidity, temperature = Adafruit_DHT.read_retry(sensor, pin)

    if humidity is not None and temperature is not None:
        print(f"温度): {temperature:.1f　}°C, 湿度: {humidity:.1f}%")
    else:
        print("センサーからのデータ取得に失敗しました。")

    count += 1
    if count >= 5:
        break

    time.sleep(5)
