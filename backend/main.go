// Package main provides a minimal HTTP server with a /ping endpoint.
package main

import (
	"fmt"
	"log"

  "github.com/your-org/device-platform/backend/config"
  "github.com/gin-gonic/gin"
)

func main() {
  config.Load()

  r := gin.Default()
  r.GET("/", func(c *gin.Context) {
    c.JSON(http.StatusOK, gin.H{"message": "hello gin"})
  })
  
  if err := r.RUN(":" + config.Cfg.App.Port); err != nil {
    fmt.Println("Failed to start server:", err)
  }
}
