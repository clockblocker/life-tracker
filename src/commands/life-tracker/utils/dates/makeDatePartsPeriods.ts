import { Month } from 'date-fns';
import {
	Year,
	CutoffDayPeriod,
	DatePeriod,
	DatePartsPeriod,
} from '../../../../types/dates';
import { Maybe } from '../../../../types/general';
import { makeMaybeDatePartsPeriodsFromDatePeriods } from './general';

/**
 * Generates a list of validated `DatePartsPeriod` objects from a given year, month,
 * and an array of cutoff day intervals.
 *
 * Internally:
 * - Converts each `CutoffDayPeriod` into an actual `DatePeriod` using `makeDatePeriods`
 * - Converts each `Date` into its zero-padded string representation (yyyy, mm, dd)
 * - Validates each part using `DatePartsSchema`
 * - Fails fast if any date part is invalid
 *
 * @param year - The 4-digit year (e.g., 2025)
 * @param month - The 0-indexed month (0 = January, 11 = December)
 * @param cutoffDayPeriods - An array of day-bound intervals within the month
 * @returns A `Maybe<DatePartsPeriod[]>`, or an error if any conversion fails
 */
export const makeMaybeDatePartsPeriods = (
	year: Year,
	month: Month,
	cutoffDayPeriods: CutoffDayPeriod[]
): Maybe<DatePartsPeriod[]> => {
	const datePeriods = makeDatePeriods(year, month, cutoffDayPeriods);
	return makeMaybeDatePartsPeriodsFromDatePeriods(datePeriods);
};

/**
 * List all DatePeriods, that START in a given year and month.
 *
 * Each CutoffDayPeriod `{ startIncl, endExl }` is interpreted relative to the provided
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
 * @param cutoffDayPeriods - An array of CutoffDayPeriod objects with day-based cutoffs.
 * @returns An array of DatePeriods with real UTC Dates.
 */
export const makeDatePeriods = (
	year: Year,
	month: Month,
	cutoffDayPeriods: CutoffDayPeriod[]
): DatePeriod[] => {
	return cutoffDayPeriods.map(({ startIncl, endExl }) => {
		const start = new Date(Date.UTC(year, month, startIncl));

		const wraps = startIncl >= endExl;
		const endMonth = (month + (wraps ? 1 : 0)) % 12;
		const endYear = year + (month === 11 && wraps ? 1 : 0);

		const end = new Date(Date.UTC(endYear, endMonth, endExl));

		return { startIncl: start, endExl: end };
	});
};
