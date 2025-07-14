import { Year, CutoffDay, DayPeriod, DatePeriod, Month } from 'types/dates';

/**
 * Converts an array of cutoff days into a full cycle of DayPeriods.
 *
 * Cutoff days partition the month into consecutive periods using a
 * closed-open interval convention: `[startIncl, endExl)`.
 *
 * - Cutoffs are first deduplicated and sorted ascending.
 * - If N cutoffs are given, returns N DayPeriods.
 * - The final period wraps from the last cutoff back to the first.
 * - If no cutoffs are given, returns a single degenerate period `{ startIncl: 1, endExl: 1 }`.
 *
 * Assumes input values have already been validated (1–26).
 *
 * @param cutoffs - Array of cutoff days (1–26), unordered and possibly duplicated.
 * @returns Array of DayPeriods covering the full cycle defined by the cutoffs.
 */
export const makeDayPeriods = (cutoffs: CutoffDay[]): DayPeriod[] => {
	if (cutoffs.length === 0) {
		return [{ startIncl: 1, endExl: 1 }];
	}

	const sorted = [...new Set(cutoffs)].sort((a, b) => a - b); // dedupe and sort

	const periods: DayPeriod[] = [];
	for (let i = 0; i < sorted.length; i++) {
		const startIncl = sorted[i];
		const endExl = sorted[(i + 1) % sorted.length];
		periods.push({ startIncl, endExl });
	}

	return periods;
};

/**
 * List all DatePeriods, that START in a given year and month.
 *
 * Each DayPeriod `{ startIncl, endExl }` is interpreted relative to the provided
 * year and month:
 *
 * - If `startIncl < endExl`, both dates are in the same month.
 * - If `startIncl >= endExl`, the period wraps into the next month.
 * - If the month is December (`11`) and wrap occurs, it rolls into January of the next year.
 *
 * Assumes cutoff days have already been validated (1–26).
 *
 * @param year - The four-digit year (e.g., 2024).
 * @param month - The zero-based month (0 = January, 11 = December).
 * @param dayPeriods - An array of DayPeriod objects with day-based cutoffs.
 * @returns An array of DatePeriods with real UTC Dates.
 */
export const makeDatePeriods = (
	year: Year,
	month: Month,
	dayPeriods: DayPeriod[]
): DatePeriod[] => {
	return dayPeriods.map(({ startIncl, endExl }) => {
		const start = new Date(Date.UTC(year, month, startIncl));

		const wraps = startIncl >= endExl;
		const endMonth = (month + (wraps ? 1 : 0)) % 12;
		const endYear = year + (month === 11 && wraps ? 1 : 0);

		const end = new Date(Date.UTC(endYear, endMonth, endExl));

		return { startIncl: start, endExl: end };
	});
};

/**
 * Lists all DatePeriods that START in each month of the given year,
 * using a shared set of cutoff-based DayPeriods.
 *
 * For each month 0..11, applies the same `dayPeriods` via `makeDatePeriods`.
 *
 * @param year - Four-digit year (e.g. 2024)
 * @param dayPeriods - Array of DayPeriods (cutoffs), applied uniformly to all months
 * @returns Array of 12 × dayPeriods.length DatePeriods, ordered by month
 */
export const makeDatePeriodsForWholeYear = (
	year: Year,
	dayPeriods: DayPeriod[]
): DatePeriod[] => {
	const results: DatePeriod[] = [];

	for (let month: Month = 0 as Month; month < 12; month++) {
		results.push(...makeDatePeriods(year, month, dayPeriods));
	}

	return results;
};

/**
 * Expands a single DatePeriod into all individual UTC days it covers.
 *
 * Includes all days from `startIncl` up to but not including `endExl`.
 * Each returned Date is a new UTC midnight date object.
 *
 * @param datePeriod - The DatePeriod to expand
 * @returns An array of Date objects (UTC), one for each full day in the period
 */
export const getAllDaysInDatePeriod = (datePeriod: DatePeriod): Date[] => {
	const { startIncl, endExl } = datePeriod;
	const result: Date[] = [];

	let current = new Date(
		Date.UTC(
			startIncl.getUTCFullYear(),
			startIncl.getUTCMonth(),
			startIncl.getUTCDate()
		)
	);

	while (current < endExl) {
		result.push(new Date(current));
		current.setUTCDate(current.getUTCDate() + 1);
	}

	return result;
};
