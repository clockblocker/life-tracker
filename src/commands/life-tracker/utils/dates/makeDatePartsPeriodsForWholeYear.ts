import { Month } from 'date-fns';
import {
	Year,
	CutoffDayPeriod,
	DatePartsPeriod,
} from '../../../../types/dates';
import { Maybe } from '../../../../types/general';
import { makeMaybeDatePartsPeriods } from './makeDatePartsPeriods';

/**
 * Generates a full year of validated `DatePartsPeriod` objects using the given
 * cutoff day periods for each month (January to December).
 *
 * Internally:
 * - For each month [0–11], calls `makeMaybeDatePartsPeriods` to construct and validate intervals
 * - If any month fails validation, returns early with an error
 * - Otherwise, aggregates all 12×N date parts periods into a single array
 *
 * @param year - The 4-digit year to generate for
 * @param cutoffDayPeriods - List of cutoff intervals (e.g., 1–11, 11–21, 21–1)
 * @returns A `Maybe<DatePartsPeriod[]>` for the entire year, or an error if any conversion fails
 */
export const makeMaybeDatePartsPeriodsForWholeYear = (
	year: Year,
	cutoffDayPeriods: CutoffDayPeriod[]
): Maybe<DatePartsPeriod[]> => {
	const result: DatePartsPeriod[] = [];

	for (let month: Month = 0 as Month; month < 12; month++) {
		const maybe = makeMaybeDatePartsPeriods(year, month, cutoffDayPeriods);
		if (maybe.error) return maybe;
		result.push(...maybe.data);
	}

	return { error: false, data: result };
};
