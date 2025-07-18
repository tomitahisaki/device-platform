import { HomeFeatureConfig } from '../types';
import { ROUTES } from '../../../shared/constants/routes';

export function useHomeConfig(): HomeFeatureConfig {
  return {
    title: 'IoTデバイス管理プラットフォーム',
    description: 'センサーデータを簡単に管理・監視できるプラットフォームです',
    ctaText: '温湿度データを見る',
    ctaLink: ROUTES.SENSOR_DATA,
  };
}
