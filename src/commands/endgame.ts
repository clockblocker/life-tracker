import { Editor, Notice, TFile } from 'obsidian';
import TextEaterPlugin from '../main';
import { grundformsOutputSchema } from 'prompts/endgame/zod/schemas';
import { Grundform, Wortart, Nomen, Genus } from 'prompts/endgame/zod/types';
import { z } from "zod";
import { makeGrundformsPrompt } from 'prompts/endgame/grundform/prompts/grundforms/grundformsPrompt';
import { makeAnEndgameNote } from 'prompts/endgame/makeAnEndgameNote';

// verbForms: [["melkt", "milkt"], ["molk"], ["gemelkt", "gemolken"]],

// const articleFromGenus = {
//     [Genus.Feminin]: "die",
//     [Genus.Neutrum]: "das",
//     [Genus.Maskulin]: "der",
// };

// const formatNomGenus = (g: Nomen) => {
//     return `<span class="custom-color-for-${articleFromGenus}">${articleFromGenus}</span>`;
// };

// const formatEmojiBeschreibungs = (g: Grundform) => `${g.emojiBeschreibungs.join(" | ")}`;

// const grundformWortartFromGrundform = (g: Grundform) => {
//     return g.wortart === Wortart.PartizipialesAdjektiv ? Wortart.Verb : g.wortart;
// };

// const formattedWortartFromWortart = (w: Wortart) => {
//     return `*${w}*`
// };

// const formatLinkToGrundformNote = (g: Grundform, noteForGrundformIsAlreadyCreated: boolean) => {
//     const ok = noteForGrundformIsAlreadyCreated;

//     if (g.grundform.length < 2) {
//         return ok ? `[[${g.grundform}]]` : "";
//     }

//     switch (g.wortart) {
//         case Wortart.Unbekannt:
//             return "";   
//         case Wortart.Praefix:
//             return `[[Grammatik/Morphem/${g.wortart}/List/${g.grundform} (${g.wortart})|${g.grundform}]]`;
//         case Wortart.Praeposition:
//             return `[[Grammatik/${g.wortart}/List/${g.grundform} (${g.wortart})|${g.grundform}]]`;
//         case Wortart.Pronomen:
//             return `[[Grammatik/${g.wortart}/List/${g.grundform} (${g.wortart})|${g.grundform}]]`;
//         case Wortart.Konjunktion:
//             return `[[Grammatik/${g.wortart}/List/${g.grundform} (${g.wortart})|${g.grundform}]]`;
//         case Wortart.Partikel:
//             return `[[Grammatik/${g.wortart}/List/${g.grundform} (${g.wortart})|${g.grundform}]]`;
//         case Wortart.Artikel:
//             return `[[Grammatik/${g.wortart}/List/${g.grundform} (${g.wortart})|${g.grundform}]]`;
//         default:
//             return ok ? `[[${g.grundform}]]` : `[[Worter/Grundform/${grundformWortartFromGrundform(g)}/${g.grundform[0]}/${g.grundform[1]}/${g.grundform}|${g.grundform}]]`
// }};

// const MatchStatusSchema = z.enum(['ExactMatch', 'Form', 'Misspelling']);
// const MatchStatus = MatchStatusSchema.Enum;
// type MatchStatus = z.infer<typeof MatchStatusSchema>;

// function getMatchStatus(g: Grundform, word: string): MatchStatus {
//     const grundformLower = g.grundform.toLowerCase();
//     const rechtschreibungLower = g.rechtschreibung.toLowerCase();
    
//     if (grundformLower === word && word === rechtschreibungLower) {
//         return MatchStatus.ExactMatch;
//     }
    
//     if (word === rechtschreibungLower) {
//         return MatchStatus.Form;
//     }
    
//     return MatchStatus.Misspelling;
// };

// const matchScoreFromMatchStatus = {
//     [MatchStatus.ExactMatch]: 2,
//     [MatchStatus.Form]: 1,
//     [MatchStatus.Misspelling]: 0,
// };

