import { Editor, MarkdownView } from 'obsidian';
import MyPlugin from '../main';
import { formatSelectionWithNumber as formatSelectionWithNumberFn } from './functions';

export default async function formatSelectionWithNumber(plugin: MyPlugin, editor: Editor, view: MarkdownView) {
    await formatSelectionWithNumberFn(plugin, editor, view);
} 