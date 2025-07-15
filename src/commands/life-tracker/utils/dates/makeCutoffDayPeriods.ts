import { CutoffDay, CutoffDayPeriod } from '../../../../types/dates';

/**
 * Converts an array of cutoff days into a full cycle of CutoffDayPeriods.
 *
 * Cutoff days partition the month into consecutive periods using a
 * closed-open interval convention: `[startIncl, endExl)`.
 *
 * - Cutoffs are first deduplicated and sorted ascending.
 * - If N cutoffs are given, returns N CutoffDayPeriods.
 * - The final period wraps from the last cutoff back to the first.
 * - If no cutoffs are given, returns a single degenerate period `{ startIncl: 1, endExl: 1 }`.
 *
 * Assumes input values have already been validated (1–26).
 *
 * @param cutoffs - Array of cutoff days (1–26), unordered and possibly duplicated.
 * @returns Array of CutoffDayPeriods covering the full cycle defined by the cutoffs.
 */
export const makeCutoffDayPeriods = (
	cutoffs: CutoffDay[]
): CutoffDayPeriod[] => {
	if (cutoffs.length === 0) {
		return [{ startIncl: 1, endExl: 1 }];
	}

	const sorted = [...new Set(cutoffs)].sort((a, b) => a - b); // dedupe and sort

	const periods: CutoffDayPeriod[] = [];
	for (let i = 0; i < sorted.length; i++) {
		const startIncl = sorted[i];
		const endExl = sorted[(i + 1) % sorted.length];
		periods.push({ startIncl, endExl });
	}

	return periods;
};
