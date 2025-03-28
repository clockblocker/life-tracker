import TextEaterPlugin from "main";
import { TFile } from "obsidian";
import { grundformNotePath } from "./grundform/formatters/link";
import { compareGrundforms, getMatch } from "./grundform/formatters/match";
import { mergeGrundforms } from "./grundform/formatters/mergeGrungforms";
import { Block, Grundform, GrundformWithMatch, Match } from "./zod/types";
import { formatGrundform } from "./grundform/formatters/grundform";
import { prompts } from "prompts";
import { makeMorphemBlock } from "./blocks/morphems";

async function endgameLinkCase(plugin: TextEaterPlugin, file: TFile, grundforms: GrundformWithMatch[]): Promise<string> {
    const word = file.basename.toLocaleLowerCase();
    
    const mergedGrundforms = mergeGrundforms(grundforms);
    mergedGrundforms.sort((a, b) => compareGrundforms(a, b, word));

    const linksPromises = mergedGrundforms.map(async (g) => {
        const path = await grundformNotePath(plugin, file, g);
        return formatGrundform(g, path);
    });

    const formattedLinks = await Promise.all(linksPromises);
    
    const groupedLinks = formattedLinks.reduce((acc, link, index) => {
        const currentGrundform = mergedGrundforms[index];
        const prevGrundform = index > 0 ? mergedGrundforms[index - 1] : null;
        
        if (prevGrundform && currentGrundform.wortart === prevGrundform.wortart) {
            acc[acc.length - 1] = acc[acc.length - 1] + " | " + link;
        } else {
            acc.push(link);
        }
        
        return acc;
    }, [] as string[]);

    return groupedLinks.join("\n");
};

async function endgameNoteCase(plugin: TextEaterPlugin, file: TFile, grundforms: GrundformWithMatch[]): Promise<string> {
    const word = file.basename.toLocaleLowerCase();
    let blocks: Block[] = [];

    const exactMatches = grundforms.filter(g => g.match === Match.Grundform);

    const morphemBlock = await makeMorphemBlock(plugin, file, exactMatches[0].grundform);
    morphemBlock && blocks.push(morphemBlock);

    const notExactMatches = grundforms.filter(g => g.match !== Match.Grundform);
    const links = await endgameLinkCase(plugin, file, notExactMatches);

    console.log('blocks', blocks)
    
    return blocks.map(({repr}) => repr).join('\n\n---\n') + links + '\n';
};

export async function makeAnEndgameNote(plugin: TextEaterPlugin, file: TFile, grundforms: Grundform[], word: string): Promise<void> {
    console.log('grundforms', grundforms);
    
    const sortedGrundformWithMatch: GrundformWithMatch[] = grundforms
        .map((g) => ({...g, match: getMatch(g, word)}))
        .sort((a, b) => {
            return compareGrundforms(a, b, word);
        }) as GrundformWithMatch[];

    let content = '';

    if (sortedGrundformWithMatch.some(({ match }) => match === Match.Grundform)) {
        content = await endgameNoteCase(plugin, file, sortedGrundformWithMatch);
    } else {
        content = await endgameLinkCase(plugin, file, sortedGrundformWithMatch);
    }

    await plugin.fileService.appendToFile(file.path, content + "\n");
};