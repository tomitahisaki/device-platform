import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test/test-utils';
import { SensorDataTableHead } from './SensorDataTableHead';

describe('SensorDataTableHead', () => {
	it('renders temperature header with correct icon and text', () => {
		render(
			<table>
				<SensorDataTableHead />
			</table>
		);

		expect(screen.getByText('温度')).toBeInTheDocument();
	});

	it('renders humidity header with correct icon and text', () => {
		render(
			<table>
				<SensorDataTableHead />
			</table>
		);

		expect(screen.getByText('湿度')).toBeInTheDocument();
	});

	it('renders measurement time header', () => {
		render(
			<table>
				<SensorDataTableHead />
			</table>
		);

		expect(screen.getByText('計測日時')).toBeInTheDocument();
	});

	it('has correct table structure', () => {
		const { container } = render(
			<table>
				<SensorDataTableHead />
			</table>
		);

		const thead = container.querySelector('thead');
		const tableRow = container.querySelector('tr');
		const tableCells = container.querySelectorAll('th');

		expect(thead).toBeInTheDocument();
		expect(tableRow).toBeInTheDocument();
		expect(tableCells).toHaveLength(3);
	});
});
