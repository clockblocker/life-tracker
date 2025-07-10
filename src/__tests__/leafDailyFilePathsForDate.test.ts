import { Aspect } from 'types/file-structure';
import { leafDailyFilePathsForDate } from '../utils/file-utils';
import { describe, it, expect } from 'vitest';

const utc = (y: number, m: number, d: number) => new Date(Date.UTC(y, m, d));

describe('leafDailyFilePathsForDate', () => {
	it('includes only Root and Notes files when aspects are empty', () => {
		const date = utc(2024, 6, 10); // 2024-07-10
		const result = leafDailyFilePathsForDate(date, []);
		expect(result).toEqual([
			'LifeTracker/Daily/2024/07/10/2024_07_10-Root.md',
			'LifeTracker/Daily/2024/07/10/2024_07_10-Notes.md',
		]);
	});

	it('includes all aspect files when all are provided', () => {
		const date = utc(2024, 0, 5); // 2024-01-05
		const aspects: Aspect[] = ['Sport', 'Food', 'Money'];
		const result = leafDailyFilePathsForDate(date, aspects);
		expect(result).toEqual([
			'LifeTracker/Daily/2024/01/05/2024_01_05-Root.md',
			'LifeTracker/Daily/2024/01/05/2024_01_05-Notes.md',
			'LifeTracker/Daily/2024/01/05/2024_01_05-Sport.md',
			'LifeTracker/Daily/2024/01/05/2024_01_05-Food.md',
			'LifeTracker/Daily/2024/01/05/2024_01_05-Money.md',
		]);
	});

	it('handles subset of aspects', () => {
		const date = utc(2025, 10, 1); // 2025-11-01
		const result = leafDailyFilePathsForDate(date, ['Food']);
		expect(result).toEqual([
			'LifeTracker/Daily/2025/11/01/2025_11_01-Root.md',
			'LifeTracker/Daily/2025/11/01/2025_11_01-Notes.md',
			'LifeTracker/Daily/2025/11/01/2025_11_01-Food.md',
		]);
	});

	it('outputs same result regardless of aspect order', () => {
		const date = utc(2024, 3, 2);
		const resultA = leafDailyFilePathsForDate(date, ['Food', 'Money']);
		const resultB = leafDailyFilePathsForDate(date, ['Money', 'Food']);
		expect(resultA.sort()).toEqual(resultB.sort());
	});

	it('zero-pads month and day correctly', () => {
		const date = utc(2024, 8, 9); // 2024-09-09
		const result = leafDailyFilePathsForDate(date, []);
		expect(result[0]).toContain('2024/09/09');
		expect(result[0]).toContain('2024_09_09-Root.md');
	});
});