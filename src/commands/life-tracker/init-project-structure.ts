import { Vault, MetadataCache } from 'obsidian';
import { FileService } from '../../file';
import {
	Aspect,
	AspectSchema,
	Section,
} from '../../types/file-structure-atoms';

import { makeMaybeDatePartsPeriodsForWholeYear } from './utils/dates/makeDatePartsPeriodsForWholeYear';
import {
	CutoffDay,
	CutoffDaySchema,
	DatePartsPeriod,
	Year,
	YearSchema,
} from '../../types/dates';
import z from 'zod/v4';
import { makeCutoffDayPeriods } from './utils/dates/makeCutoffDayPeriods';
import { LightNode, LightNodeType } from '../../types/project-structure';
import {
	getDailyLightNodeForYear,
	getAspectLightNodeForLibrary,
	getAspectLightNodeForYear,
} from './utils/paths';

export default async function initProjectStructure(
	vault: Vault,
	metadataCache: MetadataCache,
	fileService: FileService
) {
	const aspects = [Aspect.Food, Aspect.Money, Aspect.Sport];
	const year = 2025;
	const cutoffDays = [15, 25];

	makeProjectLightNode({
		unsafeYear: year,
		unsafeCutoffDays: cutoffDays,
		unsafeAspects: aspects,
	});
}

export function makeProjectLightNode({
	unsafeYear,
	unsafeCutoffDays,
	unsafeAspects,
}: {
	unsafeYear: number;
	unsafeCutoffDays: number[];
	unsafeAspects: string[];
}): LightNode | null {
	const yearResult = YearSchema.safeParse(unsafeYear);
	const cutoffsResult = z.array(CutoffDaySchema).safeParse(unsafeCutoffDays);
	const aspectsResult = z.array(AspectSchema).safeParse(unsafeAspects);

	if (!yearResult.success || !cutoffsResult.success || !aspectsResult.success) {
		console.warn('[makeAspektLeavesPaths] invalid input:', {
			year: yearResult.success ? 'ok' : yearResult.error.message,
			cutoffs: cutoffsResult.success ? 'ok' : cutoffsResult.error.message,
			aspects: aspectsResult.success ? 'ok' : aspectsResult.error.message,
		});
		return null;
	}

	const year = yearResult.data;
	const cutoffDays = cutoffsResult.data;
	const aspects = aspectsResult.data;

	const cutoffDayPeriods = makeCutoffDayPeriods(cutoffDays);

	const maybePeriods = makeMaybeDatePartsPeriodsForWholeYear(
		year,
		cutoffDayPeriods
	);

	if (maybePeriods.error) {
		console.warn(
			'[makeAspektLeavesPaths] failed to generate date parts periods:',
			maybePeriods.errorText
		);
		return null;
	}

	const datePartsPeriods = maybePeriods.data;

	return makeProjectLightNodeInner({
		year,
		aspects,
		datePartsPeriods,
	});
}

function makeProjectLightNodeInner({
	year,
	aspects,
	datePartsPeriods,
}: {
	year: Year;
	aspects: Aspect[];
	datePartsPeriods: DatePartsPeriod[];
}): LightNode {
	const tree: LightNode = {
		type: LightNodeType.Folder,
		children: {},
	};

	tree.children[Section.Daily] = getDailyLightNodeForYear(year, aspects);
	tree.children[Section.Library] = getAspectLightNodeForLibrary(aspects);

	for (const aspect of aspects) {
		tree.children[aspect] = getAspectLightNodeForYear(
			year,
			[aspect],
			datePartsPeriods
		);
	}

	return tree;
}
