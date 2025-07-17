import { Vault, MetadataCache } from 'obsidian';
import { FileService } from '../../file';
import { Aspect, AspectSchema } from '../../types/file-structure-atoms';
import {
	getProjectStructureRootsFileNames,
	getAspectsSubRootsFilePathsForYear,
	getDailySubRootsFilePathsForYear,
	getAspectLeafFilePathsForYearWideDatePartsPeriod,
} from './utils/paths';
import { makeMaybeDatePartsPeriodsForWholeYear } from './utils/dates/makeDatePartsPeriodsForWholeYear';
import {
	CutoffDay,
	CutoffDaySchema,
	Year,
	YearSchema,
} from '../../types/dates';
import z from 'zod/v4';
import { makeCutoffDayPeriods } from './utils/dates/makeCutoffDayPeriods';

export default async function initProjectStructure(
	vault: Vault,
	metadataCache: MetadataCache,
	fileService: FileService
) {
	const aspects = [Aspect.Food, Aspect.Money, Aspect.Sport];
	const year = 2025;
	const cutoffDays = [15, 25];
	const projectStructureRootsFileNames =
		getProjectStructureRootsFileNames(aspects);

	const aspektLeavesPaths = makeAspektLeavesPaths(year, cutoffDays, aspects);

	const aspectsSubRootsFilePathsForYear = getAspectsSubRootsFilePathsForYear(
		year,
		aspects
	);

	const dailySubRootsFilePathsForYear = getDailySubRootsFilePathsForYear(year);
}

export function makeAspektLeavesPaths(
	unsafeYear: number,
	unsafeCutoffDays: number[],
	unsafeAspects: string[]
): string[] {
	const yearResult = YearSchema.safeParse(unsafeYear);
	const cutoffsResult = z.array(CutoffDaySchema).safeParse(unsafeCutoffDays);
	const aspectsResult = z.array(AspectSchema).safeParse(unsafeAspects);

	if (!yearResult.success || !cutoffsResult.success || !aspectsResult.success) {
		console.warn('[makeAspektLeavesPaths] invalid input:', {
			year: yearResult.success ? 'ok' : yearResult.error.message,
			cutoffs: cutoffsResult.success ? 'ok' : cutoffsResult.error.message,
			aspects: aspectsResult.success ? 'ok' : aspectsResult.error.message,
		});
		return [];
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
		return [];
	}

	const datePartsPeriods = maybePeriods.data;

	const leafPaths = getAspectLeafFilePathsForYearWideDatePartsPeriod(
		datePartsPeriods,
		aspects
	);

}
