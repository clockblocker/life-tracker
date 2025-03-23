import { z } from "zod";

export const VergleichsformSchema = z.enum(["Positiv", "Komparativ", "Superlativ"]);
export const VerbFormTagSchema = z.enum(["Praesens", "Praeteritum", "Perfekt", "Imperativ", "K1", "K2", "P1", "P2", "ZuInfinitiv"]);

export const FormSchema = z.enum(["Grundform", "Flektiert"]);
export const RegelmaessigkeitsSchema = z.enum(["Regelmaessig", "Unregelmaessig"]);

export const ConjugationSchema = z.enum(["Stark", "Schwach", "Gemischt"]);
export const AdjektivDeklinationSchema = z.enum(["Stark", "Schwach", "Gemischt"]);

// const DerivedAdjectiveSchema = z.enum(["Verbaladjektiv", "NominalAdjektiv"]);

// Adv ->  degree: z.optional(z.array(DegreeSchema)),
// Adj ->  degree: z.optional(z.array(DegreeSchema)),

// Artikel: genus: GenusSchema,
// case: KasusSchema,
// case: z.optional(z.array(KasusSchema)),