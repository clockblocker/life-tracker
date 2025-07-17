import { Editor, MarkdownView, Notice, Plugin } from 'obsidian';
import { SettingsTab } from './settings';
import { DEFAULT_SETTINGS, TextEaterSettings } from './types';
import { ApiService } from './api';
import { FileService } from './file-service';
import initProjectStructure from './commands/life-tracker/init-project-structure';

export default class TextEaterPlugin extends Plugin {
	settings: TextEaterSettings;
	apiService: ApiService;
	fileService: FileService;

	async onload() {
		try {
			await this.loadPlugin();
			this.addSettingTab(new SettingsTab(this.app, this));
		} catch (error) {
			console.error('Error during plugin initialization:', error);
			new Notice(`Plugin failed to load: ${error.message}`);
		}
	}

	async loadPlugin() {
		await this.loadSettings();
		this.apiService = new ApiService(this.settings, this.app.vault);
		this.fileService = new FileService(this.app, this.app.vault);

		this.addCommand({
			id: 'init-project-structure',
			name: 'Add daily notes, library, etc',
			editorCheckCallback: (
				checking: boolean,
				editor: Editor,
				view: MarkdownView
			) => {
				const fileName = view.file?.name;
				const backlink = view.file?.basename;

				if (view.file && fileName && backlink) {
					if (!checking) {
						initProjectStructure(
							this.app.vault,
							this.app.metadataCache,
							this.fileService
						);
					}
					return true;
				}

				return false;
			},
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

		const numbers = matches.map((match) => {
			const num = match.replace('#^', '');
			return parseInt(num, 10);
		});

		return Math.max(0, ...numbers);
	}
}
