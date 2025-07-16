import { describe, it, expect } from 'vitest';
import { DateParts } from '../types/dates';
import { startOfWeek } from '../commands/life-tracker/utils/calendar';

describe('startOfWeek', () => {
	it('returns start-of-week (Monday) for a midweek Date', () => {
		const input = new Date(Date.UTC(2024, 6, 10)); // Wed, July 10
		const result = startOfWeek(input);
		expect(result.toISOString().startsWith('2024-07-08')).toBe(true); // Mon
	});

	it('returns same Date if input is already a Monday', () => {
		const input = new Date(Date.UTC(2024, 6, 8)); // Mon
		const result = startOfWeek(input);
		expect(result.toISOString().startsWith('2024-07-08')).toBe(true);
	});

	it('returns DateParts for a DateParts input', () => {
		const input: DateParts = { yyyy: '2024', mm: '07', dd: '10' }; // Wed
		const result = startOfWeek(input);
		expect(result).toEqual({ yyyy: '2024', mm: '07', dd: '08' }); // Mon
	});

	it('returns same DateParts if already a Monday', () => {
		const input: DateParts = { yyyy: '2024', mm: '07', dd: '08' }; // Mon
		const result = startOfWeek(input);
		expect(result).toEqual(input);
	});

	it('returns epoch fallback for invalid DateParts', () => {
		const input: DateParts = { yyyy: '9999', mm: '99', dd: '99' }; // nonsense
		const result = startOfWeek(input);
		expect(result).toEqual({ yyyy: '1970', mm: '01', dd: '01' });
	});
});
