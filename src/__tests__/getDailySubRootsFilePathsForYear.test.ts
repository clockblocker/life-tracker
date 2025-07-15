import { getDailySubRootsFilePathsForYear } from '../commands/life-tracker/utils/paths';
import { describe, it, expect } from 'vitest';

describe('getDailySubRootsFilePathsForYear', () => {
	it('returns 13 paths total (1 year + 12 month roots)', () => {
		const result = getDailySubRootsFilePathsForYear(2024);
		expect(result).toHaveLength(13);
	});

	it('includes the year-level root path', () => {
		const result = getDailySubRootsFilePathsForYear(2024);
		expect(result).toContain('LifeTracker/Daily/2024/Daily-2024-Root.md');
	});

	it('includes all month-level root paths, correctly padded', () => {
		const result = getDailySubRootsFilePathsForYear(2024);

		for (let m = 1; m <= 12; m++) {
			const mm = m.toString().padStart(2, '0');
			const expected = `LifeTracker/Daily/2024/${mm}/Daily-2024_${mm}-Root.md`;
			expect(result).toContain(expected);
		}
	});

	it('pads year correctly for <1000', () => {
		const result = getDailySubRootsFilePathsForYear(42);
		expect(result).toContain('LifeTracker/Daily/0042/Daily-0042-Root.md');
		expect(result).toContain('LifeTracker/Daily/0042/01/Daily-0042_01-Root.md');
	});
});
