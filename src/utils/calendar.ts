import { Week, Weekday, WEEKDAYS } from '../types/dates';
import { Aspect } from 'types/file-structure';

// helper: map JS getDay() (0=Su..6=Sa) to 'Mo'..'Su'
const jsDayToWeekday = (n: number): (typeof WEEKDAYS)[number] =>
	WEEKDAYS[(n + 6) % 7]; // shift so 0 (Su) becomes 6 (Su)

// get start-of-week (Monday) for given date
const startOfWeek = (date: Date): Date => {
	const d = new Date(date);
	const day = d.getDay();
	const diff = (day + 6) % 7; // distance from Monday
	d.setDate(d.getDate() - diff);
	d.setHours(0, 0, 0, 0);
	return d;
};

export function getWeeks(days: Date[]): Week[] {
	const buckets = new Map<string, Week>();

	for (const date of days) {
		if (isNaN(date.getTime())) continue; // skip invalid

		const weekStart = startOfWeek(date);
		const key = weekStart.toISOString();

		if (!buckets.has(key)) {
			// initialize all 7 weekdays with null
			const blankWeek = Object.fromEntries(
				WEEKDAYS.map((day) => [day, null])
			) as Week;
			buckets.set(key, blankWeek);
		}

		const weekday = jsDayToWeekday(date.getDay());
		buckets.get(key)![weekday] = date;
	}

	return [...buckets.entries()]
		.sort(([a], [b]) => a.localeCompare(b))
		.map(([, week]) => week);
}

// export function calendarCell(days: Date[]): Week[] {}
