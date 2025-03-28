import { z } from "zod";

const VergleichsformSchema = z.enum(["Positiv", "Komparativ", "Superlativ"]);
const VerbFormTagSchema = z.enum(["Praesens", "Praeteritum", "Perfekt", "Imperativ", "K1", "K2", "P1", "P2", "ZuInfinitiv"]);

const FormSchema = z.enum(["Grundform", "Flektiert"]);

const ConjugationSchema = z.enum(["Stark", "Schwach", "Gemischt"]);
const AdjektivDeklinationSchema = z.enum(["Stark", "Schwach", "Gemischt"]);

// ---

const KasusSchema = z.enum(["N", "G", "D", "A"]); // ["Nominativ", "Genitiv", "Dativ", "Akkusativ"]
const NumerusSchema = z.enum(["Einzahl", "Mehrzahl"]);

const NomenDeklinationSchema = z.enum(["Stark", "Schwach", "Gemischt"]);
const RegelmaessigSchema = z.boolean(); // "Regelmaessig", "Unregelmaessig"

const TrennbarkeitSchema = z.enum(["Trennbar", "Untrennbar"]);

const AdverbCategorySchema = z.enum(["Lokal", "Temporal", "Modal", "Kausal", "Grad"]);
const ArtikelTypeSchema = z.enum(["Bestimmt", "Unbestimmt"]);
const PartikelTypeSchema = z.enum(["Intensität", "Fokus", "Negation", "Abtönung", "Konnektiv"]);
const NumeraleTypeSchema = z.enum(["Grundzahl", "Ordnungszahl", "Bruchzahl", "Multiplikativ", "Kollektiv"]);
const KonjunktionTypeSchema = z.enum(["Koordinierend", "Subordinierend"]);

const PronomenTypeSchema = z.enum([
  "Possessiv",
  "Reflexiv",
  "Personal",
  "Generalisierendes",
  "Demonstrativ",
  "W-Pronomen",
  "Indefinit",
  "Quantifikativ",
]);

const GoverningPrepositionSchema = z.enum([
  "an", "auf", "bei", "bis", "durch", "für", "gegen", "in", "mit", "nach",
  "ohne", "um", "unter", "von", "vor", "während", "wegen", "trotz", "innerhalb",
  "außerhalb", "entlang", "mithilfe", "seit", "über", "als"
]);

// ---
const MatchSchema = z.enum(["Grundform", "Flexion", "Tippfehler", "Unbekannt"]);

const GenusSchema = z.enum(["F", "M", "N"]); // ["Feminin", "Maskulin", "Neutrum"]

const CommonGrundformsFeildsSchema = z.object({
    grundform: z.string(),
    emojiBeschreibungs: z.array(z.string().emoji()), // Describe the common meanings with emojies; Up to 3 emojies per meaning. Aim for less, if possible
});

const WortartSchema = z.enum([
  "Nomen",
  "Pronomen",
  "Verb",
  "Adjektiv",
  "Adverb",
  "Artikel",
  "Partikel",
  "Praeposition",
  "Konjunktion",
  "Numerale",
  "Praefix",
  "Redewendung",
  "Interjektion",
  "Unbekannt"
]);

const NomenGrundformSchema = z.object({
  wortart: z.literal(WortartSchema.Enum.Nomen),
  genus: GenusSchema,
  eigenname: z.optional(z.boolean()),
  ...CommonGrundformsFeildsSchema.shape,
});

const PronomenGrundformSchema = z.object({
  wortart: z.literal(WortartSchema.Enum.Pronomen),
  ...CommonGrundformsFeildsSchema.shape,
});

const VerbGrundformSchema = z.object({
  wortart: z.literal(WortartSchema.Enum.Verb),
  ...CommonGrundformsFeildsSchema.shape,
});

const AdjektivGrundformSchema = z.object({
  wortart: z.literal(WortartSchema.Enum.Adjektiv),
  ...CommonGrundformsFeildsSchema.shape,
});

const AdverbGrundformSchema = z.object({
  wortart: z.literal(WortartSchema.Enum.Adverb),
  ...CommonGrundformsFeildsSchema.shape,
});

const ArtikelGrundformSchema = z.object({
  wortart: z.literal(WortartSchema.Enum.Artikel),
  ...CommonGrundformsFeildsSchema.shape,
});

const PartikelGrundformSchema = z.object({
  wortart: z.literal(WortartSchema.Enum.Partikel),
  ...CommonGrundformsFeildsSchema.shape,
});

const KonjunktionGrundformSchema = z.object({
  wortart: z.literal(WortartSchema.Enum.Konjunktion),
  ...CommonGrundformsFeildsSchema.shape,
});

const PraepositionGrundformSchema = z.object({
  wortart: z.literal(WortartSchema.Enum.Praeposition),
  ...CommonGrundformsFeildsSchema.shape,
});

