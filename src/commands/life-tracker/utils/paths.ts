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
	LightNode,
	LightNodeType,
	PathParts,
	structureFromSection,
} from '../../../types/project-structure';
import { getMaybeDatePartsFromDate } from './dates/general';
import { makeCutoffDayPeriods } from './dates/makeCutoffDayPeriods';

export const makePathFromPathParts = (pathParts: PathParts) =>
	pathParts.join(SLASH);

const makeRootFileNameFromPathParts = (pathParts: PathParts) => {
	return [...pathParts, ROOT].join(DASH);
};

const makeRootFileNameForSection = ({
	section,
	pathParts,
}: {
	section: Section;
	pathParts: PathParts;
}) => {
	return makeRootFileNameFromPathParts([section, ...pathParts]);
};

const unsafeFullDateStyleJoin = (parts: string[]) => {
	return parts.join(USCORE);
};

export function getMaybeRootName({
	section,
	pathParts,
}: {
	section: Section;
	pathParts: PathParts;
}): Maybe<string> {
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

	if (
		section !== Section.Daily ||
		(section === Section.Daily && pathParts.length < 3)
	) {
		return {
			error: false,
			data: makeRootFileNameForSection({ section, pathParts }),
		};
	}

	return {
		error: false,
		data: `${unsafeFullDateStyleJoin(pathParts)}${DASH}${ROOT}`,
	};
}

export const formatYYYY = (year: Year): string => {
	return year.toString().padStart(4, '0');
};

export const reprFromDateParts = ({
	yyyy,
	mm,
	dd,
}: DateParts): FullDateRepr => {
	return unsafeFullDateStyleJoin([yyyy, mm, dd]) as FullDateRepr;
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

export const getDailyLeafFileNames = ({
	dateParts,
	aspects,
}: {
	dateParts: DateParts;
	aspects: Aspect[];
}): string[] => {
	const dateRepr = reprFromDateParts(dateParts);
	const suffixes = [NOTES, ...aspects];

	return suffixes.map((suffix) => `${dateRepr}${DASH}${suffix}`);
};

/**
 * Generates the full LightNode tree structure for the "Daily" section of a given year.
 *
 * This includes:
 * - A folder for the year (`YYYY`)
 * - Subfolders for each month (`MM`)
 * - Subfolders for each day (`DD`)
 * - A RootFile for each valid root (year, month, day) if resolvable via `getMaybeRootName`
 * - LeafFiles for all aspects (e.g. Sport, Food, Money) per day
 *
 * All nodes are attached under a top-level Folder node, forming a fully navigable tree.
 *
 * @param year - The full 4-digit year (e.g. 2025)
 * @param aspects - A list of aspects to include in daily leaf generation
 * @returns A LightNode representing the root of the yearly "Daily" section tree
 */
export const getDailyLightNodeForYear = (
	year: Year,
	aspects: Aspect[]
): LightNode => {
	const yyyy = formatYYYY(year);
	const section = Section.Daily;

	const errors: string[] = [];

	const tree: LightNode = {
		type: LightNodeType.Folder,
		children: {
			[yyyy]: {
				type: LightNodeType.Folder,
				children: {},
			},
		},
	};

	const yearFolder = tree.children[yyyy];

	// year-level root file
	const maybeYearRootName = getMaybeRootName({ section, pathParts: [yyyy] });
	if (!maybeYearRootName.error) {
		const rootName = maybeYearRootName.data;
		yearFolder.children[rootName] = {
			type: LightNodeType.RootFile,
			children: {},
		};
	} else {
		errors.push(`Year root: ${maybeYearRootName.errorText ?? 'Unknown error'}`);
	}

	// month-level
	for (let m = 1; m <= 12; m++) {
		const mm = m.toString().padStart(2, '0');
		const daysInMonth = new Date(year, m, 0).getUTCDate();

		const monthFolder: LightNode = {
			type: LightNodeType.Folder,
			children: {},
		};
		yearFolder.children[mm] = monthFolder;

		const maybeMonthRoot = getMaybeRootName({ section, pathParts: [yyyy, mm] });
		if (!maybeMonthRoot.error) {
			const rootName = maybeMonthRoot.data;
			monthFolder.children[rootName] = {
				type: LightNodeType.RootFile,
				children: {},
			};
		} else {
			errors.push(
				`Month ${mm}: ${maybeMonthRoot.errorText ?? 'Unknown error'}`
			);
		}

		for (let d = 1; d <= daysInMonth; d++) {
			const dd = d.toString().padStart(2, '0');

			const dayFolder: LightNode = {
				type: LightNodeType.Folder,
				children: {},
			};
			monthFolder.children[dd] = dayFolder;

			const maybeDayRoot = getMaybeRootName({
				section,
				pathParts: [yyyy, mm, dd],
			});
			if (!maybeDayRoot.error) {
				const rootName = maybeDayRoot.data;
				dayFolder.children[rootName] = {
					type: LightNodeType.RootFile,
					children: {},
				};
			}

			getDailyLeafFileNames({ aspects, dateParts: { yyyy, mm, dd } }).forEach(
				(leafName) => {
					dayFolder.children[leafName] = {
						type: LightNodeType.LeafFile,
						children: {},
					};
				}
			);
		}
	}

	if (errors.length > 0) {
		console.warn(
			`[getDailyLightNodeForYear] ${errors.length} error(s):\n${errors.join('\n')}`
		);
	}

	return tree;
};

/**
 * Generates a LightNode tree for all aspects' PlanList and StatsList subtrees for a given year.
 *
 * The structure includes:
 * - Root files for PlanList and StatsList at the top level (`[Aspect]/[Type]List/Root`)
 * - Year subfolders under each list (`[Aspect]/[Type]List/YYYY`)
 * - Root files for the year-level nodes (`.../YYYY/Root`)
 *
 * All nodes are embedded in a clean tree structure of LightNodes.
 *
 * @param year - The target year (e.g. 2025)
 * @param aspects - The list of aspects to include (e.g. Sport, Food, Money)
 * @returns A LightNode containing all list/plan/stats structures per aspect
 */
export const getAspectLightNodesForYear = (
	year: Year,
	aspects: Aspect[]
): LightNode => {
	const yyyy = formatYYYY(year);

	const tree: LightNode = {
		type: LightNodeType.Folder,
		children: {},
	};

	for (const aspect of aspects) {
		const aspectFolder: LightNode = {
			type: LightNodeType.Folder,
			children: {},
		};
		tree.children[aspect] = aspectFolder;

		for (const ps of PlanStatsSchema.options) {
			const list = `${ps}List`;

			const listFolder: LightNode = {
				type: LightNodeType.Folder,
				children: {},
			};
			aspectFolder.children[list] = listFolder;

			const root = getMaybeRootName({ section: aspect, pathParts: [list] });
			if (!root.error) {
				listFolder.children[root.data] = {
					type: LightNodeType.RootFile,
					children: {},
				};
			}

			const yyyyFolder: LightNode = {
				type: LightNodeType.Folder,
				children: {},
			};
			listFolder.children[yyyy] = yyyyFolder;

			const yearRoot = getMaybeRootName({
				section: aspect,
				pathParts: [list, yyyy],
			});
			if (!yearRoot.error) {
				yyyyFolder.children[yearRoot.data] = {
					type: LightNodeType.RootFile,
					children: {},
				};
			}
		}
	}

	return tree;
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

	return makePathFromPathParts(pathParts);
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
