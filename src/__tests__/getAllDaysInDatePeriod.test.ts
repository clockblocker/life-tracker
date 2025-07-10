import { DatePeriod } from 'types/dates';
import { getAllDaysInDatePeriod } from '../utils/dates';
import { describe, it, expect } from 'vitest';

const utc = (y: number, m: number, d: number) => new Date(Date.UTC(y, m, d));

describe('getAllDaysInDatePeriod', () => {
	it('returns empty array if startIncl === endExl', () => {
		const period: DatePeriod = {
			startIncl: utc(2024, 0, 1),
			endExl: utc(2024, 0, 1),
		};
		expect(getAllDaysInDatePeriod(period)).toEqual([]);
	});

	it('returns single day if 1-day span', () => {
		const period: DatePeriod = {
			startIncl: utc(2024, 0, 1),
			endExl: utc(2024, 0, 2),
		};
		expect(getAllDaysInDatePeriod(period)).toEqual([utc(2024, 0, 1)]);
	});

	it('returns correct days for 3-day span', () => {
		const period: DatePeriod = {
			startIncl: utc(2024, 0, 1),
			endExl: utc(2024, 0, 4),
		};
		expect(getAllDaysInDatePeriod(period)).toEqual([
			utc(2024, 0, 1),
			utc(2024, 0, 2),
			utc(2024, 0, 3),
		]);
	});

	it('handles month wrap correctly', () => {
		const period: DatePeriod = {
			startIncl: utc(2024, 0, 30),
			endExl: utc(2024, 1, 2),
		};
		expect(getAllDaysInDatePeriod(period)).toEqual([
			utc(2024, 0, 30),
			utc(2024, 0, 31),
			utc(2024, 1, 1),
		]);
	});

	it('handles year wrap correctly', () => {
		const period: DatePeriod = {
			startIncl: utc(2024, 11, 31),
			endExl: utc(2025, 0, 2),
		};
		expect(getAllDaysInDatePeriod(period)).toEqual([
			utc(2024, 11, 31),
			utc(2025, 0, 1),
		]);
	});
});
