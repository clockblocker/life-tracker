import { TFile, Notice, Vault, MetadataCache, Editor } from 'obsidian';
import {
	appendToExistingFile,
	getExisingOrCreatedFileInWorterDir,
	doesExistingFileContainContent,
} from '../../utils/obsidian-file-management';
import { FileService } from 'file';
import {
	getProjectStructureRootsFileNames,
	getAspectsSubRootsFilePathsForYear,
	getDailySubRootsFilePathsForYear,
	getAspectLeafFilePathsForYear,
} from 'utils/paths';
import { Aspect } from 'types/file-structure';
import { NAV_BUTTONS_MD } from 'utils/markdown';

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

	const aspectLeafFilePathsForYear = getAspectLeafFilePathsForYear(
		year,
		aspects,
		cutoffDays
	);

	NAV_BUTTONS_MD;
}
