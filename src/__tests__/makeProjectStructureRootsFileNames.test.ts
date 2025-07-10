import { makeProjectStructureRootsFileNames } from '../utils/file-utils';
import { describe, it, expect } from 'vitest';

describe('makeProjectStructureRootsFileNames', () => {
	it('includes Daily and Library roots even with no aspects', () => {
		const result = makeProjectStructureRootsFileNames([]);
		expect(result).toContain('LifeTracker/Daily/Daily-Root.md');
		expect(result).toContain('LifeTracker/Library/Library-Root.md');
		expect(result.length).toBe(2);
	});

	it('includes aspect root files for each given aspect', () => {
		const result = makeProjectStructureRootsFileNames(['Sport', 'Money']);
		expect(result).toContain('LifeTracker/Sport/Sport-Root.md');
		expect(result).toContain('LifeTracker/Money/Money-Root.md');
	});

	it('includes PlanList and StatsList roots for each aspect', () => {
		const result = makeProjectStructureRootsFileNames(['Food']);
		expect(result).toContain('LifeTracker/Food/PlanList/Food-PlanList-Root.md');
		expect(result).toContain(
			'LifeTracker/Food/StatsList/Food-StatsList-Root.md'
		);
	});

	it('includes Library roots under Library/Aspect for each aspect', () => {
		const result = makeProjectStructureRootsFileNames(['Money']);
		expect(result).toContain('LifeTracker/Library/Money/Library-Money-Root.md');
	});

	it('includes Food IngredientList and MealList roots only for Food', () => {
		const result = makeProjectStructureRootsFileNames(['Food']);
		expect(result).toContain(
			'LifeTracker/Library/Food/IngredientList/Library-Food-IngredientList-Root.md'
		);
		expect(result).toContain(
			'LifeTracker/Library/Food/MealList/Library-Food-MealList-Root.md'
		);

		const others = makeProjectStructureRootsFileNames(['Sport', 'Money']);
		expect(others.some((p) => p.includes('IngredientList'))).toBe(false);
		expect(others.some((p) => p.includes('MealList'))).toBe(false);
	});

	it('produces all expected roots for full aspect set', () => {
		const result = makeProjectStructureRootsFileNames([
			'Sport',
			'Food',
			'Money',
		]);
		expect(result.length).toBe(2 + 3 * 4 + 2); // 2 invariant + 3 aspects × 4 + 2 Food extras
	});
});
