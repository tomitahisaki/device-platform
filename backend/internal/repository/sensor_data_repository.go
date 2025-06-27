package repository

import (
	"github.com/your-org/device-platform/backend/internal/model"
	"gorm.io/gorm"
)

type SensorDataRepository interface {
	BeginTx() *gorm.DB
	Save(tx *gorm.DB, data *model.SensorData) error
	GetAll() ([]model.SensorData, error)
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

func (r *sensorDataRepository) Save(tx *gorm.DB, data *model.SensorData) error {
	return tx.Create(data).Error
}

func (r *sensorDataRepository) GetAll() ([]model.SensorData, error) {
	var sensorData []model.SensorData
	if err := r.db.Order("id DESC").Find(&sensorData).Error; err != nil {
		return nil, err
	}
	return sensorData, nil
}
