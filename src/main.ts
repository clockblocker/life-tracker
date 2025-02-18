import { Editor, MarkdownView, Notice, Plugin, TFile } from 'obsidian';
import { SettingsTab } from './settings';
import { DEFAULT_SETTINGS, MyPluginSettings } from './types';
import { ApiService } from './api';
import { FileService } from './file';
import fillTemplate from './commands/fillTemplate';
import getInfinitiveAndEmoji from './commands/getInfinitiveAndEmoji';
import normalizeSelection from './commands/makeBrackets';
import translateSelection from './commands/translateSelection';
import formatSelectionWithNumber from './commands/formatSelectionWithNumber';
import checkRuDeTranslation from './commands/checkRuDeTranslation';

export default class MyPlugin extends Plugin {
    settings: MyPluginSettings;
    apiService: ApiService;
    fileService: FileService;

    async onload() {
        try {
            await this.reloadPlugin();
            this.addSettingTab(new SettingsTab(this.app, this));
        } catch (error) {
            console.error('Error during plugin initialization:', error);
            new Notice(`Plugin failed to load: ${error.message}`);
        }
    }

    async reloadPlugin() {
        await this.loadSettings();
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

                console.log('fileName', fileName)

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
                console.log('resolvedPaths', resolvedPaths)
            }
        });

        this.addCommand({
            id: 'fill-template',
            name: 'Fill the template for the word in the title of the file',
            editorCallback: async (editor: Editor, view: MarkdownView) => {
                await fillTemplate(this, editor, view);
            }
        });

        this.addCommand({
            id: 'get-infinitive-and-emoji',
            name: 'Get infinitive form and emoji for current word',
            editorCallback: async (editor: Editor, view: MarkdownView) => {
                await getInfinitiveAndEmoji(this, editor, view);
            }
        });

        this.addCommand({
            id: 'normalize',
            name: 'Add links to normal/inf froms to selected text',
            editorCallback: async (editor: Editor, view: MarkdownView) => {
                await normalizeSelection(this, editor, view, true);
            }
        });

        this.addCommand({
            id: 'normalize-and-do-not-link',
            name: '[W/O a source link] Add liks to normal/inf forms',
            editorCallback: async (editor: Editor, view: MarkdownView) => {
                await normalizeSelection(this, editor, view, false);
            }
        });

        this.addCommand({
            id: 'translate-selection',
            name: 'Translate selected text and show below',
            editorCallback: async (editor: Editor) => {
                await translateSelection(this, editor);
            }
        });

        this.addCommand({
            id: 'format-selection-with-number',
            name: 'Format selection with next number and source link',
            editorCallback: async (editor: Editor, view: MarkdownView) => {
                await formatSelectionWithNumber(this, editor, view);
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
                await checkRuDeTranslation(this, editor);
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
