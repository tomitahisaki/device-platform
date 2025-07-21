export const formatTemperature = (temp: number): string => `${temp.toFixed(1)}°C`;

export const formatHumidity = (humidity: number): string => `${humidity.toFixed(1)}%`;

export const getTemperatureColor = (temp: number) => {
	if (temp < 10) return 'info';
	if (temp < 20) return 'primary';
	if (temp < 30) return 'success';
	return 'warning';
};

export const getHumidityColor = (humidity: number) => {
	if (humidity < 30) return 'error';
	if (humidity < 60) return 'success';
	return 'warning';
};
