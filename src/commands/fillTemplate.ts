import { Editor, MarkdownView, Notice, TFile } from 'obsidian';
import TextEaterPlugin from '../main';

export default async function fillTemplate(plugin: TextEaterPlugin, editor: Editor, file: TFile) {
    const word = file.basename;

    try {
        const response = await plugin.apiService.fetchTemplate(word);
        if (response) {
            await plugin.fileService.appendToFile(file.path, response);
        }
    } catch (error) {
        new Notice(`Error: ${error.message}`);
    }
} 