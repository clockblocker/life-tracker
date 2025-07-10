import { aspectsSubRootsFilePathsForYear } from '../utils/file-utils';
import { describe, it, expect } from 'vitest';

describe('aspectsSubRootsFilePathsForYear', () => {
	it('returns empty array if no aspects provided', () => {
		const result = aspectsSubRootsFilePathsForYear(2024, []);
		expect(result).toEqual([]);
	});

	it('generates correct paths for one aspect', () => {
		const result = aspectsSubRootsFilePathsForYear(2024, ['Sport']);
		expect(result).toEqual([
			'LifeTracker/Sport/PlanList/Sport-PlanList-Root.md',
			'LifeTracker/Sport/PlanList/2024/Sport-PlanList-2024-Root.md',
			'LifeTracker/Sport/StatsList/Sport-StatsList-Root.md',
			'LifeTracker/Sport/StatsList/2024/Sport-StatsList-2024-Root.md',
		]);
	});

	it('handles multiple aspects correctly', () => {
		const result = aspectsSubRootsFilePathsForYear(2025, ['Sport', 'Food']);
		expect(result).toEqual([
			'LifeTracker/Sport/PlanList/Sport-PlanList-Root.md',
			'LifeTracker/Sport/PlanList/2025/Sport-PlanList-2025-Root.md',
			'LifeTracker/Sport/StatsList/Sport-StatsList-Root.md',
			'LifeTracker/Sport/StatsList/2025/Sport-StatsList-2025-Root.md',
			'LifeTracker/Food/PlanList/Food-PlanList-Root.md',
			'LifeTracker/Food/PlanList/2025/Food-PlanList-2025-Root.md',
			'LifeTracker/Food/StatsList/Food-StatsList-Root.md',
			'LifeTracker/Food/StatsList/2025/Food-StatsList-2025-Root.md',
		]);
	});

	it('one Aspect', () => {
		const result = aspectsSubRootsFilePathsForYear(2042, ['Money']);
		expect(result).toContain(
			'LifeTracker/Money/PlanList/2042/Money-PlanList-2042-Root.md'
		);
		expect(result).toContain(
			'LifeTracker/Money/StatsList/2042/Money-StatsList-2042-Root.md'
		);
	});
});
