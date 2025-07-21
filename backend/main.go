// Package main provides a minimal HTTP server with a /ping endpoint.
package main

import (
	"fmt"
	"os"
	"strings"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"github.com/your-org/device-platform/backend/internal/config"
	"github.com/your-org/device-platform/backend/internal/db"
	"github.com/your-org/device-platform/backend/internal/router"
)

func main() {
	config.Load()
	db.Init()

	// Load environment variables from .env file
	_ = godotenv.Load()
	
	// Get CORS origins from environment variable
	allowOrigins := strings.Split(os.Getenv("CORS_ALLOW_ORIGINS"), ",")
	
	r := gin.Default()
	
	// Configure CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins:     allowOrigins,
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	router.SetupRouter(r, db.DB)

	if err := r.Run(":" + config.Cfg.App.Port); err != nil {
		fmt.Println("Failed to start server:", err)
	}
}
