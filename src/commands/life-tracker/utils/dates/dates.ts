import {
	CutoffDay,
	CutoffDayPeriod,
	DateParts,
	DatePartsPeriod,
	DatePartsSchema,
	DatePeriod,
	Month,
	Year,
} from '../../../../types/dates';
import { Maybe } from '../../../../types/general';
import { makeDatePeriodFromDatePartsPeriod } from './general';

/**
 * Expands a `DatePartsPeriod` into all individual UTC days it covers.
 *
 * Internally converts the input to a `DatePeriod`, then delegates to `getAllDaysInDatePeriod`.
 * Each returned `Date` is a UTC midnight date object representing one full day in the range.
 *
 * @param datePartsPeriod - A validated period expressed in padded date parts
 * @returns An array of UTC Date objects, one for each day from `startIncl` to before `endExl`
 */
export const getAllDaysInDatePartsPeriod = (
	datePartsPeriod: DatePartsPeriod
): Date[] => {
	return getAllDaysInDatePeriod(
		makeDatePeriodFromDatePartsPeriod(datePartsPeriod)
	);
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
