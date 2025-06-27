package repository

import (
  "github.com/your-org/device-platform/backend/internal/model"
  "gorm.io/gorm"
)

tpe SensorDataRepository interface {
  Save(data *model.SensorData) error
}

type SensorDataRepository struct {
  db *gorm.DB
}

func NewSensorDataRepository(db *gorm.DB) SensorDataRepository {
  return &sensorDataRepository{db: db}
}

func (r *SensorDataRepository) Save(data *model.SensorData) error {
  return r.db.Create(data).Error
}
