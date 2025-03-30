import { TFile, Vault } from "obsidian";
import { cssClassNameFromBlockTitle, elementStringFromBlockTitle, reprFromBlockSchema, BlockTitle, BLOCK_DELIMETER, allBlockTitles } from "./types-and-constants";

/**
 * Build a regex that captures a block in the note.
 * It captures:
 *   - group 1: the block title element (e.g. the <span>...</span>)
 *   - group 2: all text content until the next delimiter (a newline + delim), or the next tag, or the end of file.
 *
 * @param blockTitle - The block title value.
 * @param delim - The delimiter string (e.g. '---').
 * @returns a RegExp to capture the block and its content.
 */
function getBlockRegex(blockTitle: BlockTitle): RegExp {
    const cssClass = cssClassNameFromBlockTitle[blockTitle];
    return new RegExp(
      `(<span\\s+class=["']block_title\\s+${cssClass}["']>[^<]+</span>)([\\s\\S]*?)(?=(${BLOCK_DELIMETER}|<|$))`,
      "g"
    );
  }
  
  /**
   * Extracts the content of a block from the note.
   *
   * @param content - The full note content.
   * @param blockTitle - The block title.
   * @param delim - The delimiter string.
   * @returns The content (trimmed) found for the block, or null if not found.
   */
  function extractBlockContent(content: string, blockTitle: BlockTitle): string {
    const regex = getBlockRegex(blockTitle);
    const match = regex.exec(content);
    return match ? match[2].trim() : "";
  }
  
  /* ================= Transformation Helpers ================= */
  
  /**
   * Integrates the existing file content into the new block representations.
   *
   * For each block:
   *   - If the block exists in the file and its title is "Kontexte", its existing content is preserved.
   *   - For all other blocks, the new representation replaces any existing content.
   *   - If a block does not exist, the new representation is used.
   *
   * @param newRepr - The new representations (Record of BlockTitle to string).
   * @param fileContent - The current note content.
   * @param delim - The delimiter string.
   * @returns An enriched representation record.
   */
  function integrateExistingContentIntoBlocks(
    newRepr: Partial<Record<BlockTitle, string>>,
    fileContent: string,
  ): Record<BlockTitle, string> {
    const enriched: Record<BlockTitle, string> = {} as Record<BlockTitle, string>;
    (Object.keys(newRepr) as BlockTitle[]).forEach((block) => {
      const existing = extractBlockContent(fileContent, block);
      enriched[block] = existing + newRepr;
    });
    return enriched;
  }
  /**
   * Converts a representation record into the final file content.
   *
   * It reassembles each block using its title element, the provided content, and appends the delimiter.
   *
   * @param enrichedRepr - The enriched representation record.
   * @returns The complete note content as a string.
   */
  function buildContentFromEnrichedBlocks(
    enrichedRepr: Record<BlockTitle, string>,
  ): string {
    let finalContent = "";
    (Object.keys(enrichedRepr) as BlockTitle[]).forEach((block) => {
      const titleElement = elementStringFromBlockTitle[block];
      const blockContent = enrichedRepr[block];
      finalContent += `${titleElement}\n${blockContent}\n\n${BLOCK_DELIMETER}\n`;
    });
    return finalContent.trim();
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
   * @param vault - The Obsidian Vault instance.
   * @param filePath - The path to the note file.
   * @param reprFromBlock - A record mapping BlockTitle to the new string.
   */
  export async function makeNewFileContent(
    fileContent: string,
    reprFromBlock: Partial<Record<BlockTitle, string>>
  ): Promise<string> {
    // Enrich the new representations by integrating existing content (if any).
    const enrichedRepr = integrateExistingContentIntoBlocks(reprFromBlock, fileContent);
  
    // Build the final file content from the enriched representations.
    const finalContent = buildContentFromEnrichedBlocks(enrichedRepr);
  
    return finalContent;
  }