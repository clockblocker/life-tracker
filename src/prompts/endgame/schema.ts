import { z } from "zod";

const FormSchema = z.enum(["Grundform", "Flektiert"]);
const GenderSchema = z.enum(["Feminin", "Maskulin", "Neutrum"]);
const CaseSchema = z.enum(["Nominativ", "Akkusativ", "Dativ", "Genitiv"]);
const DegreeSchema = z.enum(["Positiv", "Komparativ", "Superlativ"]);
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

const DeclensionSchema = z.enum(["Stark", "Schwach"]);
const NomenSchema = z.object({
  type: z.literal(PartOfSpeechTypeSchema.Enum.Nomen),
  grundform: z.string(),
  gender: z.array(GenderSchema),
  declension: DeclensionSchema,
  form: FormSchema,
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
  grundform: z.string(),
  pronomenType: PronomenTypeSchema,
  case: z.optional(z.array(CaseSchema)),
  number: z.optional(z.array(NumberTagSchema)),
  gender: z.optional(z.array(GenderSchema)),
  form: FormSchema,
});

const VerbTypeSchema = z.enum(["Transitiv", "Intransitiv", "Reflexiv", "Modal"]);
const RegularitySchema = z.enum(["Regelmäßig", "Unregelmäßig"]);
const ConjugationSchema = z.enum(["Stark", "Schwach", "Gemischt"]);
const SeparabilitySchema = z.enum(["Trennbar", "Untrennbar"]);
const MoodSchema = z.enum(["Indikativ", "Konjunktiv", "Imperativ"]);
const VoiceSchema = z.enum(["Aktiv", "Passiv"]);
const KonjugationsVarianteSchema = z.enum(["K1", "K2"]);
const GoverningPrepositionSchema = z.enum([
  "an",
  "auf",
  "bei",
  "bis",
  "durch",
  "für",
  "gegen",
  "in",
  "mit",
  "nach",
  "ohne",
  "um",
  "unter",
  "von",
  "vor",
  "während",
  "wegen",
  "trotz",
  "innerhalb",
  "außerhalb",
  "entlang",
  "mithilfe",
  "seit",
  "über",
]);

export const zuInfTag = "Zu Infinivive" as const;

const VerbSchema = z.object({
  type: z.literal(PartOfSpeechTypeSchema.Enum.Verb),
  grundform: z.string(),
  verbType: z.array(VerbTypeSchema),
  regularity: z.array(RegularitySchema),
  conjugation: z.array(ConjugationSchema),
  konjugationsvariante: z.optional(KonjugationsVarianteSchema),
  zuInf: z.optional(z.literal(zuInfTag)),
  separability: SeparabilitySchema,
  mood: MoodSchema,
  voice: VoiceSchema,
  governingPreposition: z.optional(z.array(GoverningPrepositionSchema)),
  form: FormSchema,
});

const DerivedAdjectiveSchema = z.enum(["Verbaladjektiv", "NominalAdjektiv"]);
const AdjektivSchema = z.object({
    type: z.literal(PartOfSpeechTypeSchema.Enum.Adjektiv),
    grundform: z.string(),
    degree: z.array(DegreeSchema),
    derived: z.optional(DerivedAdjectiveSchema),
    form: FormSchema,
});
  
const PartizipVarianteSchema = z.enum(["P1", "P2"]);

const ParticipialAdjectiveSchema = AdjektivSchema.omit({ type: true }).extend({
    type: z.literal(PartOfSpeechTypeSchema.Enum.ParticipialAdjective),
    partizipvariante: PartizipVarianteSchema,
});

const AdverbCategorySchema = z.enum(["Lokal", "Temporal", "Modal", "Kausal", "Grad"]);
const AdverbSchema = z.object({
  type: z.literal(PartOfSpeechTypeSchema.Enum.Adverb),
  grundform: z.string(),
  category: z.array(AdverbCategorySchema),
  degree: z.optional(z.array(DegreeSchema)),
  form: FormSchema,
});

const ArtikelTypeSchema = z.enum(["Bestimmt", "Unbestimmt"]);
const ArtikelSchema = z.object({
  type: z.literal(PartOfSpeechTypeSchema.Enum.Artikel),
  grundform: z.string(),
  artikelType: ArtikelTypeSchema,
  gender: GenderSchema,
  case: CaseSchema,
  form: FormSchema,
});

const PartikelTypeSchema = z.enum(["Intensität", "Fokus", "Negation", "Abtönung", "Konnektiv"]);
const PartikelSchema = z.object({
  type: z.literal(PartOfSpeechTypeSchema.Enum.Partikel),
  grundform: z.string(),
  partikelType: z.array(PartikelTypeSchema),
  form: FormSchema,
});

const KonjunktionTypeSchema = z.enum(["Koordinierend", "Subordinierend"]);
const KonjunktionSchema = z.object({
  type: z.literal(PartOfSpeechTypeSchema.Enum.Konjunktion),
  grundform: z.string(),
  konjunktionType: KonjunktionTypeSchema,
  form: FormSchema,
});

const PräpositionSchema = z.object({
  type: z.literal(PartOfSpeechTypeSchema.Enum.Präposition),
  grundform: z.string(),
  governingCase: z.optional(z.array(CaseSchema)),
  form: FormSchema,
});

const InterjektionSchema = z.object({
  type: z.literal(PartOfSpeechTypeSchema.Enum.Interjektion),
  grundform: z.string(),
  form: FormSchema,
});

const NumeraleTypeSchema = z.enum(["Grundzahl", "Ordnungszahl", "Bruchzahl", "Multiplikativ", "Kollektiv"]);
const NumeraleSchema = z.object({
  type: z.literal(PartOfSpeechTypeSchema.Enum.Numerale),
  grundform: z.string(),
  numeraleType: z.array(NumeraleTypeSchema),
  form: FormSchema,
});

const PraefixSchema = z.object({
  type: z.literal(PartOfSpeechTypeSchema.Enum.Praefix),
  grundform: z.string(),
  form: FormSchema,
});

const OnomatopoeiaSchema = z.object({
  type: z.literal(PartOfSpeechTypeSchema.Enum.Onomatopoeia),
  grundform: z.string(),
  form: FormSchema,
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
]);

export {
  FormSchema,
  GenderSchema,
  CaseSchema,
  DegreeSchema,
  PartOfSpeechTypeSchema,
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
  VerbSchema,
  DerivedAdjectiveSchema,
  AdjektivSchema,
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
  ParticipialAdjectiveSchema,
};