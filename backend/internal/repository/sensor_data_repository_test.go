package repository_test

import (
  "testing"

  "github.com/stretchr/testify/assert"
  "gorm.io/driver/sqlite"
  "gorm.io/gorm"

  "github.com/your-org/device-platform/backend/internal/model"
  "github.com/your-org/device-platform/backend/internal/repository"
)

func SetupTestDB(t *testing.T) *gorm.DB {
  db, err := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
  assert.NoError(t, err)

  err = db.AutoMigrate(&model.SensorData{})
  assert.NoError(t, err)
  return db
}

func SetupRepository(db *gorm.DB) repository.SensorDataRepository {
  return repository.NewSensorDataRepository(db)
}

func TestGetAll_empty(t *testing.T) {
  db := SetupTestDB(t)
  repo := SetupRepository(db)

  data, err := repo.GetAll()
  assert.NoError(t, err)
  assert.Empty(t, data, "Expected no sensor data in the database")
}

func TestGetAll_single(t *testing.T) {
  db := SetupTestDB(t)
  repo := SetupRepository(db)

  err := db.Create(&model.SensorData{
    Temperature: 21.5,
    Humidity:    45.0,
  }).Error

  data, err := repo.GetAll()
  assert.NoError(t, err)
  assert.Len(t, data, 1, "Expected one sensor data entry")
}

func TestGetAll_multiple(t *testing.T) {
  db := SetupTestDB(t)
  repo := SetupRepository(db)

  err := db.Create([]*model.SensorData{
    { Temperature: 22.0, Humidity: 50.0 },
    { Temperature: 23.5, Humidity: 55.0},
  }).Error

  data, err := repo.GetAll()
  assert.NoError(t, err)
  assert.Len(t, data, 2, "Expected two sensor data entries")
}

func Test_DBError(t *testing.T) {
  db := SetupTestDB(t)
  sqlDB, err := db.DB()

  err = sqlDB.Close()
  assert.NoError(t, err, "Failed to close the database connection")

  repo := repository.NewSensorDataRepository(db)
  _, err = repo.GetAll()
  assert.Error(t, err, "Expected error when accessing non-existent database")
}
