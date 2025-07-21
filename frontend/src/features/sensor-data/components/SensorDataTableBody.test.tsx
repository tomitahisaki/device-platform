import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test/test-utils';
import { SensorDataTableBody } from './SensorDataTableBody';
import type { SensorData } from '../types/sensor';

describe('SensorDataTableBody', () => {
	const mockSensorData: SensorData[] = [
		{
			id: 1,
			temperature: 25.5,
			humidity: 45.2,
			created_at: '2023-01-01T12:00:00Z',
			updated_at: '2023-01-01T12:00:00Z',
		},
		{
			id: 2,
			temperature: 18.0,
			humidity: 65.8,
			created_at: '2023-01-02T15:30:00Z',
			updated_at: '2023-01-02T15:30:00Z',
		},
	];

	it('renders sensor data rows correctly', () => {
		render(
			<table>
				<SensorDataTableBody sensorData={mockSensorData} />
			</table>
		);

		expect(screen.getByText('25.5°C')).toBeInTheDocument();
		expect(screen.getByText('45.2%')).toBeInTheDocument();
		expect(screen.getByText('18.0°C')).toBeInTheDocument();
		expect(screen.getByText('65.8%')).toBeInTheDocument();
	});

	it('renders formatted dates correctly', () => {
		render(
			<table>
				<SensorDataTableBody sensorData={mockSensorData} />
			</table>
		);

		// Dates should be formatted in Japanese locale
		const dateElements = screen.getAllByText(/2023/);
		expect(dateElements.length).toBeGreaterThan(0);
	});

	it('applies correct color chips for temperature', () => {
		render(
			<table>
				<SensorDataTableBody sensorData={mockSensorData} />
			</table>
		);

		const temperatureChips = screen.getAllByText(/°C$/);
		expect(temperatureChips).toHaveLength(2);
		
		// Check that chips are rendered as MUI Chip components
		temperatureChips.forEach((chip) => {
			expect(chip.closest('.MuiChip-root')).toBeInTheDocument();
		});
	});

	it('applies correct color chips for humidity', () => {
		render(
			<table>
				<SensorDataTableBody sensorData={mockSensorData} />
			</table>
		);

		const humidityChips = screen.getAllByText(/%$/);
		expect(humidityChips).toHaveLength(2);
		
		// Check that chips are rendered as MUI Chip components
		humidityChips.forEach((chip) => {
			expect(chip.closest('.MuiChip-root')).toBeInTheDocument();
		});
	});

	it('renders hover effect on table rows', () => {
		const { container } = render(
			<table>
				<SensorDataTableBody sensorData={mockSensorData} />
			</table>
		);

		const tableRows = container.querySelectorAll('tbody tr');
		expect(tableRows).toHaveLength(2);
		
		tableRows.forEach((row) => {
			expect(row).toHaveClass('MuiTableRow-hover');
		});
	});

	it('handles empty sensor data array', () => {
		const { container } = render(
			<table>
				<SensorDataTableBody sensorData={[]} />
			</table>
		);

		const tbody = container.querySelector('tbody');
		expect(tbody).toBeInTheDocument();
		expect(tbody?.children).toHaveLength(0);
	});
});
