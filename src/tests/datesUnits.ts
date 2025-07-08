import { describe, expect, it } from 'vitest';
import { makeDayPeriods, makeDatePeriods } from '../utils/date-utils';

describe('makeDayPeriods', () => {
	it('handles empty cutoff list', () => {
		const result = makeDayPeriods([]);
		expect(result).toEqual([{ startIncl: 1, endExl: 1 }]);
	});

	it('handles single cutoff', () => {
		const result = makeDayPeriods([5]);
		expect(result).toEqual([{ startIncl: 5, endExl: 5 }]);
	});

	it('handles two cutoffs', () => {
		const result = makeDayPeriods([5, 15]);
		expect(result).toEqual([
			{ startIncl: 5, endExl: 15 },
			{ startIncl: 15, endExl: 5 },
		]);
	});

	it('sorts unordered input', () => {
		const result = makeDayPeriods([20, 10]);
		expect(result).toEqual([
			{ startIncl: 10, endExl: 20 },
			{ startIncl: 20, endExl: 10 },
		]);
	});

	it('handles full cycle', () => {
		const result = makeDayPeriods([5, 10, 15, 20]);
		expect(result).toEqual([
			{ startIncl: 5, endExl: 10 },
			{ startIncl: 10, endExl: 15 },
			{ startIncl: 15, endExl: 20 },
			{ startIncl: 20, endExl: 5 },
		]);
	});
});

const date = (y: number, m: number, d: number) => new Date(Date.UTC(y, m, d));

describe('makeDatePeriods', () => {
	it('handles single period within month', () => {
		const result = makeDatePeriods(2024, [{ startIncl: 5, endExl: 15 }]);
		expect(result).toEqual([
			{ startIncl: date(2024, 0, 5), endExl: date(2024, 0, 15) },
		]);
	});

	it('handles wraparound to next month', () => {
		const result = makeDatePeriods(2024, [{ startIncl: 20, endExl: 5 }]);
		expect(result).toEqual([
			{ startIncl: date(2024, 0, 20), endExl: date(2024, 1, 5) },
		]);
	});

	it('handles multiple months', () => {
		const result = makeDatePeriods(2024, [
			{ startIncl: 1, endExl: 10 }, // Jan
			{ startIncl: 10, endExl: 5 }, // Feb → Mar
			{ startIncl: 5, endExl: 25 }, // Mar
		]);
		expect(result).toEqual([
			{ startIncl: date(2024, 0, 1), endExl: date(2024, 0, 10) },
			{ startIncl: date(2024, 1, 10), endExl: date(2024, 2, 5) },
			{ startIncl: date(2024, 2, 5), endExl: date(2024, 2, 25) },
		]);
	});

	it('handles wraparound to next year', () => {
		const result = makeDatePeriods(2024, [
			// Dec → Jan (2025)
			{ startIncl: 26, endExl: 2 },
		]);
		expect(result).toEqual([
			{ startIncl: date(2024, 11, 26), endExl: date(2025, 0, 2) },
		]);
	});

	it('handles 12 periods cleanly', () => {
		const input = Array.from({ length: 12 }, (_, i) => ({
			startIncl: 1 + i,
			endExl: 2 + i,
		}));
		const result = makeDatePeriods(2024, input);
		for (let i = 0; i < 12; i++) {
			expect(result[i]).toEqual({
				startIncl: date(2024, i, 1 + i),
				endExl: date(2024, i, 2 + i),
			});
		}
	});
});
