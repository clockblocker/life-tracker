import { Editor, MarkdownView, Notice, Plugin, TFile } from 'obsidian';
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
        try {
            await this.loadSettings();
            console.log('Settings loaded:', this.settings);
            
            this.apiService = new ApiService(this.settings, this.app.vault);
            this.fileService = new FileService(this.app.vault);

            this.addCommand({
                id: 'backlink-all-to-current-file',
                name: 'Add backlinks to the current file in all referenced files',
                editorCallback: async (editor: Editor, view: MarkdownView) => {
                    const fileName = view.file?.name;
                    if (!view.file || !fileName) {
                        new Notice('Current file is missing a title');
                        return;
                    }

                    const { metadataCache, vault } = this.app;
                    const fileCache = metadataCache.getFileCache(view.file);
                    const links = fileCache?.links ?? [];
                    
                    const resolvedPaths: {name: string, path: string | null}[] = [];
            
                    for (const link of links) {
                      const rawLink = link.link; 
                      const file = metadataCache.getFirstLinkpathDest(rawLink, view.file.path);
                      
                      if (file instanceof TFile) {
                        resolvedPaths.push({name: rawLink, path: file.path});
                      } else {
                        resolvedPaths.push({name: rawLink, path: null});
                      }
                    }

                    for (const item of resolvedPaths) {
                        try {
                            let filePath: string;
                            const backlink = `[[${fileName.split(".")[0]}]]`;
            
                            if (item.path) {
                                filePath = item.path;
                            } else {
                                const firstLetter = item.name[0].toUpperCase();
                                const folderPath = `Worter/${firstLetter}`;
                                
                                const folder = vault.getAbstractFileByPath(folderPath);
                                if (!folder) {
                                    await vault.createFolder(folderPath);
                                }
            
                                filePath = `${folderPath}/${item.name}.md`;
                            }
            
                            const fileExists = await this.fileService.doesFileContainContent(filePath, backlink);
                            if (!fileExists) {
                                await this.fileService.appendToFile(filePath, `, ${backlink}`);
                            }
                        } catch (error) {
                            new Notice(`Error processing link ${item.name}: ${error.message}`);
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

                    const word = fileName.slice(0, -3);
                    try {
                        const response = await this.apiService.fetchTemplate(word);
                        if (response && view?.file?.path) {
                            await this.fileService.appendToFile(view.file.path, response);
                        }
                    } catch (error) {
                        new Notice(`Error: ${error.message}`);
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

                    const word = fileName.slice(0, -3); // Remove .md extension

                    try {
                        const response = await this.apiService.determineInfinitiveAndEmoji(word);
                        if (response) {
                            const formattedText = `${response}\n`;
                            editor.replaceSelection(formattedText);
                        }
                    } catch (error) {
                        new Notice(`Error: ${error.message}`);
                    }
                }
            });

            this.addCommand({
                id: 'duplicate-selection',
                name: 'Duplicate selected text and process with brackets',
                editorCallback: async (editor: Editor, view: MarkdownView) => {
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
                        const fileContent = editor.getValue();
                        const maxNumber = this.findHighestNumber(fileContent);
                        const nextNumber = maxNumber + 1;

                        const response = await this.apiService.makeBrackets(selection);
                        if (response) {
                            const formattedBacklink = `[[${currentFileName}#^${nextNumber}|(q)]]`;
                            const formattedText = `${formattedBacklink} ${response} ^${nextNumber}\n`;

                            editor.replaceSelection(formattedText);
                        }
                    } catch (error) {
                        new Notice(`Error: ${error.message}`);
                    }
                }
            });

            this.addCommand({
                id: 'translate-selection',
                name: 'Translate selected text and show below',
                editorCallback: async (editor: Editor) => {
                    const selection = editor.getSelection();
                    if (!selection) {
                        new Notice('No text selected');
                        return;
                    }

                    try {
                        const cursor = editor.getCursor();
                        const response = await this.apiService.translateText(selection);
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
            });

            this.addCommand({
                id: 'format-selection-with-number',
                name: 'Format selection with next number and source link',
                editorCallback: async (editor: Editor, view: MarkdownView) => {
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

                    const fileContent = editor.getValue();
                    const maxNumber = this.findHighestNumber(fileContent);
                    const nextNumber = maxNumber + 1;
                    const formattedBacklink = `[[${currentFileName}#^${nextNumber}|(q)]]`;

                    await navigator.clipboard.writeText(`${selection} ${formattedBacklink} \n`);
                    editor.replaceSelection(`${formattedBacklink} ${selection} ^${nextNumber}\n`);
                }
            });

            this.addCommand({
                id: 'translate-ru-to-de',
                name: 'Translate Russian text to German',
                editorCallback: async (editor: Editor) => {
                    const selection = editor.getSelection();
                    if (!selection) {
                        new Notice('No text selected');
                        return;
                    }

                    try {
                        const response = await this.apiService.translateRuToDe(selection);
                        if (response) {
                            editor.replaceSelection(selection + '\n' + response + '\n');
                        }
                    } catch (error) {
                        new Notice(`Error: ${error.message}`);
                    }
                }
            });

            this.addCommand({
                id: 'check-ru-de-translation',
                name: 'Check Russian-German translation',
                editorCallback: async (editor: Editor) => {
                    const selection = editor.getSelection();
                    if (!selection) {
                        new Notice('No text selected');
                        return;
                    }

                    try {
                        const response = await this.apiService.checkRuDeTranslation(selection);
                        if (response) {
                            editor.replaceSelection(selection + '\n' + response + '\n');
                        }
                    } catch (error) {
                        new Notice(`Error: ${error.message}`);
                    }
                }
            });

            this.addSettingTab(new SettingsTab(this.app, this));
        } catch (error) {
            console.error('Error during plugin initialization:', error);
            new Notice(`Plugin failed to load: ${error.message}`);
        }
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }

    private findHighestNumber(content: string): number {
        const matches = content.match(/#\^(\d+)/g);
        if (!matches) return 0;

        const numbers = matches.map(match => {
            const num = match.replace('#^', '');
            return parseInt(num, 10);
        });

        return Math.max(0, ...numbers);
    }
}
