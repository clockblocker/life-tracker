import { DASH, SLASH, USCORE } from '../../../constants/format';
import {
	Year,
	DatePeriod,
	CutoffDay,
	DateParts,
	DatePartsSchema,
	DatePartsPeriod,
} from '../../../types/dates';
import {
	Section,
	RootSchema,
	YYYYRepr,
	MMRepr,
	DDRepr,
	FullDateRepr,
	FullDatePeriodRepr,
	Aspect,
	BASE,
	ROOT,
	NotesSchema,
	PlanStats,
	LIST,
	PlanStatsSchema,
	NOTES,
} from '../../../types/file-structure-atoms';
import { Maybe } from '../../../types/general';
import {
	PathParts,
	structureFromSection,
} from '../../../types/project-structure';
import { getMaybeDatePartsFromDate } from './dates/general';
import { makeCutoffDayPeriods } from './dates/makeCutoffDayPeriods';

export const joinPathParts = (pathParts: PathParts) => pathParts.join(SLASH);

export function getMaybeRootName(
	section: Section,
	pathParts: PathParts
): Maybe<string> {
	const shape = structureFromSection[section];

	for (let i = 0; i < pathParts.length; i++) {
		const schema = shape.pathParts[i];
		const value = pathParts[i];
		const result = schema.safeParse(value);
		if (!result.success) {
			return {
				error: true,
				errorText: `Invalid value "${value}" at index ${i} for section "${section}"`,
			};
		}
	}

	const joined = [section, ...pathParts, RootSchema.value].join(DASH);
	return { error: false, data: joined };
}

export const formatYYYY = (year: Year): string => {
	return year.toString().padStart(4, '0');
};

