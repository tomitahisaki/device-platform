import { describe, it, expect } from 'vitest';
import { renderHook } from '../../../test/test-utils';
import { useHomeConfig } from './useHomeConfig';
import { ROUTES } from '../../../shared/constants/routes';

describe('useHomeConfig', () => {
	it('returns correct home configuration', () => {
		const { result } = renderHook(() => useHomeConfig());

		expect(result.current).toEqual({
			title: 'IoTデバイス管理プラットフォーム',
			description: 'センサーデータを簡単に管理・監視できるプラットフォームです',
			ctaText: '温湿度データを見る',
			ctaLink: ROUTES.SENSOR_DATA,
		});
	});

	it('returns consistent configuration on multiple calls', () => {
		const { result, rerender } = renderHook(() => useHomeConfig());

		const firstResult = result.current;
		rerender();
		const secondResult = result.current;

		expect(firstResult).toEqual(secondResult);
	});
});
