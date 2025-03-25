import TextEaterPlugin from "main";
import { TFile } from "obsidian";
import { Grundform, Wortart } from "prompts/endgame/zod/types";

export async function doesGrundformNoteExist(plugin: TextEaterPlugin, file: TFile, g: Grundform) {
    const targetFile = plugin.app.metadataCache.getFirstLinkpathDest(g.grundform, file.path);
    return !!targetFile;
}

export const grundformWortartFromGrundform = (g: Grundform) => {
    return g.wortart === Wortart.PartizipialesAdjektiv ? Wortart.Verb : g.wortart;
};

export const formatLinkToGrundformNote = (g: Grundform, noteForGrundformIsAlreadyCreated: boolean) => {
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