import { Editor, MarkdownView, TFile, Vault, normalizePath } from 'obsidian';

export const longDash =  "—";

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

export async function formatSelectionWithBacklink(selection: string, currentFileName: string, nextNumber: number): Promise<string> {
    // Strip all newline characters and spaces from the end of the selection
    selection = selection.replace(/[\s\n]+$/, '');

    const formattedBacklink = `[[${currentFileName}#^${nextNumber}|(q)]]`;
    return `${formattedBacklink} ${selection} ^${nextNumber}\n`;
}

export async function appendToFile(vault: Vault, filePath: string, text: string): Promise<void> {
    try {
        const normalizedPath = normalizePath(filePath);
        let abstractFile = vault.getAbstractFileByPath(normalizedPath);

        if (!abstractFile || !(abstractFile instanceof TFile)) {
            await vault.create(normalizedPath, '');
            abstractFile = vault.getAbstractFileByPath(normalizedPath);

            if (!abstractFile || !(abstractFile instanceof TFile)) {
                console.error(`Failed to create file "${normalizedPath}".`);
                return;
            }
        }

        await vault.process(abstractFile, (currentContent) => {
            return currentContent + text;
        });
    } catch (error) {
        console.error(`Failed to append to file ${filePath}: ${error}`);
        throw error;
    }
}

export async function doesFileContainContent(vault: Vault, path: string, content: string): Promise<boolean | null> {
    try {
        const normalizedPath = normalizePath(path);
        const file = vault.getAbstractFileByPath(normalizedPath);
        
        if (!file || !(file instanceof TFile)) {
            return null;
        }

        const fileContent = await vault.read(file);
        return fileContent.includes(content);
    } catch (error) {
        console.error(`Failed to check file content ${path}: ${error}`);
        return null;
    }
}
