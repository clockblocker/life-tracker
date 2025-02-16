import { Editor, MarkdownView, Notice } from 'obsidian';
import MyPlugin from '../main';
import { getWordFromFilename } from '../utils';

export default async function getInfinitiveAndEmoji(plugin: MyPlugin, editor: Editor, view: MarkdownView) {
    const word = await getWordFromFilename(view);
    if (!word) return;

    try {
        const response = await plugin.apiService.determineInfinitiveAndEmoji(word);
        if (response && view.file?.path) {
            await plugin.fileService.appendToFile(view.file.path, response + '\n');
        }
    } catch (error) {
        new Notice(`Error: ${error.message}`);
    }
} 