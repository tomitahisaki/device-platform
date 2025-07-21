package router

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupRouter(r *gin.Engine, db *gorm.DB) {
	api := r.Group("/api/v1")

	RegisterSensorDataRoutes(api, db)
}
