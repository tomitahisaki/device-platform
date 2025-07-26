import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, waitFor } from '../../../test/test-utils';
import { useSensorData } from './useSensorData';
import { sensorDataRepository } from '../repositories/sensorDataRepository';

// Repository層をモック
vi.mock('../repositories/sensorDataRepository', () => ({
	sensorDataRepository: {
		getAll: vi.fn(),
	},
}));

const mockSensorDataRepository = vi.mocked(sensorDataRepository);

describe('useSensorData', () => {
	beforeEach(() => {
		mockSensorDataRepository.getAll.mockClear();
	});

	it('returns initial state correctly', () => {
		mockSensorDataRepository.getAll.mockRejectedValue(new Error('API Error'));

		const { result } = renderHook(() => useSensorData());

		expect(result.current.sensorData).toEqual([]);
		expect(result.current.loading).toBe(true);
		expect(result.current.error).toBeNull();
	});

	it('loads dummy data when fetch fails', async () => {
		mockSensorDataRepository.getAll.mockRejectedValue(new Error('API Error'));

		const { result } = renderHook(() => useSensorData());

		await waitFor(() => {
			expect(result.current.loading).toBe(false);
		});

		expect(result.current.sensorData.length).toBeGreaterThan(0);
		expect(result.current.error).toBe('API Error');
	});

	it('loads data successfully when fetch succeeds', async () => {
		const mockData = [
			{
				id: 1,
				temperature: 25.5,
				humidity: 60.0,
				createdAt: '2023-01-01T10:00:00Z',
				updatedAt: '2023-01-01T10:00:00Z',
			},
		];

		mockSensorDataRepository.getAll.mockResolvedValue(mockData);

		const { result } = renderHook(() => useSensorData());

		await waitFor(() => {
			expect(result.current.loading).toBe(false);
		});

		expect(result.current.sensorData).toEqual(mockData);
		expect(result.current.error).toBeNull();
	});

	it('handles refresh correctly', async () => {
		mockSensorDataRepository.getAll.mockResolvedValue([]);

		const { result } = renderHook(() => useSensorData());

		await waitFor(() => {
			expect(result.current.loading).toBe(false);
		});

		// Reset error
		result.current.refresh();

		expect(result.current.error).toBeNull();
	});
});
