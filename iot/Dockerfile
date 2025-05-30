FROM python:3.11-slim

# 必要なパッケージと権限
RUN apt-get update && apt-get install -y \
    python3-dev gcc i2c-tools python3-lgpio \
    && rm -rf /var/lib/apt/lists/*

# 必要なPythonライブラリをインストール
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 作業ディレクトリとソース追加
WORKDIR /app
COPY . /app

# デフォルトコマンド
CMD ["python", "sensor.py"]

