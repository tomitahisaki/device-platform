package usecase

import (
  "gorm.io/gorm"

	"github.com/your-org/device-platform/backend/internal/model"
	"github.com/your-org/device-platform/backend/internal/repository"
)

type SensorDataUseCase interface {
	PostSensorData(temperature float64, humidity float64) error
	GetSensorDataList() ([]model.SensorData, error)
}

type sensorDataUseCase struct {
  db *gorm.DB
	repository repository.SensorDataRepository
}

func NewSensorDataUseCase(db *gorm.DB, repository repository.SensorDataRepository) SensorDataUseCase {
	return &sensorDataUseCase{
    db: db,
    repository: repository,
  }
}

func (usecase *sensorDataUseCase) PostSensorData(temperature float64, humidity float64) error {
  tx := usecase.db.Begin()
  if tx.Error != nil {
    return tx.Error
  }

  defer func() {
    if r := recover(); r != nil {
      tx.Rollback()
      panic(r)
    }
  }()

	sensorData := &model.SensorData{
		Temperature: temperature,
		Humidity:    humidity,
	}

  if err := usecase.repository.Create(tx, xensorData).Error; err != nil {
    tx.Rollback()
    return err
  }

	return tx.Commit().Error
}

func (usecase *sensorDataUseCase) GetSensorDataList() ([]model.SensorData, error) {
	return usecase.repository.All()
}
