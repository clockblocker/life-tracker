import TextEaterPlugin from "main";
import { TFile } from "obsidian";
import { getMaybeExistingNotePath } from "./grundform/formatters/link";
import { compareGrundforms } from "./grundform/formatters/match";
import { mergeGrundforms } from "./grundform/formatters/mergeGrungforms";
import { Block, Grundform, GrundformsOutput, GrundformWithMatch, Match } from "./zod/types";
import { formatGrundform } from "./grundform/formatters/grundform";
import { makeMorphemBlock } from "./blocks/morphems";

async function endgameLinkCase(plugin: TextEaterPlugin, file: TFile, grundforms: GrundformWithMatch[]): Promise<string> {
    const mergedGrundforms = mergeGrundforms(grundforms);
    mergedGrundforms.sort((a, b) => compareGrundforms(a, b));

    const linksPromises = mergedGrundforms.map(async (g) => {
        const path = await getMaybeExistingNotePath(plugin, file, g.grundform);
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

async function endgameNoteCase(plugin: TextEaterPlugin, file: TFile, exactMatches: Grundform[]): Promise<string> {
    let blocks: Block[] = [];

    const morphemBlock = await makeMorphemBlock(plugin, file, exactMatches[0].grundform);
    morphemBlock && blocks.push(morphemBlock);

    console.log('blocks', blocks)
    
    return blocks.map(({repr}) => repr).join('\n\n---\n') + '\n';
};

export async function makeAnEndgameNote(plugin: TextEaterPlugin, file: TFile, output: GrundformsOutput, word: string): Promise<void> {
    console.log('grundforms', output);
    
    // const sortedGrundformWithMatch: GrundformWithMatch[] = grundforms
    //     .map((g) => ({...g, match: getMatch(g, word)}))
    //     .sort((a, b) => {
    //         return compareGrundforms(a, b, word);
    //     }) as GrundformWithMatch[];


    console.log("output");
    console.log(output);

    const allParts = await Promise.all(Object.entries(output).map(([match, grundforms]) => {
        if (match === Match.Grundform) {
            return endgameNoteCase(plugin, file, grundforms);
        } else {
            return endgameLinkCase(plugin, file, grundforms.map(g => ({...g, match: match as Match})));
        }
    }))


    // if (Object.keys(output).some((match) => match === Match.Grundform)) {
    //     content = await endgameNoteCase(plugin, file, output?.[Match.Grundform]);
    // } else {
    //     content = await endgameLinkCase(plugin, file, sortedGrundformWithMatch);
    // }

    await plugin.fileService.appendToFile(file.path, allParts.join("\n"));
};