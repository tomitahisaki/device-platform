package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/your-org/device-platform/backend/internal/model"
	"gorm.io/gorm"
)

type SensorDataInput struct {
	Temperature float64 `json:"temperature" binding:"required"`
	Humidity    float64 `json:"humidity" binding:"required"`
}

func PostSensorData(c *gin.Context, db *gorm.DB) {
	var input SensorDataInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	data := model.SensorData{
		Temperature: input.Temperature,
		Humidity:    input.Humidity,
	}

	if err := db.Create(&data).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "保存に失敗しました"})
		return
	}

	c.JSON(http.StatusCreated, data)
}

func GetSensorData(c *gin.Context, db *gorm.DB) {
	var data []model.SensorData

	if err := db.Order("created_at desc").Find(&data).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "取得に失敗しました"})
		return
	}

	c.JSON(http.StatusOK, data)
}
