package logic

import (
	"fmt"
	"math/rand"
	"time"

	"gorm.io/gorm"

	"github.com/your-org/device-platform/backend/internal/model"
)

func SeedSensorData(db *gorm.DB) error {
	fmt.Printf("%#v\n", model.SensorData{})

	const (
		totalDays    = 30
		perDay       = 6 // 4 hours per day
		totalEntries = totalDays * perDay
		batchSize    = 100
	)

	now := time.Now().Truncate(24 * time.Hour).Add(-30 * 24 * time.Hour) // 30 days ago

	var buffer []model.SensorData

	for i := 0; i < totalEntries; i++ {
		createdAt := now.Add(time.Duration(i) * 4 * time.Hour) // 4-hour intervals

		sensorData := model.SensorData{
			Temperature: 20 + rand.Float64()*10, // 20 to 30 degrees
			Humidity:    40 + rand.Float64()*20, // 40 to 60 percent
		}
		sensorData.CreatedAt = createdAt

		buffer = append(buffer, sensorData)

		if len(buffer) >= batchSize {
			if err := db.CreateInBatches(buffer, batchSize).Error; err != nil {
				return err
			}
			buffer = buffer[:0] // Reset buffer
		}
	}

	if len(buffer) > 0 {
		if err := db.CreateInBatches(buffer, batchSize).Error; err != nil {
			return err
		}
	}

	return nil
}
