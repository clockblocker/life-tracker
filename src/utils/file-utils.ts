import { CutoffDay, DatePeriod, Year } from 'types/dates';
import {
	Aspect,
	FilePartsDelimiterSchema,
	FoodItemSchema,
	FullDatePeriodRepr,
	FullDateRepr,
	LifeTrackerSchema,
	ListSchema,
	MDSchema,
	NotesSchema,
	RootSchema,
} from '../types/file-structure';

/**
 * Converts a UTC Date into a `YYYY_MM_DD` representation.
 *
 * Uses zero-padded components:
 * - YYYY: 4-digit year
 * - MM: 2-digit month (01 = January, 12 = December)
 * - DD: 2-digit day
 *
 * @param date - The Date to format
 * @returns A string in the format `YYYY_MM_DD` (e.g., "2024_07_10")
 */
export const reprFromDate = (date: Date): FullDateRepr => {
	const yyyy = date.getUTCFullYear().toString().padStart(4, '0');
	const mm = (date.getUTCMonth() + 1).toString().padStart(2, '0');
	const dd = date.getUTCDate().toString().padStart(2, '0');
	return `${yyyy}_${mm}_${dd}`;
};

/**
 * Converts a DatePeriod into a string representation of the form:
 * `YYYY_MM_DD__to__YYYY_MM_DD`
 *
 * Delegates formatting to `reprFromDate`.
 *
 * @param datePeriod - The DatePeriod to convert
 * @returns A FullDatePeriodRepr string
 */
export const reprFromDatePeriod = (
	datePeriod: DatePeriod
): FullDatePeriodRepr => {
	return `${reprFromDate(datePeriod.startIncl)}__to__${reprFromDate(datePeriod.endExl)}`;
};

/**
 * Returns the list of expected leaf file paths for a given day in the Daily section.
 *
 * The returned paths follow the vault convention:
 * `LifeTracker/Daily/yyyy/mm/dd/yyyy_mm_dd-{Suffix}.md`
 *
 * - Always includes:
 *   - `...-Root.md`
 *   - `...-Notes.md`
 * - Optionally includes aspect-specific files:
 *   - `...-Fitness.md`, `...-Food.md`, `...-Money.md`, depending on what is present in `aspects`.
 *
 * Uses zero-padded components for date formatting.
 *
 * @param date - The date to generate Daily paths for (interpreted as UTC).
 * @param aspects - A list of enabled `Aspect`s (`Fitness`, `Food`, `Money`) to include as extra leaf files.
 * @returns An array of fully qualified relative file paths (POSIX-style) for that day.
 */
export const leafDailyFilePathsForDate = (
	date: Date,
	aspects: Aspect[]
): string[] => {
	const yyyy = date.getUTCFullYear().toString().padStart(4, '0');
	const mm = (date.getUTCMonth() + 1).toString().padStart(2, '0');
	const dd = date.getUTCDate().toString().padStart(2, '0');

	const basePath = `${LifeTrackerSchema.value}/Daily/${yyyy}/${mm}/${dd}`;
	const dateRepr: FullDateRepr = reprFromDate(date);

	const suffixes: string[] = [RootSchema.value, NotesSchema.value, ...aspects];

	return suffixes.map(
		(suffix) =>
			`${basePath}/${dateRepr}${FilePartsDelimiterSchema.value}${suffix}${MDSchema.value}`
	);
};

/**
 * Returns all sub-root file paths for a given year in the Daily section.
 *
 * These are the directory-level root files that organize the Daily structure:
 *
 * - Year-level root:
 *   - `LifeTracker/Daily/yyyy/Daily-yyyy-Root.md`
 *
 * - Month-level roots (for all 12 months):
 *   - `LifeTracker/Daily/yyyy/mm/Daily-yyyy_mm-Root.md`
 *
 * All components are zero-padded and returned as POSIX-style strings.
 *
 * @param year - The target year (4-digit, e.g. 2024)
 * @returns Array of file paths including the year root and all month sub-roots
 */
