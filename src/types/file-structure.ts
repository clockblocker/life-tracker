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
export const AspectSchema = SectionSchema.exclude(['Daily', 'Library']);
export const Aspect = AspectSchema.enum;

export const DailyLeaveSchema = z.templateLiteral([
	FullDateReprSchema,
	FilePartsDelimiterSchema,
	AspectSchema.or(RootSchema).or(NotesSchema),
]);

export const DailySectionTree = {
	[0]: {
		currentDepth: 0,
		rootFileNameSchema: z.templateLiteral([
			Section.Daily,
			FilePartsDelimiterSchema,
			RootSchema,
		]),
		childDReprirSchema: YYYYReprSchema,
	},
	[1]: {
		currentDepth: 1,
		rootFileNameSchema: z.templateLiteral([
			Section.Daily,
			FilePartsDelimiterSchema,
			YYYYReprSchema,
			FilePartsDelimiterSchema,
			RootSchema,
		]),
		childDReprirSchema: MMReprSchema,
	},
	[2]: {
		currentDepth: 2,
		rootFileNameSchema: z.templateLiteral([
			Section.Daily,
			FilePartsDelimiterSchema,
			PartialDateReprSchema,
			FilePartsDelimiterSchema,
			RootSchema,
		]),
		childDReprirSchema: DDReprSchema,
	},
	[3]: {
		currentDepth: 3,
		rootFileNameSchema: DailyLeaveSchema,
	},
};

export const PlanStatsSchema = z.enum(['Plan', 'Stats']);
export const PlanStatsListSchema = z.templateLiteral([
	PlanStatsSchema,
	ListSchema,
]);

export const AspectSectionTree = {
	[0]: {
		currentDepth: 0,
		rootFileNameSchema: z.templateLiteral([
			AspectSchema,
			FilePartsDelimiterSchema,
			RootSchema,
		]),
		childDReprirSchema: PlanStatsListSchema,
	},

	[1]: {
		currentDepth: 1,
		// PlanList or StatsList root
		rootFileNameSchema: z.templateLiteral([
			AspectSchema,
			FilePartsDelimiterSchema,
			PlanStatsListSchema,
			FilePartsDelimiterSchema,
			RootSchema,
		]),
		childDReprirSchema: YYYYReprSchema,
	},

	[2]: {
		currentDepth: 2,
		// PlanList-yyyyRepr-Root or StatsList-yyyyRepr-Root
		rootFileNameSchema: z.templateLiteral([
			AspectSchema,
			FilePartsDelimiterSchema,
			PlanStatsListSchema,
			FilePartsDelimiterSchema,
			YYYYReprSchema,
			FilePartsDelimiterSchema,
			RootSchema,
		]),
		// final md file in this folder
		childFileNameSchema: z.templateLiteral([
			AspectSchema,
			FilePartsDelimiterSchema,
			PlanStatsSchema,
			FilePartsDelimiterSchema,
			FullDatePeriodReprSchema,
		]),
	},
};

export const FoodItemSchema = z.enum(['Ingredient', 'Meal']);
export const LibrarySubCategorySchema = z.templateLiteral([
	FoodItemSchema,
	ListSchema,
]);

export const LibrarySectionTree = {
	[0]: {
		currentDepth: 0,
		rootFileNameSchema: z.templateLiteral([
			Section.Library,
			FilePartsDelimiterSchema,
			RootSchema,
		]),
		childDReprirSchema: AspectSchema,
	},

	[1]: {
		currentDepth: 1,
		rootFileNameSchema: z.templateLiteral([
			Section.Library,
			FilePartsDelimiterSchema,
			AspectSchema,
			FilePartsDelimiterSchema,
			RootSchema,
		]),
		childDReprirSchema: LibrarySubCategorySchema,
		childFileNameSchema: z.string().regex(/^[^.\/\\]+\.md$/),
	},

	[2]: {
		currentDepth: 2,
		// only for Food/IngredientList or Food/MealList
		rootFileNameSchema: z.templateLiteral([
			Section.Library,
			FilePartsDelimiterSchema,
			Aspect.Food,
			FilePartsDelimiterSchema,
			LibrarySubCategorySchema,
			FilePartsDelimiterSchema,
			RootSchema,
		]),
		childFileNameSchema: z.string().regex(/^[^.\/\\]+\.md$/),
	},
};

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
