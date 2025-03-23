import { TFile, normalizePath, Notice, Vault, MetadataCache, Editor } from "obsidian";
import { appendToFile, doesFileContainContent } from '../utils';

export default async function addBacklinksToCurrentFile(file: TFile, backlink: string, vault: Vault, metadataCache: MetadataCache, editor: Editor) {
    try {
        const fileCache = metadataCache.getFileCache(file);
        const links = fileCache?.links ?? [];

        console.log("links", links);
        
        const resolvedPaths: {name: string, path: string | null}[] = [];

        for (const link of links) {
            const rawLink = link.link; 
            const linkedFile = metadataCache.getFirstLinkpathDest(rawLink, file.path);
            
            if (linkedFile instanceof TFile) {
                resolvedPaths.push({name: rawLink, path: linkedFile.path});
            } else {
                resolvedPaths.push({name: rawLink, path: null});
            }
        }

        for (const item of resolvedPaths) {
            try {
                let filePath: string;
                const backlinkText = `[[${backlink}]]`;
        
                if (item.path) {
                    filePath = item.path;
                } else {
                    const firstLetter = item.name[0].toUpperCase();
                    const folderPath = normalizePath(`Worter/${firstLetter}`);
                    
                    const folder = vault.getFolderByPath(folderPath);
                    if (!folder) {
                        await vault.createFolder(folderPath);
                    }
        
                    filePath = normalizePath(`${folderPath}/${item.name}.md`);
                }
        
                const backlinkTextInFile = await doesFileContainContent(vault, filePath, backlinkText);
                if (!backlinkTextInFile) {
                    await appendToFile(vault, filePath, `, ${backlinkText}`);
                }
            } catch (error) {
                new Notice(`Error processing link ${item.name}: ${error.message}`);
            }
        }
        editor.refresh();
    } catch (error) {
        new Notice(`Error processing backlinks: ${error.message}`);
    }
}