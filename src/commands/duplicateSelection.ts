import { Editor, MarkdownView } from 'obsidian';
import MyPlugin from '../main';
import { duplicateSelection as duplicateSelectionFn } from './functions';

export default async function duplicateSelection(plugin: MyPlugin, editor: Editor, view: MarkdownView) {
    await duplicateSelectionFn(plugin, editor, view);
} 