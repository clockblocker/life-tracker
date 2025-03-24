import { Editor, Notice, TFile } from 'obsidian';
import TextEaterPlugin from '../main';
import { makeGrundformsPrompt } from 'prompts/endgame/prompts/grundforms/grundformsPrompt';
import { grundformsOutputSchema } from 'prompts/endgame/zod/schemas';
import { Grundform, Wortart, Nomen, Genus } from 'prompts/endgame/zod/types';

// if g agj = g adv => only agj, collapse emojies, filter the same emojies  
// if 2 verbs => leave only one, collapse emojies, filter the same emojies  
// make them link to /path/of/a/part/of/speach if the document [[g]] does not exist
// <span class="custom-red">die</span>

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

const formatLinkToGrundformNote = (g: Grundform, noteForGrundformIsAlreadyCreated: boolean) => {
    const ok = noteForGrundformIsAlreadyCreated;

    if (g.grundform.length < 2) {
        return ok ? `[[${g.grundform}]]` : "";
    }

    switch (g.wortart) {
        case Wortart.Unbekannt:
            return "";   
        case Wortart.PartizipialesAdjektiv:
            return ok ? `[[${g.grundform}]]` : `[[Worter/Grundform/${Wortart.Verb}/${g.grundform[0]}/${g.grundform[1]}/${g.grundform}|${g.grundform}]]`
        case Wortart.Praefix:
            return `[[Grammatik/Praefix/List/${g.grundform} (Praefix)|${g.grundform}]]`;
        case Wortart.Praeposition:
            return `[[Grammatik/Praeposition/List/${g.grundform} (Praeposition)|${g.grundform}]]`;
        case Wortart.Pronomen:
            return `[[Grammatik/Pronomen/List/${g.grundform} (Pronomen)|${g.grundform}]]`;
        case Wortart.Konjunktion:
            return `[[Grammatik/Konjunktion/List/${g.grundform} (Konjunktion)|${g.grundform}]]`;
        case Wortart.Partikel:
            return `[[Grammatik/Partikel/List/${g.grundform} (Partikel)|${g.grundform}]]`;
        case Wortart.Artikel:
            return `[[Grammatik/Artikel/List/${g.grundform} (Artikel)|${g.grundform}]]`;
        default:
            return ok ? `[[${g.grundform}]]` : `[[Worter/Grundform/${g.wortart}/${g.grundform[0]}/${g.grundform[1]}/${g.grundform}|${g.grundform}]]`
}}

const formatGrundform = (g: Grundform, noteForGrundformIsAlreadyCreated: boolean) => {
    const ok = noteForGrundformIsAlreadyCreated;

    switch (g.wortart) {
        case Wortart.Unbekannt:
            return g.comment;   
        case Wortart.Nomen:
            return `${formatEmoji(g)} ${formatNomGenus(g)} ${formatLinkToGrundformNote(g, ok)} *${g.wortart}*`
        case Wortart.PartizipialesAdjektiv:
            return `${formatEmoji(g)} ${formatLinkToGrundformNote(g, ok)} *${Wortart.Verb}*`;
        default:
            return `${formatEmoji(g)} ${formatLinkToGrundformNote(g, ok)} *${g.wortart}*`
    }
}

async function doesGrundformNoteExist(plugin: TextEaterPlugin, file: TFile, g: Grundform) {
    const targetFile = plugin.app.metadataCache.getFirstLinkpathDest(g.grundform, file.path);
    return !!targetFile;
}

async function endgameInfCase(plugin: TextEaterPlugin, file: TFile, grundforms: Grundform[]) {
    const linksPromises = grundforms.map(async (g) => {
        const exists = await doesGrundformNoteExist(plugin, file, g);
        return formatGrundform(g, exists);
    });
    const links = (await Promise.all(linksPromises)).join("\n");
    await plugin.fileService.appendToFile(file.path, links);
}

export default async function endgame(plugin: TextEaterPlugin, editor: Editor, file: TFile) {
    const word = file.basename;
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
} 

