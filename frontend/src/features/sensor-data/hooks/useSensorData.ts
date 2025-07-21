import { useState, useEffect, useCallback } from 'react';
import type { SensorData } from '../types/sensor';
import { sensorDataRepository } from '../repositories/sensorDataRepository';

export function useSensorData() {
	const [sensorData, setSensorData] = useState<SensorData[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchSensorData = useCallback(async () => {
		try {
			setLoading(true);

			// Repository層を通してAPIからデータを取得
			const data = await sensorDataRepository.getAll();
			
			setSensorData(data);
			setError(null); // 成功時はエラーをクリア
		} catch (err) {
			console.warn('API取得に失敗しました。ダミーデータを使用します:', err);
			
			// Axiosエラーの処理
			let errorMessage = 'エラーが発生しました';
			if (err instanceof Error) {
				errorMessage = err.message;
			}
			
			setError(errorMessage);

			// 開発時のダミーデータ
			const dummyData: SensorData[] = [
				{
					id: 1,
					temperature: 22.5,
					humidity: 45.2,
					created_at: '2024-01-15T10:30:00Z',
					updated_at: '2024-01-15T10:30:00Z',
				},
				{
					id: 2,
					temperature: 23.1,
					humidity: 48.7,
					created_at: '2024-01-15T11:30:00Z',
					updated_at: '2024-01-15T11:30:00Z',
				},
				{
					id: 3,
					temperature: 21.8,
					humidity: 52.1,
					created_at: '2024-01-15T12:30:00Z',
					updated_at: '2024-01-15T12:30:00Z',
				},
			];
			setSensorData(dummyData);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchSensorData();
	}, [fetchSensorData]);

	const refresh = () => {
		setError(null);
		fetchSensorData();
	};

	return {
		sensorData,
		loading,
		error,
		refresh,
	};
}
