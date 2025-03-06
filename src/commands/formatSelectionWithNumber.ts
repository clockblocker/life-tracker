import { Editor, TFile } from 'obsidian';
import TextEaterPlugin from '../main';
import { formatSelectionWithBacklink } from '../utils';
import { sentences } from 'sbd';


export default async function formatSelectionWithNumber(plugin: TextEaterPlugin, editor: Editor, file: TFile, selection: string) {
    const currentFileName = file.basename;

    const splitSentences = sentences(selection, {
        preserve_whitespace: false,
        newline_boundaries: false,
        html_boundaries: false,
        sanitize: true,
    });
    
    try {
        const fileContent = editor.getValue();
        const maxNumber = plugin.findHighestNumber(fileContent);
        const nextNumber = maxNumber + 1;

        let formattedText = '';

        if (splitSentences.length <= 2) {
            formattedText = formatSelectionWithBacklink(selection, currentFileName, nextNumber)
        } else {
            formattedText = splitSentences.map((s, i) => formatSelectionWithBacklink(s, currentFileName, nextNumber + i)).join('\n')
        }

        await navigator.clipboard.writeText(`${formattedText}`);
        editor.replaceSelection(`${formattedText}`);
    } catch (error) {
        console.error('Error formatting selection with number:', error);
    }
} 