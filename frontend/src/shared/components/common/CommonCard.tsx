import { Card, CardContent, CardActions, Typography } from '@mui/material';
import type { ReactNode } from 'react';

interface CommonCardProps {
	title: string;
	content: ReactNode;
	actions?: ReactNode;
	elevation?: number;
}

export function CommonCard({
	title,
	content,
	actions,
	elevation = 2,
}: CommonCardProps) {
	return (
		<Card
			elevation={elevation}
			sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
		>
			<CardContent sx={{ flexGrow: 1 }}>
				<Typography variant="h6" component="h2" gutterBottom>
					{title}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{content}
				</Typography>
			</CardContent>
			{actions && <CardActions>{actions}</CardActions>}
		</Card>
	);
}
