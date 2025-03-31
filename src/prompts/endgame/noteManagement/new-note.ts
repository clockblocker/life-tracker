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
 * Builds a regular expression to capture a block’s title element and its content from the note.
 *
 * The regex captures:
 * - Group 1: The block title element (e.g. the `<span>` element)
 * - Group 2: The content following the title element, until a block delimiter, another tag, or end-of-input.
 *
 * @param params - An object containing:
 *   - blockId: The block identifier used to determine the CSS class.
 * @returns A RegExp instance to capture the block’s title element and its content.
 */
function getBlockRegex({ blockId }: { blockId: BlockId }): RegExp {
  const cssClass = cssClassNameFromBlockId[blockId];
  return new RegExp(
    `(<span\\s+class=["']block_title\\s+${cssClass}["']>[^<]+</span>)([\\s\\S]*?)(?=(${BLOCK_DELIMETER}|<|$))`,
    "g"
  );
}

/**
 * Extracts and returns the trimmed content of a specified block from the provided note content.
 *
 * @param params - An object containing:
 *   - content: The complete note content.
 *   - blockId: The block identifier to extract content from.
 * @returns The trimmed content for the specified block, or an empty string if not found.
 */
function extractBlockContent({
  content,
  blockId,
}: {
  content: string;
  blockId: BlockId;
}): string {
  const regex = getBlockRegex({ blockId });
  const match = regex.exec(content);
  return match ? match[2].trim() : "";
}

/* ================= Transformation Helpers ================= */

/**
 * Merges new block content with existing file content to produce an updated content record.
 *
 * For each block:
 *   - Preserves any existing content.
 *   - Appends new content for the block.
 *   - If the merged content is empty but the block is required, it still creates an empty entry.
 *
 * @param params - An object containing:
 *   - newContentFromBlockId: A partial record mapping BlockId to the new content.
 *   - fileContent: The current complete note content.
 *   - setOfBlockIdsToCreateIfEmpty: A set of BlockIds that must be present in the output.
 * @returns A record mapping each BlockId to its updated (merged) content.
 */
function integrateExistingContentIntoBlocks({
  newContentFromBlockId,
  fileContent,
  setOfBlockIdsToCreateIfEmpty,
}: {
  newContentFromBlockId: Partial<ContentFromBlockId>;
  fileContent: string;
  setOfBlockIdsToCreateIfEmpty: Set<BlockId>;
}): ContentFromBlockId {
  const mergedBlockContentFromBlockId: ContentFromBlockId = {} as ContentFromBlockId;

  ALL_BLOCK_IDS.forEach((blockId) => {
    const oldBlockContent = extractBlockContent({ content: fileContent, blockId });
    const newBlockContent = newContentFromBlockId?.[blockId] || "";
    const mergedBlockContent = oldBlockContent + newBlockContent;

    if (mergedBlockContent || setOfBlockIdsToCreateIfEmpty.has(blockId)) {
      mergedBlockContentFromBlockId[blockId] = mergedBlockContent;
    }
  });

  return mergedBlockContentFromBlockId;
}

/**
 * Returns a new array of objects sorted by their block weight.
 *
 * @param blockIdsAndSomething - An array of objects that each include an `id` property of type BlockId.
 * @returns A new array sorted in ascending order by the block's weight.
 */
function getNewSortedListByBlockId<T extends { id: BlockId }>(
  blockIdsAndSomething: T[]
): T[] {
  return [...blockIdsAndSomething].sort(
    (a, b) => weightFromBlockId[a.id] - weightFromBlockId[b.id]
  );
}

/**
 * Converts the merged content record into an array of sorted block structures.
 *
 * Each BlockStructure is constructed using:
 *   - A trimmed header element.
 *   - The trimmed block content.
 *   - Pre-delimiter spacing and the block delimiter.
 *
 * @param mergedContentFromBlockId - A record mapping BlockId to its merged content.
 * @returns An array of BlockStructure objects sorted by block weight.
 */
