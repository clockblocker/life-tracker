import { Editor, MarkdownView, Notice } from 'obsidian';
import MyPlugin from '../main';
import { getSelection, getCurrentFileName, formatSelectionWithBacklink } from '../utils';

export default async function normalizeSelection(plugin: MyPlugin, editor: Editor, view: MarkdownView, linkSource?: boolean) {
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
                const formattedText = linkSource ? await formatSelectionWithBacklink(response, currentFileName, nextNumber) : response;
                editor.replaceSelection(`${formattedText}`);
            }
        }
    } catch (error) {
        new Notice(`Error: ${error.message}`);
    }
} 