import {
  BlockId,
  NEW_LINE,
  ALL_BLOCK_IDS,
  BlockStructure,
  BLOCK_DELIMETER,
  weightFromBlockId,
  cssClassNameFromBlockId,
  blockHeaderElementFromBlockId,
  preDelimeterSpacingFromBlockId,
  SET_OF_REQUIRED_TECHNIKAL_BLOCK_IDS,
  ContentFromBlockId,
  BlockRepr,
  FileContent,
} from "./types-and-constants";

/**
 * Build a regular expression to capture a block’s title element and its content in the note.
 *
 * It captures:
 *   - Group 1: the block title element (e.g. the <span> element)
 *
 * @param params - An object with:
 *   - blockId: The block id value.
 * @returns A RegExp to capture the block’s title and its content.
 */
function getBlockRegex({ blockId }: { blockId: BlockId }): RegExp {
  const cssClass = cssClassNameFromBlockId[blockId];
  return new RegExp(
    `(<span\\s+class=["']block_title\\s+${cssClass}["']>[^<]+</span>)([\\s\\S]*?)(?=(${BLOCK_DELIMETER}|<|$))`,
    "g"
  );
}

/**
 * Extract the content of a specific block from the note.
 *
 * @param params - An object with:
 *   - content: The complete note content.
 *   - blockId: The block id to extract content from.
 * @returns The trimmed content found for the block, or an empty string if not found.
 */
function extractBlockContent({ content, blockId }: { content: string, blockId: BlockId }): string {
  const regex = getBlockRegex({ blockId });
  const match = regex.exec(content);
  return match ? match[2].trim() : "";
}

/* ================= Transformation Helpers ================= */

/**
 * Integrate existing file content into new block representations.
 *
 * For each block:
 *   - Preserves existing content for the "Kontexte" block if present.
 *   - Replaces content of other blocks with the new representation.
 *   - If a block does not exist in the file, the new representation is used.
 *
 * @param params - An object with:
 *   - newContentFromBlockId: A partial record mapping BlockId to the new content.
 *   - fileContent: The current complete note content.
 * @returns An enriched record mapping each BlockId to its updated content.
 */
function integrateExistingContentIntoBlocks({
  newContentFromBlockId,
  fileContent,
  setOfBlockIdsToCreateIfEmpty,
}: {
  newContentFromBlockId: Partial<ContentFromBlockId>,
  fileContent: string,
  setOfBlockIdsToCreateIfEmpty: Set<BlockId>,
}): ContentFromBlockId {
  const mergedBlockContentFromBlockId: ContentFromBlockId = {} as ContentFromBlockId;
  
  ALL_BLOCK_IDS.forEach((blockId) => {
    const oldBlockContent = extractBlockContent({ content: fileContent, blockId });
    const newBlockContent = newContentFromBlockId?.[blockId] || "";

    const mergedBlockContent = oldBlockContent + newBlockContent;
    if (mergedBlockContent) {
      if (setOfBlockIdsToCreateIfEmpty.has(blockId)) {
        mergedBlockContentFromBlockId[blockId] = mergedBlockContent;
      }
    }
  });

  return mergedBlockContentFromBlockId;
}

/**
 * Sort an array of objects with id: BlockId and sorts them be weight.
 *
 * @param blockIdsAndSomething - An array of objects with id: BlockId
 * @returns A new array sorted by the block weight.
 */
function getNewSortedListByBlockId<T extends {id: BlockId}>(blockIdsAndSomething: T[]): T[] {
  return [...blockIdsAndSomething].sort(
    (a, b) => weightFromBlockId[a.id] - weightFromBlockId[b.id]
  );
}

/**
 * Convert the enriched representation record into an array of sorted block content objects.
 *
 * Each object contains:
 *   - The block id.
 *   - The final content built from the header, content, and spacing delimiter.
 *
 * @param mergedContentFromBlockId - A record mapping BlockId to its enriched content.
 * @returns An array of BlockIdAndBlockRepr objects sorted by block weight.
 */
