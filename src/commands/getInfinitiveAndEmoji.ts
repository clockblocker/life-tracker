import { Editor, MarkdownView, Notice } from 'obsidian';
import MyPlugin from '../main';
import { getInfinitiveAndEmoji as getInfinitiveAndEmojiFn } from './functions';

export default async function getInfinitiveAndEmoji(plugin: MyPlugin, editor: Editor, view: MarkdownView) {
    await getInfinitiveAndEmojiFn(plugin, editor, view);
} 