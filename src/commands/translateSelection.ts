import { Editor, Notice } from 'obsidian';
import MyPlugin from '../main';
import { getSelection } from '../utils';

export default async function translateSelection(plugin: MyPlugin, editor: Editor) {
    const selection = await getSelection(editor);
    if (!selection) return;

    try {
        const cursor = editor.getCursor();
        const response = await plugin.apiService.translateText(selection);
        if (response) {
            editor.replaceSelection(selection + '\n\n' + response + '\n');
            editor.setCursor({
                line: cursor.line,
                ch: cursor.ch + selection.length
            });
        }
    } catch (error) {
        new Notice(`Error: ${error.message}`);
    }
} 