import { Editor, MarkdownView, Notice } from 'obsidian';
import MyPlugin from '../main';
import { translateSelection as translateSelectionFn } from './functions';

export default async function translateSelection(plugin: MyPlugin, editor: Editor) {
    await translateSelectionFn(plugin, editor);
} 