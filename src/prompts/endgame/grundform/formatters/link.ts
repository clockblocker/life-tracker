import TextEaterPlugin from "main";
import { TFile } from "obsidian";
import { GrundformKerl, MorphemKerl, Wortart } from "prompts/endgame/zod/types";

export async function grundformNotePath(plugin: TextEaterPlugin, file: TFile, g: GrundformKerl) {
    const targetFile = plugin.app.metadataCache.getFirstLinkpathDest(g.grundform, file.path);
    return targetFile ? targetFile.path : null;
}

export const grundformWortartFromGrundform = (g: GrundformKerl) => {
    return g.wortart;
};

export const getPathToGrundformNote = (g: GrundformKerl, grundformNotePath: string | null) => {
    const ok = grundformNotePath !== null;

    if (g.grundform.length < 2) {
        return ok ? `${grundformNotePath}|${g.grundform}` : "";
    }

    switch (g.wortart) {
        case Wortart.Unbekannt:
            return "";   
        case Wortart.Praefix:
            return `Grammatik/Morphem/${g.wortart}/List/${g.grundform} (${g.wortart})`;
        case Wortart.Praeposition:
            return `Grammatik/${g.wortart}/List/${g.grundform} (${g.wortart})`;
        case Wortart.Pronomen:
            return `Grammatik/${g.wortart}/List/${g.grundform} (${g.wortart})`;
        case Wortart.Konjunktion:
            return `Grammatik/${g.wortart}/List/${g.grundform} (${g.wortart})`;
        case Wortart.Partikel:
            return `Grammatik/${g.wortart}/List/${g.grundform} (${g.wortart})`;
        case Wortart.Artikel:
            return `Grammatik/${g.wortart}/List/${g.grundform} (${g.wortart})`;
        default:
            return ok ? `${grundformNotePath}|${g.grundform}` : `Worter/Grundform/${grundformWortartFromGrundform(g)}/${g.grundform[0]}/${g.grundform[1]}/${g.grundform}`
}};

export function formatPathToGrundformNoteAsLink<G extends {grundform: string}>(g: G, path: string) {
    if (!path) {
        return "";
    } else if (!path.includes("/")) {
        return `[[${path}]]`;
    } 
    return `[[${path}|${g.grundform}]]`
};

export async function formatLinkToGrundformNote(g: GrundformKerl, grundformNotePath: string | null) {
    const path = await getPathToGrundformNote(g, grundformNotePath);
    return formatPathToGrundformNoteAsLink(g, path);
};

export async function getPathsToGrundformNotes(plugin: TextEaterPlugin, file: TFile, kerls: GrundformKerl[]) {
    const pathsPromises = kerls.map(async (g) => {
        const grundformPath = await grundformNotePath(plugin, file, g);
        return getPathToGrundformNote(g, grundformPath);
    });

    return await Promise.all(pathsPromises);
}

export function getPathsToMorphemNotes(kerls: MorphemKerl[]) {
    return kerls.map(k => `Grammatik/Morphem/${k.morphem}/List/${k.grundform} (${k.morphem})`)
}