import { Editor, MarkdownView, Notice } from 'obsidian';
import MyPlugin from '../main';
import { getWordFromFilename } from '../utils';

export default async function getInfinitiveAndEmoji(plugin: MyPlugin, editor: Editor, view: MarkdownView) {
    const word = await getWordFromFilename(view);
    if (!word) return;

    try {
        let response = await plugin.apiService.determineInfinitiveAndEmoji(word);
        if (response) {
            response = response.replace(/^\n+/, '');
            response = response.trim();
            if (view.file?.path) {
                await plugin.fileService.appendToFile(view.file.path, response + '\n');
            }
        }
    } catch (error) {
        new Notice(`Error: ${error.message}`);
    }
} 