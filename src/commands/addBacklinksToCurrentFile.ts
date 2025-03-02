import { TFile, normalizePath, Notice } from "obsidian";

export default async function addBacklinksToCurrentFile(currentFile: TFile, backlink: string) {
    const { metadataCache, vault } = this.app;
    const fileCache = metadataCache.getFileCache(currentFile);
    const links = fileCache?.links ?? [];
    
    const resolvedPaths: {name: string, path: string | null}[] = [];

    for (const link of links) {
        const rawLink = link.link; 
        const file = metadataCache.getFirstLinkpathDest(rawLink, currentFile.path);
        
        if (file instanceof TFile) {
            resolvedPaths.push({name: rawLink, path: file.path});
        } else {
            resolvedPaths.push({name: rawLink, path: null});
        }
    }

    for (const item of resolvedPaths) {
        try {
            let filePath: string;

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

            vault.getFileByPath(filePath);
            
            const fileExists = await this.fileService.doesFileContainContent(filePath, backlink);
            if (!fileExists) {
                await this.fileService.appendToFile(filePath, `, ${backlink}`);
            }
        } catch (error) {
            new Notice(`Error processing link ${item.name}: ${error.message}`);
        }
    }
}