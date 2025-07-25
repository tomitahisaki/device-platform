package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/your-org/device-platform/backend/internal/model"
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

	err := controller.usecase.PostSensorData(request.Temperature, request.Humidity)
	if validationErrs, ok := err.(model.ValidationErrors); ok {
		// ✅ バリデーションエラー（422）
		context.JSON(422, gin.H{"errors": validationErrs})
		return
	}
	if err != nil {
		// ✅ その他のエラー（500）
		context.JSON(http.StatusInternalServerError, gin.H{"error": "failed to save sensor data"})
		return
	}

	context.JSON(http.StatusCreated, gin.H{"message": "sensor data saved successfully"})
}

func (controller *SensorDataController) GetSensorDataList(context *gin.Context) {
	data, err := controller.usecase.GetSensorDataList()
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "failed to retrieve sensor data"})
		return
	}

	context.JSON(http.StatusOK, data)
}
