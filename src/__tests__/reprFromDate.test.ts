import { reprFromDate } from '../utils/paths';
import { describe, it, expect } from 'vitest';

const utc = (y: number, m: number, d: number): Date => {
	const date = new Date(Date.UTC(2000, m, d)); // safe dummy base
	date.setUTCFullYear(y); // explicitly set year to support pre-1900
	return date;
};

describe('reprFromDate', () => {
	it('pads month and day with leading zeros', () => {
		const date = utc(2024, 0, 5); // Jan 5
		expect(reprFromDate(date)).toBe('2024_01_05');
	});

	it('handles double-digit month and day', () => {
		const date = utc(2024, 9, 12); // Oct 12
		expect(reprFromDate(date)).toBe('2024_10_12');
	});

	it('returns correct string for December 31', () => {
		const date = utc(2024, 11, 31);
		expect(reprFromDate(date)).toBe('2024_12_31');
	});

	it('handles year 2000 cleanly', () => {
		const date = utc(2000, 1, 29); // Feb 29, 2000
		expect(reprFromDate(date)).toBe('2000_02_29');
	});
});
