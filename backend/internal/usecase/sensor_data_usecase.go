package usecase

import (
	"your_project/internal/model"
	"your_project/internal/repository"
)

type SensorDataUseCase interface {
  SaveSensorData(temperature float64, humidity float64) error
}

type sensorDataUseCase struct {
  repository repository.SensorDataRepository
}

func NewSensorDataUseCase(repository repository.SensorDataRepository) SensorDataUseCase {
  return &sensorDataUseCase{repository: repository}
}

func (usecase *sensorDataUseCase) SaveSensorData(temperature float64, humidity float64) error {
  tx := usecase.repository.BeginTx()

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

  if err := usecase.repository.Save(tx, sensorData); err != nil {
    tx.Rollback()
    return err
  }

  return tx.Commit().Error
}

func (usecase *sensorDataUseCase) GetAllSensorData() ([]model.SensorData, error) {
  return usecase.repository.GetAll()
}
