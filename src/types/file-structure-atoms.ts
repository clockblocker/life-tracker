import * as z from 'zod/v4';
import { USCORE2, USCORE, DASH } from '../constants/format';
import { Keyword } from '../constants/keywords';

export const YYYYReprSchema = z.string().regex(/^\d{4}$/);
export const MMReprSchema = z.string().regex(/^\d{2}$/);
export const DDReprSchema = z.string().regex(/^\d{2}$/);

export const RangePartsDelimiterSchema = z.literal(`${USCORE2}to${USCORE2}`);

export const FullDateReprSchema = z.templateLiteral([
	YYYYReprSchema,
	USCORE,
	MMReprSchema,
	USCORE,
	DDReprSchema,
]);

export const PartialDateReprSchema = z.templateLiteral([
	YYYYReprSchema,
	USCORE,
	MMReprSchema,
]);

export const FullDatePeriodReprSchema = z.templateLiteral([
	FullDateReprSchema,
	RangePartsDelimiterSchema,
	FullDateReprSchema,
]);

export const ListSchema = z.literal(Keyword.List);
export const RootSchema = z.literal(Keyword.Root);
export const LifeTrackerSchema = z.literal(Keyword.LifeTracker);

export const SectionSchema = z.enum([
	Keyword.Sport,
	Keyword.Food,
	Keyword.Money,
	Keyword.Daily,
	Keyword.Library,
]);

export const Section = SectionSchema.enum;
export const SECTIONS: Section[] = SectionSchema.options;

export const AspectSchema = SectionSchema.exclude([
	Section.Daily,
	Section.Library,
]);

export const Aspect = AspectSchema.enum;
export const ASPECTS = AspectSchema.options;

export const NotesSchema = z.literal(Keyword.Notes);
export const DailyMenuItemSchema = AspectSchema.or(NotesSchema);

export const DailyLeaveSchema = z.templateLiteral([
	FullDateReprSchema,
	DASH,
	DailyMenuItemSchema.or(RootSchema),
]);

export const PlanStatsSchema = z.enum([Keyword.Plan, Keyword.Stats]);
export const PlanStats = PlanStatsSchema.enum;
export const PlanStatsListSchema = z.templateLiteral([
	PlanStatsSchema,
	ListSchema,
]);

export type YYYYRepr = z.infer<typeof YYYYReprSchema>;
export type MMRepr = z.infer<typeof MMReprSchema>;
export type DDRepr = z.infer<typeof DDReprSchema>;
export type RangePartsDelimiter = z.infer<typeof RangePartsDelimiterSchema>;
export type FullDateRepr = z.infer<typeof FullDateReprSchema>;
export type PartialDateRepr = z.infer<typeof PartialDateReprSchema>;
export type FullDatePeriodRepr = z.infer<typeof FullDatePeriodReprSchema>;
export type List = z.infer<typeof ListSchema>;
export type Root = z.infer<typeof RootSchema>;
export type LifeTracker = z.infer<typeof LifeTrackerSchema>;
export type Section = z.infer<typeof SectionSchema>;
export type Aspect = z.infer<typeof AspectSchema>;
export type DailyLeave = z.infer<typeof DailyLeaveSchema>;
export type PlanStats = z.infer<typeof PlanStatsSchema>;
export type PlanStatsList = z.infer<typeof PlanStatsListSchema>;
export type DailyMenuItem = z.infer<typeof DailyMenuItemSchema>;

export const ROOT = RootSchema.value;
export const BASE = LifeTrackerSchema.value;
export const SEP = RangePartsDelimiterSchema.value;
export const NOTES = NotesSchema.value;

export const LIST = ListSchema.value;
