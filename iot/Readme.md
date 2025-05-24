# 環境構築メモ

必要ライブラリ

```bash
python3-pip
python3-venv
python3-gpiozero

```

## Adafruit_DHTのインストールについて

ラズパイは Debiank系のOSを使用しているので、PEP668に従った Pythonのパッケージ管理保護が有効になっています。

これにより、システムのPython環境に直接パッケージをインストールすることができません

pip3 installは、グローバルで実行することが禁止されています

かわりに仮想環境を用いて実行する。

### Adafruit_DHT の代替ライブラリ

`Adafruit_DHT`すでにインストールされている場合は、代替ライブラリを使用することをおすすめします。

```bash
#  仮想環境内部で
sudo aput install adafruit-circuitpython-dht RPi.GPIO
# Rpi.GPIOは、Adafruit_DHTの依存関係として必要
```

### 仮想環境の作成

```bash
sudo apt install python3-venv -y # 必要なら、python3-pipも

python3 -m venv ~/venv # 作成場所はどこでも
source ~/venv/bin/activate

pip install Adafruit_DHT
```

### 仮想環境の終了

```bash
deactivate
```
