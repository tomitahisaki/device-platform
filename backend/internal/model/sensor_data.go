package model

import "gorm.io/gorm"

type SensorData struct {
    gorm.Model
    Temperature float64 `json:"temperature"`
    Humidity    float64 `json:"humidity"`
}

