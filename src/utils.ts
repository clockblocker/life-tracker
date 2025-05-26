import { Notice, TFile, TFolder, Vault, normalizePath } from 'obsidian';

export const longDash = '—';

export const extractBacklinks = (content: string): string[] => {
	const links = content
		.split('[[')
		.map((part) => part.replace(/\\/g, '').split('|')[0].split(']]')[0]);
	links.shift();
	return links;
};

export function formatSelectionWithBacklink(
	selection: string,
	currentFileName: string,
	nextNumber: number
): string {
	// Strip all newline characters and spaces from the end of the selection
	selection = selection.replace(/[\s\n]+$/, '');

	const formattedBacklink = `*[[${currentFileName}#^${nextNumber}|^]]*`;
	return `${formattedBacklink} ${selection} ^${nextNumber}\n`;
}

export async function appendToExistingFile(
	vault: Vault,
	file: TFile,
	text: string
): Promise<void> {
	try {
		await vault.process(file, (currentContent) => {
			return currentContent + text;
		});
	} catch (error) {
		console.error(`Failed to append to file ${file.path}: ${error}`);
		throw error;
	}
}

export async function doesExistingFileContainContent(
	vault: Vault,
	file: TFile,
	content: string
): Promise<boolean | null> {
	try {
		const fileContent = await vault.read(file);
		return fileContent.includes(content);
	} catch (error) {
		console.error(`Failed to check file content ${file.path}: ${error}`);
		return null;
	}
}

export async function getExisingOrCreatedFileInWorterDir(
	vault: Vault,
	item: { name: string; path: string | null }
): Promise<TFile | null> {
	try {
		let filePath: string;

		if (item.path) {
			filePath = item.path;
		} else {
			const safeName = item.name.replace(/[\\/:*?"<>|]/g, '');

			if (!safeName || safeName.length < 1) {
				throw new Error('Word must be at least 1 character long');
			}

			const first = safeName[0].toLowerCase();

			const prefix = safeName
				.slice(0, Math.min(3, safeName.length))
				.toLowerCase();

			const folderPath = normalizePath(
				`Worter/${first}/${prefix}${safeName.length > 3 ? `/${safeName[3]}` : ''}`
			);

			const folder = await ensureFolderExists(vault, folderPath);

			filePath = `${folder.path}/${safeName}.md`;
		}

		const normalizedPath = normalizePath(filePath);
		let abstractFile = vault.getAbstractFileByPath(normalizedPath);

		if (!abstractFile || !(abstractFile instanceof TFile)) {
			await vault.create(normalizedPath, '');
			abstractFile = vault.getAbstractFileByPath(normalizedPath);

			if (!abstractFile || !(abstractFile instanceof TFile)) {
				console.error(`Failed to create file "${normalizedPath}".`);
				return null;
			} else {
				return abstractFile;
			}
		}
	} catch (error) {
		new Notice(`Error creating file ${item.name}: ${error.message}`);
	}
	return null;
}

async function ensureFolderExists(
	vault: Vault,
	folderPath: string
): Promise<TFolder> {
	const segments = folderPath.split('/').filter(Boolean);
	let currentPath = '';
	let currentFolder: TFolder | null = vault.getRoot();

	for (const segment of segments) {
		currentPath = normalizePath(`${currentPath}/${segment}`);
		const existing = vault.getAbstractFileByPath(currentPath);

		if (existing instanceof TFolder) {
			currentFolder = existing;
		} else if (!existing) {
			try {
				currentFolder = await vault.createFolder(currentPath);
			} catch (err: any) {
				if (err.message.includes('already exists')) {
					// race condition: folder was created in parallel
					currentFolder = vault.getAbstractFileByPath(currentPath) as TFolder;
				} else {
					throw err;
				}
			}
		} else {
			throw new Error(`Cannot create folder: file exists at ${currentPath}`);
		}
	}

	if (!currentFolder) {
		throw new Error(`Failed to create or retrieve folder at ${folderPath}`);
	}

	return currentFolder;
}