export const dailySubRootsFilePathsForYear = (year: number): string[] => {
	const yyyy = year.toString().padStart(4, '0');

	const paths: string[] = [`LifeTracker/Daily/${yyyy}/Daily-${yyyy}-Root.md`];

	for (let month = 1; month <= 12; month++) {
		const mm = month.toString().padStart(2, '0');
		paths.push(`LifeTracker/Daily/${yyyy}/${mm}/Daily-${yyyy}_${mm}-Root.md`);
	}

	return paths;
};

/**
 * Generates all -Root.md paths that define the project structure.
 */
export const makeProjectStructureRootsFileNames = (
	aspects: Aspect[]
): string[] => {
	const D = FilePartsDelimiterSchema.value;
	const EXT = MDSchema.value;
	const BASE = LifeTrackerSchema.value;
	const ROOT = RootSchema.value;
	const LIST = ListSchema.value;

	const paths: string[] = [];

	// Daily root
	paths.push(`${BASE}/Daily/Daily${D}${ROOT}${EXT}`);

	// Library root
	paths.push(`${BASE}/Library/Library${D}${ROOT}${EXT}`);

	for (const aspect of aspects) {
		// Top-level aspect root
		paths.push(`${BASE}/${aspect}/${aspect}${D}${ROOT}${EXT}`);

		// PlanList / StatsList roots
		for (const ps of ['Plan', 'Stats'] as const) {
			paths.push(
				`${BASE}/${aspect}/${ps}${LIST}/${aspect}${D}${ps}${LIST}${D}${ROOT}${EXT}`
			);
		}

		// Library/<Aspect>/Library-<Aspect>-Root.md
		paths.push(
			`${BASE}/Library/${aspect}/Library${D}${aspect}${D}${ROOT}${EXT}`
		);

		// Food special case: IngredientList + MealList roots
		if (aspect === Aspect.Food) {
			for (const item of FoodItemSchema.options) {
				paths.push(
					`${BASE}/Library/Food/${item}${LIST}/Library${D}Food${D}${item}${LIST}${D}${ROOT}${EXT}`
				);
			}
		}
	}

	return paths;
};

const makeStructure = (year: Year, cuts: CutoffDay[]) => {
	const periods = [];
};

// LifeTracker/
//   Daily/
//     Daily-Root.md
//     yyyy/
//       Daily-yyyy-Root.md
//       mm/
//         Daily-yyyy_mm-Root.md
//         dd/
//           yyyy_mm_dd-Root.md
//           yyyy_mm_dd-Sport.md
//           yyyy_mm_dd-Food.md
//           yyyy_mm_dd-Money.md

//   Money/
//     Money-Root.md
//     PlanList/
//       Money-PlanList-Root.md
//       yyyy/
//         Money-PlanList-yyyy-Root.md
//         Money-Plan-yyyy_mm_dd__to__yyyy_mm_dd.md
//     StatsList/
//       Money-StatsList-Root.md
//       yyyy/
//         Money-StatsList-yyyy-Root.md
//         Money-Stats-yyyy_mm_dd__to__yyyy_mm_dd.md

//   Sport/
//     Sport-Root.md
//     PlanList/
//       Sport-PlanList-Root.md
//       yyyy/
//         Sport-PlanList-yyyy-Root.md
//         Sport-Plan-yyyy_mm_dd__to__yyyy_mm_dd.md
//     StatsList/
//       Sport-StatsList-Root.md
//       yyyy/
//         Sport-StatsList-yyyy-Root.md
//         Sport-Stats-yyyy_mm_dd__to__yyyy_mm_dd.md

//   Food/
//     Food-Root.md
//     PlanList/
//       Food-PlanList-Root.md
//       yyyy/
//         Food-PlanList-yyyy-Root.md
//         Food-Plan-yyyy_mm_dd__to__yyyy_mm_dd.md
//     StatsList/
//       Food-StatsList-Root.md
//       yyyy/
//         Food-StatsList-yyyy-Root.md
//         Food-Stats-yyyy_mm_dd__to__yyyy_mm_dd.md

//   Library/
//     Library-Root.md
//     Sport/
//       Library-Sport-Root.md
//       [NAME].md
//     Food/
//       Library-Food-Root.md
//       IngredientList/
//         Library-Food-IngredientList-Root.md
//         [NAME].md
//       MealList/
//         Library-Food-MealList-Root.md
//         [NAME].md
//     Money/
//       Library-Money-Root.md
//       [NAME].md
