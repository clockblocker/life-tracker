import TextEaterPlugin from "main";
import { TFile } from "obsidian";
import { GrundformKerl, Match, MorphemKerl, Wortart } from "prompts/endgame/zod/types";

export async function getMaybeExistingNotePath(plugin: TextEaterPlugin, file: TFile, word: string) {
    const targetFile = plugin.app.metadataCache.getFirstLinkpathDest(word, file.path);
    return targetFile ? targetFile.path : null;
}

export const grundformWortartFromGrundform = (g: GrundformKerl) => {
    return g.wortart;
};

export const getPathToNote = ({ word, wortart, match, maybeExisitingNotePath }: {
    word: string, 
    wortart: Wortart,
    match: Match,
    maybeExisitingNotePath: string | null
}) => {
    const ok = maybeExisitingNotePath !== null;

    if (word.length < 2) {
        return ok ? `${maybeExisitingNotePath}|${word}` : "";
    }

    switch (wortart) {
        case Wortart.Unbekannt:
            return "";   
        case Wortart.Praefix:
            return `Grammatik/Morphem/${wortart}/List/${word} (${wortart})`;
        case Wortart.Praeposition:
            return `Grammatik/${wortart}/List/${word} (${wortart})`;
        case Wortart.Pronomen:
            return `Grammatik/${wortart}/List/${word} (${wortart})`;
        case Wortart.Konjunktion:
            return `Grammatik/${wortart}/List/${word} (${wortart})`;
        case Wortart.Partikel:
            return `Grammatik/${wortart}/List/${word} (${wortart})`;
        case Wortart.Artikel:
            return `Grammatik/${wortart}/List/${word} (${wortart})`;
        default:
            return ok ? `${maybeExisitingNotePath}|${word}` : `Worter/${match}/${wortart}/${word[0]}/${word[1]}/${word}`
}};

export function formatPathToGrundformNoteAsLink<G extends {grundform: string}>(g: G, path: string) {
    if (!path) {
        return "";
    } else if (!path.includes("/")) {
        return `[[${path}]]`;
    } 
    return `[[${path}|${g.grundform}]]`
};

export async function formatLinkToGrundformNote(g: GrundformKerl, maybeExisitingNotePath: string | null) {
    const path = await getPathToNote({
        word: g.grundform, 
        wortart: g.wortart, 
        match: Match.Grundform,
        maybeExisitingNotePath
    });
    return formatPathToGrundformNoteAsLink(g, path);
};

export async function getPathsToGrundformNotes(plugin: TextEaterPlugin, file: TFile, kerls: GrundformKerl[]) {
    const pathsPromises = kerls.map(async (g) => {
        const maybeExisitingNotePath = await getMaybeExistingNotePath(plugin, file, g.grundform);
        return await getPathToNote({
            word: g.grundform, 
            wortart: g.wortart, 
            match: Match.Grundform,
            maybeExisitingNotePath
        });
    });

    return await Promise.all(pathsPromises);
}

export function getPathsToMorphemNotes(kerls: MorphemKerl[]) {
    return kerls.map(k => `Grammatik/Morphem/${k.morphem}/List/${k.grundform[0]}/${k.grundform} (${k.morphem})`)
}