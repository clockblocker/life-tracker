import { describe, it, expect } from 'vitest';
import { getAspectsSubRootsFilePathsForYear } from '../commands/life-tracker/utils/paths';

describe('getAspectsSubRootsFilePathsForYear', () => {
	it('returns empty array if no aspects provided', () => {
		const result = getAspectsSubRootsFilePathsForYear(2024, []);
		expect(result).toEqual([]);
	});

	it('generates correct paths for one aspect', () => {
		const result = getAspectsSubRootsFilePathsForYear(2024, ['Sport']);
		expect(result).toEqual([
			'LifeTracker/Sport/PlanList/Sport-PlanList-Root',
			'LifeTracker/Sport/PlanList/2024/Sport-PlanList-2024-Root',
			'LifeTracker/Sport/StatsList/Sport-StatsList-Root',
			'LifeTracker/Sport/StatsList/2024/Sport-StatsList-2024-Root',
		]);
	});

	it('handles multiple aspects correctly', () => {
		const result = getAspectsSubRootsFilePathsForYear(2025, ['Sport', 'Food']);
		expect(result).toEqual([
			'LifeTracker/Sport/PlanList/Sport-PlanList-Root',
			'LifeTracker/Sport/PlanList/2025/Sport-PlanList-2025-Root',
			'LifeTracker/Sport/StatsList/Sport-StatsList-Root',
			'LifeTracker/Sport/StatsList/2025/Sport-StatsList-2025-Root',
			'LifeTracker/Food/PlanList/Food-PlanList-Root',
			'LifeTracker/Food/PlanList/2025/Food-PlanList-2025-Root',
			'LifeTracker/Food/StatsList/Food-StatsList-Root',
			'LifeTracker/Food/StatsList/2025/Food-StatsList-2025-Root',
		]);
	});

	it('one Aspect', () => {
		const result = getAspectsSubRootsFilePathsForYear(2042, ['Money']);
		expect(result).toContain(
			'LifeTracker/Money/PlanList/2042/Money-PlanList-2042-Root'
		);
		expect(result).toContain(
			'LifeTracker/Money/StatsList/2042/Money-StatsList-2042-Root'
		);
	});
});
