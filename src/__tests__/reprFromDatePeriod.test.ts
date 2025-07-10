import { DatePeriod } from 'types/dates';
import { reprFromDatePeriod } from '../utils/file-utils';
import { describe, it, expect } from 'vitest';

const utc = (y: number, m: number, d: number): Date => {
	const date = new Date(Date.UTC(2000, m, d)); // safe dummy
	date.setUTCFullYear(y);
	return date;
};

describe('reprFromDatePeriod', () => {
	it('handles same-month period', () => {
		const period: DatePeriod = {
			startIncl: utc(2024, 6, 10),
			endExl: utc(2024, 6, 15),
		};
		expect(reprFromDatePeriod(period)).toBe('2024_07_10__to__2024_07_15');
	});

	it('handles cross-month period', () => {
		const period: DatePeriod = {
			startIncl: utc(2024, 6, 25),
			endExl: utc(2024, 7, 5),
		};
		expect(reprFromDatePeriod(period)).toBe('2024_07_25__to__2024_08_05');
	});

	it('handles cross-year period', () => {
		const period: DatePeriod = {
			startIncl: utc(2024, 11, 31),
			endExl: utc(2025, 0, 2),
		};
		expect(reprFromDatePeriod(period)).toBe('2024_12_31__to__2025_01_02');
	});

	it('handles minimal period (same day start and end)', () => {
		const period: DatePeriod = {
			startIncl: utc(2024, 0, 1),
			endExl: utc(2024, 0, 1),
		};
		expect(reprFromDatePeriod(period)).toBe('2024_01_01__to__2024_01_01');
	});
});
