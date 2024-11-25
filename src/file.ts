import { Notice, TFile, Vault } from 'obsidian';

export class FileService {
    constructor(private vault: Vault) {}

    async appendToFile(path: string, content: string) {
        const file = this.vault.getAbstractFileByPath(path);
        
        if (!file) {
            try {
                await this.vault.create(path, content);
            } catch (error) {
                new Notice(`Error creating file: ${error.message}`);
            }
            return;
        }

        if (!(file instanceof TFile)) {
            new Notice(`File ${path} does not exist or is not a valid file!`);
            return;
        }

        try {
            const currentContent = await this.vault.read(file);
            const newContent = currentContent + content;
            await this.vault.modify(file, newContent);
        } catch (error) {
            new Notice(`Error appending to file: ${error.message}`);
        }
    }

    async doesFileContainContent(path: string, content: string): Promise<boolean | null> {
        const file = this.vault.getAbstractFileByPath(path);
        
        if (!file || !(file instanceof TFile)) {
            return null;
        }

        const fileContent = await this.vault.read(file);
        return fileContent.includes(content);
    }
}
