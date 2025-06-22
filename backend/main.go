// Package main provides a minimal HTTP server with a /ping endpoint.
package main

import (
	"fmt"
  "net/http"

  "github.com/your-org/device-platform/backend/internal/config"
  "github.com/your-org/device-platform/backend/internal/db"
  "github.com/gin-gonic/gin"
)

func main() {
  config.Load()
  db.Init()

  r := gin.Default()
  r.GET("/", func(c *gin.Context) {
    c.JSON(http.StatusOK, gin.H{"message": "hello gin"})
  })
  
  if err := r.Run(":" + config.Cfg.App.Port); err != nil {
    fmt.Println("Failed to start server:", err)
  }
}
