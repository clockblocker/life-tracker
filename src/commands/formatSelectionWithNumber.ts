import { Editor, TFile } from 'obsidian';
import TextEaterPlugin from '../main';
import { formatSelectionWithBacklink } from '../utils';

export default async function formatSelectionWithNumber(plugin: TextEaterPlugin, editor: Editor, file: TFile, selection: string) {
    const currentFileName = file.basename;
    
    try {
        const fileContent = await plugin.app.vault.read(file);
        const maxNumber = plugin.findHighestNumber(fileContent);
        const nextNumber = maxNumber + 1;

        const formattedText = await formatSelectionWithBacklink(selection, currentFileName, nextNumber);

        await navigator.clipboard.writeText(`${formattedText} \n`);
        editor.replaceSelection(`${formattedText}\n`);
    } catch (error) {
        console.error('Error formatting selection with number:', error);
    }
} 