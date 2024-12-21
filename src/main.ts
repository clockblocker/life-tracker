import { Editor, MarkdownView, Notice, Plugin } from 'obsidian';
import { SettingsTab } from './settings';
import { DEFAULT_SETTINGS, MyPluginSettings } from './types';
import { ApiService } from './api';
import { FileService } from './file';
import { extractBacklinks } from './utils';

export default class MyPlugin extends Plugin {
    settings: MyPluginSettings;
    apiService: ApiService;
    fileService: FileService;

    async onload() {
        await this.loadSettings();
        
        this.apiService = new ApiService(this.settings);
        this.fileService = new FileService(this.app.vault);

        this.addCommand({
            id: 'backlink-all-to-current-file',
            name: 'Add backlinks to the current file in all referenced files',
            editorCallback: async (editor: Editor, view: MarkdownView) => {
                const fileName = view.file?.name;
                if (!fileName) {
                    new Notice('Current file is missing a title');
                    return;
                }

                const fileContent = view.data;
                const links = extractBacklinks(fileContent);

                for (const link of links) {
                    const targetPath = `Worter/${link}.md`;
                    const backlink = `[[${fileName.split('.')[0]}]]`;

                    const hasBacklink = await this.fileService.doesFileContainContent(targetPath, backlink);
                    if (!hasBacklink) {
                        await this.fileService.appendToFile(targetPath, `, ${backlink}`);
                    }
                }
            }
        });

        this.addCommand({
            id: 'fill-template',
            name: 'Fill the template for the word in the title of the file',
            editorCallback: async (editor: Editor, view: MarkdownView) => {
                const fileName = view.file?.name;
                if (!fileName) {
                    new Notice('Current file is missing a title');
                    return;
                }

                const response = await this.apiService.fetchTemplate(fileName);
                const content = this.extractContentFromResponse(response);

                if (content && view?.file?.path) {
                    await this.fileService.appendToFile(view.file.path, content);
                }
            }
        });

        this.addCommand({
            id: 'get-infinitive-and-emoji',
            name: 'Get infinitive form and emoji for current word',
            editorCallback: async (editor: Editor, view: MarkdownView) => {
                const fileName = view.file?.name;
                if (!fileName) {
                    new Notice('Current file is missing a title');
                    return;
                }

                const response = await this.apiService.determineInfinitiveAndEmoji(fileName);
                const content = this.extractContentFromResponse(response);

                if (content && view?.file?.path) {
                    await this.fileService.appendToFile(view.file.path, content);
                }
            }
        });

        this.addCommand({
            id: 'duplicate-selection',
            name: 'Duplicate selected text and process with brackets',
            editorCallback: async (editor: Editor) => {
                const selection = editor.getSelection();
                if (selection) {
                    const cursor = editor.getCursor();
                    const response = await this.apiService.makeBrackets(selection);
                    const processedText = this.extractContentFromResponse(response);
                    if (processedText) {
                        editor.replaceSelection(selection + '\n\n' + processedText + '\n');
                        editor.setCursor({
                            line: cursor.line,
                            ch: cursor.ch + selection.length
                        });
                    }
                }
            }
        });

        this.addCommand({
            id: 'translate-selection',
            name: 'Translate selected text and show below',
            editorCallback: async (editor: Editor) => {
                const selection = editor.getSelection();
                if (selection) {
                    const cursor = editor.getCursor();
                    const response = await this.apiService.translateText(selection);
                    const translatedText = this.extractContentFromResponse(response);
                    if (translatedText) {
                        editor.replaceSelection(selection + '\n\n' + translatedText + '\n');
                        editor.setCursor({
                            line: cursor.line,
                            ch: cursor.ch + selection.length
                        });
                    }
                }
            }
        });

        this.addSettingTab(new SettingsTab(this.app, this));
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }

    private extractContentFromResponse(response: string): string {
        try {
            const parsedResponse = JSON.parse(response);
            return parsedResponse?.json?.content?.[0]?.text || 
                   parsedResponse?.json?.content?.[0]?.text || '';
        } catch {
            return '';
        }
    }
}
