import { DateParts, WEEKDAYS, Week } from '../../../types/dates';
import { getDatePartsOrEpochFromDate } from './dates/general';

// helper: map JS getDay() (0=Su..6=Sa) to 'Mo'..'Su'
const jsDayToWeekday = (n: number): (typeof WEEKDAYS)[number] =>
	WEEKDAYS[(n + 6) % 7]; // shift so 0 (Su) becomes 6 (Su)

export function startOfWeek(date: Date): Date;
export function startOfWeek(dateParts: DateParts): DateParts;

export function startOfWeek<D extends Date | DateParts>(dateOrParts: D): D {
	const date =
		dateOrParts instanceof Date
			? dateOrParts
			: new Date(
					Date.UTC(
						Number(dateOrParts.yyyy),
						Number(dateOrParts.mm) - 1,
						Number(dateOrParts.dd)
					)
				);

	const d = new Date(date);
	const day = d.getUTCDay(); // use UTC to be safe
	const diff = (day + 6) % 7; // Monday as 0
	d.setUTCDate(d.getUTCDate() - diff);
	d.setUTCHours(0, 0, 0, 0);

	return dateOrParts instanceof Date
		? (d as D)
		: (getDatePartsOrEpochFromDate(d) as D);
}

export function getWeeks(days: Date[]): Week[];
export function getWeeks(parts: DateParts[]): Week[];

// shared impl
export function getWeeks(input: (Date | DateParts)[]): Week[] {
	const buckets = new Map<string, Week>();

	for (const entry of input) {
		const date =
			entry instanceof Date
				? entry
				: new Date(Date.UTC(+entry.yyyy, +entry.mm - 1, +entry.dd));

		if (isNaN(date.getTime())) continue;

		const weekStart = startOfWeek(date);
		const key = weekStart.toISOString();

		if (!buckets.has(key)) {
			const blankWeek = Object.fromEntries(
				WEEKDAYS.map((d) => [d, null])
			) as Week;
			buckets.set(key, blankWeek);
		}

		const weekday = jsDayToWeekday(date.getUTCDay());
		buckets.get(key)![weekday] = date;
	}

	return [...buckets.entries()]
		.sort(([a], [b]) => a.localeCompare(b))
		.map(([, week]) => week);
}
