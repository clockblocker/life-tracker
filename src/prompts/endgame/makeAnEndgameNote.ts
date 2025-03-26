import TextEaterPlugin from "main";
import { TFile } from "obsidian";
import { doesGrundformNoteExist } from "./grundform/formatters/link";
import { compareGrundforms, getMatchStatus } from "./grundform/formatters/match";
import { mergeGrundforms } from "./grundform/formatters/mergeGrungforms";
import { Block, Grundform, GrundformWithMatchStatus, MatchStatus } from "./zod/types";
import { formatGrundform } from "./grundform/formatters/grundform";
import { prompts } from "prompts";
import { makeMorphemBlock } from "./blocks/morphems";

async function endgameLinkCase(plugin: TextEaterPlugin, file: TFile, grundforms: GrundformWithMatchStatus[]): Promise<string> {
    const word = file.basename.toLocaleLowerCase();
    
    const mergedGrundforms = mergeGrundforms(grundforms);
    mergedGrundforms.sort((a, b) => compareGrundforms(a, b, word));

    const linksPromises = mergedGrundforms.map(async (g) => {
        const exists = await doesGrundformNoteExist(plugin, file, g);
        return formatGrundform(g, exists);
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

async function endgameNoteCase(plugin: TextEaterPlugin, file: TFile, grundforms: GrundformWithMatchStatus[]): Promise<string> {
    const word = file.basename.toLocaleLowerCase();
    let blocks: Block[] = [];

    const exactMatches = grundforms.filter(g => g.matchStatus === MatchStatus.ExactMatch);

    const morphemBlock = await makeMorphemBlock(plugin, file, exactMatches[0].grundform);
    morphemBlock && blocks.push(morphemBlock);

    const notExactMatches = grundforms.filter(g => g.matchStatus !== MatchStatus.ExactMatch);
    const links = await endgameLinkCase(plugin, file, notExactMatches);
    
    return blocks.map(({repr}) => repr).join('\n\n---\n') + links + '\n';
};

export async function makeAnEndgameNote(plugin: TextEaterPlugin, file: TFile, grundforms: Grundform[], word: string): Promise<void> {
    console.log('grundforms', grundforms);
    
    const sortedGrundformWithMatchStatus: GrundformWithMatchStatus[] = grundforms
        .map((g) => ({...g, matchStatus: getMatchStatus(g, word)}))
        .sort((a, b) => {
            return compareGrundforms(a, b, word);
        }) as GrundformWithMatchStatus[];

    let content = '';

    if (sortedGrundformWithMatchStatus.some(({ matchStatus }) => matchStatus === MatchStatus.ExactMatch)) {
        content = await endgameNoteCase(plugin, file, sortedGrundformWithMatchStatus);
    } else {
        content = await endgameLinkCase(plugin, file, sortedGrundformWithMatchStatus);
    }

    await plugin.fileService.appendToFile(file.path, content + "\n");
};