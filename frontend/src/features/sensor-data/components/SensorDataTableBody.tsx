import {
	TableBody,
	TableCell,
	TableRow,
	Typography,
	Chip,
} from '@mui/material';

import { 
	formatTemperature, 
	formatHumidity, 
	getTemperatureColor, 
	getHumidityColor 
} from '../utils/sensor';
import type { SensorData } from '../types/sensor';

interface SensorDataTableBodyProps {
	sensorData: SensorData[];
}

export function SensorDataTableBody({ sensorData }: SensorDataTableBodyProps) {
	const formatDate = (date: string) => new Date(date).toLocaleString('ja-JP');

	return (
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
	);
}
