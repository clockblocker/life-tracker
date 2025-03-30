import { TFile, Vault } from "obsidian";

export async function addBlocksToNote(vault: Vault, filePath: string): Promise<void> {
    const file = vault.getAbstractFileByPath(filePath);
    if (!file || !(file instanceof TFile)) {
      console.error("File not found or is not a valid file");
      return;
    }
    
    let content = await vault.read(file);



    // await vault.modify(file, content);
}