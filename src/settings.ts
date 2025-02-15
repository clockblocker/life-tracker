import { App, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { MyPluginSettings } from './types';

export class SettingsTab extends PluginSettingTab {
    constructor(app: App, private plugin: Plugin & { settings: MyPluginSettings, saveSettings: () => Promise<void> }) {
        super(app, plugin);
    }

    display(): void {
        const {containerEl} = this;
        containerEl.empty();
        containerEl.createEl('h2', {text: 'Settings'});

        new Setting(containerEl)
            .setName('DeepSeek API Key')
            .setDesc('Won`t leave your vault')
            .addText(text => text
                .setPlaceholder('Enter your key')
                .setValue(this.plugin.settings.deepseekApiKey)
                .onChange(async (value) => {
                    this.plugin.settings.deepseekApiKey = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('Google API Key')
            .setDesc('Won`t leave your vault')
            .addText(text => text
                .setPlaceholder('Enter your key')
                .setValue(this.plugin.settings.googleApiKey)
                .onChange(async (value) => {
                    this.plugin.settings.googleApiKey = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('API Provider')
            .setDesc('Choose which API provider to use')
            .addDropdown(dropdown => {
                dropdown.addOption('google', 'Google');
                dropdown.addOption('deepseek', 'DeepSeek');
                dropdown.setValue(this.plugin.settings.apiProvider);
                dropdown.onChange(async (value: 'deepseek' | 'google') => {
                    this.plugin.settings.apiProvider = value;
                    await this.plugin.saveSettings();
                });
            });
    }
}
