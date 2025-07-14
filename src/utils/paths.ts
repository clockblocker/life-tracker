import { CutoffDay, DatePeriod, Year } from 'types/dates';
import {
	Aspect,
	BASE,
	FILE_PARTS_DELIMETER,
	DDRepr,
	LIST,
	DS,
	EXT,
	FoodItemSchema,
	FullDatePeriodRepr,
	FullDateRepr,
	PlanStats,
	MMRepr,
	NotesSchema,
	ROOT,
	Section,
	YYYYRepr,
	PlanStatsSchema,
} from '../types/file-structure';
import { makeDatePeriodsForWholeYear, makeDayPeriods } from './dates';

export const formatYYYY = (year: Year): string => {
	return year.toString().padStart(4, '0');
};

/**
 * Extracts the UTC year, month, and day from a `Date` object
 * and returns them as zero-padded string parts conforming to the
 * expected `YYYYRepr`, `MMRepr`, and `DDRepr` formats.
 *
 * - Year is padded to 4 digits (e.g. "0007", "2025")
 * - Month and day are padded to 2 digits (e.g. "03", "09")
 *
 * @param date - The Date object to extract from (interpreted in UTC)
 * @returns An object with `yyyy`, `mm`, and `dd` string parts
 */
export const getUtcDateParts = (
	date: Date
): { yyyy: YYYYRepr; mm: MMRepr; dd: DDRepr } => {
	const yyyy = date.getUTCFullYear().toString().padStart(4, '0') as YYYYRepr;
	const mm = (date.getUTCMonth() + 1).toString().padStart(2, '0') as MMRepr;
	const dd = date.getUTCDate().toString().padStart(2, '0') as DDRepr;
	return { yyyy, mm, dd };
};

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
	const { yyyy, mm, dd } = getUtcDateParts(date);
	return `${yyyy}${DS}${mm}${DS}${dd}`;
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
export const getLeafDailyFilePathsForDate = (
	date: Date,
	aspects: Aspect[]
): string[] => {
	const { yyyy, mm, dd } = getUtcDateParts(date);
	const basePath = `${BASE}/${Section.Daily}/${yyyy}/${mm}/${dd}`;
	const dateRepr: FullDateRepr = reprFromDate(date);

	const suffixes: string[] = [ROOT, NotesSchema.value, ...aspects];

	return suffixes.map(
		(suffix) => `${basePath}/${dateRepr}${FILE_PARTS_DELIMETER}${suffix}${EXT}`
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
export const getDailySubRootsFilePathsForYear = (year: Year): string[] => {
	const yyyy = formatYYYY(year);
	const daily = Section.Daily;

	const paths: string[] = [
		`${BASE}/${daily}/${yyyy}/${daily}${FILE_PARTS_DELIMETER}${yyyy}${FILE_PARTS_DELIMETER}${ROOT}${EXT}`,
	];

	for (let m = 1; m <= 12; m++) {
		const mm = m.toString().padStart(2, '0');
		paths.push(
			`${BASE}/${daily}/${yyyy}/${mm}/${daily}${FILE_PARTS_DELIMETER}${yyyy}${DS}${mm}${FILE_PARTS_DELIMETER}${ROOT}${EXT}`
		);
	}

	return paths;
};

/**
 * Generates all -Root.md paths that define the project structure.
 */
export const getProjectStructureRootsFileNames = (
	aspects: Aspect[]
): string[] => {
	const paths: string[] = [];

	// Daily root
	paths.push(
		`${BASE}/${Section.Daily}/${Section.Daily}${FILE_PARTS_DELIMETER}${ROOT}${EXT}`
	);

	// Library root
	paths.push(
		`${BASE}/${Section.Library}/${Section.Library}${FILE_PARTS_DELIMETER}${ROOT}${EXT}`
	);

	for (const aspect of aspects) {
		// Top-level aspect root
		paths.push(
			`${BASE}/${aspect}/${aspect}${FILE_PARTS_DELIMETER}${ROOT}${EXT}`
		);

		// PlanList / StatsList roots
		for (const ps of [PlanStats.Plan, PlanStats.Stats]) {
			paths.push(
				`${BASE}/${aspect}/${ps}${LIST}/${aspect}${FILE_PARTS_DELIMETER}${ps}${LIST}${FILE_PARTS_DELIMETER}${ROOT}${EXT}`
			);
		}

		// Library/<Aspect>/Library-<Aspect>-Root.md
		paths.push(
			`${BASE}/${Section.Library}/${aspect}/${Section.Library}${FILE_PARTS_DELIMETER}${aspect}${FILE_PARTS_DELIMETER}${ROOT}${EXT}`
		);

		// Food subcategory roots
		if (aspect === Aspect.Food) {
			for (const item of FoodItemSchema.options) {
				paths.push(
					`${BASE}/${Section.Library}/${Aspect.Food}/${item}${LIST}/${Section.Library}${FILE_PARTS_DELIMETER}${Aspect.Food}${FILE_PARTS_DELIMETER}${item}${LIST}${FILE_PARTS_DELIMETER}${ROOT}${EXT}`
				);
			}
		}
	}

	return paths;
};

/**
 * Returns all sub-root file paths for the given year and aspects in the PlanList and StatsList trees.
 *
 * For each provided `Aspect` (e.g., 'Sport', 'Food', 'Money'), generates:
 *
 * - The PlanList and StatsList root files:
 *   - `LifeTracker/<Aspect>/PlanList/<Aspect>-PlanList-Root.md`
 *   - `LifeTracker/<Aspect>/StatsList/<Aspect>-StatsList-Root.md`
 *
 * - The year-specific sub-root files:
 *   - `LifeTracker/<Aspect>/PlanList/yyyy/<Aspect>-PlanList-yyyy-Root.md`
 *   - `LifeTracker/<Aspect>/StatsList/yyyy/<Aspect>-StatsList-yyyy-Root.md`
 *
 * File paths are fully qualified and use zero-padded year strings (`0042`, `2024`, etc).
 *
 * @param year - The calendar year (as a number) to generate root files for
 * @param aspects - List of enabled `Aspect`s to include (e.g. ['Sport', 'Food'])
 * @returns An array of fully qualified root `.md` file paths for PlanList and StatsList structures
 */
export const getAspectsSubRootsFilePathsForYear = (
	year: Year,
	aspects: Aspect[]
): string[] => {
	const yyyy = formatYYYY(year);
	const paths: string[] = [];

	for (const aspect of aspects) {
		for (const ps of PlanStatsSchema.options) {
			// PlanList or StatsList root
			paths.push(
				`${BASE}/${aspect}/${ps}${LIST}/${aspect}${FILE_PARTS_DELIMETER}${ps}${LIST}${FILE_PARTS_DELIMETER}${ROOT}${EXT}`
			);

			// Year-level root
			paths.push(
				`${BASE}/${aspect}/${ps}${LIST}/${yyyy}/${aspect}${FILE_PARTS_DELIMETER}${ps}${LIST}${FILE_PARTS_DELIMETER}${yyyy}${FILE_PARTS_DELIMETER}${ROOT}${EXT}`
			);
		}
	}

	return paths;
};

/**
 * Returns the leaf file path for a single Plan/Stats file
 * in the structure:
 * LifeTracker/<Aspect>/<Plan|Stats>List/yyyy/<Aspect>-<Plan|Stats>-yyyy_mm_dd__to__yyyy_mm_dd.md
 *
 * @param aspect - 'Food' | 'Money' | 'Sport'
 * @param ps - 'Plan' | 'Stats'
 * @param datePeriod - the range covered by the file
 * @returns one fully qualified .md file path
 */
const getAspectLeafFilePathForDatePeriod = (
	aspect: Aspect,
	ps: PlanStats,
	datePeriod: DatePeriod
): string => {
	const { yyyy } = getUtcDateParts(datePeriod.startIncl);
	const rangeRepr = reprFromDatePeriod(datePeriod);

	return `${BASE}/${aspect}/${ps}${LIST}/${yyyy}/${aspect}${FILE_PARTS_DELIMETER}${ps}${FILE_PARTS_DELIMETER}${rangeRepr}${EXT}`;
};

/**
 * Generates all leaf file paths for the given year and aspects, based on cutoff days.
 *
 * For each aspect and each PlanStats type ('Plan' | 'Stats'), this function:
 * - Converts the provided cutoffDays into cyclic DayPeriods
 * - Applies them across all 12 months of the year
 * - Converts each resulting DatePeriod into a file path using the vault convention
 *
 * Path format:
 * `LifeTracker/<Aspect>/<Plan|Stats>List/yyyy/<Aspect>-<Plan|Stats>-yyyy_mm_dd__to__yyyy_mm_dd.md`
 *
 * @param year - The target year (e.g. 2024)
 * @param aspects - Array of aspects to include (e.g., ['Food', 'Sport'])
 * @param cutoffDays - Array of 1–26 cutoff days defining the intra-month partitioning
 * @returns Array of leaf file paths, one per aspect × plan/stat × date period
 */
export const getAspectLeafFilePathsForYear = (
	year: Year,
	aspects: Aspect[],
	cutoffDays: CutoffDay[]
): string[] => {
	const dayPeriods = makeDayPeriods(cutoffDays);
	const datePeriods = makeDatePeriodsForWholeYear(year, dayPeriods);
	const result: string[] = [];

	for (const aspect of aspects) {
		for (const ps of PlanStatsSchema.options) {
			for (const period of datePeriods) {
				result.push(getAspectLeafFilePathForDatePeriod(aspect, ps, period));
			}
		}
	}

	return result;
};
