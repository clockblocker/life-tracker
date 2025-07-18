import { Vault, MetadataCache } from 'obsidian';
import { FileService } from '../../file-service';
import { Aspect, LIFE_TRACKER } from '../../types/file-structure-atoms';

import { makeProjectLightNode } from './utils/fileTree/lightNodes/creation';
import { flattenLightNodeByType } from './utils/fileTree/lightNodes/mappers';
import { BUTTONS_BLOCK } from './markdown/general';
import { PathParts } from '../../types/project-structure';

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

	const flattenedTree = flattenLightNodeByType(lightNode);

	const folderPathsParts = flattenedTree.Folder.map((parts) => [
		LIFE_TRACKER,
		...parts,
	]);

	const leafFilesPathsParts = flattenedTree.LeafFile.map((parts) => [
		LIFE_TRACKER,
		...parts,
	]);

	const rootFilesPathsParts = flattenedTree.RootFile.map((parts) => [
		LIFE_TRACKER,
		...parts,
	]);

	const rootBodyFromPathsParts = (parts: PathParts) => {
		if (parts.includes('Daily') && parts.length === 6) {
			const dateRepr = parts[parts.length - 1].replace('-Root', '');
			return `
 [[${dateRepr}-Money|💰 Money]] 
 [[${dateRepr}-Food|🥗 Food]] 
 [[${dateRepr}-Sport|💪 Sport]] 
 [[${dateRepr}-Notes|📝 Notes]] 
 `;
		}
		return '';
	};

	console.log(folderPathsParts);
	console.log(rootFilesPathsParts);

	await fileService.createManyFolders(folderPathsParts);
	await fileService.createManyFilesInExistingFolders(
		leafFilesPathsParts.map((pathParts) => ({
			pathParts,
			content: BUTTONS_BLOCK,
		}))
	);

	await fileService.createManyFilesInExistingFolders(
		rootFilesPathsParts.map((pathParts) => ({
			pathParts,
			content: BUTTONS_BLOCK + rootBodyFromPathsParts(pathParts),
		}))
	);
}
