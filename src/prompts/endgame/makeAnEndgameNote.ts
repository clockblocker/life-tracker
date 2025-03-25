import TextEaterPlugin from "main";
import { TFile } from "obsidian";
import { doesGrundformNoteExist } from "./grundform/formatters/link";
import { compareGrundforms, getMatchStatus } from "./grundform/formatters/match";
import { mergeGrundforms } from "./grundform/formatters/mergeGrungforms";
import { Grundform, GrundformsWithMatchStatus } from "./zod/types";
import { formatGrundform } from "./grundform/formatters/grundform";

async function endgameInfCase(plugin: TextEaterPlugin, file: TFile, grundforms: GrundformsWithMatchStatus[]): Promise<void> {
    const word = file.basename.toLocaleLowerCase();
    
    // First, merge objects based on the rules
    const mergedGrundforms = mergeGrundforms(grundforms);
    console.log("mergedGrundforms", mergedGrundforms);

    // Sort by match status
    mergedGrundforms.sort((a, b) => compareGrundforms(a, b, word));

    // Keep existing formatting logic
    const linksPromises = mergedGrundforms.map(async (g) => {
        const exists = await doesGrundformNoteExist(plugin, file, g);
        return formatGrundform(g, exists);
    });

    const formattedLinks = await Promise.all(linksPromises);
    
    // Group by word type and join with appropriate separators
    const groupedLinks = formattedLinks.reduce((acc, link, index) => {
        const currentGrundform = mergedGrundforms[index];
        const prevGrundform = index > 0 ? mergedGrundforms[index - 1] : null;
        
        if (prevGrundform && currentGrundform.wortart === prevGrundform.wortart) {
            // Same word type, join with |
            acc[acc.length - 1] = acc[acc.length - 1] + " | " + link;
        } else {
            // Different word type, start new line
            acc.push(link);
        }
        
        return acc;
    }, [] as string[]);

    const linksRepr = groupedLinks.join("\n");
    
    await plugin.fileService.appendToFile(file.path, linksRepr + "\n");
};

export async function makeAnEndgameNote(plugin: TextEaterPlugin, file: TFile, grundforms: Grundform[], word: string): Promise<void> {
    console.log('grundforms', grundforms);
    
    const sortedGrundformsWithMatchStatus: GrundformsWithMatchStatus[] = grundforms
        .map((g) => ({...g, matchStatus: getMatchStatus(g, word)}))
        .sort((a, b) => {
            return compareGrundforms(a, b, word);
        }) as GrundformsWithMatchStatus[];

    // if (!grundforms.some(({isGrundform}) => isGrundform)) {
        await endgameInfCase(plugin, file, sortedGrundformsWithMatchStatus );
    // }
};