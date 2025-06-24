// Package main provides a minimal HTTP server with a /ping endpoint.
package main

import (
	"fmt"

	"github.com/your-org/device-platform/backend/internal/config"
	"github.com/your-org/device-platform/backend/internal/db"
	"github.com/your-org/device-platform/backend/internal/router"
)

func main() {
	config.Load()
	db.Init()

	r := router.SetupRouter(db.DB)

	if err := r.Run(":" + config.Cfg.App.Port); err != nil {
		fmt.Println("Failed to start server:", err)
	}
}
