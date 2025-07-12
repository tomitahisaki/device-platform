package main

import (
	"log"

	"github.com/your-org/device-platform/backend/internal/db"
	seed "github.com/your-org/device-platform/backend/internal/seed/logic"
)

func main() {
	db.Init()

	if err := seed.SeedSensorData(db.DB); err != nil {
		log.Fatalf("failed to seed sensor data: %v", err)
	}

	log.Println("Sensor data seeded successfully")
}
