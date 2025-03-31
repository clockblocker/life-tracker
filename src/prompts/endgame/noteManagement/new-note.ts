import { cssClassNameFromBlockId, blockHeaderElementFromBlockId, BlockId, BLOCK_DELIMETER, ALL_BLOCK_IDS, weightFromBlockId, preDelimeterSpacingFromBlockId, SET_OF_REQUIRED_TECHNIKAL_BLOCK_IDS } from "./types-and-constants";

/**
 * Build a regex that captures a block in the note.
 * It captures:
 *   - group 1: the block id element (e.g. the <span>...</span>)
 *
 * @param blockId - The block id value.
 * @returns a RegExp to capture the block and its content.
 */
function getBlockRegex(blockId: BlockId): RegExp {
    const cssClass = cssClassNameFromBlockId[blockId];
    return new RegExp(
      `(<span\\s+class=["']block_title\\s+${cssClass}["']>[^<]+</span>)([\\s\\S]*?)(?=(${BLOCK_DELIMETER}|<|$))`,
      "g"
    );
  }
  
  /**
   * Extracts the content of a block from the note.
   *
   * @param content - The full note content.
   * @param blockId - The block id.
   * @returns The content (trimmed) found for the block, or null if not found.
   */
  function extractBlockContent(content: string, blockId: BlockId): string {
    const regex = getBlockRegex(blockId);
    const match = regex.exec(content);
    return match ? match[2].trim() : "";
  }
  
  /* ================= Transformation Helpers ================= */
  
  /**
   * Integrates the existing file content into the new block representations.
   *
   * For each block:
   *   - If the block exists in the file and its id is "Kontexte", its existing content is preserved.
   *   - For all other blocks, the new representation replaces any existing content.
   *   - If a block does not exist, the new representation is used.
   *
   * @param newRepr - The new representations (Record of BlockId to string).
   * @param fileContent - The current note content.
   * @returns An enriched representation record.
   */
  function integrateExistingContentIntoBlocks(
    newReprFromBlockId: Partial<Record<BlockId, string>>,
    fileContent: string,
  ): Record<BlockId, string> {
    const enriched: Record<BlockId, string> = {} as Record<BlockId, string>;
    (ALL_BLOCK_IDS).forEach((blockId) => {
      const existing = extractBlockContent(fileContent, blockId);
      const newRepr = newReprFromBlockId?.[blockId] || "";
      enriched[blockId] = existing + newRepr;
    });
    return enriched;
  }

type BlockIdAndContent = {id: BlockId, content: string};

function getSortedBlockIdsAndContents(
  blockIdsAndContents: BlockIdAndContent[]
): BlockIdAndContent[] {
  return [...blockIdsAndContents].sort(
    (a, b) => weightFromBlockId[a.id] - weightFromBlockId[b.id]
  );
}

  /**
   * Converts a representation record into the final file content.
   *
   *
   * @param enrichedReprFromBlockId - The enriched representation record.
   * @returns The complete note content as a string.
   */
  function buildSortedBlockIdsAndContentsFromEnrichedBlocks(
    enrichedReprFromBlockId: Record<BlockId, string>,
  ): BlockIdAndContent[] {
    const blockIdsAndContents: BlockIdAndContent[] = [];

    (ALL_BLOCK_IDS).forEach((id) => {
      const headerElement = blockHeaderElementFromBlockId[id].trim();
      const blockContent = enrichedReprFromBlockId[id].trim();
      const spacedOutDemimeter = preDelimeterSpacingFromBlockId[id] + BLOCK_DELIMETER;

      const parts = [headerElement, blockContent, spacedOutDemimeter].filter(s => s);
      const content = parts.join("\n")

      blockIdsAndContents.push({ id, content })
    });

    blockIdsAndContents.sort((a, b) => weightFromBlockId[a.id] - weightFromBlockId[b.id]);

    return getSortedBlockIdsAndContents(blockIdsAndContents);
  }
  
  /* ================= Main Function ================= */
  
  /**
   * Main function: Update the note’s blocks based on the given reprFromBlock record.
   *
   * Workflow:
   * 1. Validate the input record with Zod.
   * 2. Read the existing file content.
   * 3. Integrate the existing content into the new representation (preserving "Kontexte").
   * 4. Rebuild the note content from the enriched representation.
   * 5. Write the final content back to the file.
   *
   * @param oldFileContent - The exsiting file content
   * @param blockContentFromBlockId - A record mapping BlockId to the contents of the new block content.
   * @param blockIdsToCreateIfEmpty - All the other empty blocks shall not me added
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
    const enrichedReprFromBlockId = integrateExistingContentIntoBlocks(blockContentFromBlockId, oldFileContent);
    const blockIdsAndContents = buildSortedBlockIdsAndContentsFromEnrichedBlocks(enrichedReprFromBlockId);
    return blockIdsAndContents.map(({content}) => content).join("\n");
  }