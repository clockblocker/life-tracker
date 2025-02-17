import { App, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { MyPluginSettings } from './types';
import MyPlugin from './main';
import { ApiService } from './api';
import { Editor, MarkdownView } from 'obsidian';
import { Notice } from 'obsidian';
import fillTemplate from './commands/fillTemplate';
import getInfinitiveAndEmoji from './commands/getInfinitiveAndEmoji';
import duplicateSelection from './commands/duplicateSelection';
import translateSelection from './commands/translateSelection';
import formatSelectionWithNumber from './commands/formatSelectionWithNumber';
import checkRuDeTranslation from './commands/checkRuDeTranslation';

export class SettingsTab extends PluginSettingTab {
    plugin: MyPlugin;

    constructor(app: App, plugin: MyPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;

        containerEl.empty();

        containerEl.createEl('h2', { text: 'Settings for my awesome plugin.' });

        new Setting(containerEl)
            .setName('Google API Key')
            .setDesc('Enter your Google API key')
            .addText(text => text
                .setPlaceholder('Enter your API key')
                .setValue(this.plugin.settings.googleApiKey)
                .onChange(async (value) => {
                    this.plugin.settings.googleApiKey = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('DeepSeek API Key')
            .setDesc('Enter your DeepSeek API key')
            .addText(text => text
                .setPlaceholder('Enter your API key')
                .setValue(this.plugin.settings.deepseekApiKey)
                .onChange(async (value) => {
                    this.plugin.settings.deepseekApiKey = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('API Provider')
            .setDesc('Choose your API provider')
            .addDropdown(dropdown => {
                dropdown
                    .addOption('google', 'Google')
                    .addOption('deepseek', 'DeepSeek')
                    .setValue(this.plugin.settings.apiProvider)
                    .onChange(async (value: 'google' | 'deepseek') => {
                        this.plugin.settings.apiProvider = value;
                        await this.plugin.saveSettings();
                    });
            });

        new Setting(containerEl)
            .setName('Reload Plugin')
            .setDesc('Click to reload the plugin and apply the new API key.')
            .addButton(button => button
                .setButtonText('Reload')
                .onClick(async () => {
                    await this.plugin.loadSettings();
                    this.plugin.apiService = new ApiService(this.plugin.settings, this.app.vault);

                    // Re-register commands
                    this.plugin.addCommand({
                        id: 'fill-template',
                        name: 'Fill the template for the word in the title of the file',
                        editorCallback: async (editor: Editor, view: MarkdownView) => {
                            await fillTemplate(this.plugin, editor, view);
                        }
                    });

                    this.plugin.addCommand({
                        id: 'get-infinitive-and-emoji',
                        name: 'Get infinitive form and emoji for current word',
                        editorCallback: async (editor: Editor, view: MarkdownView) => {
                            await getInfinitiveAndEmoji(this.plugin, editor, view);
                        }
                    });

                    this.plugin.addCommand({
                        id: 'duplicate-selection',
                        name: 'Duplicate selected text and process with brackets',
                        editorCallback: async (editor: Editor, view: MarkdownView) => {
                            await duplicateSelection(this.plugin, editor, view);
                        }
                    });

                    this.plugin.addCommand({
                        id: 'translate-selection',
                        name: 'Translate selected text and show below',
                        editorCallback: async (editor: Editor) => {
                            await translateSelection(this.plugin, editor);
                        }
                    });

                    this.plugin.addCommand({
                        id: 'format-selection-with-number',
                        name: 'Format selection with next number and source link',
                        editorCallback: async (editor: Editor, view: MarkdownView) => {
                            await formatSelectionWithNumber(this.plugin, editor, view);
                        }
                    });

                    this.plugin.addCommand({
                        id: 'translate-ru-to-de',
                        name: 'Translate Russian text to German',
                        editorCallback: async (editor: Editor) => {
                            const selection = editor.getSelection();
                            if (!selection) {
                                new Notice('No text selected');
                                return;
                            }

                            try {
                                const response = await this.plugin.apiService.translateRuToDe(selection);
                                if (response) {
                                    editor.replaceSelection(selection + '\n' + response + '\n');
                                }
                            } catch (error) {
                                new Notice(`Error: ${error.message}`);
                            }
                        }
                    });

                    this.plugin.addCommand({
                        id: 'check-ru-de-translation',
                        name: 'Check Russian-German translation',
                        editorCallback: async (editor: Editor) => {
                            await checkRuDeTranslation(this.plugin, editor);
                        }
                    });

                    containerEl.empty();
                    this.display();
                }));
    }
}
