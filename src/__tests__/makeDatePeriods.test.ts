import { DayPeriod } from 'types/dates';
import { makeDatePeriods } from '../utils/dates';
import { describe, it, expect } from 'vitest';

const utcDate = (y: number, m: number, d: number) =>
	new Date(Date.UTC(y, m, d));

describe('makeDatePeriods', () => {
	it('returns empty array for empty input', () => {
		const result = makeDatePeriods(2024, 5, []);
		expect(result).toEqual([]);
	});

	it('stays within the same month if startIncl < endExl', () => {
		const input: DayPeriod[] = [{ startIncl: 3, endExl: 10 }];
		const result = makeDatePeriods(2024, 6, input);
		expect(result).toEqual([
			{
				startIncl: utcDate(2024, 6, 3),
				endExl: utcDate(2024, 6, 10),
			},
		]);
	});

	it('wraps to next month if startIncl >= endExl', () => {
		const input: DayPeriod[] = [{ startIncl: 20, endExl: 5 }];
		const result = makeDatePeriods(2024, 6, input);
		expect(result).toEqual([
			{
				startIncl: utcDate(2024, 6, 20),
				endExl: utcDate(2024, 7, 5),
			},
		]);
	});

	it('wraps from December to January of next year', () => {
		const input: DayPeriod[] = [{ startIncl: 25, endExl: 10 }];
		const result = makeDatePeriods(2024, 11, input);
		expect(result).toEqual([
			{
				startIncl: utcDate(2024, 11, 25),
				endExl: utcDate(2025, 0, 10),
			},
		]);
	});

	it('preserves the month/year for all startIncl', () => {
		const result = makeDatePeriods(2024, 3, [
			{ startIncl: 1, endExl: 10 },
			{ startIncl: 15, endExl: 5 }, // wraps
			{ startIncl: 20, endExl: 21 },
		]);

		for (const period of result) {
			expect(period.startIncl.getUTCFullYear()).toBe(2024);
			expect(period.startIncl.getUTCMonth()).toBe(3);
		}
	});
});
