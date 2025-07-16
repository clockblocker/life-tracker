// getWeeks.spec.ts
import { getWeeks } from '../commands/life-tracker/utils/calendar';
import { DateParts, Week, Weekday, WEEKDAYS } from '../types/dates';
import { describe, it, expect } from 'vitest';

// sanity helper
const iso = (d: Date | null) => d?.toISOString() ?? null;

function assertIsFullWeek(week: Week) {
	const keys = Object.keys(week);
	expect(keys.length).toBe(WEEKDAYS.length);
	for (const k of WEEKDAYS) {
		expect(keys).toContain(k);
		expect(week).toHaveProperty(k);
		expect(week[k] === null || week[k] instanceof Date).toBe(true);
	}
}

describe('getWeeks', () => {
	it('returns empty array on empty input', () => {
		const result = getWeeks([]);
		expect(result).toEqual([]);
	});

	it('returns a single full-shaped week with correct mappings', () => {
		const mo = new Date('2024-07-01'); // Monday
		const we = new Date('2024-07-03'); // Wednesday
		const fr = new Date('2024-07-05'); // Friday

		const result = getWeeks([fr, mo, we]);
		expect(result.length).toBe(1);

		const week = result[0];
		assertIsFullWeek(week);
		expect(iso(week.Mo)).toBe(mo.toISOString());
		expect(iso(week.We)).toBe(we.toISOString());
		expect(iso(week.Fr)).toBe(fr.toISOString());

		for (const day of WEEKDAYS) {
			if (!['Mo', 'We', 'Fr'].includes(day)) {
				expect(week[day]).toBeNull();
			}
		}
	});

	it('separates dates into multiple weeks', () => {
		const mo1 = new Date('2024-07-01');
		const mo2 = new Date('2024-07-08');

		const result = getWeeks([mo1, mo2]);
		expect(result.length).toBe(2);
		for (const week of result) assertIsFullWeek(week);

		expect(iso(result[0].Mo)).toBe(mo1.toISOString());
		expect(iso(result[1].Mo)).toBe(mo2.toISOString());
	});

	it('sorts weeks chronologically regardless of input order', () => {
		const mo1 = new Date('2024-07-01');
		const mo2 = new Date('2024-07-08');

		const result = getWeeks([mo2, mo1]);
		expect(result.length).toBe(2);
		for (const week of result) assertIsFullWeek(week);

		expect(iso(result[0].Mo)).toBe(mo1.toISOString());
		expect(iso(result[1].Mo)).toBe(mo2.toISOString());
	});

	it('handles a full week of dates', () => {
		const start = new Date('2024-07-01'); // Monday
		const week = Array.from({ length: 7 }, (_, i) => {
			const d = new Date(start);
			d.setDate(d.getDate() + i);
			return d;
		});

		const result = getWeeks(week);
		expect(result.length).toBe(1);

		const wk = result[0];
		assertIsFullWeek(wk);

		WEEKDAYS.forEach((day, i) => {
			expect(iso(wk[day])).toBe(week[i].toISOString());
		});
	});

	it('skips invalid dates', () => {
		const valid = new Date('2024-07-01');
		const invalid = new Date('not-a-date');

		const result = getWeeks([valid, invalid]);
		expect(result.length).toBe(1);

		const week = result[0];
		assertIsFullWeek(week);
		expect(iso(week.Mo)).toBe(valid.toISOString());
	});

	it('groups multiple Date entries into correct week buckets', () => {
		const input = [
			new Date(Date.UTC(2024, 6, 8)), // Mon
			new Date(Date.UTC(2024, 6, 10)), // Wed
			new Date(Date.UTC(2024, 6, 12)), // Fri
		];

		const result = getWeeks(input);
		expect(result).toHaveLength(1);

		const week = result[0];
		expect(week[Weekday.Mo]?.toISOString().startsWith('2024-07-08')).toBe(true);
		expect(week[Weekday.We]?.toISOString().startsWith('2024-07-10')).toBe(true);
		expect(week[Weekday.Fr]?.toISOString().startsWith('2024-07-12')).toBe(true);
	});

	it('handles multiple weeks of Date input', () => {
		const input = [
			new Date(Date.UTC(2024, 6, 8)), // Mon
			new Date(Date.UTC(2024, 6, 15)), // next Mon
		];

		const result = getWeeks(input);
		expect(result).toHaveLength(2);
		expect(result[0][Weekday.Mo]?.toISOString()).toContain('2024-07-08');
		expect(result[1][Weekday.Mo]?.toISOString()).toContain('2024-07-15');
	});

	it('groups DateParts into correct week buckets', () => {
		const input: DateParts[] = [
			{ yyyy: '2024', mm: '07', dd: '08' }, // Mon
			{ yyyy: '2024', mm: '07', dd: '09' }, // Tue
			{ yyyy: '2024', mm: '07', dd: '11' }, // Thu
		];

		const result = getWeeks(input);
		expect(result).toHaveLength(1);
		expect(result[0][Weekday.Mo]?.toISOString()).toContain('2024-07-08');
		expect(result[0][Weekday.Tu]?.toISOString()).toContain('2024-07-09');
		expect(result[0][Weekday.Th]?.toISOString()).toContain('2024-07-11');
	});

	it('skips invalid dates silently', () => {
		const input = [
			new Date('invalid'),
			new Date(Date.UTC(2024, 6, 10)), // Wed
		];

		const result = getWeeks(input);
		expect(result).toHaveLength(1);
		expect(result[0][Weekday.We]?.toISOString()).toContain('2024-07-10');
	});
});
