import { getProjectStructureRootsFileNames } from '../utils/paths';
import { describe, it, expect } from 'vitest';

describe('getProjectStructureRootsFileNames', () => {
	it('includes Daily and Library roots even with no aspects', () => {
		const result = getProjectStructureRootsFileNames([]);
		expect(result).toContain('LifeTracker/Daily/Daily-Root.md');
		expect(result).toContain('LifeTracker/Library/Library-Root.md');
		expect(result.length).toBe(2);
	});

	it('includes aspect root files for each given aspect', () => {
		const result = getProjectStructureRootsFileNames(['Sport', 'Money']);
		expect(result).toContain('LifeTracker/Sport/Sport-Root.md');
		expect(result).toContain('LifeTracker/Money/Money-Root.md');
	});

	it('includes PlanList and StatsList roots for each aspect', () => {
		const result = getProjectStructureRootsFileNames(['Food']);
		expect(result).toContain('LifeTracker/Food/PlanList/Food-PlanList-Root.md');
		expect(result).toContain(
			'LifeTracker/Food/StatsList/Food-StatsList-Root.md'
		);
	});

	it('includes Library roots under Library/Aspect for each aspect', () => {
		const result = getProjectStructureRootsFileNames(['Money']);
		expect(result).toContain('LifeTracker/Library/Money/Library-Money-Root.md');
	});

	it('includes Food IngredientList and MealList roots only for Food', () => {
		const result = getProjectStructureRootsFileNames(['Food']);
		expect(result).toContain(
			'LifeTracker/Library/Food/IngredientList/Library-Food-IngredientList-Root.md'
		);
		expect(result).toContain(
			'LifeTracker/Library/Food/MealList/Library-Food-MealList-Root.md'
		);

		const others = getProjectStructureRootsFileNames(['Sport', 'Money']);
		expect(others.some((p) => p.includes('IngredientList'))).toBe(false);
		expect(others.some((p) => p.includes('MealList'))).toBe(false);
	});

	it('produces all expected roots for full aspect set', () => {
		const result = getProjectStructureRootsFileNames([
			'Sport',
			'Food',
			'Money',
		]);
		expect(result.length).toBe(2 + 3 * 4 + 2); // 2 invariant + 3 aspects × 4 + 2 Food extras
	});
});
