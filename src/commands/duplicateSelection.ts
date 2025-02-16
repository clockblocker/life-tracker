import { Editor, MarkdownView, Notice } from 'obsidian';
import MyPlugin from '../main';
import { getSelection, getCurrentFileName } from '../utils';

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
                const formattedBacklink = `[[${currentFileName}#^${nextNumber}|(q)]]`;
                const formattedText = `${formattedBacklink} ${response} ^${nextNumber}\n`;

                editor.replaceSelection(formattedText);
            }
        }
    } catch (error) {
        new Notice(`Error: ${error.message}`);
    }
} 