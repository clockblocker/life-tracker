import { Editor, MarkdownView, Notice } from 'obsidian';
import MyPlugin from '../main';
import { getSelection, getCurrentFileName } from '../utils';

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
            const formattedBacklink = `[[${currentFileName}#^${nextNumber}|(q)]]`;

            await navigator.clipboard.writeText(`${selection} ${formattedBacklink} \n`);
            editor.replaceSelection(`${formattedBacklink} ${selection} ^${nextNumber}\n`);
        }
    } catch (error) {
        new Notice(`Error: ${error.message}`);
    }
} 