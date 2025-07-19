import { Container, Grid } from '@mui/material';
import {
	Analytics as AnalyticsIcon,
	Thermostat as ThermostatIcon,
	TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';

import { HeroSection } from './components/HeroSection';
import { FeatureCard } from './components/FeatureCard';
import { useHomeConfig } from './hooks/useHomeConfig';

export function HomePage() {
	const config = useHomeConfig();

	const features = [
		{
			icon: <AnalyticsIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
			title: 'データ監視',
			description: 'リアルタイムでセンサーデータを監視できます',
			color: 'primary' as const,
		},
		{
			icon: <ThermostatIcon sx={{ fontSize: 48, color: 'secondary.main' }} />,
			title: '温湿度管理',
			description: '温度と湿度の履歴を確認できます',
			color: 'secondary' as const,
		},
		{
			icon: <TrendingUpIcon sx={{ fontSize: 48, color: 'success.main' }} />,
			title: 'データ分析',
			description: '時系列でのデータ変化を分析できます',
			color: 'success' as const,
		},
	];

	return (
		<Container maxWidth="md">
			<HeroSection config={config} />

			<Grid container spacing={3}>
				{features.map((feature) => (
					<Grid size={{ xs: 12, md: 4 }} key={feature.title}>
						<FeatureCard
							icon={feature.icon}
							title={feature.title}
							description={feature.description}
						/>
					</Grid>
				))}
			</Grid>
		</Container>
	);
}
