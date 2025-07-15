import { describe, it, expect } from 'vitest';
import { getAllDaysInDatePartsPeriod } from '../commands/life-tracker/utils/dates/dates';
import { DatePartsPeriod } from '../types/dates';

describe('getAllDaysInDatePartsPeriod', () => {
	it('returns a single day when start and end are one day apart', () => {
		const period: DatePartsPeriod = {
			startIncl: { yyyy: '2024', mm: '07', dd: '01' },
			endExl: { yyyy: '2024', mm: '07', dd: '02' },
		};
		const result = getAllDaysInDatePartsPeriod(period);
		expect(result).toHaveLength(1);
		expect(result[0].toISOString().startsWith('2024-07-01')).toBe(true);
	});

	it('returns multiple days in correct order', () => {
		const period: DatePartsPeriod = {
			startIncl: { yyyy: '2024', mm: '07', dd: '01' },
			endExl: { yyyy: '2024', mm: '07', dd: '04' },
		};
		const result = getAllDaysInDatePartsPeriod(period);
		expect(result).toHaveLength(3);
		expect(result[0].toISOString().startsWith('2024-07-01')).toBe(true);
		expect(result[1].toISOString().startsWith('2024-07-02')).toBe(true);
		expect(result[2].toISOString().startsWith('2024-07-03')).toBe(true);
	});

	it('returns empty array if startIncl === endExl', () => {
		const period: DatePartsPeriod = {
			startIncl: { yyyy: '2024', mm: '07', dd: '01' },
			endExl: { yyyy: '2024', mm: '07', dd: '01' },
		};
		const result = getAllDaysInDatePartsPeriod(period);
		expect(result).toHaveLength(0);
	});

	it('handles month boundaries', () => {
		const period: DatePartsPeriod = {
			startIncl: { yyyy: '2024', mm: '01', dd: '30' },
			endExl: { yyyy: '2024', mm: '02', dd: '02' },
		};
		const result = getAllDaysInDatePartsPeriod(period);
		expect(result.map((d) => d.toISOString().slice(0, 10))).toEqual([
			'2024-01-30',
			'2024-01-31',
			'2024-02-01',
		]);
	});
});
