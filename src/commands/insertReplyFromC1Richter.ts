import { Editor } from 'obsidian';
import TextEaterPlugin from '../main';

export default async function insertReplyFromC1Richter(plugin: TextEaterPlugin, editor: Editor, selection: string, v2?: boolean) {
    try {
        const response = await plugin.apiService.consultC1Richter(selection, v2);
        if (response) {
            editor.replaceSelection(selection + '\n' + response.trim() + '\n');
        }
    } catch (error) {
        console.error('Error in C1 Richter command:', error);
    }
} 