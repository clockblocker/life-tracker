import {
	ContentFromBlockId,
	BlockId,
	ALL_BLOCK_IDS,
} from './types-and-constants';

export function mergeBlockContentsFromIds({
	blockContentsFromIds,
	setOfBlockIdsToCreateIfEmpty,
}: {
	blockContentsFromIds: Partial<ContentFromBlockId>[];
	setOfBlockIdsToCreateIfEmpty: Set<BlockId>;
}): ContentFromBlockId {
	const mergedBlockContentFromBlockId: ContentFromBlockId =
		{} as ContentFromBlockId;

	ALL_BLOCK_IDS.forEach((blockId) => {
		let mergedContent = '';
		blockContentsFromIds.forEach((partialContent) => {
			mergedContent += partialContent[blockId] || '';
		});
		if (mergedContent || setOfBlockIdsToCreateIfEmpty.has(blockId)) {
			mergedBlockContentFromBlockId[blockId] = mergedContent;
		}
	});

	return mergedBlockContentFromBlockId;
}
