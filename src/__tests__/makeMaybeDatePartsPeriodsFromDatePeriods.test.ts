import { describe, it, expect } from 'vitest';
import { makeMaybeDatePartsPeriodsFromDatePeriods } from '../commands/life-tracker/utils/dates/general';
import { DatePeriod } from '../types/dates';

describe('makeMaybeDatePartsPeriodsFromDatePeriods', () => {
	it('converts valid DatePeriods to DatePartsPeriods', () => {
		const periods: DatePeriod[] = [
			{
				startIncl: new Date(Date.UTC(2024, 6, 1)),
				endExl: new Date(Date.UTC(2024, 6, 5)),
			},
			{
				startIncl: new Date(Date.UTC(2024, 6, 10)),
				endExl: new Date(Date.UTC(2024, 6, 15)),
			},
		];

		const result = makeMaybeDatePartsPeriodsFromDatePeriods(periods);

		expect(result.error).toBe(false);
		if (!result.error) {
			expect(result.data).toHaveLength(2);
			expect(result.data[0].startIncl.yyyy).toBe('2024');
			expect(result.data[0].startIncl.mm).toBe('07');
			expect(result.data[0].startIncl.dd).toBe('01');
		}
	});

	it('fails fast on invalid DatePeriod', () => {
		const badDate = new Date('invalid');
		const periods: DatePeriod[] = [
			{
				startIncl: new Date(Date.UTC(2024, 6, 1)),
				endExl: new Date(Date.UTC(2024, 6, 5)),
			},
			{
				startIncl: badDate,
				endExl: new Date(Date.UTC(2024, 6, 20)),
			},
		];

		const result = makeMaybeDatePartsPeriodsFromDatePeriods(periods);
		expect(result.error).toBe(true);
	});

	it('returns empty array for empty input', () => {
		const result = makeMaybeDatePartsPeriodsFromDatePeriods([]);
		expect(result.error).toBe(false);
		if (!result.error) {
			expect(result.data).toEqual([]);
		}
	});
});
