import { App, Plugin, PluginSettingTab, Setting } from 'obsidian';
import TextEaterPlugin from './main';
import { ApiService } from './api';
import { Editor, MarkdownView } from 'obsidian';
import { Notice } from 'obsidian';
import fillTemplate from './commands/fillTemplate';
import getInfinitiveAndEmoji from './commands/getInfinitiveAndEmoji';
import normalizeSelection from './commands/normalizeSelection';
import translateSelection from './commands/translateSelection';
import formatSelectionWithNumber from './commands/formatSelectionWithNumber';
import checkRuDeTranslation from './commands/checkRuDeTranslation';

export class SettingsTab extends PluginSettingTab {
    plugin: TextEaterPlugin;

    constructor(app: App, plugin: TextEaterPlugin) {
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
                    await this.plugin.reloadPlugin();
                    containerEl.empty();
                    this.display();
                }));
    }
}
