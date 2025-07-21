import type { SensorData } from '../types/sensor';
import { apiClient } from '../../../shared/api/client';

export interface SensorDataRepository {
	getAll(): Promise<SensorData[]>;
}

class SensorDataRepositoryImpl implements SensorDataRepository {
	private readonly endpoint = '/api/v1/sensor-data';

	async getAll(): Promise<SensorData[]> {
		const response = await apiClient.get<SensorData[]>(this.endpoint);
		return response.data;
	}
}

// シングルトンインスタンスをエクスポート
export const sensorDataRepository = new SensorDataRepositoryImpl();
