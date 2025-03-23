import { Editor, Notice, TFile } from 'obsidian';
import TextEaterPlugin from '../main';
import { makeGrundformsPrompt } from 'prompts/endgame/prompts/grundforms/grundformsPrompt';
import { grundformsOutputSchema } from 'prompts/endgame/zod/schemas';
import { Grundform, Wortart, Nomen, Genus } from 'prompts/endgame/zod/types';

// if g agj = g adv => only agj, collapse emojies, filter the same emojies  
// if 2 verbs => leave only one, collapse emojies, filter the same emojies  
// make them link to /path/of/a/part/of/speach if the document [[g]] does not exist

// <span class="custom-red">die</span>

const formatEmoji = (g: Grundform) => `${g.emojiBeschreibungs.join(" | ")}`;
const formatNomGenus = (g: Nomen) => {
    switch (g.genus) {
        case Genus.Feminin:
            return `<span class="custom-color-for-die">[[Grammatik/Artikel/List/die|die]]</span>`;
        case Genus.Neutrum:
            return `<span class="custom-color-for-das">[[Grammatik/Artikel/List/das|das]]</span>`;
        case Genus.Maskulin:
            return `<span class="custom-color-for-der">[[Grammatik/Artikel/List/der|der]]</span>`;
    }
};

const makeLink = (g: Grundform) => {
    switch (g.wortart) {
        case Wortart.Unbekannt:
            return g.comment;   
        case Wortart.Nomen:
            return `${formatEmoji(g)} ${formatNomGenus(g)} [[${g.grundform}]] *${g.wortart}*`
        case Wortart.PartizipialesAdjektiv:
            return `${formatEmoji(g)} [[${g.grundform}]] *${Wortart.Verb}*`;
        case Wortart.Praefix:
            return `${formatEmoji(g)} [[Grammatik/Praefix/List/${g.grundform} (Praefix)|${g.grundform}]] *${Wortart.Verb}*`;
        case Wortart.Praeposition:
            return `${formatEmoji(g)} [[Grammatik/Praeposition/List/${g.grundform} (Praeposition)|${g.grundform}]] *${Wortart.Praeposition}*`;
        case Wortart.Pronomen:
            return `${formatEmoji(g)} [[Grammatik/Pronomen/List/${g.grundform} (Pronomen)|${g.grundform}]] *${Wortart.Pronomen}*`;
        case Wortart.Konjunktion:
            return `${formatEmoji(g)} [[Grammatik/Konjunktion/List/${g.grundform} (Konjunktion)|${g.grundform}]] *${Wortart.Konjunktion}*`;
        case Wortart.Partikel:
            return `${formatEmoji(g)} [[Grammatik/Partikel/List/${g.grundform} (Partikel)|${g.grundform}]] *${Wortart.Partikel}*`;
        case Wortart.Artikel:
            return `${formatEmoji(g)} [[Grammatik/Artikel/List/${g.grundform} (Artikel)|${g.grundform}]] *${Wortart.Artikel}*`;
        default:
            return `${formatEmoji(g)} [[${g.grundform}]] *${g.wortart}*`
    }
}

async function endgameInfCase(plugin: TextEaterPlugin, file: TFile, grundforms: Grundform[]) {
    const links = grundforms.map((g) => makeLink(g)).join("\n")
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