// const reprFromMatchStatus = {
//     [MatchStatus.ExactMatch]: '',
//     [MatchStatus.Form]: 'Form of a',
//     [MatchStatus.Misspelling]: 'A misspelling of',
// };

// const formatMatchStatus = (g: Grundform, word: string) => {
//     return `*${reprFromMatchStatus[getMatchStatus(g, word)]}*`;
// };

// function compareGrundforms(a: Grundform, b: Grundform, word: string): number {
//     const aScore = matchScoreFromMatchStatus[getMatchStatus(a, word)];
//     const bScore = matchScoreFromMatchStatus[getMatchStatus(b, word)];

//     return aScore - bScore; 

//     // mergedGrundforms.sort((a, b) => compareGrundforms(a, b, word));

//     // // Explicit ordering based on status
//     // if (bStatus === 'ExactMatch' && aStatus !== 'ExactMatch') return 1;
//     // if (aStatus === 'ExactMatch' && bStatus !== 'ExactMatch') return -1;
//     // if (bStatus === 'Form' && aStatus === 'Misspelling') return 1;
//     // if (aStatus === 'Form' && bStatus === 'Misspelling') return -1;
//     // return 0;
// };

// const formatGrundform = (g: Grundform, exists: boolean, word: string): string => {
//     const status = getMatchStatus(g, word);
    
//     if (status === 'ExactMatch') {
//         // Exact match to the grundform
//         if (g.wortart === Wortart.Nomen) {
//             return `${formatEmojiBeschreibungs(g)} ${formatNomGenus(g as Nomen)} ${formatLinkToGrundformNote(g, exists)}`;
//         }
//         return `${formatEmojiBeschreibungs(g)} ${formatLinkToGrundformNote(g, exists)}`;
//     }
    
//     if (status === 'Form') {
//         // Form of a
//         return `*Form of a* ${formattedWortartFromWortart(g.wortart)} ${formatEmojiBeschreibungs(g)} ${formatLinkToGrundformNote(g, exists)}`;
//     }
    
//     // A misspelling of
//     if (g.wortart === Wortart.Nomen) {
//         return `*A misspelling of* ${formatEmojiBeschreibungs(g)} ${formatNomGenus(g as Nomen)} ${formatLinkToGrundformNote(g, exists)}`;
//     }
//     return `*A misspelling of* ${formatEmojiBeschreibungs(g)} ${formatLinkToGrundformNote(g, exists)}`;
// };

// async function doesGrundformNoteExist(plugin: TextEaterPlugin, file: TFile, grundform: Grundform): Promise<boolean> {
//     const targetPath = `${file.path.replace(/\/[^/]+$/, '')}/${grundform.grundform}.md`;
//     const targetFile = plugin.app.vault.getAbstractFileByPath(targetPath);
//     return !!targetFile;
// };

// async function endgameInfCase(plugin: TextEaterPlugin, file: TFile, grundforms: Grundform[]): Promise<void> {
//     const word = file.basename.toLocaleLowerCase();
    
//     // First, merge objects based on the rules
//     const mergedGrundforms = mergeGrundforms(grundforms);

//     // Sort by match status
//     mergedGrundforms.sort((a, b) => compareGrundforms(a, b, word));

//     // Keep existing formatting logic
//     const linksPromises = mergedGrundforms.map(async (g) => {
//         const exists = await doesGrundformNoteExist(plugin, file, g);
//         return formatGrundform(g, exists, word);
//     });

//     const formattedLinks = await Promise.all(linksPromises);
    
//     // Group by word type and join with appropriate separators
//     const groupedLinks = formattedLinks.reduce((acc, link, index) => {
//         const currentGrundform = mergedGrundforms[index];
//         const prevGrundform = index > 0 ? mergedGrundforms[index - 1] : null;
        
