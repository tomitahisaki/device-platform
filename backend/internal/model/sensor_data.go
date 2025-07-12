package model

import (
	"gorm.io/gorm"
)

type ValidationErrors map[string]string

type SensorData struct {
	gorm.Model
	Temperature float64 `json:"temperature"`
	Humidity    float64 `json:"humidity"`
}

func (ve ValidationErrors) Error() string {
  errMsg := ""
  for field, msg := range ve {
    if errMsg != "" {
      errMsg += "; "
    }
    errMsg += field + ": " + msg
  }
  return errMsg
}

func ValidateSensorData(sensorData *SensorData) error {
  errs := ValidationErrors{}

	if sensorData.Temperature < -100 || sensorData.Temperature > 100 {
		errs["Temperature"] = "temperature out of range"
	}
	if sensorData.Humidity < 0 || sensorData.Humidity > 100 {
		errs["Humidity"] = "humidity out of range"
	}

  if len(errs) > 0 {
    return errs
  }
	return nil
}
