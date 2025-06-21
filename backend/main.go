// Package main provides a minimal HTTP server with a /ping endpoint.
package main

import (
	"fmt"
	"log"
	"net/http"
  "github.com/your-org/device-platform/backend/config"
)

func main() {
  config.Load()

  if config.Cfg.App.Port != "" {
    fmt.Println("load成功")
  } else {
    fmt.Println("load失敗")
  }

	http.HandleFunc("/ping", func(w http.ResponseWriter, _ *http.Request) {
		if _, err := fmt.Fprintln(w, "pong"); err != nil {
			log.Println("error writing response:", err)
		}
	})

	log.Println("Listening on :8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal("server failed:", err)
	}
}
