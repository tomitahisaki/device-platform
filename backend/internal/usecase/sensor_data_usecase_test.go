package usecase_test

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"

	"github.com/your-org/device-platform/backend/internal/model"
	"github.com/your-org/device-platform/backend/internal/repository"
	"github.com/your-org/device-platform/backend/internal/usecase"
)

func SetupSensorDataUseCase(t *testing.T) (usecase.SensorDataUseCase, *gorm.DB, repository.SensorDataRepository) {
  db, err := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
  assert.NoError(t, err)

  err = db.AutoMigrate(&model.SensorData{})

  repo := repository.NewSensorDataRepository(db)
  usecase := usecase.NewSensorDataUseCase(repo)
  return usecase, db, repo
}

func TestGetSendDataList(t *testing.T) {
  usecase, db, _ := SetupSensorDataUseCase(t)

  err := db.Create([]*model.SensorData{
    { Temperature: 22.5, Humidity: 45.0 },
    { Temperature: 23.0, Humidity: 50.0 },
  }).Error

  result, err := usecase.GetSensorDataList()
  assert.NoError(t, err)
  assert.Len(t, result, 2)
}

func TestPostSensorData(t *testing.T) {
  usecase, db, _ := SetupSensorDataUseCase(t)
  
  err := usecase.PostSensorData(24.0, 55.0)
  assert.NoError(t, err, "error posting sensor data")

  var result []model.SensorData
  err = db.Find(&result).Error
  assert.NoError(t, err, "Failed to retrieve sensor data from the database")
  assert.Len(t, result, 1, "Expected one sensor data entry")
  assert.Equal(t, 24.0, result[0].Temperature, "Temperature should match")
  assert.Equal(t, 55.0, result[0].Humidity, "Humidity should match")
}
