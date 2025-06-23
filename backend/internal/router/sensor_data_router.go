package router

import (
  "github.com/your-org/device-platform/backend/internal/controller"
  "github.com/gin-gonic/gin"
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
