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

export async function formatSelectionWithBacklink(selection: string, currentFileName: string, nextNumber: number): Promise<string> {
    // Strip all newline characters and spaces from the end of the selection
    selection = selection.replace(/[\s\n]+$/, '');

    const formattedBacklink = `[[${currentFileName}#^${nextNumber}|(q)]]`;
    return `${formattedBacklink} ${selection} ^${nextNumber}\n`;
}
