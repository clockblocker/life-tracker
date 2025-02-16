import { Editor, MarkdownView, Notice } from 'obsidian';
import MyPlugin from '../main';
import { getSelection, getCurrentFileName, formatSelectionWithBacklink } from '../utils';

export default async function duplicateSelection(plugin: MyPlugin, editor: Editor, view: MarkdownView) {
    const selection = await getSelection(editor);
    if (!selection) return;

    const currentFileName = await getCurrentFileName(view);
    if (!currentFileName) return;

    try {
        if (view.file) {
            const fileContent = await plugin.app.vault.read(view.file);
            const maxNumber = plugin.findHighestNumber(fileContent);
            const nextNumber = maxNumber + 1;

            const response = await plugin.apiService.makeBrackets(selection);
            if (response) {
                const formattedText = await formatSelectionWithBacklink(response, currentFileName, nextNumber);
                editor.replaceSelection(`${formattedText}\n`);
            }
        }
    } catch (error) {
        new Notice(`Error: ${error.message}`);
    }
} 