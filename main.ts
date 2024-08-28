import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, TFile } from 'obsidian';

// Remember to rename these classes and interfaces!

interface MyPluginSettings {
	anthropicKey: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	anthropicKey: ''
}

const getNamesToBacklinkFromFileContent = (t: string): string[] => {
	const splitted = t.split("[[").map(s => s.split('|')[0].split(']]')[0]);
	splitted.shift();
	return splitted;
}

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;
	

	async onload() {
		await this.loadSettings();

		this.addCommand({
			id: 'backlink-all-to-current-file',
			name: 'Add backlinks to the current file in all referenced files',
			editorCallback: async (editor: Editor, view: MarkdownView) => {
				const currentFileName = view.file?.name;
				if (!currentFileName) {
					new Notice('Current file is missing a title');
					return;
				} 

				const contents = view.data;
				const namesToBacklink = getNamesToBacklinkFromFileContent(contents);

				for (const name of namesToBacklink) {
					const path = `files/${name}.md`; // Specify the desired file name

					const backlink = `[[${currentFileName.split('.')[0]}]]`; // Specify the content
					if (!await this.doesFileContainContent(path, backlink)) {
						await this.appendToFile(path, backlink)
					}
				}
			}
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SampleSettingTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			console.log('click', evt);
		});

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	async appendToFile(path: string, content: string) {
		const abstractFile = this.app.vault.getAbstractFileByPath(path);
		
		if (abstractFile) {
			if (abstractFile instanceof TFile) {
				try {
					const currentContent = await this.app.vault.read(abstractFile);
	
					const newContent = currentContent + content;
	
					await this.app.vault.modify(abstractFile, newContent);
	
					new Notice(`Content appended to ${path} successfully!`);
				} catch (error) {
					new Notice(`Error appending to file: ${error.message}`);
				}
			} else {
				new Notice(`File ${path} does not exist or is not a valid file!`);
			}
		} else {
			try {
				await this.app.vault.create(path, content);
				new Notice(`File ${path} created successfully!`);
			} catch (error) {
				new Notice(`Error creating file: ${error.message}`);
			}
		}
	}

	async doesFileContainContent(path: string, content: string): Promise<boolean | null> {
		const abstractFile = this.app.vault.getAbstractFileByPath(path);
		
		if (abstractFile) {
			if (abstractFile instanceof TFile) {
				const currentContent = await this.app.vault.read(abstractFile);
				return currentContent.includes(content);
			} 
		}

		return null;
	}
}

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const {contentEl} = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}

class SampleSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Anthropic key')
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
