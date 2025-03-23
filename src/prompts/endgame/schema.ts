import { z } from "zod";

const GenderSchema = z.enum(["Feminin", "Maskulin", "Neutrum"]);
const CaseSchema = z.enum(["Nominativ", "Akkusativ", "Dativ", "Genitiv"]);

const CommonFeildsSchema = z.object({
    correctSpelling: z.string(),
    grundform: z.string(),
    emojiDescription: z.string(), // Up to 3 emojies per word. Aim for less, if possible
});

const PartOfSpeechTypeSchema = z.enum([
  "Nomen",
  "Pronomen",
  "Verb",
  "Adjektiv",
  "Adverb",
  "Artikel",
  "Partikel",
  "Konjunktion",
  "Präposition",
  "Interjektion",
  "Numerale",
  "Praefix",
  "Onomatopoeia",
  "ParticipialAdjective",
  "Idiom",
  "Unknown"
]);

const DeclensionSchema = z.enum(["Stark", "Schwach"]);

const NomenSchema = z.object({
  type: z.literal(PartOfSpeechTypeSchema.Enum.Nomen),
  gender: z.array(GenderSchema),
  declension: DeclensionSchema,
  isProperNoun: z.optional(z.boolean()),
  ...CommonFeildsSchema.shape,
});

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

const NumberTagSchema = z.enum(["Singular", "Plural"]);
const PronomenSchema = z.object({
  type: z.literal(PartOfSpeechTypeSchema.Enum.Pronomen),
  pronomenType: PronomenTypeSchema,
  number: z.optional(z.array(NumberTagSchema)),
  gender: z.optional(z.array(GenderSchema)),
  ...CommonFeildsSchema.shape,
});

const SeparabilitySchema = z.enum(["Trennbar", "Untrennbar"]);
const GoverningPrepositionSchema = z.enum([
  "an", "auf", "bei", "bis", "durch", "für", "gegen", "in", "mit", "nach",
  "ohne", "um", "unter", "von", "vor", "während", "wegen", "trotz", "innerhalb",
  "außerhalb", "entlang", "mithilfe", "seit", "über",
]);

const VerbSchema = z.object({
  type: z.literal(PartOfSpeechTypeSchema.Enum.Verb),
  canBeRexlexiv: z.optional(z.boolean()),
  separability: z.optional(SeparabilitySchema),
  verbForms: z.array(z.array(z.string())),
  notableGoverningPrepositions: z.optional(z.array(GoverningPrepositionSchema)),
  ...CommonFeildsSchema.shape,
});

const AdjektivSchema = z.object({
  type: z.literal(PartOfSpeechTypeSchema.Enum.Adjektiv),
  ...CommonFeildsSchema.shape,
});
  
const PartizipVarianteSchema = z.enum(["P1", "P2"]);
const ParticipialAdjectiveSchema = AdjektivSchema.omit({ type: true }).extend({
  type: z.literal(PartOfSpeechTypeSchema.Enum.ParticipialAdjective),
  partizipvariante: PartizipVarianteSchema,
});

const AdverbCategorySchema = z.enum(["Lokal", "Temporal", "Modal", "Kausal", "Grad"]);
const AdverbSchema = z.object({
  type: z.literal(PartOfSpeechTypeSchema.Enum.Adverb),
  category: z.array(AdverbCategorySchema),
  ...CommonFeildsSchema.shape,
});

const ArtikelTypeSchema = z.enum(["Bestimmt", "Unbestimmt"]);
const ArtikelSchema = z.object({
  type: z.literal(PartOfSpeechTypeSchema.Enum.Artikel),
  artikelType: ArtikelTypeSchema,
  ...CommonFeildsSchema.shape,
});

const PartikelTypeSchema = z.enum(["Intensität", "Fokus", "Negation", "Abtönung", "Konnektiv"]);
const PartikelSchema = z.object({
  type: z.literal(PartOfSpeechTypeSchema.Enum.Partikel),
  partikelType: z.array(PartikelTypeSchema),
  ...CommonFeildsSchema.shape,
});

