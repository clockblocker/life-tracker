import { describe, it, expect } from 'vitest';
import { makeMaybeDatePartsPeriodsForWholeYear } from '../commands/life-tracker/utils/dates/makeDatePartsPeriodsForWholeYear';
import { Year, CutoffDayPeriod } from '../types/dates';

describe('makeMaybeDatePartsPeriodsForWholeYear', () => {
	it('returns 12 × N periods when all months succeed', () => {
		const year: Year = 2024;
		const cutoffs: CutoffDayPeriod[] = [
			{ startIncl: 1, endExl: 11 },
			{ startIncl: 11, endExl: 21 },
			{ startIncl: 21, endExl: 1 }, // wraps to next month
		];

		const result = makeMaybeDatePartsPeriodsForWholeYear(year, cutoffs);

		expect(result.error).toBe(false);
		if (!result.error) {
			expect(result.data).toHaveLength(12 * 3); // 3 intervals × 12 months
			expect(result.data[0].startIncl.yyyy).toBe('2024');
			expect(result.data[0].startIncl.mm).toBe('01');
			expect(result.data[0].startIncl.dd).toBe('01');
		}
	});

	it('returns error if one month fails', () => {
		const year: Year = 2024;
		const cutoffs: CutoffDayPeriod[] = [
			{ startIncl: 1, endExl: 11 },
			{ startIncl: 99, endExl: 5 }, // invalid
		];

		const result = makeMaybeDatePartsPeriodsForWholeYear(year, cutoffs);
		expect(result.error).toBe(true);
		if (result.error) {
			expect(result.errorText).toMatch(/Invalid/);
		}
	});

	it('handles empty cutoffDayPeriods array', () => {
		const year: Year = 2024;
		const result = makeMaybeDatePartsPeriodsForWholeYear(year, []);

		expect(result.error).toBe(false);
		if (!result.error) {
			expect(result.data).toHaveLength(0);
		}
	});
});
