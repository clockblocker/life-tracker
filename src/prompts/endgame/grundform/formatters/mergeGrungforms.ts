import { Grundform, Wortart } from "prompts/endgame/zod/types";

function keyFromGrundform<G extends Grundform>(g: G) {
    return `${g.wortart}-${(g as any)?.genus || ""}`;
}

export function mergeGrundforms<G extends Grundform>(grundforms: G[]): G[] {
    const merged: G[] = [];

    const m = new Map(grundforms.map(g => [keyFromGrundform(g), {...g, emojiBeschreibungs: [] as string[]}]));
    for (let g of grundforms) {
        const k = keyFromGrundform(g);
        if (g.wortart === Wortart.PartizipialesAdjektiv) {
            if (m.has(`${Wortart.Verb}-`)) {
                continue;
            }
        } else if (g.wortart === Wortart.Adverb) {
            if (m.has(`${Wortart.Adjektiv}-`)) {
                continue;
            }
        }
        const a = m.get(k);
        if (a) {
            m.set(k, {...a, emojiBeschreibungs: [...a.emojiBeschreibungs, ...g.emojiBeschreibungs]})
        }
    }

    for (let v of m.values()) {
        merged.push(v);
    }

    return merged;
};

// function canMergeGrundforms<G extends Grundform>(g1: G, g2: G): boolean {
//     // adj + adj = adj
//     if (g1.wortart === Wortart.Adjektiv && g2.wortart === Wortart.Adjektiv) {
//         return true;
//     }

//     // adj + adv = adj
//     if ((g1.wortart === Wortart.Adjektiv && g2.wortart === Wortart.Adverb) ||
//         (g1.wortart === Wortart.Adverb && g2.wortart === Wortart.Adjektiv)) {
//         return true;
//     }

//     // verb + verb = verb (merge all verbs with same grundform, case-insensitive)
//     if (g1.wortart === Wortart.Verb && g2.wortart === Wortart.Verb) {
//         return g1.grundform.toLowerCase() === g2.grundform.toLowerCase();
//     }

//     // verb + PartizipialesAdjektiv = verb
//     if ((g1.wortart === Wortart.Verb && g2.wortart === Wortart.PartizipialesAdjektiv) ||
//         (g1.wortart === Wortart.PartizipialesAdjektiv && g2.wortart === Wortart.Verb)) {
//         return true;
//     }

//     // nom + nom (if the same gender)
//     if (g1.wortart === Wortart.Nomen && g2.wortart === Wortart.Nomen) {
//         return g1.genus === g2.genus;
//     }

//     return false;
// };
