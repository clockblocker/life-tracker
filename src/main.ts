import { Editor, MarkdownView, Notice, Plugin, TFile, normalizePath } from 'obsidian';
import { SettingsTab } from './settings';
import { DEFAULT_SETTINGS, TextEaterSettings } from './types';
import { ApiService } from './api';
import { FileService } from './file';
import fillTemplate from './commands/fillTemplate';
import getInfinitiveAndEmoji from './commands/getInfinitiveAndEmoji';
import normalizeSelection from './commands/normalizeSelection';
import translateSelection from './commands/translateSelection';
import formatSelectionWithNumber from './commands/formatSelectionWithNumber';
import checkRuDeTranslation from './commands/checkRuDeTranslation';
import translateRuToDe from './commands/translateRuToDe';
import addBacklinksToCurrentFile from 'commands/addBacklinksToCurrentFile';

export default class TextEaterPlugin extends Plugin {
    settings: TextEaterSettings;
    apiService: ApiService;
    fileService: FileService;

    async onload() {
        try {
            await this.loadPlugin();
            this.addSettingTab(new SettingsTab(this.app, this));
        } catch (error) {
            console.error('Error during plugin initialization:', error);
            new Notice(`Plugin failed to load: ${error.message}`);
        }
    }

    async loadPlugin() {
        await this.loadSettings();
        this.apiService = new ApiService(this.settings, this.app.vault);
        this.fileService = new FileService(this.app.vault);

        this.addCommand({
            id: 'backlink-all-to-current-file',
            name: 'Add backlinks to the current file in all referenced files',
            editorCheckCallback: (checking: boolean, editor: Editor, view: MarkdownView) => {
                const fileName = view.file?.name;
                const backlink = view.file?.basename;

                console.log("view.file, fileName, backlink", view.file, fileName, backlink);

                if (view.file && fileName && backlink) {
                    if (!checking) {
                        addBacklinksToCurrentFile(view.file, backlink, this.app.vault, this.app.metadataCache);
                    }
                    return true;
                }
                
                return false;
            }
        });

        this.addCommand({
            id: 'fill-template',
            name: 'Generate a dictionary entry for the word in the title of the file',
            editorCheckCallback: (checking: boolean, editor: Editor, view: MarkdownView) => {
                if (view.file) {
                    if (!checking) {
                        fillTemplate(this, editor, view.file);
                    }
                    return true;
                }
                return false;
            }
        });

        this.addCommand({
            id: 'get-infinitive-and-emoji',
            name: 'Get infinitive form and emoji for current word',
            editorCheckCallback: (checking: boolean, editor: Editor, view: MarkdownView) => {
                if (view.file) {
                    if (!checking) {
                        getInfinitiveAndEmoji(this, editor, view.file);
                    }
                    return true;
                }
                return false;
            }
        });

        this.addCommand({
            id: 'duplicate-selection',
            name: 'Add links to normal/inf forms to selected text',
            editorCheckCallback: (checking: boolean, editor: Editor, view: MarkdownView) => {
                const selection = editor.getSelection();
                if (selection && view.file) {
                    if (!checking) {
                        normalizeSelection(this, editor, view.file, selection);
                    }
                    return true;
                }
                return false;
            }
        });

        this.addCommand({
            id: 'translate-selection',
            name: 'Translate selected text and show below',
            editorCheckCallback: (checking: boolean, editor: Editor) => {
                const selection = editor.getSelection();
                if (selection) {
                    if (!checking) {
                        translateSelection(this, editor, selection);
                    }
                    return true;
                }
                return false;
            }
        });

        this.addCommand({
            id: 'format-selection-with-number',
            name: 'Format selection with next number and source link',
            editorCheckCallback: (checking: boolean, editor: Editor, view: MarkdownView) => {
                const selection = editor.getSelection();
                if (selection && view.file) {
                    if (!checking) {
                        formatSelectionWithNumber(this, editor, view.file, selection);
                    }
                    return true;
                }
                return false;
            }
        });

        this.addCommand({
            id: 'translate-ru-to-de',
            name: 'Translate Russian text to German',
            editorCheckCallback: (checking: boolean, editor: Editor) => {
                const selection = editor.getSelection();
                if (selection) {
                    if (!checking) {
                        translateRuToDe(this, editor, selection);
                    }
                    return true;
                }
                return false;
            }
        });

        this.addCommand({
            id: 'check-ru-de-translation',
            name: 'Check Russian-German translation',
            editorCheckCallback: (checking: boolean, editor: Editor) => {
                const selection = editor.getSelection();
                if (selection) {
                    if (!checking) {
                        checkRuDeTranslation(this, editor, selection);
                    }
                    return true;
                }
                return false;
            }
        });
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }

    findHighestNumber(content: string): number {
        const matches = content.match(/#\^(\d+)/g);
        if (!matches) return 0;

        const numbers = matches.map(match => {
            const num = match.replace('#^', '');
            return parseInt(num, 10);
        });

        return Math.max(0, ...numbers);
    }
}
