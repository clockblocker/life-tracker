import { AdjektivOutput, Backlink, Genus, GrundformKerl, Kasus, Match, NomenDeklination, Numerus, Vergleichsgrad, Wortart } from "prompts/endgame/zod/types";
import { promtMakerFromKeyword } from "../endgamePromptMakers";
import TextEaterPlugin from "main";
import { TFile } from "obsidian";
import { adjektivOutputSchema } from "prompts/endgame/zod/schemas";
import { getPathsToNotes } from "../../formatters/link";
import { makeAllDeclensionsFromAdjektivstamm } from "./formatter";
import { AllDeclensions, AllDeclensionsFromGrad, allDeclensionsFromGradKeys, AllDeclensionsFromGradSchema, allDeclensionsKeys, caseDeclensionKeys, declensionKeys, fromFromNomenDeklinationFromKasusFromCaseDeclension, PathFromWortFromGrad, PathFromWortFromGradSchema } from "./types-and-consts";
import { makeTagChain, Tag } from "prompts/endgame/zod/consts";

export async function makeAdjektivBlock(plugin: TextEaterPlugin, file: TFile, word: string): Promise<{ repr: string, backlinks: Backlink[] } | null> {
    const prompt = promtMakerFromKeyword[Wortart.Adjektiv]();
    const generatedAdjektivOutput = await plugin.apiService.generateContent(prompt, word, true)
    const parsedAdjektivOutput = adjektivOutputSchema.safeParse(JSON.parse(generatedAdjektivOutput));
        
    if (parsedAdjektivOutput.error) {
        console.error({zodError: parsedAdjektivOutput.error, output: generatedAdjektivOutput});
        await plugin.fileService.appendToFile(file.path, "Contact t.me/@clockblocker");
        return null;
    }

    const adjektivOutput = parsedAdjektivOutput.data;

    console.log("adjektivOutput", adjektivOutput)

    await makeBlocksForAdjektivOutputElement(plugin, file, adjektivOutput[0])

    // const sentences = adjektivOutput.map(o => Object.values(o.adjektivstaemme).map(a => getSentencesForAllDeclensions(makeAllDeclensionsFromAdjektivstamm(a))));
    // const repr = sentences.map(i => i.map(ii => ii.map(iii => iii.join("\n")).join("\n\n")).join("\n\n---\n")).join("\n")
    const repr = 'dsadas';
    // const zusammengesetztAusBlock = await getZusammengesetztAusBlock(plugin, file, adjektivOutput);
    const adjektivOutputBlock = {repr, backlinks: []};
    
    return adjektivOutputBlock;
};

async function makeBlocksForAdjektivOutputElement(plugin: TextEaterPlugin, file: TFile, adjektivOutputElement: AdjektivOutput[-1]) {
    const { allDeclensionsFromGrad, pathFromWortFromGrad, error } = await makeDeclensionsMaps(
        plugin,
        file,
        adjektivOutputElement
    );

    if (error) {
        return [];
    }

    const backlinksFromWord: Record<string, Backlink[]> = {};

    for (let grad of allDeclensionsFromGradKeys) {
        const allDeclensions = allDeclensionsFromGrad?.[grad];
        if (!allDeclensions) {
            continue; 
        }
        
        const pathFromWort = pathFromWortFromGrad?.[grad];
        if (!pathFromWort) {
            continue; 
        }
        
        for (let art of allDeclensionsKeys) {
            const i = allDeclensions[art];
            if (i === undefined) { continue }

            for (let kasus of declensionKeys) {
                const ii = i[kasus];
                if (ii === undefined) { continue }

                for (let caseDec of caseDeclensionKeys) {
                    const roots = ii[caseDec];
                    roots.forEach(({ agj }) => {
                        const existingBacklinks = backlinksFromWord[agj] || [];
                        
                        if (pathFromWort) {
                            const path = pathFromWort[agj];
                            const tags = makeTagChain([
                                Wortart.Adjektiv,
                                adjektivOutputElement.regelmaessig ? Tag.Regelmaessig : Tag.Unregelmaessig,
                                adjektivOutputElement.steigerungsfaehig ? Tag.Steigerungsfaehig : Tag.Unsteigerungsfaehig,
                                Wortart.Adjektiv,
                                grad,
                                art,
                            ]);
                            backlinksFromWord[agj] = [...existingBacklinks, { path, tags: [tags]}]
                        }
                    })
                }
            }
        }
    }

    console.log("backlinksFromWord", backlinksFromWord);
}

