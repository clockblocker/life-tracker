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
