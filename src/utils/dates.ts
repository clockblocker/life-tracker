import {
	Year,
	CutoffDay,
	DayPeriod,
	DatePeriod,
	CutoffDaySchema,
	Month,
} from 'types/dates';

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

export const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'] as const;
type Weekday = (typeof WEEKDAYS)[number];

export function getDays(
	year: number,
	month: number
): { day: string; weekday: Weekday }[] {
	const result = [];
	const date = new Date(year, month - 1, 1); // JS months 0-based

	while (date.getMonth() === month - 1) {
		const day = String(date.getDate()).padStart(2, '0');
		// JS: getDay() → 0=Sun, ..., 6=Sat → shift so 0=Mon
		const shifted = (date.getDay() + 6) % 7;
		const weekday = WEEKDAYS[shifted];
		result.push({ day, weekday });
		date.setDate(date.getDate() + 1);
	}

	return result;
}

export function getBudgetWindows(
	year: number,
	month: number
): {
	label: string;
	days: { day_repr: string; day: string; weekday: Weekday }[];
}[] {
	const CONFIG = [15, 25];
	const result = [];
	const config = CONFIG;
	const pairs = config.map((start, i) => [
		start,
		config[(i + 1) % config.length],
	]);

	for (const [startDay, endDay] of pairs) {
		const startDate = new Date(year, month - 1, startDay);
		let endYear = year;
		let endMonth = month;
		if (endDay <= startDay) {
			endMonth += 1;
			if (endMonth > 12) {
				endMonth = 1;
				endYear += 1;
			}
		}
		const endDate = new Date(endYear, endMonth - 1, endDay);

		const days = [];
		const monthsToCollect = new Set<string>();
		monthsToCollect.add(`${year}-${month}`);
		if (endMonth !== month || endYear !== year) {
			monthsToCollect.add(`${endYear}-${endMonth}`);
		}

		for (const m of monthsToCollect) {
			const [y, mo] = m.split('-').map(Number);
			const allDays = getDays(y, mo);
			for (let i = 0; i < allDays.length; i++) {
				const dayNum = parseInt(allDays[i].day, 10);
				const d = new Date(y, mo - 1, dayNum);
				if (d >= startDate && d < endDate) {
					days.push({
						day_repr: allDays[i].day,
						day: d.toISOString().slice(0, 10).split('-').reverse().join('.'),
						weekday: allDays[i].weekday,
					});
				}
			}
		}

		const label = `${startDate.toLocaleDateString('de-DE')}–${new Date(
			endDate.getTime() - 86400000
		).toLocaleDateString('de-DE')}`;

		result.push({ label, days });
	}

	return result;
}

type CalendarCell = {
	day_repr: string;
	day: string;
	weekday: Weekday;
};

export function makeCalendarObjects(
	prevIntervalLabel: string,
	nextIntervalLabel: string,
	thisIntervalDays: CalendarCell[]
): CalendarCell[] {
	// 1. Map days to ISO for lookup
	const dayMap = new Map<string, CalendarCell>();
	for (const d of thisIntervalDays) {
		dayMap.set(d.day, d);
	}

	// 2. parse actual Date objects from first and last day
	const parseDate = (s: string) => {
		const [dd, mm, yyyy] = s.split('.').map(Number);
		return new Date(yyyy, mm - 1, dd);
	};

	const startDate = parseDate(thisIntervalDays[0].day);
	const endDate = parseDate(thisIntervalDays[thisIntervalDays.length - 1].day);

	// 3. Align calendar bounds
	const start = new Date(startDate);
	const startDay = start.getDay();
	const offsetToMonday = startDay === 0 ? -6 : 1 - startDay;
	start.setDate(start.getDate() + offsetToMonday);

	const end = new Date(endDate);
	const endDay = end.getDay();
	const offsetToSunday = endDay === 0 ? 0 : 7 - endDay;
	end.setDate(end.getDate() + offsetToSunday);

	// 4. Build result
	const result: CalendarCell[] = [];
	const curr = new Date(start);

	while (curr <= end) {
		const dd = String(curr.getDate()).padStart(2, '0');
		const mm = String(curr.getMonth() + 1).padStart(2, '0');
		const yyyy = curr.getFullYear();
		const key = `${dd}.${mm}.${yyyy}`;

		// weekday: 0 = Mo ... 6 = Su
		const weekday = WEEKDAYS[(curr.getDay() + 6) % 7];

		if (dayMap.has(key)) {
			result.push(dayMap.get(key)!);
		} else {
			const isBefore = curr < startDate;
			const label = isBefore ? prevIntervalLabel : nextIntervalLabel;

			result.push({
				day_repr: '..',
				day: label,
				weekday,
			});
		}

		curr.setDate(curr.getDate() + 1);
	}

	return result;
}

export function makeCalendar(year: number, month: number): string {
	const windows = getBudgetWindows(year, month);
	const lines: string[] = [];

	for (let i = 0; i < windows.length; i++) {
		const thisWindow = windows[i];
		const prevLabel = windows[(i - 1 + windows.length) % windows.length].label;
		const nextLabel = windows[(i + 1) % windows.length].label;

		const calendarObjects = makeCalendarObjects(
			prevLabel,
			nextLabel,
			thisWindow.days
		);

		lines.push(`[[${thisWindow.label}]]`);
		lines.push(WEEKDAYS.join(' '));

		for (let j = 0; j < calendarObjects.length; j += 7) {
			const week = calendarObjects.slice(j, j + 7);
			const line = week
				.map((cell) => `[[${cell.day}|${cell.day_repr}]]`)
				.join(' ');
			lines.push(` ${line} `);
		}

		lines.push(''); // blank line between windows
	}

	return lines.join('\n');
}
