import { Vault } from 'obsidian';
import { appendToFile, doesFileContainContent } from './utils';
import { addBlocksToNote } from 'prompts/endgame/noteManagement/new-note';

export class FileService {
    constructor(private vault: Vault) {}

    async appendToFile(filePath: string, text: string): Promise<void> {
        return appendToFile(this.vault, filePath, text);
    }

    async doTheThing(filePath: string, text: string): Promise<void> {
        addBlocksToNote(this.vault, filePath)
    }

    async doesFileContainContent(path: string, content: string): Promise<boolean | null> {
        return doesFileContainContent(this.vault, path, content);
    }
}
