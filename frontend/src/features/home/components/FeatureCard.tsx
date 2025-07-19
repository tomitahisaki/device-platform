import { Card, CardContent, Typography } from '@mui/material';
import type { FeatureCardProps } from '../types';

export function FeatureCard({
	icon,
	title,
	description,
}: FeatureCardProps) {
	return (
		<Card
			elevation={2}
			sx={{
				height: '100%',
				'&:hover': {
					transform: 'translateY(-4px)',
					transition: 'transform 0.3s ease',
				},
			}}
		>
			<CardContent sx={{ textAlign: 'center', p: 3 }}>
				<div style={{ marginBottom: '16px' }}>{icon}</div>
				<Typography variant="h5" component="h3" gutterBottom>
					{title}
				</Typography>
				<Typography variant="body1" color="text.secondary">
					{description}
				</Typography>
			</CardContent>
		</Card>
	);
}
