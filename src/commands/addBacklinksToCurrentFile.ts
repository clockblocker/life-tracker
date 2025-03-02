import { TFile, normalizePath, Notice, Vault, MetadataCache } from "obsidian";
import { appendToFile, doesFileContainContent } from '../utils';

export default async function addBacklinksToCurrentFile(file: TFile, backlink: string, vault: Vault, metadataCache: MetadataCache) {
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

        console.log("resolvedPaths", resolvedPaths);

        for (const item of resolvedPaths) {
            try {
                let filePath: string;
                const backlinkText = `[[${backlink}]]`;
        
                if (item.path) {
                    filePath = item.path;
                } else {
                    const firstLetter = item.name[0].toUpperCase();
                    const folderPath = normalizePath(`Worter/${firstLetter}`);
                    
                    const folder = vault.getAbstractFileByPath(folderPath);
                    if (!folder) {
                        await vault.createFolder(folderPath);
                    }
        
                    filePath = normalizePath(`${folderPath}/${item.name}.md`);
                }
        
                console.log("filePath", filePath);

                // Use utility functions directly with vault
                const fileExists = await doesFileContainContent(vault, filePath, backlinkText);
                if (!fileExists) {
                    await appendToFile(vault, filePath, `, ${backlinkText}`);
                }
            } catch (error) {
                new Notice(`Error processing link ${item.name}: ${error.message}`);
            }
        }
    } catch (error) {
        new Notice(`Error processing backlinks: ${error.message}`);
    }
}