import { Aspect } from 'types/file-structure';
import { getAspectLeafFilePathsForYear } from '../utils/paths';
import { describe, it, expect } from 'vitest';

describe('getAspectLeafFilePathsForYear', () => {
	it('returns empty array for no aspects', () => {
		const result = getAspectLeafFilePathsForYear(2024, [], [5, 15]);
		expect(result).toEqual([]);
	});

	it('generates one file per aspect × stats × month for empty cutoff', () => {
		const aspects: Aspect[] = ['Sport'];
		const result = getAspectLeafFilePathsForYear(2024, aspects, []);
		// 1 aspect × 2 (Plan, Stats) × 12 months = 24
		expect(result).toHaveLength(24);
	});

	it('respects cutoff partitioning: 3 cutoffs = 3×12 = 36 periods', () => {
		const aspects: Aspect[] = ['Food'];
		const result = getAspectLeafFilePathsForYear(2024, aspects, [5, 10, 20]);
		expect(result).toHaveLength(3 * 12 * 2); // 72 files: 3 cuts × 12 × 2 PlanStats
	});

	it('handles multiple aspects', () => {
		const result = getAspectLeafFilePathsForYear(
			2024,
			['Food', 'Money'],
			[1, 15]
		);
		// 2 aspects × 2 stats × 2 cuts × 12 months = 96
		expect(result).toHaveLength(2 * 2 * 2 * 12);
	});

	it('includes correct filename structure', () => {
		const [path] = getAspectLeafFilePathsForYear(2024, ['Sport'], [1]);
		expect(path).toMatch(
			/^LifeTracker\/Sport\/(Plan|Stats)List\/2024\/Sport-(Plan|Stats)-\d{4}_\d{2}_\d{2}__to__\d{4}_\d{2}_\d{2}\.md$/
		);
	});
});
