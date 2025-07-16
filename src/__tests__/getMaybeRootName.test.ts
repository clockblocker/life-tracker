import { describe, expect, it } from 'vitest';
import { Section } from '../types/file-structure-atoms';
import { getMaybeRootName } from '../commands/life-tracker/utils/paths';

describe('getMaybeRootName', () => {
	it('returns valid root name for Daily', () => {
		const result = getMaybeRootName(Section.Daily, ['2024', '07', '14']);

		expect(result.error).toBe(false);
		if (!result.error) {
			expect(result.data).toBe('Daily-2024-07-14-Root');
		}
	});

	it('returns valid root name for Food', () => {
		const result = getMaybeRootName(Section.Food, ['PlanList', '2024']);
		expect(result.error).toBe(false);
		if (!result.error) {
			expect(result.data).toBe('Food-PlanList-2024-Root');
		}
	});

	it('returns valid root for wrong 2/3 parts of Daily', () => {
		const result = getMaybeRootName(Section.Daily, ['2024', '07']);
		expect(result.error).toBe(false);
		if (!result.error) {
			expect(result.data).toBe('Daily-2024-07-Root');
		}
	});

	it('returns error for invalid part content', () => {
		const result = getMaybeRootName(Section.Daily, ['xxxx', '99', '01']); // invalid year + month
		expect(result.error).toBe(true);
		if (result.error) {
			expect(result.errorText).toMatch(/Invalid value/);
		}
	});

	it('returns error for completely bogus section input', () => {
		const result = getMaybeRootName(Section.Sport, ['notalist', 'xxxx']);
		expect(result.error).toBe(true);
	});
});
