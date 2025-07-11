// internal/model/sensor_data_test.go
package model

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestValidateSensorData(t *testing.T) {
	tests := []struct {
		name        string
		input       *SensorData
		expectedErr string
	}{
		{
			name:        "valid sensor data",
			input:       &SensorData{Temperature: 25, Humidity: 50},
			expectedErr: "",
		},
		{
			name:        "temperature too low",
			input:       &SensorData{Temperature: -150, Humidity: 50},
			expectedErr: "temperature out of range",
		},
		{
			name:        "temperature too high",
			input:       &SensorData{Temperature: 150, Humidity: 50},
			expectedErr: "temperature out of range",
		},
		{
			name:        "humidity too low",
			input:       &SensorData{Temperature: 25, Humidity: -10},
			expectedErr: "humidity out of range",
		},
		{
			name:        "humidity too high",
			input:       &SensorData{Temperature: 25, Humidity: 150},
			expectedErr: "humidity out of range",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := ValidateSensorData(tt.input)
			if tt.expectedErr == "" {
				assert.NoError(t, err)
			} else {
				assert.EqualError(t, err, tt.expectedErr)
			}
		})
	}
}
