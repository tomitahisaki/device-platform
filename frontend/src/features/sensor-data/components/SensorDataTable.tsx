import {
	Paper,
	Table,
	TableContainer,
} from '@mui/material';

import { SensorDataTableHead } from './SensorDataTableHead';
import { SensorDataTableBody } from './SensorDataTableBody';
import type { SensorData } from '../types/sensor';

interface SensorDataTableProps {
	sensorData: SensorData[];
}

export function SensorDataTable({ sensorData }: SensorDataTableProps) {
	return (
		<TableContainer component={Paper} sx={{ mt: 2 }}>
			<Table>
				<SensorDataTableHead />
				<SensorDataTableBody sensorData={sensorData} />
			</Table>
		</TableContainer>
	);
}
