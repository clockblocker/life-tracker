// getWeeks.spec.ts
import { Week, WEEKDAYS } from '../types/dates';
import { getWeeks } from '../utils/calendar';
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
});
