package usecase_test

import (
	"errors"
	"testing"

	"github.com/stretchr/testify/assert"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"

	"github.com/your-org/device-platform/backend/internal/model"
	"github.com/your-org/device-platform/backend/internal/repository"
	"github.com/your-org/device-platform/backend/internal/usecase"
)

type MockRepo struct {
	repository.SensorDataRepository
}

func (m *MockRepo) Create(tx *gorm.DB, data *model.SensorData) error {
	return errors.New("mock create error")
}

func SetupSensorDataUseCase(t *testing.T) (usecase.SensorDataUseCase, *gorm.DB, repository.SensorDataRepository) {
	db, err := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	assert.NoError(t, err)

	err = db.AutoMigrate(&model.SensorData{})
	assert.NoError(t, err, "Failed to auto migrate SensorData model")

	repo := repository.NewSensorDataRepository(db)
	usecase := usecase.NewSensorDataUseCase(db, repo)
	return usecase, db, repo
}

func TestGetSendDataList(t *testing.T) {
	usecase, db, _ := SetupSensorDataUseCase(t)

	err := db.Create([]*model.SensorData{
		{Temperature: 22.5, Humidity: 45.0},
		{Temperature: 23.0, Humidity: 50.0},
	}).Error
	assert.NoError(t, err, "Failed to create sensor data")

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

func TestPostSensorData_CreateFailed(t *testing.T) {
	db, _ := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	mockRepo := &MockRepo{}
	usecase := usecase.NewSensorDataUseCase(db, mockRepo)

	err := usecase.PostSensorData(24.0, 55.0)
	assert.Error(t, err, "Expected error when creating sensor data")
	assert.Equal(t, "mock create error", err.Error(), "Error message should match mock error")
}

func TestPostSensorData_ValidationError(t *testing.T) {
	usecase, db, _ := SetupSensorDataUseCase(t)

	t.Run("temperature too low", func(t *testing.T) {
		err := usecase.PostSensorData(-150.0, 50.0)
		assert.Error(t, err)
		assert.EqualError(t, err, "Temperature: temperature out of range")

		var result []model.SensorData
		err = db.Find(&result).Error
		assert.NoError(t, err)
		assert.Len(t, result, 0, "データが保存されてはいけない")
	})

	t.Run("humidity too high", func(t *testing.T) {
		err := usecase.PostSensorData(25.0, 150.0)
		assert.Error(t, err)
		assert.EqualError(t, err, "Humidity: humidity out of range")

		var result []model.SensorData
		err = db.Find(&result).Error
		assert.NoError(t, err)
		assert.Len(t, result, 0, "データが保存されてはいけない")
	})
}
