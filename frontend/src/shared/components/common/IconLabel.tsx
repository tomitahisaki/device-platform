import { Box, Typography } from '@mui/material';
import { ReactElement } from 'react';

interface IconLabelProps {
	icon: ReactElement;
	label: string;
	variant?: 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2';
	gap?: number;
}

export function IconLabel({ icon, label, variant = 'subtitle2', gap = 1 }: IconLabelProps) {
	return (
		<Box sx={{ display: 'flex', alignItems: 'center', gap }}>
			{icon}
			<Typography variant={variant}>{label}</Typography>
		</Box>
	);
}
