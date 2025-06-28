package repository

import (
	"github.com/your-org/device-platform/backend/internal/model"
	"gorm.io/gorm"
)

type SensorDataRepository interface {
	BeginTx() *gorm.DB
	Create(tx *gorm.DB, data *model.SensorData) error
	All() ([]model.SensorData, error)
}

type sensorDataRepository struct {
	db *gorm.DB
}

func NewSensorDataRepository(db *gorm.DB) SensorDataRepository {
	return &sensorDataRepository{db: db}
}

func (r *sensorDataRepository) BeginTx() *gorm.DB {
	return r.db.Begin()
}

func (r *sensorDataRepository) Create(tx *gorm.DB, data *model.SensorData) error {
	return tx.Create(data).Error
}

func (r *sensorDataRepository) All() ([]model.SensorData, error) {
	var sensorData []model.SensorData
	if err := r.db.Order("id DESC").Find(&sensorData).Error; err != nil {
		return nil, err
	}
	return sensorData, nil
}