function BUILD_sortedBlockStructures_FROM_mergedContentFromBlockId(
  mergedContentFromBlockId: Partial<ContentFromBlockId>
): BlockStructure[] {
  const blocksIdsAndStructures: { id: BlockId, structure: BlockStructure }[] = [];

  ALL_BLOCK_IDS.forEach((id) => {
    const blockContent = mergedContentFromBlockId?.[id];
    if (blockContent === undefined) {
      return;
    }

    const trimmedHeaderElement = blockHeaderElementFromBlockId[id].trim();
    const trimmedContent = blockContent.trim();
    const spacedOutDelimiter = preDelimeterSpacingFromBlockId[id] + BLOCK_DELIMETER;

    const structure = {
      headerElement: trimmedHeaderElement,
      content: trimmedContent,
      preDelimeterSpacing: spacedOutDelimiter,
      delimeter: BLOCK_DELIMETER,
    };

    blocksIdsAndStructures.push({ id, structure });
  });

  return getNewSortedListByBlockId(blocksIdsAndStructures).map(({ structure }) => structure);
}

/**
 * Convert the enriched representation record into an array of sorted block content objects.
 *
 * Each object contains:
 *   - The block id.
 *   - The final content built from the header, content, and spacing delimiter.
 *
 * @param sortedBlockStructures
 * @returns An array of BlockIdAndBlockRepr objects sorted by block weight.
 */
function BUILD_sortedBlockReprs_FROM_sortedBlockStructures(
  sortedBlockStructures: BlockStructure[]
): BlockRepr[] {
  const blockReprs = sortedBlockStructures.map(({headerElement, content, preDelimeterSpacing, delimeter}) => {
    const nonEmptyParts = [headerElement, content, preDelimeterSpacing, delimeter].filter(s => s);
    const blockRepr = nonEmptyParts.join(NEW_LINE);
    return blockRepr;
  });

  return blockReprs;
}

function BUILD_fileContent_FROM_sortedBlockReprs(
  sortedBlockReprs: BlockRepr[]
): string {
  return sortedBlockReprs.join(NEW_LINE);
}

/* ================= Main Function ================= */

/**
 * Update the note’s content by merging new block representations with the existing file content.
 *
 * Workflow:
 *   1. Integrate the new content into the existing blocks (preserving specific blocks like "Kontexte").
 *   2. Rebuild the complete note content from the enriched representation.
 *   3. Return the final note content as a string.
 *
/**
 * @param {Object} o
 * @param {FileContent} o.oldFileContent - Existing note content
 * @param {Partial<ContentFromBlockId>} o.blockContentFromBlockId - New content per block
 * @param {Set<BlockId>} [o.setOfBlockIdsToCreateIfEmpty] - BlockIds to ensure are present
 * @returns {Promise<FileContent>} Updated complete note content
 */
export async function makeNewFileContent({
  oldFileContent,
  blockContentFromBlockId,
  setOfBlockIdsToCreateIfEmpty = SET_OF_REQUIRED_TECHNIKAL_BLOCK_IDS,
}: {
  oldFileContent: FileContent,
  blockContentFromBlockId: Partial<ContentFromBlockId>,
  setOfBlockIdsToCreateIfEmpty?: Set<BlockId>,
}): Promise<FileContent> {
  const mergedContentFromBlockId = integrateExistingContentIntoBlocks({
    newContentFromBlockId: blockContentFromBlockId,
    fileContent: oldFileContent,
    setOfBlockIdsToCreateIfEmpty,
  });

  const sortedBlockStructures = BUILD_sortedBlockStructures_FROM_mergedContentFromBlockId(mergedContentFromBlockId);
  const sortedBlockReprs = BUILD_sortedBlockReprs_FROM_sortedBlockStructures(sortedBlockStructures);
  const fileContent = BUILD_fileContent_FROM_sortedBlockReprs(sortedBlockReprs);
  return sortedBlockReprs.join(NEW_LINE);
}