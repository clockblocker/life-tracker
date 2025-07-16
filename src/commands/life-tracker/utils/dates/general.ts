import {
	DateParts,
	DatePartsPeriod,
	DatePartsSchema,
	DatePeriod,
} from '../../../../types/dates';
import { Maybe } from '../../../../types/general';

export const makeDateFromDateParts = ({ yyyy, mm, dd }: DateParts): Date => {
	return new Date(Date.UTC(Number(yyyy), Number(mm) - 1, Number(dd)));
};

export const makeDatePeriodFromDatePartsPeriod = ({
	startIncl,
	endExl,
}: DatePartsPeriod): DatePeriod => {
	return {
		startIncl: makeDateFromDateParts(startIncl),
		endExl: makeDateFromDateParts(endExl),
	};
};

/**
 * Extracts the UTC year, month, and day from a `Date` object,
 * formats them as zero-padded strings, and validates them
 * using `DatePartsSchema`.
 *
 * - Year is padded to 4 digits (e.g. "0007", "2025")
 * - Month and day are padded to 2 digits (e.g. "03", "09")
 *
 * @param date - The Date to extract parts from (interpreted as UTC)
 * @returns A Maybe-wrapped DateParts object, or an error if validation fails
 */
export const getMaybeDatePartsFromDate = (date: Date): Maybe<DateParts> => {
	const yyyy = date.getUTCFullYear().toString().padStart(4, '0');
	const mm = (date.getUTCMonth() + 1).toString().padStart(2, '0');
	const dd = date.getUTCDate().toString().padStart(2, '0');

	const result = DatePartsSchema.safeParse({ yyyy, mm, dd });

	if (!result.success) {
		return { error: true, errorText: result.error.message };
	}

	return { error: false, data: result.data };
};

export const getDatePartsOrEpochFromDate = (date: Date): DateParts => {
	const maybe = getMaybeDatePartsFromDate(date);

	if (!maybe.error) return maybe.data;

	return {
		yyyy: '1970',
		mm: '01',
		dd: '01',
	};
};

/**
 * Converts an array of `DatePeriod` objects into validated `DatePartsPeriod` objects.
 *
 * Each `DatePeriod` is processed using `makeMaybeDatePartsPeriodFromDatePeriod`,
 * which extracts and validates UTC year/month/day components.
 * If any individual period fails validation, the function short-circuits and returns an error.
 *
 * @param periods - An array of `DatePeriod` objects to convert
 * @returns A Maybe-wrapped array of `DatePartsPeriod` objects, or an error if any input is invalid
 */
export const makeMaybeDatePartsPeriodsFromDatePeriods = (
	periods: DatePeriod[]
): Maybe<DatePartsPeriod[]> => {
	const result: DatePartsPeriod[] = [];

	for (const period of periods) {
		const maybe = makeMaybeDatePartsPeriodFromDatePeriod(period);
		if (maybe.error) return maybe;
		result.push(maybe.data);
	}

	return { error: false, data: result };
};

const makeMaybeDatePartsPeriodFromDatePeriod = (
	period: DatePeriod
): Maybe<DatePartsPeriod> => {
	const start = getMaybeDatePartsFromDate(period.startIncl);
	if (start.error) return start;

	const end = getMaybeDatePartsFromDate(period.endExl);
	if (end.error) return end;

	return {
		error: false,
		data: {
			startIncl: start.data,
			endExl: end.data,
		},
	};
};
