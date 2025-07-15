import { Vault, MetadataCache } from 'obsidian';
import { FileService } from '../../file';
import { Aspect } from '../../types/file-structure-atoms';
import {
	getProjectStructureRootsFileNames,
	getAspectsSubRootsFilePathsForYear,
	getDailySubRootsFilePathsForYear,
} from './utils/paths';

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

	const aspectsSubRootsFilePathsForYear = getAspectsSubRootsFilePathsForYear(
		year,
		aspects
	);

	const dailySubRootsFilePathsForYear = getDailySubRootsFilePathsForYear(year);


}
