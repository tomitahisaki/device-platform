import { describe, it, expect } from 'vitest';
import {
	formatTemperature,
	formatHumidity,
	getTemperatureColor,
	getHumidityColor,
} from './sensor';

describe('sensor utils', () => {
	describe('formatTemperature', () => {
		it('formats temperature with one decimal place and celsius symbol', () => {
			expect(formatTemperature(25)).toBe('25.0°C');
			expect(formatTemperature(25.56)).toBe('25.6°C');
			expect(formatTemperature(-5.23)).toBe('-5.2°C');
		});
	});

	describe('formatHumidity', () => {
		it('formats humidity with one decimal place and percent symbol', () => {
			expect(formatHumidity(45)).toBe('45.0%');
			expect(formatHumidity(67.89)).toBe('67.9%');
			expect(formatHumidity(0)).toBe('0.0%');
		});
	});

	describe('getTemperatureColor', () => {
		it('returns correct color for very cold temperature', () => {
			expect(getTemperatureColor(5)).toBe('info');
			expect(getTemperatureColor(9.9)).toBe('info');
		});

		it('returns correct color for cool temperature', () => {
			expect(getTemperatureColor(10)).toBe('primary');
			expect(getTemperatureColor(15)).toBe('primary');
			expect(getTemperatureColor(19.9)).toBe('primary');
		});

		it('returns correct color for comfortable temperature', () => {
			expect(getTemperatureColor(20)).toBe('success');
			expect(getTemperatureColor(25)).toBe('success');
			expect(getTemperatureColor(29.9)).toBe('success');
		});

		it('returns correct color for hot temperature', () => {
			expect(getTemperatureColor(30)).toBe('warning');
			expect(getTemperatureColor(35)).toBe('warning');
			expect(getTemperatureColor(40)).toBe('warning');
		});
	});

	describe('getHumidityColor', () => {
		it('returns correct color for low humidity', () => {
			expect(getHumidityColor(20)).toBe('error');
			expect(getHumidityColor(29.9)).toBe('error');
		});

		it('returns correct color for optimal humidity', () => {
			expect(getHumidityColor(30)).toBe('success');
			expect(getHumidityColor(45)).toBe('success');
			expect(getHumidityColor(59.9)).toBe('success');
		});

		it('returns correct color for high humidity', () => {
			expect(getHumidityColor(60)).toBe('warning');
			expect(getHumidityColor(80)).toBe('warning');
			expect(getHumidityColor(95)).toBe('warning');
		});
	});
});
