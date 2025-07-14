import * as z from 'zod/v4';

export const CutoffDaySchema = z.number().min(1).max(26);
export const YearSchema = z.number().min(2000).max(3000);
export const MonthSchema = z.number().min(0).max(11);
export const DayPeriodSchema = z.object({
	startIncl: CutoffDaySchema,
	endExl: CutoffDaySchema,
});

// if startIncl >= endExl, endExl is in the next month
export const DatePeriodSchema = z.object({
	startIncl: z.date(),
	endExl: z.date(),
});

export type CutoffDay = z.infer<typeof CutoffDaySchema>;
export type Year = z.infer<typeof CutoffDaySchema>;
export type Month = z.infer<typeof MonthSchema>;

export type DayPeriod = z.infer<typeof DayPeriodSchema>;
export type DatePeriod = z.infer<typeof DatePeriodSchema>;

export const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'] as const;
export const WeekdaySchema = z.enum(WEEKDAYS);
export type Weekday = z.infer<typeof WeekdaySchema>;
export const Weekday = WeekdaySchema.enum;

export const WeekSchema = z.object({
	[Weekday.Mo]: z.date().nullable(),
	[Weekday.Tu]: z.date().nullable(),
	[Weekday.We]: z.date().nullable(),
	[Weekday.Th]: z.date().nullable(),
	[Weekday.Fr]: z.date().nullable(),
	[Weekday.Sa]: z.date().nullable(),
	[Weekday.Su]: z.date().nullable(),
});

export type Week = z.infer<typeof WeekSchema>;
