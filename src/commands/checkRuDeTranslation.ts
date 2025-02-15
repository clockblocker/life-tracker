import { Editor, MarkdownView, Notice } from 'obsidian';
import MyPlugin from '../main';
import { checkRuDeTranslation as checkRuDeTranslationFn } from './functions';

export default async function checkRuDeTranslation(plugin: MyPlugin, editor: Editor) {
    await checkRuDeTranslationFn(plugin, editor);
} 