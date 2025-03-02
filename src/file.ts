import { Vault } from 'obsidian';
import { appendToFile, doesFileContainContent } from './utils';

export class FileService {
    constructor(private vault: Vault) {}

    async appendToFile(filePath: string, text: string): Promise<void> {
        return appendToFile(this.vault, filePath, text);
    }

    async doesFileContainContent(path: string, content: string): Promise<boolean | null> {
        return doesFileContainContent(this.vault, path, content);
    }
}
