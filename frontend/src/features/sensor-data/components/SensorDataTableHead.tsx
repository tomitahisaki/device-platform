import {
	TableHead,
	TableRow,
	TableCell,
} from '@mui/material';
import {
	ThermostatOutlined as ThermostatIcon,
	WaterDrop as HumidityIcon,
} from '@mui/icons-material';

import { IconLabel } from '../../../shared/components/common/IconLabel';

export function SensorDataTableHead() {
	return (
		<TableHead>
			<TableRow>
				<TableCell>
					<IconLabel 
						icon={<ThermostatIcon color="primary" />} 
						label="温度" 
					/>
				</TableCell>
				<TableCell>
					<IconLabel 
						icon={<HumidityIcon color="info" />} 
						label="湿度" 
					/>
				</TableCell>
				<TableCell>計測日時</TableCell>
			</TableRow>
		</TableHead>
	);
}
