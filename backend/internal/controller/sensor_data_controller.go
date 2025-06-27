package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/your-org/device-platform/backend/internal/usecase"
)

type SensorDataController struct {
	usecase usecase.SensorDataUseCase
}

func NewSensorDataController(usecase usecase.SensorDataUseCase) *SensorDataController {
	return &SensorDataController{usecase: usecase}
}

type SensorDataRequest struct {
	Temperature float64 `json:"temperature" binding:"required"`
	Humidity    float64 `json:"humidity" binding:"required"`
}

func (controller *SensorDataController) PostSensorData(context *gin.Context) {
	var request SensorDataRequest
	if err := context.ShouldBindJSON(&request); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "invalid request data"})
		return
	}

	if err := controller.usecase.SaveSensorData(request.Temperature, request.Humidity); err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "failed to save sensor data"})
	}

	context.JSON(http.StatusCreated, gin.H{"message": "sensor data saved successfully"})
}

func (controller *SensorDataController) GetAllSensorData(context *gin.Context) {
	data, err := controller.usecase.GetAllSensorData()
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "failed to retrieve sensor data"})
		return
	}

	context.JSON(http.StatusOK, data)
}
