package repository_test

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"

	"github.com/your-org/device-platform/backend/internal/model"
	"github.com/your-org/device-platform/backend/internal/repository"
)

func SetupTestDB(t *testing.T) *gorm.DB {
	db, err := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	assert.NoError(t, err)

	err = db.AutoMigrate(&model.SensorData{})
	require.NoError(t, err, "Failed to auto migrate SensorData model")
	return db
}

func SetupRepository(db *gorm.DB) repository.SensorDataRepository {
	return repository.NewSensorDataRepository(db)
}

func TestAll_empty(t *testing.T) {
	db := SetupTestDB(t)
	repo := SetupRepository(db)

	data, err := repo.All()
	assert.NoError(t, err)
	assert.Empty(t, data, "Expected no sensor data in the database")
}

func TestAll_single(t *testing.T) {
	db := SetupTestDB(t)
	repo := SetupRepository(db)

	err := db.Create(&model.SensorData{
		Temperature: 21.5,
		Humidity:    45.0,
	}).Error
	assert.NoError(t, err, "Failed to create sensor data")

	data, err := repo.All()
	assert.NoError(t, err)
	assert.Len(t, data, 1, "Expected one sensor data entry")
}

func TestAll_multiple(t *testing.T) {
	db := SetupTestDB(t)
	repo := SetupRepository(db)

	err := db.Create([]*model.SensorData{
		{Temperature: 22.0, Humidity: 50.0},
		{Temperature: 23.5, Humidity: 55.0},
	}).Error
	assert.NoError(t, err, "Failed to create multiple sensor data entries")

	data, err := repo.All()
	assert.NoError(t, err)
	assert.Len(t, data, 2, "Expected two sensor data entries")
}

func Test_DBError(t *testing.T) {
	db := SetupTestDB(t)
	sqlDB, _ := db.DB()

	err := sqlDB.Close()
	assert.NoError(t, err, "Failed to close the database connection")

	repo := repository.NewSensorDataRepository(db)
	_, err = repo.All()
	assert.Error(t, err, "Expected error when accessing non-existent database")
}

func TestCreate(t *testing.T) {
	db := SetupTestDB(t)
	repo := SetupRepository(db)

	data := &model.SensorData{
		Temperature: 24.0,
		Humidity:    60.0,
	}

	err := repo.Create(db, data)
	assert.NoError(t, err, "Failed to save sensor data")

	var savedData model.SensorData
	err = db.First(&savedData, data.ID).Error
	assert.NoError(t, err, "Failed to retrieve saved sensor data")
	assert.Equal(t, data.Temperature, savedData.Temperature)
	assert.Equal(t, data.Humidity, savedData.Humidity)
}
