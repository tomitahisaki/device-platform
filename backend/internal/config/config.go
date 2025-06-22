package config

import (
	"log"     // log通知
	"os"      // 環境変数の取得
	"strconv" // 文字列変換 string to int

	"github.com/joho/godotenv" // .envファイルの読み込み
)

// 全体の設定を保持する
type Config struct {
	App   AppConfig
	DB    DBConfig
	Slack SlackConfig
}

// appの設定
type AppConfig struct {
	Port string // アプリケーションのポート番号
}

// DBの設定
type DBConfig struct {
	Host     string // データベースのホスト
	Port     int    // データベースのポート
	User     string // データベースのユーザー名
	Password string // データベースのパスワード
	Name     string // データベース名
}

// slackの設定
type SlackConfig struct {
	// slackのWebhook URLなどが入る
}

var Cfg *Config

func Load() {
	// envファイルの読み込み
	if err := godotenv.Load(); err != nil {
		log.Println("Error loading .env file")
	}

	// 数値の変換
	dbPort, err := strconv.Atoi(os.Getenv("DB_PORT"))
	if err != nil {
		log.Fatalf("Error converting DB_PORT to int: %v", err)
	}

	Cfg = &Config{
		App: AppConfig{
			Port: os.Getenv("PORT"),
		},
		DB: DBConfig{
			Host:     os.Getenv("DB_HOST"),
			Port:     dbPort,
			User:     os.Getenv("DB_USER"),
			Password: os.Getenv("DB_PASSWORD"),
			Name:     os.Getenv("DB_NAME"),
		},
		Slack: SlackConfig{},
	}
}
