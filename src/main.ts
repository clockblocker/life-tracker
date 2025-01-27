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
        await this.loadSettings();
        
        this.apiService = new ApiService(this.settings);
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

                const word = fileName.slice(0, -3)

                const response = await this.apiService.fetchTemplate(word);
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

                const formattedText = `\n###### ${nextNumber}\n${selection} [[${currentFileName}######${nextNumber}|source]]\n`;
                editor.replaceSelection(formattedText);
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

    private findHighestNumber(content: string): number {
		const matches = content.match(/###### (\d+)/g);
		if (!matches) return 0;

		const numbers = matches.map(match => {
			const num = match.replace('###### ', '');
			return parseInt(num, 10);
		});

		return Math.max(0, ...numbers);
	}
}
