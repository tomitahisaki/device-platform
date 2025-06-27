package repository

import (
  "github.com/your-org/device-platform/backend/internal/model"
  "gorm.io/gorm"
)

tpe SensorDataRepository interface {
  BeginTx() *gorm.DB
  Save(tx *gorm.DB, data *model.SensorData) error
}

type SensorDataRepository struct {
  db *gorm.DB
}

func NewSensorDataRepository(db *gorm.DB) SensorDataRepository {
  return &sensorDataRepository{db: db}
}

func (r *SensorDataRepository) BeginTx() *gorm.DB {
  return r.db.Begin()
}

func (r *SensorDataRepository) Save(tx *gorm.DB, data *model.SensorData) error {
  return tx.Create(data).Error
}
