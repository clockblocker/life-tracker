import { Notice, TFile, Vault } from 'obsidian';

export class FileService {
    constructor(private vault: Vault) {}

    async appendToFile(filePath: string, text: string): Promise<void> {
        try {
            const abstractFile = await this.vault.getAbstractFileByPath(filePath);

            if (!abstractFile || !(abstractFile instanceof TFile)) {
                console.error(`File "${filePath}" not found.`);
                return;
            }

            let fileContent = await this.vault.read(abstractFile);
            if (!fileContent.endsWith('\n')) {
                text = '\n' + text;
            }
            await this.vault.append(abstractFile, text);
        } catch (error) {
            console.error(`Failed to append to file ${filePath}: ${error}`);
            throw error;
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
