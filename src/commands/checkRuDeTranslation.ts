import { Editor, Notice } from 'obsidian';
import MyPlugin from '../main';
import { getSelection } from '../utils';

export default async function checkRuDeTranslation(plugin: MyPlugin, editor: Editor) {
    const selection = await getSelection(editor);
    if (!selection) return;

    try {
        const response = await plugin.apiService.checkRuDeTranslation(selection);
        if (response) {
            editor.replaceSelection(selection + '\n' + response + '\n');
        }
    } catch (error) {
        new Notice(`Error: ${error.message}`);
    }
} 