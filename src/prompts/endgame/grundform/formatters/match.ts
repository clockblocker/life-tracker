import { Grundform, GrundformsWithMatchStatus, MatchStatus, Wortart } from "../../zod/types";

export function getMatchStatus(g: Grundform, word: string): MatchStatus {
    const grundformLower = g.grundform.toLowerCase();
    const rechtschreibungLower = g.rechtschreibung.toLowerCase();
    
    if (grundformLower === word && word === rechtschreibungLower) {
        return MatchStatus.ExactMatch;
    }
    
    if (word === rechtschreibungLower) {
        return MatchStatus.Form;
    }
    
    return MatchStatus.Misspelling;
};

export const matchScoreFromMatchStatus: Record<MatchStatus, number> = {
    [MatchStatus.ExactMatch]: 2,
    [MatchStatus.Form]: 1,
    [MatchStatus.Misspelling]: 0,
};

export const reprFromMatchStatus: Record<MatchStatus, string>  = {
    [MatchStatus.ExactMatch]: '',
    [MatchStatus.Form]: 'Form of a',
    [MatchStatus.Misspelling]: 'A misspelling of',
};

export const formatMatchStatus = ({ wortart, matchStatus }: GrundformsWithMatchStatus) => {
    const repr = wortart === Wortart.Unbekannt ? "" : reprFromMatchStatus[matchStatus];
    return repr ? `*${repr}*` : repr;
};

export function compareGrundforms(a: Grundform, b: Grundform, word: string): number {
    const aScore = matchScoreFromMatchStatus[getMatchStatus(a, word)];
    const bScore = matchScoreFromMatchStatus[getMatchStatus(b, word)];

    return bScore - aScore; 
};

