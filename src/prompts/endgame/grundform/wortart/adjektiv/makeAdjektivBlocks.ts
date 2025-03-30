import { AdjektivOutput, Backlink, GrundformKerl, Match, Vergleichsgrad, Wortart } from "prompts/endgame/zod/types";
import { promtMakerFromKeyword } from "../endgamePromptMakers";
import TextEaterPlugin from "main";
import { TFile } from "obsidian";
import { adjektivOutputSchema } from "prompts/endgame/zod/schemas";
import { AllDeclensions, getSentencesForAllDeclensions, makeAllDeclensionsFromAdjektivstamm } from "./formatter";
import { getPathsToGrundformNotes, getPathsToNotes } from "../../formatters/link";

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

    // const sentences = adjektivOutput.map(o => Object.values(o.adjektivstamm).map(a => getSentencesForAllDeclensions(makeAllDeclensionsFromAdjektivstamm(a))));
    // const repr = sentences.map(i => i.map(ii => ii.map(iii => iii.join("\n")).join("\n\n")).join("\n\n---\n")).join("\n")
    const repr = 'dsadas';
    // const zusammengesetztAusBlock = await getZusammengesetztAusBlock(plugin, file, adjektivOutput);
    const adjektivOutputBlock = {repr, backlinks: []};
    
    return adjektivOutputBlock;
};

async function makeBlocksForAdjektivOutputElement(plugin: TextEaterPlugin, file: TFile, adjektivOutputElement: AdjektivOutput[-1]) {
    const { allDeclensionsFromGrad, pathFromWortFromGrad } = await makeDeclensionsMaps(
        plugin,
        file,
        adjektivOutputElement
    );

    const backlinksFromWord: Record<string, Backlink[]> = {};
    const wordsSet = new Set();

    // For each grad (Positiv, Komparativ, Superlativ)
    for (const [grad, declensions] of allDeclensionsFromGrad.entries()) {
        if (!declensions) {
            continue; // skip if undefined
        }

        const pathFromWort = pathFromWortFromGrad.get(grad);
        if (!pathFromWort) {
            continue; // skip if undefined
        }

        for (const [flexionsart, flexionsartDeclensions] of Object.entries(declensions) as [
            keyof AllDeclensions,
            AllDeclensions[keyof AllDeclensions]
          ][]) {
            for (const [fall, fallDeclensions] of Object.entries(flexionsartDeclensions) as [
              keyof typeof flexionsartDeclensions,
              typeof flexionsartDeclensions[keyof typeof flexionsartDeclensions]
            ][]) {
              for (const [genus, details] of Object.entries(fallDeclensions) as [
                keyof typeof fallDeclensions,
                typeof fallDeclensions[keyof typeof fallDeclensions]
              ][]) {
                const { agj } = details;
                const existingBacklinks = backlinksFromWord[agj] || [];
                
                if (pathFromWort) {
                    const path = pathFromWort[agj]
                    backlinksFromWord[agj] = [...existingBacklinks, { path, tags: [`${Wortart.Adjektiv}/${adjektivOutputElement.regelmaessig ? "Regelmaessig" : "Unregelmaessig"}/${grad}/${flexionsart}`]}]
                }
              }
            }
          }
    }

    console.log("backlinksFromWord", backlinksFromWord);
}


async function makeDeclensionsMaps(plugin: TextEaterPlugin, file: TFile, adjektivOutputElement: AdjektivOutput[-1]) {
    const rootsFromGrad = adjektivOutputElement.adjektivstamm;

    const allDeclensionsFromGrad = new Map<Vergleichsgrad, AllDeclensions | undefined>();
    const allGrades = Object.values(Vergleichsgrad);

    for (const grad of allGrades) {
        const roots = rootsFromGrad[grad as keyof typeof rootsFromGrad];
        if (roots) {
            const declensions = makeAllDeclensionsFromAdjektivstamm(roots[0]);
            allDeclensionsFromGrad.set(grad as Vergleichsgrad, declensions);
        } 
    }
    
    const promiseArray = allGrades.map(async (grad) => {
    const declensions = allDeclensionsFromGrad.get(grad);
    if (!declensions) {
        return [grad, undefined] as const;
    }
    const path = await makePathFromWordFromAllDeclensions(plugin, file, declensions);
        return [grad, path] as const;
    });
    
    const results = await Promise.all(promiseArray);
    
    const pathFromWortFromGrad = new Map<Vergleichsgrad, Record<string, string> | undefined>();
    for (const [grad, path] of results) {
        pathFromWortFromGrad.set(grad, path);
    }

    return { allDeclensionsFromGrad, pathFromWortFromGrad };
};

async function makePathFromWordFromAllDeclensions(plugin: TextEaterPlugin, file: TFile, declensions: AllDeclensions) {
    const agjSet = new Set<string>();

    Object.values(declensions).forEach((declension) => {
      Object.values(declension).forEach((caseDeclension) => {
        Object.values(caseDeclension).forEach(({agj}) => {
          agjSet.add(agj);
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

