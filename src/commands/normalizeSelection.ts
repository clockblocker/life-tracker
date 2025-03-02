import { Editor, Notice, TFile } from 'obsidian';
import TextEaterPlugin from '../main';

export default async function normalizeSelection(plugin: TextEaterPlugin, editor: Editor, file: TFile, selection: string, addSourceLink: boolean) {
    try {
        const response = await plugin.apiService.makeBrackets(selection);
        if (response) {
            editor.replaceSelection(response);
        }
    } catch (error) {
        new Notice(`Error: ${error.message}`);
    }
} 