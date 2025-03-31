import { TFile, Vault } from 'obsidian';
import { appendToFile, doesFileContainContent } from './utils';

export class FileService {
	constructor(private vault: Vault) {}

	async readFileContentByPath(
		filePath: string
	): Promise<
		{ content: string; error: true } | { content: string; error: false }
	> {
		try {
			const file = this.vault.getAbstractFileByPath(filePath);
			if (!file || !(file instanceof TFile)) {
				return { content: '', error: true };
			}
			const content = await this.vault.read(file);
			return { content, error: false };
		} catch (error) {
			return { content: '', error: true };
		}
	}

	async replaceFileContent(
		filePath: string,
		newContent: string
	): Promise<{ error: boolean }> {
		try {
			const abstractFile = this.vault.getAbstractFileByPath(filePath);

			if (!abstractFile || !(abstractFile instanceof TFile)) {
				// await vault.create(normalizedPath, '');
				// abstractFile = vault.getAbstractFileByPath(normalizedPath);
				return { error: true };

				// if (!abstractFile || !(abstractFile instanceof TFile)) {
				//     console.error(`Failed to create file "${normalizedPath}".`);
				//     return { error: true };
				// }
			}

			await this.vault.process(abstractFile, () => {
				return newContent;
			});

			return { error: false };
		} catch (error) {
			console.error(`Failed to append to file ${filePath}: ${error}`);
			return { error: true };
		}
	}

	async appendToFile(filePath: string, text: string): Promise<void> {
		return appendToFile(this.vault, filePath, text);
	}

	async doesFileContainContent(
		path: string,
		content: string
	): Promise<boolean | null> {
		return doesFileContainContent(this.vault, path, content);
	}
}
