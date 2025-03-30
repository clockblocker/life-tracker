import { Genus, Kasus, NomenDeklination, Numerus } from "prompts/endgame/zod/types";
import { z } from "zod";
import { AllDeclensions, fromFromNomenDeklinationFromKasusFromCaseDeclension, AllDeclensionsSchema, Declensions, CaseDeclension, pronomen, verbForms, allDeclensionsKeys, caseDeclensionKeys, declensionKeys } from "./types-and-consts";

export function makeAllDeclensionsFromAdjektivstamm(roots: string[] | undefined): AllDeclensions | undefined {
    if (!roots) {
        return undefined;
    }
    const allDeclensions: any = {};
    for (let nomenDeklination of allDeclensionsKeys) {
        allDeclensions[nomenDeklination] = {}
        for (let kasus of declensionKeys) {
            allDeclensions[nomenDeklination][kasus] = {}
            for (let caseDec of caseDeclensionKeys) {
                const fromFromFromKasusFromCaseDeclension = fromFromNomenDeklinationFromKasusFromCaseDeclension[nomenDeklination];
                if (!fromFromFromKasusFromCaseDeclension) {
                    continue;
                }
                const { artikel, agj: endung } = fromFromFromKasusFromCaseDeclension[kasus][caseDec][0];
                allDeclensions[nomenDeklination][kasus][caseDec] = roots.map(root => ({ artikel, agj: root + endung }))
            }
        }
    }
    const parsedAllDeclensions = AllDeclensionsSchema.safeParse(allDeclensions);
    
    if (parsedAllDeclensions.error) {
        console.error(parsedAllDeclensions.error);
        return undefined;
    }
    return parsedAllDeclensions.data;
};

export function getSentencesForAllDeclensions(d: AllDeclensions): string[][] {
    const cases: (keyof Declensions)[] = [Kasus.N, Kasus.D, Kasus.A, Kasus.G];
    const genders: (keyof CaseDeclension)[] = [Genus.M, Genus.F, Genus.N, Numerus.Mehrzahl];
  
    const declensionTypes: (keyof AllDeclensions)[] = [NomenDeklination.Schwach, NomenDeklination.Gemischt, NomenDeklination.Stark];
  
    const sentences: string[][] = [];
  
    for (const dt of declensionTypes) {
      const sentencesForDeclension = genders.map(gender => {
        const listOfParts = cases.map((cas, idx) => {
            if (dt === undefined) {
                return [''];
            } 

            const dDt = d[dt];
            if (dDt === undefined) {
                return [''];
            } 

            const dDtCas = dDt[cas];
            if (dDtCas === undefined) {
                return [''];
            } 

            const roots = dDtCas[gender];

            return roots.map(root => {
                const adj = root.agj;
                const article = root.artikel;
                const noun = pronomen[gender][idx];
                return article ? `*${article}* ${adj} *${noun}*` : `${adj} *${noun}*` ;
            })
        }).filter(parts => parts[0] !== '');
  
        const verb = verbForms[gender];

        const listOfFormattedSentences = listOfParts.map(parts => {
            const [firstLetter, secondLetter, ...rest] = parts[0].split("");
            return `${firstLetter === "*" ? firstLetter + secondLetter.toLocaleUpperCase() : firstLetter.toLocaleUpperCase() + secondLetter}${rest.join("")} *${verb}* ${parts[1]} ${parts[2]} ${parts[3]}`;
        })
        
        return listOfFormattedSentences;
      });
  
      sentencesForDeclension.forEach(sentence => sentences.push(sentence))
    }
  
    return sentences;
};
