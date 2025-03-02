import { Editor, MarkdownView } from 'obsidian';

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

// These functions are no longer needed since we're doing the checks in editorCheckCallback
// But we'll keep them for backward compatibility, just simplified

export async function getWordFromFilename(view: MarkdownView): Promise<string> {
    return view.file.basename;
}

export async function getSelection(editor: Editor): Promise<string> {
    return editor.getSelection();
}

export async function getCurrentFileName(view: MarkdownView): Promise<string> {
    return view.file.basename;
}

export async function formatSelectionWithBacklink(selection: string, currentFileName: string, nextNumber: number): Promise<string> {
    // Strip all newline characters and spaces from the end of the selection
    selection = selection.replace(/[\s\n]+$/, '');

    const formattedBacklink = `[[${currentFileName}#^${nextNumber}|(q)]]`;
    return `${formattedBacklink} ${selection} ^${nextNumber}\n`;
}
