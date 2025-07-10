import { TFile, Notice, Vault, MetadataCache, Editor } from 'obsidian';
import {
	appendToExistingFile,
	getExisingOrCreatedFileInWorterDir,
	doesExistingFileContainContent,
} from '../../utils/obsidian-file-management';

export default async function addBacklinksToCurrentFile(
	file: TFile,
	vault: Vault,
	metadataCache: MetadataCache,
	editor: Editor
) {
	try {
		const fileCache = metadataCache.getFileCache(file);
		const links = fileCache?.links ?? [];
		const rawLinks = new Set(links.map(({ link }) => link));

		const resolvedPaths: { name: string; path: string | null }[] = [];

		for (const rawLink of rawLinks) {
			const linkedFile = metadataCache.getFirstLinkpathDest(rawLink, file.path);

			if (linkedFile instanceof TFile) {
				resolvedPaths.push({ name: rawLink, path: linkedFile.path });
			} else {
				resolvedPaths.push({ name: rawLink, path: null });
			}
		}

		// for (const item of resolvedPaths) {
		// 	try {
		// 		const file = await getExisingOrCreatedFileInWorterDir(vault, item);

		// 		if (!file) {
		// 			continue;
		// 		}

		// 		const backlinkText = `[[${backlink}]]`;

		// 		const backlinkTextInFile = await doesExistingFileContainContent(
		// 			vault,
		// 			file,
		// 			backlinkText
		// 		);

		// 		if (!backlinkTextInFile) {
		// 			await appendToExistingFile(vault, file, `, ${backlinkText}`);
		// 		}
		// 	} catch (error) {
		// 		new Notice(`Error processing link ${item.name}: ${error.message}`);
		// 	}
		// }
		editor.refresh();
	} catch (error) {
		new Notice(`Error processing backlinks`);
	}
}
