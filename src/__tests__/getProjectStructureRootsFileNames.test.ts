import { getProjectStructureRootsFileNames } from '../commands/life-tracker/utils/paths';
import { describe, it, expect } from 'vitest';

describe('getProjectStructureRootsFileNames', () => {
	it('includes Daily and Library roots even with no aspects', () => {
		const result = getProjectStructureRootsFileNames([]);
		expect(result).toContain('LifeTracker/Daily/Daily-Root');
		expect(result).toContain('LifeTracker/Library/Library-Root');
		expect(result.length).toBe(2);
	});

	it('includes aspect root files for each given aspect', () => {
		const result = getProjectStructureRootsFileNames(['Sport', 'Money']);

		console.log(result);
		expect(result).toContain('LifeTracker/Sport/Sport-Root');
		expect(result).toContain('LifeTracker/Money/Money-Root');
	});

	it('includes PlanList and StatsList roots for each aspect', () => {
		const result = getProjectStructureRootsFileNames(['Food']);
		expect(result).toContain('LifeTracker/Food/PlanList/Food-PlanList-Root');
		expect(result).toContain('LifeTracker/Food/StatsList/Food-StatsList-Root');
	});

	it('includes Library roots under Library/Aspect for each aspect', () => {
		const result = getProjectStructureRootsFileNames(['Money']);
		expect(result).toContain('LifeTracker/Library/Money/Library-Money-Root');
	});

	it('produces all expected roots for full aspect set', () => {
		const result = getProjectStructureRootsFileNames([
			'Sport',
			'Food',
			'Money',
		]);
		expect(result.length).toBe(2 + 3 * 4); // 2 invariant + 3 aspects × 4
	});
});
