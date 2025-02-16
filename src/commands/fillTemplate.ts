import { Editor, MarkdownView, Notice } from 'obsidian';
import MyPlugin from '../main';
import { getWordFromFilename } from '../utils';

export default async function fillTemplate(plugin: MyPlugin, editor: Editor, view: MarkdownView) {
    const word = await getWordFromFilename(view);
    if (!word) return;

    try {
        const response = await plugin.apiService.fetchTemplate(word);
        if (response && view?.file?.path) {
            await plugin.fileService.appendToFile(view.file.path, response);
        }
    } catch (error) {
        new Notice(`Error: ${error.message}`);
    }
} 