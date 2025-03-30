import { TFile, Vault } from 'obsidian';
import { appendToFile, doesFileContainContent } from './utils';
import { addBlocksToNote } from 'prompts/endgame/noteManagement/new-note';

export class FileService {
    constructor(private vault: Vault) {}

    async readFileContentByPath(filePath: string): Promise<{ content: string, error: true } | { content: string, error: false }> {
        const file = this.vault.getAbstractFileByPath(filePath);
        if (!file || !(file instanceof TFile)) {
          return { content: "", error: true };
        }
        try {
            const content = await this.vault.read(file);
            return { content, error: false }
        } catch (error) {
            return { content: "", error: true }
        }
    }

    async appendToFile(filePath: string, text: string): Promise<void> {
        return appendToFile(this.vault, filePath, text);
    }

    async doesFileContainContent(path: string, content: string): Promise<boolean | null> {
        return doesFileContainContent(this.vault, path, content);
    }
}
