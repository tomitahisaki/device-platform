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
  current_time = datetime.now().strftime('%Y-%m-%d %H:%M')

  temp_format = f'Temp:{temperature:>2}C'
  hum_format = f'Hum :{humidity:>2}%'

  log_message = f"[{current_time}] {temp_format}, {hum_format}"
  print(log_message)

  # LCD 表示
  lcd.clear()
  lcd.write_string(temp_format)
  lcd.cursor_pos = (1, 0)
  lcd.write_string(hum_format)

except Exception as e:
  current_time = datetime.now().strftime('%Y-%m-%d %H:%M')
  error_message = f"[{current_time}] 読み取り失敗: {e}"
  lcd.clear()
  lcd.write_string(error_message)
  print(f"Error: {e}")

time.sleep(5)

# 終了時に LCD をクリア
lcd.clear()
dht_sensor.exit()


