import { describe, expect, it } from 'vitest';
import { Section } from '../types/file-structure-atoms';
import { getMaybeRootName } from '../commands/life-tracker/utils/paths';

describe('getMaybeRootName', () => {
	it('returns valid root name for Daily', () => {
		const result = getMaybeRootName({
			section: Section.Daily,
			pathParts: ['2024', '07', '14'],
		});

		expect(result.error).toBe(false);
		if (!result.error) {
			expect(result.data).toBe('2024_07_14-Root');
		}
	});

	it('returns valid root name for Food', () => {
		const result = getMaybeRootName({
			section: Section.Food,
			pathParts: ['PlanList', '2024'],
		});
		expect(result.error).toBe(false);
		if (!result.error) {
			expect(result.data).toBe('Food-PlanList-2024-Root');
		}
	});

	it('returns valid root for wrong 2/3 parts of Daily', () => {
		const result = getMaybeRootName({
			section: Section.Daily,
			pathParts: ['2024', '07'],
		});
		expect(result.error).toBe(false);
		if (!result.error) {
			expect(result.data).toBe('Daily-2024-07-Root');
		}
	});

	it('returns error for invalid part content', () => {
		const result = getMaybeRootName({
			section: Section.Daily,
			pathParts: ['xxxx', '99', '01'],
		}); // invalid year + month
		expect(result.error).toBe(true);
		if (result.error) {
			expect(result.errorText).toMatch(/Invalid value/);
		}
	});

	it('returns error for completely bogus section input', () => {
		const result = getMaybeRootName({
			section: Section.Sport,
			pathParts: ['notalist', 'xxxx'],
		});
		expect(result.error).toBe(true);
	});
});
