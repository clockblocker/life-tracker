import { Editor, Notice, TFile } from 'obsidian';
import TextEaterPlugin from '../main';
import { makeGrundformsPrompt } from 'prompts/endgame/prompts/grundforms/grundformsPrompt';
import { grundformsOutputSchema } from 'prompts/endgame/zod/schemas';
import { Grundform, Wortart, Nomen, Genus } from 'prompts/endgame/zod/types';

// verbForms: [["melkt", "milkt"], ["molk"], ["gemelkt", "gemolken"]],


const formatEmoji = (g: Grundform) => `${g.emojiBeschreibungs.join(" | ")}`;
const formatNomGenus = (g: Nomen) => {
    switch (g.genus) {
        case Genus.Feminin:
            return `<span class="custom-color-for-die">die</span>`;
        case Genus.Neutrum:
            return `<span class="custom-color-for-das">das</span>`;
        case Genus.Maskulin:
            return `<span class="custom-color-for-der">der</span>`;
    }
};

const grundformWortartFromGrundform = (g: Grundform) => {
    return g.wortart === Wortart.PartizipialesAdjektiv ? Wortart.Verb : g.wortart;
};

const formattedWortartFromWortart = (w: Wortart) => {
    return `*${w}*`
};

const formatLinkToGrundformNote = (g: Grundform, noteForGrundformIsAlreadyCreated: boolean) => {
    const ok = noteForGrundformIsAlreadyCreated;

    if (g.grundform.length < 2) {
        return ok ? `[[${g.grundform}]]` : "";
    }

    switch (g.wortart) {
        case Wortart.Unbekannt:
            return "";   
        case Wortart.Praefix:
            return `[[Grammatik/Morphem/${g.wortart}/List/${g.grundform} (${g.wortart})|${g.grundform}]]`;
        case Wortart.Praeposition:
            return `[[Grammatik/${g.wortart}/List/${g.grundform} (${g.wortart})|${g.grundform}]]`;
        case Wortart.Pronomen:
            return `[[Grammatik/${g.wortart}/List/${g.grundform} (${g.wortart})|${g.grundform}]]`;
        case Wortart.Konjunktion:
            return `[[Grammatik/${g.wortart}/List/${g.grundform} (${g.wortart})|${g.grundform}]]`;
        case Wortart.Partikel:
            return `[[Grammatik/${g.wortart}/List/${g.grundform} (${g.wortart})|${g.grundform}]]`;
        case Wortart.Artikel:
            return `[[Grammatik/${g.wortart}/List/${g.grundform} (${g.wortart})|${g.grundform}]]`;
        default:
            return ok ? `[[${g.grundform}]]` : `[[Worter/Grundform/${grundformWortartFromGrundform(g)}/${g.grundform[0]}/${g.grundform[1]}/${g.grundform}|${g.grundform}]]`
}};

const formatGrundform = (g: Grundform, noteForGrundformIsAlreadyCreated: boolean) => {
    const ok = noteForGrundformIsAlreadyCreated;

    switch (g.wortart) {
        case Wortart.Unbekannt:
            return g.comment;   
        case Wortart.Nomen:
            return `${formatEmoji(g)} ${formatNomGenus(g)} ${formatLinkToGrundformNote(g, ok)}`
        default:
            return `${formatEmoji(g)} ${formatLinkToGrundformNote(g, ok)} ${formattedWortartFromWortart(grundformWortartFromGrundform(g))}`
    }
};

async function doesGrundformNoteExist(plugin: TextEaterPlugin, file: TFile, g: Grundform) {
    const targetFile = plugin.app.metadataCache.getFirstLinkpathDest(g.grundform, file.path);
    return !!targetFile;
};

async function endgameInfCase(plugin: TextEaterPlugin, file: TFile, grundforms: Grundform[]) {
    // First, merge objects based on the rules
    const mergedGrundforms = mergeGrundforms(grundforms);

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

    const links = groupedLinks.join("\n");
    
    await plugin.fileService.appendToFile(file.path, links);
}

function mergeGrundforms(grundforms: Grundform[]): Grundform[] {
    const merged: Grundform[] = [];
    const processed = new Set<string>();

    for (const g1 of grundforms) {
        // Create a composite key that includes both grundform and genus for nouns
        const key = g1.wortart === Wortart.Nomen 
            ? `${g1.grundform}-${g1.genus}`
            : g1.grundform;

        if (processed.has(key)) continue;

        const toMerge: Grundform[] = [g1];
        processed.add(key);

        for (const g2 of grundforms) {
            if (g1 === g2) continue;

            const g2Key = g2.wortart === Wortart.Nomen 
                ? `${g2.grundform}-${g2.genus}`
                : g2.grundform;

            if (processed.has(g2Key)) continue;

            if (canMergeGrundforms(g1, g2)) {
                toMerge.push(g2);
                processed.add(g2Key);
            }
        }

        if (toMerge.length > 1) {
            // For nouns, keep separate entries for different genders
            if (g1.wortart === Wortart.Nomen) {
                merged.push(...toMerge);
            } else {
                // For other types, merge emojis
                const mergedEmojis = toMerge.flatMap(g => g.emojiBeschreibungs);
                merged.push({
                    ...toMerge[0],
                    emojiBeschreibungs: mergedEmojis
                });
            }
        } else {
            merged.push(toMerge[0]);
        }
    }

    return merged;
}

function canMergeGrundforms(g1: Grundform, g2: Grundform): boolean {
    // adj + adj = adj
    if (g1.wortart === Wortart.Adjektiv && g2.wortart === Wortart.Adjektiv) {
        return true;
    }

    // adj + adv = adj
    if ((g1.wortart === Wortart.Adjektiv && g2.wortart === Wortart.Adverb) ||
        (g1.wortart === Wortart.Adverb && g2.wortart === Wortart.Adjektiv)) {
        return true;
    }

    // verb + verb = verb
    if (g1.wortart === Wortart.Verb && g2.wortart === Wortart.Verb) {
        return true;
    }

    // verb + PartizipialesAdjektiv = verb
    if ((g1.wortart === Wortart.Verb && g2.wortart === Wortart.PartizipialesAdjektiv) ||
        (g1.wortart === Wortart.PartizipialesAdjektiv && g2.wortart === Wortart.Verb)) {
        return true;
    }

    // nom + nom (if the same gender)
    if (g1.wortart === Wortart.Nomen && g2.wortart === Wortart.Nomen) {
        return g1.genus === g2.genus;
    }

    return false;
}

export default async function endgame(plugin: TextEaterPlugin, editor: Editor, file: TFile) {
    const word = file.basename.toLocaleLowerCase();
    try {
        const grundformsPrompt = makeGrundformsPrompt();
        const dictionaryEntry = await plugin.apiService.generateContent(grundformsPrompt, word, true);

        const parsed = grundformsOutputSchema.safeParse(JSON.parse(dictionaryEntry));
        
        if (parsed.error) {
            console.error({zodError: parsed.error, output: dictionaryEntry});
            await plugin.fileService.appendToFile(file.path, "Contact t.me/@clockblocker");
            return;
        }

        const grundforms = parsed.data.map(({rechtschreibung, grundform, ...rest}) => ({rechtschreibung, grundform, ...rest, isGrundform: word === rechtschreibung && rechtschreibung === grundform})).sort(({isGrundform}) => isGrundform ? 1 : 0);
        if (!grundforms.some(({isGrundform}) => isGrundform)) {
            await endgameInfCase(plugin, file, parsed.data)
        }
        
        console.log('grundforms', grundforms);
    } catch (error) {
        new Notice(`Error: ${error.message}`);
    }
};

