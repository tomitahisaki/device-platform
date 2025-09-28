package router

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupRouter(r *gin.Engine, db *gorm.DB) {
	api := r.Group("/api/v1")

	api.GET("/health", func(c *gin.Context) {
		c.String(http.StatusOK, "ok")
	})

	RegisterSensorDataRoutes(api, db)
}
