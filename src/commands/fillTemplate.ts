import { Editor, MarkdownView } from 'obsidian';
import MyPlugin from '../main';
import { fillTemplate as fillTemplateFn } from './functions';

export default async function fillTemplate(plugin: MyPlugin, editor: Editor, view: MarkdownView) {
    await fillTemplateFn(plugin, editor, view);
} 