export const reprFromDateParts = ({
	yyyy,
	mm,
	dd,
}: DateParts): FullDateRepr => {
	return `${yyyy}${USCORE}${mm}${USCORE}${dd}`;
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
export const reprFromDatePartsPeriod = (
	datePeriod: DatePartsPeriod
): FullDatePeriodRepr => {
	return `${reprFromDateParts(datePeriod.startIncl)}__to__${reprFromDateParts(datePeriod.endExl)}`;
};

/**
 * Generates the expected Daily leaf file paths for a given validated `DateParts` object.
 *
 * Each file path follows the convention:
 * `LifeTracker/Daily/yyyy/mm/dd/yyyy_mm_dd-{Suffix}`
 *
 * - Always includes:
 *   - `...-Root`
 *   - `...-Notes`
 * - Optionally includes one file per enabled aspect:
 *   - `...-Sport`, `...-Food`, `...-Money`
 *
 * @param dateParts - Validated zero-padded date parts (yyyy, mm, dd)
 * @param aspects - List of enabled aspects to include as additional files
 * @returns An array of fully qualified Daily leaf file paths
 */
export const getPathsToDailyLeaves = (
	dateParts: DateParts,
	aspects: Aspect[]
): string[] => {
	const { yyyy, mm, dd } = dateParts;

	const basePathParts = [BASE, Section.Daily, yyyy, mm, dd];
	const dateRepr = reprFromDateParts(dateParts);
	const suffixes = [ROOT, NOTES, ...aspects];

	return suffixes.map((suffix) =>
		joinPathParts([...basePathParts, `${dateRepr}${DASH}${suffix}`])
	);
};

/**
 * Generates the expected sub-root file paths for the Daily section for a given year.
 *
 * For each of:
 * - the year itself (e.g. `Daily-2025-Root`)
 * - all 12 months (e.g. `Daily-2025_03-Root`)
 *
 * The function:
 * - Constructs the file name using `getMaybeRootName`
 * - Assembles the full path using `joinPathParts`
 * - Logs any validation errors (e.g. schema mismatches or format issues)
 * - Returns only the successfully constructed paths
 *
 * @param year - The 4-digit year to generate root file paths for
 * @returns An array of full relative file paths under `LifeTracker/Daily/...`
 */
export const getDailySubRootsFilePathsForYear = (year: Year): string[] => {
	const yyyy = formatYYYY(year);
	const section = Section.Daily;

	const results: string[] = [];
	const errors: string[] = [];

	// Year-level root
	const yearRoot = getMaybeRootName(section, [yyyy]);
	if (!yearRoot.error) {
		results.push(joinPathParts([BASE, section, yyyy, yearRoot.data]));
	} else {
		errors.push(`Year root: ${yearRoot.errorText ?? 'Unknown error'}`);
	}

	// Month-level roots
	for (let m = 1; m <= 12; m++) {
		const mm = m.toString().padStart(2, '0');
		const monthRoot = getMaybeRootName(section, [yyyy, mm]);
		if (!monthRoot.error) {
			results.push(joinPathParts([BASE, section, yyyy, mm, monthRoot.data]));
		} else {
			errors.push(`Month ${mm}: ${monthRoot.errorText ?? 'Unknown error'}`);
		}
	}

	if (errors.length > 0) {
		console.warn(
			`[getDailySubRootsFilePathsForYear] ${errors.length} error(s):\n${errors.join('\n')}`
		);
	}

	return results;
};

export const getProjectStructureRootsFileNames = (
	aspects: Aspect[]
): string[] => {
	const paths: string[] = [];
	const errors: string[] = [];

	// Daily root
	const dailyRoot = getMaybeRootName(Section.Daily, []);
	if (!dailyRoot.error) {
		paths.push(joinPathParts([BASE, Section.Daily, dailyRoot.data]));
	} else {
		errors.push(`Daily: ${dailyRoot.errorText ?? 'Invalid root'}`);
	}

	// Library root
	const libraryRoot = getMaybeRootName(Section.Library, []);
	if (!libraryRoot.error) {
		paths.push(joinPathParts([BASE, Section.Library, libraryRoot.data]));
	} else {
		errors.push(`Library: ${libraryRoot.errorText ?? 'Invalid root'}`);
	}

	for (const aspect of aspects) {
		// Top-level aspect root
		const aspectRoot = getMaybeRootName(aspect, []);
		if (!aspectRoot.error) {
			paths.push(joinPathParts([BASE, aspect, aspectRoot.data]));
		} else {
			errors.push(`${aspect}: root: ${aspectRoot.errorText}`);
		}

		// PlanList / StatsList root (no year)
		for (const ps of [PlanStats.Plan, PlanStats.Stats]) {
			const listRoot = getMaybeRootName(aspect, [`${ps}List`]);
			if (!listRoot.error) {
				paths.push(joinPathParts([BASE, aspect, `${ps}List`, listRoot.data]));
			} else {
				errors.push(`${aspect}: ${ps}List: ${listRoot.errorText}`);
			}
		}

		// Library/<Aspect>/Library-<Aspect>-Root
		const libraryAspectRoot = getMaybeRootName(Section.Library, [aspect]);
		if (!libraryAspectRoot.error) {
			paths.push(
				joinPathParts([BASE, Section.Library, aspect, libraryAspectRoot.data])
			);
		} else {
			errors.push(`Library/${aspect}: ${libraryAspectRoot.errorText}`);
		}
	}

	if (errors.length > 0) {
		console.warn(
			`[getProjectStructureRootsFileNames] ${errors.length} error(s):\n${errors.join('\n')}`
		);
	}

	return paths;
};

/**
 * Returns all sub-root file paths for the given year and aspects in the PlanList and StatsList trees.
 *
 * For each provided `Aspect` (e.g., 'Sport', 'Food', 'Money'), generates:
 *
 * - The PlanList and StatsList root files:
 *   - `LifeTracker/<Aspect>/PlanList/<Aspect>-PlanList-Root`
 *   - `LifeTracker/<Aspect>/StatsList/<Aspect>-StatsList-Root`
 *
 * - The year-specific sub-root files:
 *   - `LifeTracker/<Aspect>/PlanList/yyyy/<Aspect>-PlanList-yyyy-Root`
 *   - `LifeTracker/<Aspect>/StatsList/yyyy/<Aspect>-StatsList-yyyy-Root`
 *
 * File paths are fully qualified and use zero-padded year strings (`0042`, `2024`, etc).
 *
 * @param year - The calendar year (as a number) to generate root files for
 * @param aspects - List of enabled `Aspect`s to include (e.g. ['Sport', 'Food'])
 * @returns An array of fully qualified root `` file paths for PlanList and StatsList structures
 */
export const getAspectsSubRootsFilePathsForYear = (
	year: Year,
	aspects: Aspect[]
): string[] => {
	const yyyy = formatYYYY(year);
	const result: string[] = [];

	for (const aspect of aspects) {
		for (const ps of PlanStatsSchema.options) {
			const list = `${ps}List`;

			const root = getMaybeRootName(aspect, [list]);
			if (!root.error) {
				result.push(joinPathParts([BASE, aspect, list, root.data]));
			}

			const yearRoot = getMaybeRootName(aspect, [list, yyyy]);
			if (!yearRoot.error) {
				result.push(joinPathParts([BASE, aspect, list, yyyy, yearRoot.data]));
			}
		}
	}

	return result;
};

/**
 * Returns the leaf file path for a single Plan or Stats file in the vault structure:
 *
 * `LifeTracker/<Aspect>/<Plan|Stats>List/yyyy/<Aspect>-<Plan|Stats>-yyyy_mm_dd__to__yyyy_mm_dd`
 *
 * Example:
 * `LifeTracker/Food/PlanList/2024/Food-Plan-2024_01_01__to__2024_01_31`
 *
 * @param aspect - The aspect category ('Food' | 'Money' | 'Sport')
 * @param ps - Either 'Plan' or 'Stats'
 * @param datePartsPeriod - A validated date period with padded YYYY/MM/DD components
 * @returns A single fully qualified POSIX-style path to the  file
 */
const getAspectLeafFilePathForDatePartsPeriod = (
	aspect: Aspect,
	ps: PlanStats,
	datePartsPeriod: DatePartsPeriod
): string => {
	const rangeRepr = reprFromDatePartsPeriod(datePartsPeriod);
	const pathParts = [
		BASE,
		aspect,
		`${ps}${LIST}`,
		datePartsPeriod.startIncl.yyyy,
		`${aspect}${DASH}${ps}${DASH}${rangeRepr}`,
	];

	return joinPathParts(pathParts);
};

/**
 * Generates all aspect-specific leaf file paths for a full year, given a list of
 * validated `DatePartsPeriod` intervals and enabled `Aspect`s.
 *
 * Each combination of:
 * - aspect ∈ aspects
 * - plan/stats ∈ ['Plan', 'Stats']
 * - date interval ∈ datePartsPeriods
 *
 * results in a file path of the form:
 * `LifeTracker/<Aspect>/<Plan|Stats>List/yyyy/<Aspect>-<Plan|Stats>-yyyy_mm_dd__to__yyyy_mm_dd`
 *
 * @param datePartsPeriods - Validated year-wide list of `DatePartsPeriod`s
 * @param aspects - Enabled aspects (e.g. 'Food', 'Sport', 'Money') to generate files for
 * @returns An array of fully qualified leaf file paths for the year
 */
export const getAspectLeafFilePathsForYearWideDatePartsPeriod = (
	datePartsPeriods: DatePartsPeriod[],
	aspects: Aspect[]
): string[] =>
	aspects.flatMap((aspect) =>
		PlanStatsSchema.options.flatMap((ps) =>
			datePartsPeriods.map((period) =>
				getAspectLeafFilePathForDatePartsPeriod(aspect, ps, period)
			)
		)
	);