function BUILD_sortedBlockStructures_FROM_mergedContentFromBlockId(
  mergedContentFromBlockId: Partial<ContentFromBlockId>
): BlockStructure[] {
  const blocksIdsAndStructures: { id: BlockId; structure: BlockStructure }[] = [];

  ALL_BLOCK_IDS.forEach((id) => {
    const blockContent = mergedContentFromBlockId?.[id];
    if (blockContent === undefined) {
      return;
    }

    const trimmedHeaderElement = blockHeaderElementFromBlockId[id].trim();
    const trimmedContent = blockContent.trim();
    const preDelimeterSpacing = preDelimeterSpacingFromBlockId[id];

    const structure = {
      headerElement: trimmedHeaderElement,
      content: trimmedContent,
      preDelimeterSpacing,
      delimeter: BLOCK_DELIMETER,
    };

    blocksIdsAndStructures.push({ id, structure });
  });

  return getNewSortedListByBlockId(blocksIdsAndStructures).map(
    ({ structure }) => structure
  );
}

/**
 * Converts an array of sorted block structures into an array of block representation strings.
 *
 * Each block representation is created by joining the header element, content, and a combined
 * string of pre-delimiter spacing with the delimiter, using newlines.
 *
 * @param sortedBlockStructures - An array of BlockStructure objects.
 * @returns An array of block representation strings sorted by block weight.
 */
function BUILD_sortedBlockReprs_FROM_sortedBlockStructures(
  sortedBlockStructures: BlockStructure[]
): BlockRepr[] {
  const blockReprs = sortedBlockStructures.map(
    ({ headerElement, content, preDelimeterSpacing, delimeter }) => {
      const spacedOutDelimiter = preDelimeterSpacing + delimeter;
      const nonEmptyParts = [headerElement, content, spacedOutDelimiter].filter((s) => s);
      return nonEmptyParts.join(NEW_LINE);
    }
  );

  return blockReprs;
}

/**
 * Constructs the complete file content by joining block representation strings with newline separators.
 *
 * @param sortedBlockReprs - An array of block representation strings.
 * @returns The final file content as a single string.
 */
function BUILD_fileContent_FROM_sortedBlockReprs(
  sortedBlockReprs: BlockRepr[]
): string {
  return sortedBlockReprs.join(NEW_LINE);
}

/* ================= Main Function ================= */

/**
 * Updates the note content by merging new block representations with the existing file content.
 *
 * The function performs the following steps:
 *   1. Merges new content into the existing blocks (while preserving specific blocks like "Kontexte").
 *   2. Rebuilds the complete note content from the updated block content.
 *   3. Returns the final note content as a string.
 *
 * @param params - An object containing:
 *   - oldFileContent: The existing complete note content.
 *   - blockContentFromBlockId: A partial record mapping BlockId to new content.
 *   - setOfBlockIdsToCreateIfEmpty: (Optional) A set of BlockIds that must be present in the output.
 * @returns A promise that resolves to the updated complete note content.
 */
export async function makeNewFileContent({
  oldFileContent,
  blockContentFromBlockId,
  setOfBlockIdsToCreateIfEmpty = SET_OF_REQUIRED_TECHNIKAL_BLOCK_IDS,
}: {
  oldFileContent: FileContent;
  blockContentFromBlockId: Partial<ContentFromBlockId>;
  setOfBlockIdsToCreateIfEmpty?: Set<BlockId>;
}): Promise<FileContent> {
  const mergedContentFromBlockId = integrateExistingContentIntoBlocks({
    newContentFromBlockId: blockContentFromBlockId,
    fileContent: oldFileContent,
    setOfBlockIdsToCreateIfEmpty,
  });

  const sortedBlockStructures = BUILD_sortedBlockStructures_FROM_mergedContentFromBlockId(
    mergedContentFromBlockId
  );
  
  const sortedBlockReprs = BUILD_sortedBlockReprs_FROM_sortedBlockStructures(
    sortedBlockStructures
  );

  const fileContent = BUILD_fileContent_FROM_sortedBlockReprs(sortedBlockReprs);
  return fileContent;
}