import { describe, it, expect } from 'vitest';
import { reprFromDatePartsPeriod } from '../commands/life-tracker/utils/paths';
import { DatePartsPeriod } from '../types/dates';

describe('reprFromDatePartsPeriod', () => {
	it('formats a valid date parts period into YYYY_MM_DD__to__YYYY_MM_DD', () => {
		const input: DatePartsPeriod = {
			startIncl: { yyyy: '2024', mm: '07', dd: '01' },
			endExl: { yyyy: '2024', mm: '07', dd: '15' },
		};

		const result = reprFromDatePartsPeriod(input);
		expect(result).toBe('2024_07_01__to__2024_07_15');
	});

	it('handles cross-month ranges', () => {
		const input: DatePartsPeriod = {
			startIncl: { yyyy: '2024', mm: '01', dd: '25' },
			endExl: { yyyy: '2024', mm: '02', dd: '05' },
		};

		const result = reprFromDatePartsPeriod(input);
		expect(result).toBe('2024_01_25__to__2024_02_05');
	});

	it('handles cross-year ranges', () => {
		const input: DatePartsPeriod = {
			startIncl: { yyyy: '2023', mm: '12', dd: '31' },
			endExl: { yyyy: '2024', mm: '01', dd: '02' },
		};

		const result = reprFromDatePartsPeriod(input);
		expect(result).toBe('2023_12_31__to__2024_01_02');
	});
});
