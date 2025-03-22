import { z } from "zod";

const FormSchema = z.enum(["Grundform", "Flektiert"]);
const GenderSchema = z.enum(["Feminin", "Maskulin", "Neutrum"]);
const CaseSchema = z.enum(["Nominativ", "Akkusativ", "Dativ", "Genitiv"]);
const DegreeSchema = z.enum(["Positiv", "Komparativ", "Superlativ"]);
const FrequencySchema = z.enum(["Immer", "Häufig", "Manchmal", "Selten", "Kaum", "Nie"]);

const CommonFeildsSchema = z.object({
    frequency: FrequencySchema,
    spelling: z.string(),
    grundform: z.string(),
    form: FormSchema,
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
]);

const DerivedFromSchema = z.object({
  type: PartOfSpeechTypeSchema,
  grundform: z.string(),
});

const DeclensionSchema = z.enum(["Stark", "Schwach"]);

const NomenSchema = z.object({
  type: z.literal(PartOfSpeechTypeSchema.Enum.Nomen),
  gender: z.array(GenderSchema),
  declension: DeclensionSchema,
  derivedFrom: z.optional(DerivedFromSchema),
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
  case: z.optional(z.array(CaseSchema)),
  number: z.optional(z.array(NumberTagSchema)),
  gender: z.optional(z.array(GenderSchema)),
  ...CommonFeildsSchema.shape,
});

const VerbTypeSchema = z.enum(["Transitiv", "Intransitiv", "Reflexiv", "Modal"]);
const RegularitySchema = z.enum(["Regelmäßig", "Unregelmäßig"]);
const ConjugationSchema = z.enum(["Stark", "Schwach", "Gemischt"]);
const SeparabilitySchema = z.enum(["Trennbar", "Untrennbar"]);
const MoodSchema = z.enum(["Indikativ", "Konjunktiv", "Imperativ"]);
const VoiceSchema = z.enum(["Aktiv", "Passiv"]);
const KonjugationsVarianteSchema = z.enum(["K1", "K2"]);
const GoverningPrepositionSchema = z.enum([
  "an", "auf", "bei", "bis", "durch", "für", "gegen", "in", "mit", "nach",
  "ohne", "um", "unter", "von", "vor", "während", "wegen", "trotz", "innerhalb",
  "außerhalb", "entlang", "mithilfe", "seit", "über",
]);

const zuInfTag = "Zu Infinivive" as const;

const VerbSchema = z.object({
  type: z.literal(PartOfSpeechTypeSchema.Enum.Verb),
  verbType: z.array(VerbTypeSchema),
  regularity: z.array(RegularitySchema),
  conjugation: z.array(ConjugationSchema),
  konjugationsvariante: z.optional(KonjugationsVarianteSchema),
  zuInf: z.optional(z.literal(zuInfTag)),
  separability: SeparabilitySchema,
  mood: MoodSchema,
  voice: VoiceSchema,
  governingPreposition: z.optional(z.array(GoverningPrepositionSchema)),
  derivedFrom: z.optional(DerivedFromSchema),
  ...CommonFeildsSchema.shape,
});

const DerivedAdjectiveSchema = z.enum(["Verbaladjektiv", "NominalAdjektiv"]);
const AdjektivSchema = z.object({
  type: z.literal(PartOfSpeechTypeSchema.Enum.Adjektiv),
  degree: z.array(DegreeSchema),
  derived: z.optional(DerivedAdjectiveSchema),
  derivedFrom: z.optional(DerivedFromSchema),
  ...CommonFeildsSchema.shape,
});
  
const PartizipVarianteSchema = z.enum(["P1", "P2"]);
const ParticipialAdjectiveSchema = AdjektivSchema.omit({ type: true }).extend({
  type: z.literal(PartOfSpeechTypeSchema.Enum.ParticipialAdjective),
  partizipvariante: PartizipVarianteSchema,
  derivedFrom: z.optional(DerivedFromSchema),
});

const AdverbCategorySchema = z.enum(["Lokal", "Temporal", "Modal", "Kausal", "Grad"]);
const AdverbSchema = z.object({
  type: z.literal(PartOfSpeechTypeSchema.Enum.Adverb),
  category: z.array(AdverbCategorySchema),
  degree: z.optional(z.array(DegreeSchema)),
  derivedFrom: z.optional(DerivedFromSchema),
  ...CommonFeildsSchema.shape,
});

const ArtikelTypeSchema = z.enum(["Bestimmt", "Unbestimmt"]);
const ArtikelSchema = z.object({
  type: z.literal(PartOfSpeechTypeSchema.Enum.Artikel),
  artikelType: ArtikelTypeSchema,
  gender: GenderSchema,
  case: CaseSchema,
  derivedFrom: z.optional(DerivedFromSchema),
  ...CommonFeildsSchema.shape,
});

const PartikelTypeSchema = z.enum(["Intensität", "Fokus", "Negation", "Abtönung", "Konnektiv"]);
const PartikelSchema = z.object({
  type: z.literal(PartOfSpeechTypeSchema.Enum.Partikel),
  partikelType: z.array(PartikelTypeSchema),
  derivedFrom: z.optional(DerivedFromSchema),
  ...CommonFeildsSchema.shape,
});

const KonjunktionTypeSchema = z.enum(["Koordinierend", "Subordinierend"]);
const KonjunktionSchema = z.object({
  type: z.literal(PartOfSpeechTypeSchema.Enum.Konjunktion),
  konjunktionType: KonjunktionTypeSchema,
  derivedFrom: z.optional(DerivedFromSchema),
  ...CommonFeildsSchema.shape,
});

const PräpositionSchema = z.object({
  type: z.literal(PartOfSpeechTypeSchema.Enum.Präposition),
  governingCase: z.optional(z.array(CaseSchema)),
  derivedFrom: z.optional(DerivedFromSchema),
  ...CommonFeildsSchema.shape,
});

const InterjektionSchema = z.object({
  type: z.literal(PartOfSpeechTypeSchema.Enum.Interjektion),
  derivedFrom: z.optional(DerivedFromSchema),
  ...CommonFeildsSchema.shape,
});

const NumeraleTypeSchema = z.enum(["Grundzahl", "Ordnungszahl", "Bruchzahl", "Multiplikativ", "Kollektiv"]);
const NumeraleSchema = z.object({
  type: z.literal(PartOfSpeechTypeSchema.Enum.Numerale),
  numeraleType: z.array(NumeraleTypeSchema),
  derivedFrom: z.optional(DerivedFromSchema),
  ...CommonFeildsSchema.shape,
});

const PraefixSchema = z.object({
  type: z.literal(PartOfSpeechTypeSchema.Enum.Praefix),
  derivedFrom: z.optional(DerivedFromSchema),
  ...CommonFeildsSchema.shape,
});

const OnomatopoeiaSchema = z.object({
  type: z.literal(PartOfSpeechTypeSchema.Enum.Onomatopoeia),
  derivedFrom: z.optional(DerivedFromSchema),
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
]);

export {
  FormSchema,
  GenderSchema,
  CaseSchema,
  DegreeSchema,
  PartOfSpeechTypeSchema,
  DerivedFromSchema,
  DeclensionSchema,
  NomenSchema,
  PronomenTypeSchema,
  NumberTagSchema,
  PronomenSchema,
  VerbTypeSchema,
  RegularitySchema,
  ConjugationSchema,
  SeparabilitySchema,
  MoodSchema,
  VoiceSchema,
  GoverningPrepositionSchema,
  KonjugationsVarianteSchema,
  VerbSchema,
  DerivedAdjectiveSchema,
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
  zuInfTag,
};