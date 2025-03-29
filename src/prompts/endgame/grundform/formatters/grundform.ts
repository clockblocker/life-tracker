import { Genus, Nomen, Grundform, Wortart, GrundformWithMatch } from "prompts/endgame/zod/types";
import { formatLinkToGrundformNote } from "./link";
import { formatMatch } from "./match";

const nomenativeArticleFromGenus = {
    [Genus.F]: "die",
    [Genus.N]: "das",
    [Genus.M]: "der",
};

const formatNomGenus = ({genus: g}: Nomen) => {
    return `<span class="custom-color-for-${nomenativeArticleFromGenus[g]}">${nomenativeArticleFromGenus[g]}</span>`;
};

const formatEmojiBeschreibungs = (g: Grundform) => `${g.emojiBeschreibungs.join(" | ")}`;

const formattedWortartFromGrundform = (g: Grundform) => {
    const w = g.wortart;
    if (w === Wortart.Nomen) {
        return formatNomGenus(g)
    } 
    return `*${w}*`
};

export const formatGrundform = (g: GrundformWithMatch, grundformNotePath: string | null): string => {
    return [formatMatch(g), formattedWortartFromGrundform(g), formatEmojiBeschreibungs(g), formatLinkToGrundformNote(g, grundformNotePath)].filter(a => a).join(' ');
};