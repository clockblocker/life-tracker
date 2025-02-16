import { Editor, MarkdownView, Notice } from 'obsidian';

export const extractBacklinks = (content: string): string[] => {
    const links = content.split('[[')
        .map(part => part
            .replace(/\\/g, '')
            .split('|')[0]
            .split(']]')[0]
        );
    links.shift();
    return links;
};

export async function getWordFromFilename(view: MarkdownView): Promise<string | null> {
    const fileName = view.file?.name;
    if (!fileName) {
        new Notice('Current file is missing a title');
        return null;
    }

    return fileName.slice(0, -3);
}

export async function getSelection(editor: Editor): Promise<string | null> {
    const selection = editor.getSelection();
    if (!selection) {
        new Notice('No text selected');
        return null;
    }
    return selection;
}

export async function getCurrentFileName(view: MarkdownView): Promise<string | null> {
    const currentFileName = view.file?.name;
    if (!currentFileName) {
        new Notice('Current file is missing a title');
        return null;
    }
    return currentFileName
}
