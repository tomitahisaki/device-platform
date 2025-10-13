from RPLCD.i2c import CharLCD
import time

lcd = CharLCD("PCF8574", 0x27)

lcd.write_string("Hello Raspberry!")
lcd.cursor_pos = (1, 0)
lcd.write_string("LCD OK!")
time.sleep(5)

lcd.clear()
