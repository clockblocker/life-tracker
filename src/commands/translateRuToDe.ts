import { Editor, Notice } from 'obsidian';
import TextEaterPlugin from '../main';

export default async function translateRuToDe(plugin: TextEaterPlugin, editor: Editor, selection: string) {
    try {
        const response = await plugin.apiService.translateRuToDe(selection);
        if (response) {
            editor.replaceSelection(selection + '\n' + response + '\n');
        }
    } catch (error) {
        new Notice(`Error: ${error.message}`);
    }
} 