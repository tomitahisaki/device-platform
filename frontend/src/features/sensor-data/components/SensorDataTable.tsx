import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	Box,
	Chip,
} from '@mui/material';
import {
	ThermostatOutlined as ThermostatIcon,
	WaterDrop as HumidityIcon,
} from '@mui/icons-material';

import type { SensorData } from '../types/sensor';

interface SensorDataTableProps {
	sensorData: SensorData[];
}

export function SensorDataTable({ sensorData }: SensorDataTableProps) {
	const formatTemperature = (temp: number) => `${temp.toFixed(1)}°C`;
	const formatHumidity = (humidity: number) => `${humidity.toFixed(1)}%`;
	const formatDate = (date: string) => new Date(date).toLocaleString('ja-JP');

	const getTemperatureColor = (temp: number) => {
		if (temp < 10) return 'info';
		if (temp < 20) return 'primary';
		if (temp < 30) return 'success';
		return 'warning';
	};

	const getHumidityColor = (humidity: number) => {
		if (humidity < 30) return 'error';
		if (humidity < 60) return 'success';
		return 'warning';
	};

	return (
		<TableContainer component={Paper} sx={{ mt: 2 }}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>
							<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
								<ThermostatIcon color="primary" />
								<Typography variant="subtitle2">温度</Typography>
							</Box>
						</TableCell>
						<TableCell>
							<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
								<HumidityIcon color="info" />
								<Typography variant="subtitle2">湿度</Typography>
							</Box>
						</TableCell>
						<TableCell>計測日時</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{sensorData.map((data) => (
						<TableRow key={data.id} hover>
							<TableCell>
								<Chip
									label={formatTemperature(data.temperature)}
									color={getTemperatureColor(data.temperature)}
									variant="outlined"
								/>
							</TableCell>
							<TableCell>
								<Chip
									label={formatHumidity(data.humidity)}
									color={getHumidityColor(data.humidity)}
									variant="outlined"
								/>
							</TableCell>
							<TableCell>
								<Typography variant="body2" color="text.secondary">
									{formatDate(data.created_at)}
								</Typography>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
