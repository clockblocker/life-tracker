import { App, PluginSettingTab, Setting } from 'obsidian';
import { MyPlugin } from './main';

export interface MyPluginSettings {
    anthropicKey: string;
}

export const DEFAULT_SETTINGS: MyPluginSettings = {
    anthropicKey: ''
}

export class SettingsTab extends PluginSettingTab {
    plugin: MyPlugin;

    constructor(app: App, plugin: MyPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const {containerEl} = this;
        containerEl.empty();
        containerEl.createEl('h2', {text: 'Settings'});

        new Setting(containerEl)
            .setName('Anthropic API Key')
            .setDesc('Won`t leave your vault')
            .addText(text => text
                .setPlaceholder('Enter your key')
                .setValue(this.plugin.settings.anthropicKey)
                .onChange(async (value) => {
                    this.plugin.settings.anthropicKey = value;
                    await this.plugin.saveSettings();
                }));
    }
}
