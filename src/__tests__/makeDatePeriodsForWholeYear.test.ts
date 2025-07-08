import { DayPeriod } from 'types/dates';
import { makeDatePeriodsForWholeYear } from '../utils/date-utils';
import { describe, it, expect } from 'vitest';

const utc = (y: number, m: number, d: number) => new Date(Date.UTC(y, m, d));

describe('makeDatePeriodsForWholeYear', () => {
	it('returns empty array when dayPeriods is empty', () => {
		const result = makeDatePeriodsForWholeYear(2024, []);
		expect(result).toEqual([]);
	});

	it('returns 12 DatePeriods when one DayPeriod is given', () => {
		const dayPeriods: DayPeriod[] = [{ startIncl: 5, endExl: 15 }];
		const result = makeDatePeriodsForWholeYear(2024, dayPeriods);

		expect(result).toHaveLength(12);
		result.forEach((period, i) => {
			expect(period).toEqual({
				startIncl: utc(2024, i, 5),
				endExl: utc(2024, i, 15),
			});
		});
	});

	it('wraps into next month when needed', () => {
		const dayPeriods: DayPeriod[] = [{ startIncl: 20, endExl: 5 }];
		const result = makeDatePeriodsForWholeYear(2024, dayPeriods);

		expect(result).toHaveLength(12);
		expect(result[0]).toEqual({
			startIncl: utc(2024, 0, 20),
			endExl: utc(2024, 1, 5),
		});
		expect(result[11]).toEqual({
			startIncl: utc(2024, 11, 20),
			endExl: utc(2025, 0, 5),
		});
	});

	it('returns 24 periods for 2 dayPeriods per month', () => {
		const dayPeriods: DayPeriod[] = [
			{ startIncl: 1, endExl: 10 },
			{ startIncl: 10, endExl: 1 }, // wraps
		];
		const result = makeDatePeriodsForWholeYear(2024, dayPeriods);
		expect(result).toHaveLength(24);

		// Check Jan
		expect(result[0]).toEqual({
			startIncl: utc(2024, 0, 1),
			endExl: utc(2024, 0, 10),
		});
		expect(result[1]).toEqual({
			startIncl: utc(2024, 0, 10),
			endExl: utc(2024, 1, 1),
		});
	});
});
