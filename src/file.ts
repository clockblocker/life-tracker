import { MarkdownView, TFile, App, Vault, Editor } from 'obsidian';
import { appendToExistingFile, doesExistingFileContainContent } from './utils';
import { flattenError, z } from 'zod/v4';

type Maybe<T> = { error: true; errorText?: string } | { error: false; data: T };

export class FileService {
	constructor(
		private app: App,
		private vault: Vault
	) {}

	private async getMaybeFileByPath(filePath: string): Promise<Maybe<TFile>> {
		try {
			const file = this.vault.getAbstractFileByPath(filePath);
			if (!file || !(file instanceof TFile)) {
				return { error: true };
			}
			return { data: file, error: false };
		} catch (error) {
			console.warn('error while getting file by path:', error);
			return { error: true };
		}
	}

	private async getMaybeOpenedFile(): Promise<Maybe<TFile>> {
		try {
			const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);

			if (!activeView) {
				console.warn('file not open or not active');
				return { error: true };
			}

			const file = activeView.file;

			if (!file) {
				console.warn('file not open or not active');
				return { error: true };
			}

			return { error: false, data: file };
		} catch (error) {
			console.error(`Failed to replace content: ${error}`);
			return { error: true };
		}
	}

	private async getMaybeEditorAndFile(): Promise<
		Maybe<{ editor: Editor; file: TFile }>
	> {
		try {
			const view = this.app.workspace.getActiveViewOfType(MarkdownView);
			if (view && view?.file) {
				const editor = view?.editor;
				if (editor) {
					return { error: false, data: { editor, file: view.file } };
				}
			}
			return { error: true, errorText: `Failed to get Editor` };
		} catch (error) {
			return { error: true, errorText: `Failed to get Editor: ${error}` };
		}
	}

	async readFileContentByPath(filePath: string): Promise<Maybe<string>> {
		const maybeFile = await this.getMaybeFileByPath(filePath);
		if (maybeFile.error) {
			return maybeFile;
		}

		const content = await this.vault.read(maybeFile.data);
		return { data: content, error: false };
	}

	async replaceContentInCurrentlyOpenedFile(
		newContent: string
	): Promise<Maybe<string>> {
		const maybeFile = await this.getMaybeOpenedFile();
		if (maybeFile.error) {
			return maybeFile;
		}

		return { error: false, data: newContent };
	}

	async writeToOpenedFile(text: string): Promise<Maybe<string>> {
		const maybeFileAndEditor = await this.getMaybeEditorAndFile();
		if (maybeFileAndEditor.error) {
			return maybeFileAndEditor;
		}

		const { editor } = maybeFileAndEditor.data;
		editor.replaceRange(text, { line: editor.lineCount(), ch: 0 });

		return { error: false, data: text };
	}

	public showLoadingOverlay(): void {
		// Check if the overlay already exists
		if (document.getElementById('fileService-loading-overlay')) {
			return;
		}
		const overlay = document.createElement('div');
		overlay.id = 'fileService-loading-overlay';
		// overlay.style.position = 'fixed';
		// overlay.style.top = '0';
		// overlay.style.left = '0';
		// overlay.style.width = '100%';
		// overlay.style.height = '100%';
		// overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Semi-transparent black
		// overlay.style.display = 'flex';
		// overlay.style.justifyContent = 'center';
		// overlay.style.alignItems = 'center';
		// overlay.style.zIndex = '1000'; // Ensure it's on top

		const loadingText = document.createElement('div');
		loadingText.innerText = 'Loading...';
		loadingText.style.fontSize = '2rem';
		loadingText.style.color = '#fff';
		overlay.appendChild(loadingText);

		document.body.appendChild(overlay);
	}

	// Exposed method to hide and remove the loading overlay
	public hideLoadingOverlay(): void {
		const overlay = document.getElementById('fileService-loading-overlay');
		if (overlay) {
			overlay.remove();
		}
	}
}
