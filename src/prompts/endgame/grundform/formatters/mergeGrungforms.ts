import { Grundform, Wortart } from "prompts/endgame/zod/types";

export function mergeGrundforms<G extends Grundform>(grundforms: G[]): G[] {
    const merged: G[] = [];
    const processed = new Set<string>();

    for (const g1 of grundforms) {
        // Create a composite key that includes both grundform and genus for nouns
        // For verbs, include regelmaessigkeit in the key
        const key = g1.wortart === Wortart.Nomen 
            ? `${g1.grundform}-${g1.genus}`
            : g1.wortart === Wortart.Verb
                ? `${g1.grundform}-${g1.regelmaessigkeit}`
                : g1.grundform;

        if (processed.has(key)) continue;

        const toMerge: G[] = [g1];
        processed.add(key);

        for (const g2 of grundforms) {
            if (g1 === g2) continue;

            const g2Key = g2.wortart === Wortart.Nomen 
                ? `${g2.grundform}-${g2.genus}`
                : g2.wortart === Wortart.Verb
                    ? `${g2.grundform}-${g2.regelmaessigkeit}`
                    : g2.grundform;

            if (processed.has(g2Key)) continue;

            if (canMergeGrundforms(g1, g2)) {
                toMerge.push(g2);
                processed.add(g2Key);
            }
        }

        if (toMerge.length > 1) {
            // For nouns, keep separate entries for different genders
            if (g1.wortart === Wortart.Nomen) {
                merged.push(...toMerge);
            } else if (g1.wortart === Wortart.Verb) {
                // For verbs, keep separate entries for different regelmaessigkeit
                merged.push(...toMerge);
            } else {
                // For other types, merge emojis
                const mergedEmojis = toMerge.flatMap(g => g.emojiBeschreibungs);
                merged.push({
                    ...toMerge[0],
                    emojiBeschreibungs: mergedEmojis
                });
            }
        } else {
            merged.push(toMerge[0]);
        }
    }

    return merged;
};

function canMergeGrundforms<G extends Grundform>(g1: G, g2: G): boolean {
    // adj + adj = adj
    if (g1.wortart === Wortart.Adjektiv && g2.wortart === Wortart.Adjektiv) {
        return true;
    }

    // adj + adv = adj
    if ((g1.wortart === Wortart.Adjektiv && g2.wortart === Wortart.Adverb) ||
        (g1.wortart === Wortart.Adverb && g2.wortart === Wortart.Adjektiv)) {
        return true;
    }

    // verb + verb = verb (only if same regelmaessigkeit)
    if (g1.wortart === Wortart.Verb && g2.wortart === Wortart.Verb) {
        return g1.regelmaessigkeit === g2.regelmaessigkeit;
    }

    // verb + PartizipialesAdjektiv = verb
    if ((g1.wortart === Wortart.Verb && g2.wortart === Wortart.PartizipialesAdjektiv) ||
        (g1.wortart === Wortart.PartizipialesAdjektiv && g2.wortart === Wortart.Verb)) {
        return true;
    }

    // nom + nom (if the same gender)
    if (g1.wortart === Wortart.Nomen && g2.wortart === Wortart.Nomen) {
        return g1.genus === g2.genus;
    }

    return false;
};
