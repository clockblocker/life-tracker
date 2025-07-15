import { describe, expect, it } from 'vitest';
import { makeCutoffDayPeriods } from '../commands/life-tracker/utils/dates/makeCutoffDayPeriods';

describe('makeCutoffDayPeriods', () => {
	it('handles empty cutoff list', () => {
		const result = makeCutoffDayPeriods([]);
		expect(result).toEqual([{ startIncl: 1, endExl: 1 }]);
	});

	it('handles single cutoff', () => {
		const result = makeCutoffDayPeriods([5]);
		expect(result).toEqual([{ startIncl: 5, endExl: 5 }]);
	});

	it('handles two cutoffs', () => {
		const result = makeCutoffDayPeriods([5, 15]);
		expect(result).toEqual([
			{ startIncl: 5, endExl: 15 },
			{ startIncl: 15, endExl: 5 },
		]);
	});

	it('sorts unordered input', () => {
		const result = makeCutoffDayPeriods([20, 10]);
		expect(result).toEqual([
			{ startIncl: 10, endExl: 20 },
			{ startIncl: 20, endExl: 10 },
		]);
	});

	it('handles full cycle', () => {
		const result = makeCutoffDayPeriods([5, 10, 15, 20]);
		expect(result).toEqual([
			{ startIncl: 5, endExl: 10 },
			{ startIncl: 10, endExl: 15 },
			{ startIncl: 15, endExl: 20 },
			{ startIncl: 20, endExl: 5 },
		]);
	});
});
