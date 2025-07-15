import { describe, it, expect } from 'vitest';
import { getPathsToDailyLeaves } from '../commands/life-tracker/utils/paths';
import { DASH } from '../constants/format';
import type { DateParts } from '../types/dates';
import {
	BASE,
	Section,
	ROOT,
	NOTES,
	type Aspect,
} from '../types/file-structure-atoms';

describe('getPathsToDailyLeaves', () => {
	it('returns only Root and Notes paths when no aspects provided', () => {
		const dateParts: DateParts = { yyyy: '2024', mm: '07', dd: '01' };

		const result = getPathsToDailyLeaves(dateParts, []);
		console.log(result);

		expect(result).toHaveLength(2);

		const base = `${BASE}/${Section.Daily}/2024/07/01/2024_07_01`;

		expect(result).toContain(`${base}${DASH}${ROOT}`);
		expect(result).toContain(`${base}${DASH}${NOTES}`);
	});

	it('includes aspect paths when aspects are provided', () => {
		const dateParts: DateParts = { yyyy: '2024', mm: '07', dd: '01' };
		const aspects: Aspect[] = ['Food', 'Sport'];

		const result = getPathsToDailyLeaves(dateParts, aspects);
		expect(result).toHaveLength(4); // ROOT + NOTES + 2 aspects

		const base = `${BASE}/${Section.Daily}/2024/07/01/2024_07_01`;

		expect(result).toContain(`${base}${DASH}Food`);
		expect(result).toContain(`${base}${DASH}Sport`);
	});
});
