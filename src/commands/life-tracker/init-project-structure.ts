import { Vault, MetadataCache } from 'obsidian';
import { FileService } from '../../file-service';
import { Aspect, LIFE_TRACKER } from '../../types/file-structure-atoms';

import { makeProjectLightNode } from './utils/fileTree/lightNodes/creation';
import { getAllFolderPathPartsFromLightNode } from './utils/fileTree/lightNodes/mappers';

export default async function initProjectStructure(
	vault: Vault,
	metadataCache: MetadataCache,
	fileService: FileService
) {
	const aspects = [Aspect.Food, Aspect.Money, Aspect.Sport];
	const year = 2025;
	const cutoffDays = [15, 25];

	const lightNode = makeProjectLightNode({
		unsafeYear: year,
		unsafeCutoffDays: cutoffDays,
		unsafeAspects: aspects,
	});

	if (lightNode === null) {
		return;
	}

	const folderPathParts = getAllFolderPathPartsFromLightNode(lightNode, [
		LIFE_TRACKER,
	]);

	console.log('folderPathParts', folderPathParts);

	fileService.createManyFolders(folderPathParts);
}