function getAllDeclensionsFromGrad(adjektivOutputElement: AdjektivOutput[-1]) {
    const adjektivstaemmeFromGrad = adjektivOutputElement.adjektivstaemme;

    const unsafeAllDeclensionsFromGrad: any = {};

    for (const grad of allDeclensionsFromGradKeys) {
        const roots = adjektivstaemmeFromGrad[grad as keyof typeof adjektivstaemmeFromGrad];
        if (roots) {
            const declensions = makeAllDeclensionsFromAdjektivstamm(roots);
            unsafeAllDeclensionsFromGrad[grad] = declensions;
        } 
    }

    const parsedAllDeclensions = AllDeclensionsFromGradSchema.safeParse(unsafeAllDeclensionsFromGrad);
    
    if (parsedAllDeclensions.error) {
        console.error(parsedAllDeclensions.error);
        return undefined;
    }

    return parsedAllDeclensions.data;
}

async function makeDeclensionsMaps(plugin: TextEaterPlugin, file: TFile, adjektivOutputElement: AdjektivOutput[-1]): Promise<{ allDeclensionsFromGrad: undefined; pathFromWortFromGrad: undefined; error: true; } | { allDeclensionsFromGrad: AllDeclensionsFromGrad; pathFromWortFromGrad: PathFromWortFromGrad; error: false; }> {
    const allDeclensionsFromGrad = getAllDeclensionsFromGrad(adjektivOutputElement);
    if (allDeclensionsFromGrad === undefined) {
        return { allDeclensionsFromGrad: undefined, pathFromWortFromGrad: undefined, error: true };
    }

    const promiseArray = allDeclensionsFromGradKeys.map(async (grad) => {
        const declensions = allDeclensionsFromGrad[grad];
        if (!declensions) {
            return [grad, undefined] as const;
        }

        const path = await makePathFromWordFromAllDeclensions(plugin, file, declensions);
        return [grad, path] as const;
    });
    
    const results = await Promise.all(promiseArray);
    
    const unsafePathFromWortFromGrad: any = {};
    for (const [grad, path] of results) {
        unsafePathFromWortFromGrad[grad] = path;
    }

    const parsedPathFromWortFromGrad = PathFromWortFromGradSchema.safeParse(unsafePathFromWortFromGrad);
    
    if (parsedPathFromWortFromGrad.error) {
        console.error(parsedPathFromWortFromGrad.error);
        return { allDeclensionsFromGrad: undefined, pathFromWortFromGrad: undefined, error: true };
    }

    return { allDeclensionsFromGrad, pathFromWortFromGrad: parsedPathFromWortFromGrad.data, error: false };
};

async function makePathFromWordFromAllDeclensions(plugin: TextEaterPlugin, file: TFile, declensions: AllDeclensions) {
    const agjSet = new Set<string>();

    Object.values(declensions).forEach((declension) => {
      Object.values(declension).forEach((caseDeclension) => {
        Object.values(caseDeclension).forEach((root) => {
            root.forEach(({ agj }) => { agjSet.add(agj) })
        });
      });
    });
    
    const kerls = [...agjSet].map(grundform => ({ grundform, wortart: Wortart.Adjektiv, match: Match.Flexion }))

    const paths = await getPathsToNotes(plugin, file, kerls as (GrundformKerl & {match: Match})[]);

    // Assume kerls.length === paths.lenth
    const pathFromWort = Object.fromEntries(
        kerls.map((k, i) => [k.grundform, paths[i]])
    ) as Record<string, string>;

    return pathFromWort;
};
