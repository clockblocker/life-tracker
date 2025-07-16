import { describe, it, expect } from 'vitest';
import { getAspectLeafFilePathsForYearWideDatePartsPeriod } from '../commands/life-tracker/utils/paths';
import { DatePartsPeriod } from '../types/dates';
import { Aspect } from '../types/file-structure-atoms';

describe('getAspectLeafFilePathsForYearWideDatePartsPeriod', () => {
	it('returns empty array for empty aspects', () => {
		const periods: DatePartsPeriod[] = [
			{
				startIncl: { yyyy: '2024', mm: '07', dd: '01' },
				endExl: { yyyy: '2024', mm: '07', dd: '05' },
			},
		];
		const result = getAspectLeafFilePathsForYearWideDatePartsPeriod(
			periods,
			[]
		);
		expect(result).toEqual([]);
	});

	it('returns correct paths for one aspect and one period', () => {
		const periods: DatePartsPeriod[] = [
			{
				startIncl: { yyyy: '2024', mm: '07', dd: '01' },
				endExl: { yyyy: '2024', mm: '07', dd: '05' },
			},
		];
		const aspects = [Aspect.Food];

		const result = getAspectLeafFilePathsForYearWideDatePartsPeriod(
			periods,
			aspects
		);

		expect(result).toHaveLength(2); // Plan and Stats

		expect(result).toContain(
			'LifeTracker/Food/PlanList/2024/Food-Plan-2024_07_01__to__2024_07_05'
		);
		expect(result).toContain(
			'LifeTracker/Food/StatsList/2024/Food-Stats-2024_07_01__to__2024_07_05'
		);
	});

	it('returns full cartesian product for multiple aspects and periods', () => {
		const periods: DatePartsPeriod[] = [
			{
				startIncl: { yyyy: '2024', mm: '07', dd: '01' },
				endExl: { yyyy: '2024', mm: '07', dd: '05' },
			},
			{
				startIncl: { yyyy: '2024', mm: '07', dd: '10' },
				endExl: { yyyy: '2024', mm: '07', dd: '15' },
			},
		];

		const aspects: Aspect[] = ['Food', 'Money'];

		const result = getAspectLeafFilePathsForYearWideDatePartsPeriod(
			periods,
			aspects
		);

		expect(result).toHaveLength(2 * 2 * 2); // 2 aspects × 2 plan/stats × 2 periods = 8 files

		expect(result).toContain(
			'LifeTracker/Money/PlanList/2024/Money-Plan-2024_07_10__to__2024_07_15'
		);
		expect(result).toContain(
			'LifeTracker/Food/StatsList/2024/Food-Stats-2024_07_01__to__2024_07_05'
		);
	});
});
