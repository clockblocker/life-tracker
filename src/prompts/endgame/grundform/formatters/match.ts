import { Grundform, GrundformWithMatch, Match, Wortart } from "../../zod/types";

export function getMatch(g: Grundform, word: string): Match {
    const grundformLower = g.grundform.toLowerCase();
    const rechtschreibungLower = g.rechtschreibung.toLowerCase();
    
    if (grundformLower === word && word === rechtschreibungLower) {
        return Match.ExactMatch;
    }
    
    if (word === rechtschreibungLower) {
        return Match.Form;
    }
    
    return Match.Misspelling;
};

export const matchScoreFromMatch: Record<Match, number> = {
    [Match.ExactMatch]: 2,
    [Match.Form]: 1,
    [Match.Misspelling]: 0,
};

export const reprFromMatch: Record<Match, string>  = {
    [Match.ExactMatch]: '',
    [Match.Form]: 'Form of a',
    [Match.Misspelling]: 'A misspelling of',
};

export const formatMatch = ({ wortart, match }: GrundformWithMatch) => {
    const repr = wortart === Wortart.Unbekannt ? "" : reprFromMatch[match];
    return repr ? `*${repr}*` : repr;
};

export function compareGrundforms(a: Grundform, b: Grundform, word: string): number {
    const aScore = matchScoreFromMatch[getMatch(a, word)];
    const bScore = matchScoreFromMatch[getMatch(b, word)];

    return bScore - aScore; 
};

