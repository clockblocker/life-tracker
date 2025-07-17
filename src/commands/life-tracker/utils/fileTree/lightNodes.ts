import { DASH } from '../../../../constants/format';
import { Year, DatePartsPeriod } from '../../../../types/dates';
import {
	Aspect,
	Section,
	PlanStatsSchema,
	LIST,
} from '../../../../types/file-structure-atoms';
import { LightNode, LightNodeType } from '../../../../types/project-structure';
import {
	formatYYYY,
	getMaybeRootName,
	getDailyLeafFileNames,
	reprFromDatePartsPeriod,
} from '../paths';

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
export const makeDailyLightNodeForYear = (
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
			`[makeDailyLightNodeForYear] ${errors.length} error(s):\n${errors.join('\n')}`
		);
	}

	return tree;
};

/**
 * Constructs a LightNode tree for a given year and set of aspects, including:
 *
 * - Root structure: [Aspect]/[Plan|Stats]List/
 * - Year subfolder: [Aspect]/[Plan|Stats]List/YYYY/
 * - Optional RootFiles at both list and year level, resolved via `getMaybeRootName`
 * - LeafFiles for each provided `DatePartsPeriod`, with names like:
 *     [Aspect]-[Plan|Stats]-[yyyy_mm_dd__to__yyyy_mm_dd]
 *
 * All folders and files are returned as a single `LightNode` tree rooted at the top level.
 *
 * @param year - The 4-digit year to build structure under (e.g. 2025)
 * @param aspects - The list of aspects to generate trees for (e.g. Sport, Food, Money)
 * @param datePartsPeriods - Array of date ranges used to name LeafFiles within the year
 * @returns A fully populated LightNode tree for the given configuration
 */
export const makeAspectLightNodeForYear = (
	year: Year,
	aspect: Aspect,
	datePartsPeriods: DatePartsPeriod[]
): LightNode => {
	const yyyy = formatYYYY(year);

	const tree: LightNode = {
		type: LightNodeType.Folder,
		children: {},
	};

	for (const ps of PlanStatsSchema.options) {
		const list = `${ps}${LIST}`;

		const listFolder: LightNode = {
			type: LightNodeType.Folder,
			children: {},
		};
		tree.children[list] = listFolder;

		const maybeRootName = getMaybeRootName({
			section: aspect,
			pathParts: [list],
		});
		if (!maybeRootName.error) {
			listFolder.children[maybeRootName.data] = {
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

		for (const period of datePartsPeriods) {
			const leafName = `${aspect}${DASH}${ps}${DASH}${reprFromDatePartsPeriod(period)}`;

			yyyyFolder.children[leafName] = {
				type: LightNodeType.LeafFile,
				children: {},
			};
		}
	}

	return tree;
};

/**
 * Constructs a LightNode tree representing the structure of the Library section.
 *
 * The structure includes:
 * - Top-level "Library" folder
 * - A "Library-Root" RootFile at the top level
 * - Subfolders for each aspect (Sport, Food, Money)
 * - A "Library-[Aspect]-Root" RootFile in each aspect subfolder
 *
 * No leaf files or year-based nesting; this is a static structure.
 *
 * @param aspects - Aspects to include under the Library section
 * @returns A LightNode representing the full Library tree
 */
export const makeLightNodeForLibrary = (aspects: Aspect[]): LightNode => {
	const tree: LightNode = {
		type: LightNodeType.Folder,
		children: {},
	};

	const section = Section.Library;

	// top-level Library-Root
	const maybeRoot = getMaybeRootName({ section, pathParts: [] });
	if (!maybeRoot.error) {
		tree.children[maybeRoot.data] = {
			type: LightNodeType.RootFile,
			children: {},
		};
	}

	for (const aspect of aspects) {
		const aspectFolder: LightNode = {
			type: LightNodeType.Folder,
			children: {},
		};
		tree.children[aspect] = aspectFolder;

		const aspectRoot = getMaybeRootName({ section, pathParts: [aspect] });
		if (!aspectRoot.error) {
			aspectFolder.children[aspectRoot.data] = {
				type: LightNodeType.RootFile,
				children: {},
			};
		}
	}

	return tree;
};
