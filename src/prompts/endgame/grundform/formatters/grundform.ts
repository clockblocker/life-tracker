import { Genus, Nomen, Grundform, Wortart, GrundformsWithMatchStatus } from "prompts/endgame/zod/types";
import { formatLinkToGrundformNote } from "./link";
import { formatMatchStatus } from "./match";

const articleFromGenus = {
    [Genus.Feminin]: "die",
    [Genus.Neutrum]: "das",
    [Genus.Maskulin]: "der",
};

const formatNomGenus = ({genus: g}: Nomen) => {
    return `<span class="custom-color-for-${articleFromGenus[g]}">${articleFromGenus[g]}</span>`;
};

const formatEmojiBeschreibungs = (g: Grundform) => `${g.emojiBeschreibungs.join(" | ")}`;

const formattedWortartFromGrundform = (g: Grundform) => {
    const w = g.wortart;
    if (w === Wortart.Nomen) {
        return formatNomGenus(g)
    } else if (w === Wortart.PartizipialesAdjektiv) {
        return `*${Wortart.Verb}*`
    }
    return `*${w}*`
};

export const formatGrundform = (g: GrundformsWithMatchStatus, grundformNoteExists: boolean): string => {
    return `${formatMatchStatus(g)} ${formattedWortartFromGrundform(g)} ${formatEmojiBeschreibungs(g)} ${formatLinkToGrundformNote(g, grundformNoteExists)}`;
};