const NumeraleGrundformSchema = z.object({
  wortart: z.literal(WortartSchema.Enum.Numerale),
  ...CommonGrundformsFeildsSchema.shape,
});

const PraefixGrundformSchema = z.object({
  wortart: z.literal(WortartSchema.Enum.Praefix),
  ...CommonGrundformsFeildsSchema.shape,
});

const InterjektionGrundformSchema = z.object({
  wortart: z.literal(WortartSchema.Enum.Interjektion),
  ...CommonGrundformsFeildsSchema.shape,
});

const RedewendungGrundformSchema = z.object({
    wortart: z.literal(WortartSchema.Enum.Redewendung),
    ...CommonGrundformsFeildsSchema.shape,
});

const UnbekanntGrundformSchema = z.object({
    wortart: z.literal(WortartSchema.Enum.Unbekannt),
    comment: z.string(),
    ...CommonGrundformsFeildsSchema.shape,
});

const GrundformSchema = z.discriminatedUnion("wortart", [
  NomenGrundformSchema,
  PronomenGrundformSchema,
  VerbGrundformSchema,
  AdjektivGrundformSchema,
  AdverbGrundformSchema,
  ArtikelGrundformSchema,
  PartikelGrundformSchema,
  KonjunktionGrundformSchema,
  PraepositionGrundformSchema,
  NumeraleGrundformSchema,
  PraefixGrundformSchema,
  InterjektionGrundformSchema,
  RedewendungGrundformSchema,
  UnbekanntGrundformSchema,
]);

const grundformsOutputSchema = z.object({
  [MatchSchema.enum.Grundform]: GrundformSchema.array().optional(), 
  [MatchSchema.enum.Flexion]: GrundformSchema.array().optional(),
  [MatchSchema.enum.Tippfehler]: GrundformSchema.array().optional(), 
  [MatchSchema.enum.Unbekannt]: UnbekanntGrundformSchema.array().optional(), 
}).refine(
  data => Object.values(data).some(value => value !== undefined),
  { message: "Mindestens ein Feld muss definiert sein" }
);

// ---

const MorphemSchema = z.enum([
  "Zirkumfix",
  "Konversion",
  "Praefix",
  "Suffix",
  "Stamm",
  "Endung",
  "Fugenelement"
]);

const morphemAnalysisOutputSchema = z.object({
  "morphemischeZerlegung": z.array(z.record(z.string(), MorphemSchema)),
  "zusammengesetztAus": z.optional(z.array(z.record(z.string(), WortartSchema)),),
});

const SteigerungsfaehigSchema = z.boolean(); // "Steigerungsfaehig", "Unsteigerungsfaehig"
const VergleichsgradSchema = z.enum(["Positiv", "Komparativ", "Superlativ"]);

const AdjektivOutputSchema = z.array(z.object({
  "adjektivstamm": z.object({
    [VergleichsgradSchema.enum.Positiv]: z.string(),
    [VergleichsgradSchema.enum.Komparativ]: z.string().optional(),
    [VergleichsgradSchema.enum.Superlativ]: z.string().optional(),
  }),
  "regelmaessig": RegelmaessigSchema,
  "steigerungsfaehig": SteigerungsfaehigSchema,
}));

export {
  SteigerungsfaehigSchema,
  VergleichsgradSchema,
  grundformsOutputSchema,
  GenusSchema,
  KasusSchema,
  WortartSchema,
  NomenGrundformSchema,
  PronomenTypeSchema,
  NumerusSchema,
  PronomenGrundformSchema,
  TrennbarkeitSchema,
  GoverningPrepositionSchema,
  VerbGrundformSchema,
  AdjektivGrundformSchema,
  AdverbCategorySchema,
  AdverbGrundformSchema,
  ArtikelTypeSchema,
  ArtikelGrundformSchema,
  PartikelTypeSchema,
  PartikelGrundformSchema,
  KonjunktionTypeSchema,
  KonjunktionGrundformSchema,
  PraepositionGrundformSchema,
  NumeraleTypeSchema,
  NumeraleGrundformSchema,
  PraefixGrundformSchema,
  InterjektionGrundformSchema,
  GrundformSchema,
  RedewendungGrundformSchema,
  VergleichsformSchema,
  VerbFormTagSchema,
  FormSchema,
  RegelmaessigSchema,
  ConjugationSchema,
  AdjektivDeklinationSchema,
  NomenDeklinationSchema,
  MorphemSchema,
  morphemAnalysisOutputSchema,
  AdjektivOutputSchema,
  MatchSchema,
};


// canBeRexlexiv: z.optional(z.boolean()),
// verbForms: z.array(z.array(z.string())),
// notableGoverningPrepositions: z.optional(z.array(GoverningPrepositionSchema)),
// numeraleType: z.array(NumeraleTypeSchema),