const KonjunktionTypeSchema = z.enum(["Koordinierend", "Subordinierend"]);
const KonjunktionSchema = z.object({
  type: z.literal(PartOfSpeechTypeSchema.Enum.Konjunktion),
  konjunktionType: KonjunktionTypeSchema,
  ...CommonFeildsSchema.shape,
});

const PräpositionSchema = z.object({
  type: z.literal(PartOfSpeechTypeSchema.Enum.Präposition),
  possibleGoverningCases: z.optional(z.array(CaseSchema)),
  ...CommonFeildsSchema.shape,
});

const InterjektionSchema = z.object({
  type: z.literal(PartOfSpeechTypeSchema.Enum.Interjektion),
  ...CommonFeildsSchema.shape,
});

const NumeraleTypeSchema = z.enum(["Grundzahl", "Ordnungszahl", "Bruchzahl", "Multiplikativ", "Kollektiv"]);
const NumeraleSchema = z.object({
  type: z.literal(PartOfSpeechTypeSchema.Enum.Numerale),
  numeraleType: z.array(NumeraleTypeSchema),
  ...CommonFeildsSchema.shape,
});

const PraefixSchema = z.object({
  type: z.literal(PartOfSpeechTypeSchema.Enum.Praefix),
  ...CommonFeildsSchema.shape,
});

const OnomatopoeiaSchema = z.object({
  type: z.literal(PartOfSpeechTypeSchema.Enum.Onomatopoeia),
  ...CommonFeildsSchema.shape,
});

const IdiomSchema = z.object({
    type: z.literal(PartOfSpeechTypeSchema.Enum.Idiom),
    ...CommonFeildsSchema.shape,
});

const UnknownSchema = z.object({
    type: z.literal(PartOfSpeechTypeSchema.Enum.Unknown),
    ...CommonFeildsSchema.shape,
});

const PartOfSpeechSchema = z.discriminatedUnion("type", [
  NomenSchema,
  PronomenSchema,
  VerbSchema,
  AdjektivSchema,
  AdverbSchema,
  ArtikelSchema,
  PartikelSchema,
  KonjunktionSchema,
  PräpositionSchema,
  InterjektionSchema,
  NumeraleSchema,
  PraefixSchema,
  OnomatopoeiaSchema,
  ParticipialAdjectiveSchema,
  IdiomSchema,
  UnknownSchema,
]);

export {
  GenderSchema,
  CaseSchema,
  PartOfSpeechTypeSchema,
  DeclensionSchema,
  NomenSchema,
  PronomenTypeSchema,
  NumberTagSchema,
  PronomenSchema,
  SeparabilitySchema,
  GoverningPrepositionSchema,
  VerbSchema,
  AdjektivSchema,
  PartizipVarianteSchema,
  ParticipialAdjectiveSchema,
  AdverbCategorySchema,
  AdverbSchema,
  ArtikelTypeSchema,
  ArtikelSchema,
  PartikelTypeSchema,
  PartikelSchema,
  KonjunktionTypeSchema,
  KonjunktionSchema,
  PräpositionSchema,
  InterjektionSchema,
  NumeraleTypeSchema,
  NumeraleSchema,
  PraefixSchema,
  OnomatopoeiaSchema,
  PartOfSpeechSchema,
  IdiomSchema,
};

// const DegreeSchema = z.enum(["Positiv", "Komparativ", "Superlativ"]);

// const VerbFormTagSchema = z.enum(["Präsens", "Präteritum", "Perfekt", "Imperativ", "K1", "K2", "P1", "P2", "ZuInfinitiv"]);

// const DerivedAdjectiveSchema = z.enum(["Verbaladjektiv", "NominalAdjektiv"]);

// Adv ->  degree: z.optional(z.array(DegreeSchema)),
// Adj ->  degree: z.optional(z.array(DegreeSchema)),

// Artikel:
// gender: GenderSchema,
// case: CaseSchema,
//   case: z.optional(z.array(CaseSchema)),

// const FormSchema = z.enum(["Grundform", "Flektiert"]);


// const RegularitySchema = z.enum(["Regelmäßig", "Unregelmäßig"]);
// const ConjugationSchema = z.enum(["Stark", "Schwach", "Gemischt"]);