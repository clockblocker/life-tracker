import {
  cssClassNameFromBlockId,
  blockHeaderElementFromBlockId,
  BlockId,
  BLOCK_DELIMETER,
  ALL_BLOCK_IDS,
  weightFromBlockId,
  preDelimeterSpacingFromBlockId,
  SET_OF_REQUIRED_TECHNIKAL_BLOCK_IDS
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
 *   - newReprFromBlockId: A partial record mapping BlockId to the new content.
 *   - fileContent: The current complete note content.
 * @returns An enriched record mapping each BlockId to its updated content.
 */
function integrateExistingContentIntoBlocks({
  newReprFromBlockId,
  fileContent
}: {
  newReprFromBlockId: Partial<Record<BlockId, string>>,
  fileContent: string
}): Record<BlockId, string> {
  const enriched: Record<BlockId, string> = {} as Record<BlockId, string>;
  ALL_BLOCK_IDS.forEach((blockId) => {
    const existing = extractBlockContent({ content: fileContent, blockId });
    const newRepr = newReprFromBlockId?.[blockId] || "";
    enriched[blockId] = existing + newRepr;
  });
  return enriched;
}

export type BlockIdAndContent = { id: BlockId, content: string };

/**
 * Sort an array of BlockId and content objects by the defined weight for each BlockId.
 *
 * @param params - An object with:
 *   - blockIdsAndContents: An array of objects each containing a BlockId and its content.
 * @returns A new array sorted by the block weight.
 */
function getSortedBlockIdsAndContents({
  blockIdsAndContents
}: {
  blockIdsAndContents: BlockIdAndContent[]
}): BlockIdAndContent[] {
  return [...blockIdsAndContents].sort(
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
 * @param params - An object with:
 *   - enrichedReprFromBlockId: A record mapping BlockId to its enriched content.
 * @returns An array of BlockIdAndContent objects sorted by block weight.
 */
function buildSortedBlockIdsAndContentsFromEnrichedBlocks({
  enrichedReprFromBlockId
}: {
  enrichedReprFromBlockId: Record<BlockId, string>
}): BlockIdAndContent[] {
  const blockIdsAndContents: BlockIdAndContent[] = [];

  ALL_BLOCK_IDS.forEach((id) => {
    const headerElement = blockHeaderElementFromBlockId[id].trim();
    const blockContent = enrichedReprFromBlockId[id].trim();
    const spacedOutDelimiter = preDelimeterSpacingFromBlockId[id] + BLOCK_DELIMETER;

    const parts = [headerElement, blockContent, spacedOutDelimiter].filter(s => s);
    const content = parts.join("\n");

    blockIdsAndContents.push({ id, content });
  });

  return getSortedBlockIdsAndContents({ blockIdsAndContents });
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
 * @param params - An object with:
 *   - oldFileContent: The existing note content.
 *   - blockContentFromBlockId: A partial record mapping BlockId to new block content.
 *   - blockIdsToCreateIfEmpty: (Optional) A set of BlockIds that must be present even if empty.
 * @returns The updated complete note content.
 */
export async function makeNewFileContent({
  oldFileContent,
  blockContentFromBlockId,
  blockIdsToCreateIfEmpty = SET_OF_REQUIRED_TECHNIKAL_BLOCK_IDS,
}: {
  oldFileContent: string,
  blockContentFromBlockId: Partial<Record<BlockId, string>>,
  blockIdsToCreateIfEmpty?: Set<BlockId>,
}): Promise<string> {
  const enrichedReprFromBlockId = integrateExistingContentIntoBlocks({
    newReprFromBlockId: blockContentFromBlockId,
    fileContent: oldFileContent
  });
  const blockIdsAndContents = buildSortedBlockIdsAndContentsFromEnrichedBlocks({
    enrichedReprFromBlockId
  });
  return blockIdsAndContents.map(({ content }) => content).join("\n");
}