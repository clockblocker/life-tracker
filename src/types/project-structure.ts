import z from 'zod/v4';
import { DASH } from '../constants/format';
import {
	Aspect,
	PlanStatsSchema,
	FullDatePeriodReprSchema,
	Section,
	YYYYReprSchema,
	MMReprSchema,
	DDReprSchema,
	DailyLeaveSchema,
	PlanStatsListSchema,
	AspectSchema,
	ROOT,
} from './file-structure-atoms';

function makeLeaveSchemaForAspect<const A extends Aspect>(aspect: A) {
	return z.templateLiteral([
		z.literal(aspect),
		DASH,
		PlanStatsSchema,
		DASH,
		FullDatePeriodReprSchema,
	]);
}

export const LeaveSchemaFromAspect = {
	[Aspect.Sport]: makeLeaveSchemaForAspect(Aspect.Sport),
	[Aspect.Food]: makeLeaveSchemaForAspect(Aspect.Food),
	[Aspect.Money]: makeLeaveSchemaForAspect(Aspect.Money),
} as const;

export type ZodStringLike =
	| z.ZodString
	| z.ZodTemplateLiteral
	| z.ZodLiteral<string>
	| z.ZodEnum<any>;

export type ZodPathPart = ZodStringLike;
export type ZodPathParts = ZodStringLike[];

export type PathParts = string[];

export type StructureFromSection = Record<
	Section,
	{
		pathParts: ZodPathParts;
		leaf: ZodStringLike;
	}
>;

export const structureFromSection: StructureFromSection = {
	[Section.Daily]: {
		pathParts: [YYYYReprSchema, MMReprSchema, DDReprSchema],
		leaf: DailyLeaveSchema,
	},
	[Section.Sport]: {
		pathParts: [PlanStatsListSchema, YYYYReprSchema],
		leaf: LeaveSchemaFromAspect[Section.Sport],
	},
	[Section.Food]: {
		pathParts: [PlanStatsListSchema, YYYYReprSchema],
		leaf: LeaveSchemaFromAspect[Section.Food],
	},
	[Section.Money]: {
		pathParts: [PlanStatsListSchema, YYYYReprSchema],
		leaf: LeaveSchemaFromAspect[Section.Money],
	},
	[Section.Library]: {
		pathParts: [AspectSchema],
		leaf: z.string(),
	},
};
