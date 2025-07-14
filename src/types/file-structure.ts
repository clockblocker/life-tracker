import * as z from 'zod/v4';

export const YYYYReprSchema = z.string().regex(/^\d{4}$/);
export const MMReprSchema = z.string().regex(/^\d{2}$/);
export const DDReprSchema = z.string().regex(/^\d{2}$/);

export const DateSectionsDelimiterSchema = z.literal('_');
export const RangePartsDelimiterSchema = z.literal('__to__');

export const FullDateReprSchema = z.templateLiteral([
	YYYYReprSchema,
	DateSectionsDelimiterSchema,
	MMReprSchema,
	DateSectionsDelimiterSchema,
	DDReprSchema,
]);

export const PartialDateReprSchema = z.templateLiteral([
	YYYYReprSchema,
	DateSectionsDelimiterSchema,
	MMReprSchema,
]);

export const FullDatePeriodReprSchema = z.templateLiteral([
	FullDateReprSchema,
	RangePartsDelimiterSchema,
	FullDateReprSchema,
]);

export const PosixDelimiterSchema = z.literal('/');
export const FilePartsDelimiterSchema = z.literal('-');
export const ListSchema = z.literal('List');
export const RootSchema = z.literal('Root');
export const LifeTracker = z.literal('LifeTracker');
export const NotesSchema = z.literal('Notes');
export const MDSchema = z.literal('.md');
export const LifeTrackerSchema = z.literal('LifeTracker');

export const SectionSchema = z.enum([
	'Sport',
	'Food',
	'Money',
	'Daily',
	'Library',
]);
export const Section = SectionSchema.enum;
export const SECTIONS: Section[] = SectionSchema.options;

export const AspectSchema = SectionSchema.exclude(['Daily', 'Library']);
export const Aspect = AspectSchema.enum;
export const ASPECTS = AspectSchema.options;

export const FoodItemSchema = z.enum(['Ingredient', 'Meal']);
export const LibrarySubCategorySchema = z.templateLiteral([
	FoodItemSchema,
	ListSchema,
]);

export const DailyLeaveSchema = z.templateLiteral([
	FullDateReprSchema,
	FilePartsDelimiterSchema,
	AspectSchema.or(RootSchema).or(NotesSchema),
]);

export const PlanStatsSchema = z.enum(['Plan', 'Stats']);
export const PlanStats = PlanStatsSchema.enum;
export const PlanStatsListSchema = z.templateLiteral([
	PlanStatsSchema,
	ListSchema,
]);

export type YYYYRepr = z.infer<typeof YYYYReprSchema>;
export type MMRepr = z.infer<typeof MMReprSchema>;
export type DDRepr = z.infer<typeof DDReprSchema>;
export type DateSectionsDelimiter = z.infer<typeof DateSectionsDelimiterSchema>;
export type RangePartsDelimiter = z.infer<typeof RangePartsDelimiterSchema>;
export type FullDateRepr = z.infer<typeof FullDateReprSchema>;
export type PartialDateRepr = z.infer<typeof PartialDateReprSchema>;
export type FullDatePeriodRepr = z.infer<typeof FullDatePeriodReprSchema>;
export type PosixDelimiter = z.infer<typeof PosixDelimiterSchema>;
export type FilePartsDelimiter = z.infer<typeof FilePartsDelimiterSchema>;
export type List = z.infer<typeof ListSchema>;
export type Root = z.infer<typeof RootSchema>;
export type MD = z.infer<typeof MDSchema>;
export type LifeTracker = z.infer<typeof LifeTrackerSchema>;
export type Section = z.infer<typeof SectionSchema>;
export type Aspect = z.infer<typeof AspectSchema>;
export type DailyLeave = z.infer<typeof DailyLeaveSchema>;
export type PlanStats = z.infer<typeof PlanStatsSchema>;
export type PlanStatsList = z.infer<typeof PlanStatsListSchema>;
export type FoodItem = z.infer<typeof FoodItemSchema>;
export type LibrarySubCategory = z.infer<typeof LibrarySubCategorySchema>;

export const FILE_PARTS_DELIMETER = FilePartsDelimiterSchema.value;
export const DS = DateSectionsDelimiterSchema.value;
export const EXT = MDSchema.value;
export const ROOT = RootSchema.value;
export const BASE = LifeTrackerSchema.value;
export const SEP = RangePartsDelimiterSchema.value;

export const LIST = ListSchema.value;

function makeLeaveSchemaForAspect<const A extends Aspect>(aspect: A) {
	return z.templateLiteral([
		z.literal(aspect),
		FILE_PARTS_DELIMETER,
		PlanStatsSchema,
		FILE_PARTS_DELIMETER,
		FullDatePeriodReprSchema,
	]);
}

export const LeaveSchemaFromAspect = {
	[Aspect.Sport]: makeLeaveSchemaForAspect(Aspect.Sport),
	[Aspect.Food]: makeLeaveSchemaForAspect(Aspect.Food),
	[Aspect.Money]: makeLeaveSchemaForAspect(Aspect.Money),
} as const;

export type StringLikeSchema =
	| z.ZodString
	| z.ZodTemplateLiteral
	| z.ZodEnum
	| z.ZodLiteral<string>;

export type StructureFromSection = Record<
	Section,
	{
		pathParts: StringLikeSchema[];
		leaf: StringLikeSchema;
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
