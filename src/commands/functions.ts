import { Editor, MarkdownView, Notice } from 'obsidian';
import MyPlugin from '../main';

export async function fillTemplate(plugin: MyPlugin, editor: Editor, view: MarkdownView) {
    const fileName = view.file?.name;
    if (!fileName) {
        new Notice('Current file is missing a title');
        return;
    }

    const word = fileName.slice(0, -3);
    try {
        const response = await plugin.apiService.fetchTemplate(word);
        if (response && view?.file?.path) {
            await plugin.fileService.appendToFile(view.file.path, response);
        }
    } catch (error) {
        new Notice(`Error: ${error.message}`);
    }
}

export async function getInfinitiveAndEmoji(plugin: MyPlugin, editor: Editor, view: MarkdownView) {
    const fileName = view.file?.name;
    if (!fileName) {
        new Notice('Current file is missing a title');
        return;
    }

    const word = fileName.slice(0, -3);
    try {
        const response = await plugin.apiService.determineInfinitiveAndEmoji(word);
        if (response) {
            const formattedText = `${response}\n`;
            editor.replaceSelection(formattedText);
        }
    } catch (error) {
        new Notice(`Error: ${error.message}`);
    }
}

export async function duplicateSelection(plugin: MyPlugin, editor: Editor, view: MarkdownView) {
    const selection = editor.getSelection();
    if (!selection) {
        new Notice('No text selected');
        return;
    }

    const currentFileName = view.file?.name;
    if (!currentFileName) {
        new Notice('Current file is missing a title');
        return;
    }

    try {
        if (view.file) {
            const fileContent = await plugin.app.vault.read(view.file);
            const maxNumber = plugin.findHighestNumber(fileContent);
            const nextNumber = maxNumber + 1;

            const response = await plugin.apiService.makeBrackets(selection);
            if (response) {
                const formattedBacklink = `[[${currentFileName}#^${nextNumber}|(q)]]`;
                const formattedText = `${formattedBacklink} ${response} ^${nextNumber}\n`;

                editor.replaceSelection(formattedText);
            }
        }
    } catch (error) {
        new Notice(`Error: ${error.message}`);
    }
}

export async function translateSelection(plugin: MyPlugin, editor: Editor) {
    const selection = editor.getSelection();
    if (!selection) {
        new Notice('No text selected');
        return;
    }

    try {
        const cursor = editor.getCursor();
        const response = await plugin.apiService.translateText(selection);
        if (response) {
            editor.replaceSelection(selection + '\n\n' + response + '\n');
            editor.setCursor({
                line: cursor.line,
                ch: cursor.ch + selection.length
            });
        }
    } catch (error) {
        new Notice(`Error: ${error.message}`);
    }
}

export async function formatSelectionWithNumber(plugin: MyPlugin, editor: Editor, view: MarkdownView) {
    const selection = editor.getSelection();
    if (!selection) {
        new Notice('No text selected');
        return;
    }

    const currentFileName = view.file?.name;
    if (!currentFileName) {
        new Notice('Current file is missing a title');
        return;
    }

    try {
        if (view.file) {
            const fileContent = await plugin.app.vault.read(view.file);
            const maxNumber = plugin.findHighestNumber(await fileContent);
            const nextNumber = maxNumber + 1;
            const formattedBacklink = `[[${currentFileName}#^${nextNumber}|(q)]]`;

            await navigator.clipboard.writeText(`${selection} ${formattedBacklink} \n`);
            editor.replaceSelection(`${formattedBacklink} ${selection} ^${nextNumber}\n`);
        }
    } catch (error) {
        new Notice(`Error: ${error.message}`);
    }
}

export async function checkRuDeTranslation(plugin: MyPlugin, editor: Editor) {
    const selection = editor.getSelection();
    if (!selection) {
        new Notice('No text selected');
        return;
    }

    try {
        const response = await plugin.apiService.checkRuDeTranslation(selection);
        if (response) {
            editor.replaceSelection(selection + '\n' + response + '\n');
        }
    } catch (error) {
        new Notice(`Error: ${error.message}`);
    }
} 