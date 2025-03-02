import { App, PluginSettingTab, Setting } from 'obsidian';
import TextEaterPlugin from './main';


export class SettingsTab extends PluginSettingTab {
    plugin: TextEaterPlugin;

    constructor(app: App, plugin: TextEaterPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;

        containerEl.empty();

        new Setting(containerEl)
            .setName('API configuration')
            .setHeading();

        new Setting(containerEl)
            .setName('Gemini API key')
            .setDesc('Enter your Gemini API key')
            .addText(text => text
                .setPlaceholder('Enter your API key')
                .setValue(this.plugin.settings.googleApiKey)
                .onChange(async (value) => {
                    this.plugin.settings.googleApiKey = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('DeepSeek API key')
            .setDesc('Enter your DeepSeek API key')
            .addText(text => text
                .setPlaceholder('Enter your API key')
                .setValue(this.plugin.settings.deepseekApiKey)
                .onChange(async (value) => {
                    this.plugin.settings.deepseekApiKey = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('API provider')
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

    }
}
