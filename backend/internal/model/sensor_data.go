package model

import (
	"errors"

	"gorm.io/gorm"
)

type SensorData struct {
	gorm.Model
	Temperature float64 `json:"temperature"`
	Humidity    float64 `json:"humidity"`
}

func ValidateSensorData(sensorData *SensorData) error {
	if sensorData.Temperature < -100 || sensorData.Temperature > 100 {
		return errors.New("temperature out of range")
	}
	if sensorData.Humidity < 0 || sensorData.Humidity > 100 {
		return errors.New("humidity out of range")
	}
	return nil
}