//         if (prevGrundform && currentGrundform.wortart === prevGrundform.wortart) {
//             // Same word type, join with |
//             acc[acc.length - 1] = acc[acc.length - 1] + " | " + link;
//         } else {
//             // Different word type, start new line
//             acc.push(link);
//         }
        
//         return acc;
//     }, [] as string[]);

//     const links = groupedLinks.join("\n");
    
//     await plugin.fileService.appendToFile(file.path, links);
// };

// function mergeGrundforms(grundforms: Grundform[]): Grundform[] {
//     const merged: Grundform[] = [];
//     const processed = new Set<string>();

//     for (const g1 of grundforms) {
//         // Create a composite key that includes both grundform and genus for nouns
//         const key = g1.wortart === Wortart.Nomen 
//             ? `${g1.grundform}-${g1.genus}`
//             : g1.grundform;

//         if (processed.has(key)) continue;

//         const toMerge: Grundform[] = [g1];
//         processed.add(key);

//         for (const g2 of grundforms) {
//             if (g1 === g2) continue;

//             const g2Key = g2.wortart === Wortart.Nomen 
//                 ? `${g2.grundform}-${g2.genus}`
//                 : g2.grundform;

//             if (processed.has(g2Key)) continue;

//             if (canMergeGrundforms(g1, g2)) {
//                 toMerge.push(g2);
//                 processed.add(g2Key);
//             }
//         }

//         if (toMerge.length > 1) {
//             // For nouns, keep separate entries for different genders
//             if (g1.wortart === Wortart.Nomen) {
//                 merged.push(...toMerge);
//             } else {
//                 // For other types, merge emojis
//                 const mergedEmojis = toMerge.flatMap(g => g.emojiBeschreibungs);
//                 merged.push({
//                     ...toMerge[0],
//                     emojiBeschreibungs: mergedEmojis
//                 });
//             }
//         } else {
//             merged.push(toMerge[0]);
//         }
//     }

//     return merged;
// };

// function canMergeGrundforms(g1: Grundform, g2: Grundform): boolean {
//     // adj + adj = adj
//     if (g1.wortart === Wortart.Adjektiv && g2.wortart === Wortart.Adjektiv) {
//         return true;
//     }

//     // adj + adv = adj
//     if ((g1.wortart === Wortart.Adjektiv && g2.wortart === Wortart.Adverb) ||
//         (g1.wortart === Wortart.Adverb && g2.wortart === Wortart.Adjektiv)) {
//         return true;
//     }

//     // verb + verb = verb
//     if (g1.wortart === Wortart.Verb && g2.wortart === Wortart.Verb) {
//         return true;
//     }

//     // verb + PartizipialesAdjektiv = verb
//     if ((g1.wortart === Wortart.Verb && g2.wortart === Wortart.PartizipialesAdjektiv) ||
//         (g1.wortart === Wortart.PartizipialesAdjektiv && g2.wortart === Wortart.Verb)) {
//         return true;
//     }

//     // nom + nom (if the same gender)
//     if (g1.wortart === Wortart.Nomen && g2.wortart === Wortart.Nomen) {
//         return g1.genus === g2.genus;
//     }

//     return false;
// };

export default async function endgame(plugin: TextEaterPlugin, editor: Editor, file: TFile) {
    const word = file.basename.toLocaleLowerCase();
    try {
        const grundformsPrompt = makeGrundformsPrompt();
        const generatedGrundforms = await plugin.apiService.generateContent(grundformsPrompt, word, true);

        const parsedGrungforms = grundformsOutputSchema.safeParse(JSON.parse(generatedGrundforms));
        
        if (parsedGrungforms.error) {
            console.error({zodError: parsedGrungforms.error, output: generatedGrundforms});
            await plugin.fileService.appendToFile(file.path, "Contact t.me/@clockblocker");
            return;
        }

        await makeAnEndgameNote(plugin, file, parsedGrungforms.data, word);        
    } catch (error) {
        new Notice(`Error: ${error.message}`);
    }
};
