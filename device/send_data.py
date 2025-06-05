import time
import board
import adafruit_dht
from RPLCD.i2c import CharLCD

# DHT11 センサーを GPIO4 に接続
dht_sensor = adafruit_dht.DHT11(board.D4)

# I2C LCD 初期化（0x27 アドレス）
lcd = CharLCD('PCF8574', 0x27)

try:
  temperature = dht_sensor.temperature
  humidity = dht_sensor.humidity

  print(f"温度: {temperature:.1f}°C, 湿度: {humidity:.1f}%")

  # LCD 表示
  lcd.clear()
  lcd.write_string(f'Temp:{temperature:>2}C')
  lcd.cursor_pos = (1, 0)
  lcd.write_string(f'Hum :{humidity:>2}%')

except Exception as e:
  lcd.clear()
  lcd.write_string("読み取り失敗")
  print(f"Error: {e}")

time.sleep(5)

# 終了時に LCD をクリア
lcd.clear()
dht_sensor.exit()


