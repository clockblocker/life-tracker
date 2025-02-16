import { Editor, MarkdownView, Notice } from 'obsidian';
import MyPlugin from '../main';
import { getWordFromFilename } from '../utils';

export default async function getInfinitiveAndEmoji(plugin: MyPlugin, editor: Editor, view: MarkdownView) {
    const word = await getWordFromFilename(view);
    if (!word) return;

    try {
        const response = await plugin.apiService.determineInfinitiveAndEmoji(word);
        if (response) {
            const formattedText = `${response}\n`;
            editor.replaceSelection(formattedText);
        }
    } catch (error) {
        new Notice(`Error: ${error.message}`);
    }
} 