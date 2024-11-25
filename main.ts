import { App, Editor, MarkdownView, Notice, Plugin, PluginSettingTab, Setting, TFile, requestUrl } from 'obsidian';
import { prompt } from './prompt';

interface MyPluginSettings {
	anthropicKey: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	anthropicKey: ''
}

const getNamesToBacklinkFromFileContent = (t: string): string[] => {
	const splitted = t.split("[[").map(s => s.replace(/\\/g, "").split('|')[0].split(']]')[0]);
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
					const path = `Worter/${name}.md`;
					const backlink = `[[${currentFileName.split('.')[0]}]]`;
					if (!await this.doesFileContainContent(path, backlink)) {
						await this.appendToFile(path, `, ${backlink}`)
					}
				}
			}
		});

		this.addCommand({
			id: 'log-to-file',
			name: 'dumps log to the current file',
			editorCallback: async (editor: Editor, view: MarkdownView) => {
				const currentFileName = view.file?.name;

				if (!currentFileName) {
					new Notice('Current file is missing a title');
					return;
				} 

				const a = await this.fetchTemplate1(currentFileName);
				const filledTemplate = (JSON.parse(a) as any)?.['json']?.["content"]?.[0]?.["text"]

				let appendContent = ``;

				if (filledTemplate) {
					appendContent = filledTemplate;
				} else {
					appendContent = (JSON.parse(a) as any)?.['json']?.["content"]?.[0]?.["text"];
				}

				view?.file?.path && this.appendToFile(view.file.path, appendContent);
			}
		});

		this.addSettingTab(new SampleSettingTab(this.app, this));
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
				} catch (error) {
					new Notice(`Error appending to file: ${error.message}`);
				}
			} else {
				new Notice(`File ${path} does not exist or is not a valid file!`);
			}
		} else {
			try {
				await this.app.vault.create(path, content);
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

	async fetchTemplate1(word: string) {
		const url = 'https://api.anthropic.com/v1/messages';
	
		const headers = {
			'Content-Type': 'application/json',
			'x-api-key': this.settings.anthropicKey,
			'anthropic-version': '2023-06-01',
			'anthropic-beta': 'prompt-caching-2024-07-31'
		};
	
		const body = {
			"model": "claude-3-5-haiku-latest",
			"max_tokens": 1024,
			"system": [
				{
					"type": "text",
					"text": prompt,
					"cache_control": { "type": "ephemeral" }
				}
			],
			"messages": [
				{
					"role": "user",
					"content": word,
				}
			]
		};

		try {
			const response = await requestUrl({
				url,
				method: 'POST',
				contentType: "application/json",
				body: JSON.stringify(body),
				headers,
			});

			return JSON.stringify(response);
		} catch (error) {
			return error + '\n\n' + JSON.stringify({ url, method: 'POST', headers, body });
		}
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
