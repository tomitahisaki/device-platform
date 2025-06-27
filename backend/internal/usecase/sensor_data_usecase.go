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
  sensorData := &model.SensorData{
    Temperature: temperature,
    Humidity:    humidity,
  }

  return usecase.repository.Save(sensorData)
}
