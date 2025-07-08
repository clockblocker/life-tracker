import * as z from 'zod/v4';

export const YYYYSchema = z.string().regex(/^\d{4}$/);
export const MMSchema = z.string().regex(/^\d{2}$/);
export const DDSchema = z.string().regex(/^\d{2}$/);

export const DateSectionsDelimiterSchema = z.literal('_');
export const RangePartsDelimiterSchema = z.literal('__to__');

export const FullDateSchema = z.templateLiteral([
	YYYYSchema,
	DateSectionsDelimiterSchema,
	MMSchema,
	DateSectionsDelimiterSchema,
	DDSchema,
]);

export const PartialDateSchema = z.templateLiteral([
	YYYYSchema,
	DateSectionsDelimiterSchema,
	MMSchema,
]);

export const FullDateRangeSchema = z.templateLiteral([
	FullDateSchema,
	RangePartsDelimiterSchema,
	FullDateSchema,
]);

export const PosixDelimiterSchema = z.literal('/');
export const FilePartsDelimiterSchema = z.literal('-');
export const ListSchema = z.literal('List');
export const RootSchema = z.literal('Root');
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
	FullDateSchema,
	FilePartsDelimiterSchema,
	AspectSchema.or(RootSchema),
]);

export const DailySectionTree = {
	[0]: {
		currentDepth: 0,
		rootFileNameSchema: z.templateLiteral([
			Section.Daily,
			FilePartsDelimiterSchema,
			RootSchema,
		]),
		childDirSchema: YYYYSchema,
	},
	[1]: {
		currentDepth: 1,
		rootFileNameSchema: z.templateLiteral([
			Section.Daily,
			FilePartsDelimiterSchema,
			YYYYSchema,
			FilePartsDelimiterSchema,
			RootSchema,
		]),
		childDirSchema: MMSchema,
	},
	[2]: {
		currentDepth: 2,
		rootFileNameSchema: z.templateLiteral([
			Section.Daily,
			FilePartsDelimiterSchema,
			PartialDateSchema,
			FilePartsDelimiterSchema,
			RootSchema,
		]),
		childDirSchema: DDSchema,
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
		childDirSchema: PlanStatsListSchema,
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
		childDirSchema: YYYYSchema,
	},

	[2]: {
		currentDepth: 2,
		// PlanList-yyyy-Root or StatsList-yyyy-Root
		rootFileNameSchema: z.templateLiteral([
			AspectSchema,
			FilePartsDelimiterSchema,
			PlanStatsListSchema,
			FilePartsDelimiterSchema,
			YYYYSchema,
			FilePartsDelimiterSchema,
			RootSchema,
		]),
		// final md file in this folder
		childFileNameSchema: z.templateLiteral([
			AspectSchema,
			FilePartsDelimiterSchema,
			PlanStatsSchema,
			FilePartsDelimiterSchema,
			FullDateRangeSchema,
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
		childDirSchema: AspectSchema,
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
		childDirSchema: LibrarySubCategorySchema,
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

export type YYYY = z.infer<typeof YYYYSchema>;
export type MM = z.infer<typeof MMSchema>;
export type DD = z.infer<typeof DDSchema>;
export type DateSectionsDelimiter = z.infer<typeof DateSectionsDelimiterSchema>;
export type RangePartsDelimiter = z.infer<typeof RangePartsDelimiterSchema>;
export type FullDate = z.infer<typeof FullDateSchema>;
export type PartialDate = z.infer<typeof PartialDateSchema>;
export type FullDateRange = z.infer<typeof FullDateRangeSchema>;
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
