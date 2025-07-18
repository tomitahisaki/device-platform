package router

import (
	"github.com/gin-gonic/gin"
	"github.com/your-org/device-platform/backend/internal/controller"
	"github.com/your-org/device-platform/backend/internal/repository"
	"github.com/your-org/device-platform/backend/internal/usecase"
	"gorm.io/gorm"
)

func RegisterSensorDataRoutes(r *gin.RouterGroup, db *gorm.DB) {
	repository := repository.NewSensorDataRepository(db)
	usecase := usecase.NewSensorDataUseCase(db, repository)
	controller := controller.NewSensorDataController(usecase)

	sensorGroup := r.Group("/sensor-data")
	{
		sensorGroup.POST("", controller.PostSensorData)
		sensorGroup.GET("", controller.GetSensorDataList)
	}
}
