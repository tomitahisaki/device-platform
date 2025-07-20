import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, waitFor } from '../../../test/test-utils';
import { useSensorData } from './useSensorData';

// Fetch APIをモック
const mockFetch = vi.fn();
(globalThis as any).fetch = mockFetch;

describe('useSensorData', () => {
	beforeEach(() => {
		mockFetch.mockClear();
	});

	it('returns initial state correctly', () => {
		mockFetch.mockRejectedValue(new Error('API Error'));

		const { result } = renderHook(() => useSensorData());

		expect(result.current.sensorData).toEqual([]);
		expect(result.current.loading).toBe(true);
		expect(result.current.error).toBeNull();
	});

	it('loads dummy data when fetch fails', async () => {
		mockFetch.mockRejectedValue(new Error('API Error'));

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
				created_at: '2023-01-01T10:00:00Z',
				updated_at: '2023-01-01T10:00:00Z',
			},
		];

		mockFetch.mockResolvedValue({
			ok: true,
			json: () => Promise.resolve(mockData),
		});

		const { result } = renderHook(() => useSensorData());

		await waitFor(() => {
			expect(result.current.loading).toBe(false);
		});

		expect(result.current.sensorData).toEqual(mockData);
		expect(result.current.error).toBeNull();
	});

	it('handles refresh correctly', async () => {
		mockFetch.mockResolvedValue({
			ok: true,
			json: () => Promise.resolve([]),
		});

		const { result } = renderHook(() => useSensorData());

		await waitFor(() => {
			expect(result.current.loading).toBe(false);
		});

		// Reset error
		result.current.refresh();

		expect(result.current.error).toBeNull();
	});
});
