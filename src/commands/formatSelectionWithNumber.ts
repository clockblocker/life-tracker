import { Editor, MarkdownView, Notice } from 'obsidian';
import MyPlugin from '../main';
import { getSelection, getCurrentFileName, formatSelectionWithBacklink } from '../utils';

export default async function formatSelectionWithNumber(plugin: MyPlugin, editor: Editor, view: MarkdownView) {
    const selection = await getSelection(editor);
    if (!selection) return;

    const currentFileName = await getCurrentFileName(view);
    if (!currentFileName) return;

    try {
        if (view.file) {
            const fileContent = await plugin.app.vault.read(view.file);
            const maxNumber = plugin.findHighestNumber(await fileContent);
            const nextNumber = maxNumber + 1;

            const formattedText = await formatSelectionWithBacklink(selection, currentFileName, nextNumber);

            await navigator.clipboard.writeText(`${formattedText} \n`);
            editor.replaceSelection(`${formattedText}\n`);
        }
    } catch (error) {
        new Notice(`Error: ${error.message}`);
    }
} 