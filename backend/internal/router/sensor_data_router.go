package router

import (
	"github.com/gin-gonic/gin"
	"github.com/your-org/device-platform/backend/internal/controller"
	"gorm.io/gorm"
)

func RegisterSensorDataRoutes(r *gin.Engine, db *gorm.DB) {
	sensorGroup := r.Group("/sensor-data")
	{
		sensorGroup.POST("", func(c *gin.Context) {
			controller.PostSensorData(c, db)
		})

		sensorGroup.GET("", func(c *gin.Context) {
			controller.GetSensorData(c, db)
		})
	}
}
