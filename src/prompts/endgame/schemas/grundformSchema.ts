import { z } from "zod";

const KasusSchema = z.enum(["Nominativ", "Genitiv", "Dativ", "Akkusativ"]);
const GenusSchema = z.enum(["Feminin", "Maskulin", "Neutrum"]);
const NumerusSchema = z.enum(["Einzahl", "Mehrzahl"]);

const NomenDeklinationSchema = z.enum(["Stark", "Schwach"]);

const VergleichsformSchema = z.enum(["Positiv", "Komparativ", "Superlativ"]);
const VerbFormTagSchema = z.enum(["Praesens", "Praeteritum", "Perfekt", "Imperativ", "K1", "K2", "P1", "P2", "ZuInfinitiv"]);

const FormSchema = z.enum(["Grundform", "Flektiert"]);
const RegelmaessigkeitsSchema = z.enum(["Regelmaessig", "Unregelmaessig"]);

const ConjugationSchema = z.enum(["Stark", "Schwach", "Gemischt"]);
const AdjektivDeklinationSchema = z.enum(["Stark", "Schwach", "Gemischt"]);

const CommonFeildsSchema = z.object({
    rechtschreibung: z.string(),
    grundform: z.string(),
    emojiBeschreibung: z.string(), // Up to 3 emojies per word. Aim for less, if possible
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
  "PartizipialesAdjektiv",
  "Redewendung",
  "Interjektion",
  "Unbekannt"
]);

const NomenSchema = z.object({
  wortart: z.literal(WortartSchema.Enum.Nomen),
  genus: GenusSchema,
  deklination: NomenDeklinationSchema,
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

const PronomenSchema = z.object({
  wortart: z.literal(WortartSchema.Enum.Pronomen),
  pronomenType: PronomenTypeSchema,
  number: z.optional(z.array(NumerusSchema)),
  genus: z.optional(z.array(GenusSchema)),
  ...CommonFeildsSchema.shape,
});

const SeparabilitySchema = z.enum(["Trennbar", "Untrennbar"]);
const GoverningPrepositionSchema = z.enum([
  "an", "auf", "bei", "bis", "durch", "für", "gegen", "in", "mit", "nach",
  "ohne", "um", "unter", "von", "vor", "während", "wegen", "trotz", "innerhalb",
  "außerhalb", "entlang", "mithilfe", "seit", "über",
]);

const VerbSchema = z.object({
  wortart: z.literal(WortartSchema.Enum.Verb),
  canBeRexlexiv: z.optional(z.boolean()),
  separability: z.optional(SeparabilitySchema),
  verbForms: z.array(z.array(z.string())),
  notableGoverningPrepositions: z.optional(z.array(GoverningPrepositionSchema)),
  ...CommonFeildsSchema.shape,
});

const AdjektivSchema = z.object({
  wortart: z.literal(WortartSchema.Enum.Adjektiv),
  ...CommonFeildsSchema.shape,
});
  
const PartizipVarianteSchema = z.enum(["P1", "P2"]);
const PartizipialesAdjektivSchema = AdjektivSchema.omit({ wortart: true }).extend({
  wortart: z.literal(WortartSchema.Enum.PartizipialesAdjektiv),
  partizipvariante: PartizipVarianteSchema,
});

const AdverbCategorySchema = z.enum(["Lokal", "Temporal", "Modal", "Kausal", "Grad"]);
const AdverbSchema = z.object({
  wortart: z.literal(WortartSchema.Enum.Adverb),
  category: z.array(AdverbCategorySchema),
  ...CommonFeildsSchema.shape,
});

const ArtikelTypeSchema = z.enum(["Bestimmt", "Unbestimmt"]);
const ArtikelSchema = z.object({
  wortart: z.literal(WortartSchema.Enum.Artikel),
  artikelType: ArtikelTypeSchema,
  ...CommonFeildsSchema.shape,
});

const PartikelTypeSchema = z.enum(["Intensität", "Fokus", "Negation", "Abtönung", "Konnektiv"]);
const PartikelSchema = z.object({
  wortart: z.literal(WortartSchema.Enum.Partikel),
  partikelType: z.array(PartikelTypeSchema),
  ...CommonFeildsSchema.shape,
});

const KonjunktionTypeSchema = z.enum(["Koordinierend", "Subordinierend"]);
const KonjunktionSchema = z.object({
  wortart: z.literal(WortartSchema.Enum.Konjunktion),
  konjunktionType: KonjunktionTypeSchema,
  ...CommonFeildsSchema.shape,
});

const PraepositionSchema = z.object({
  wortart: z.literal(WortartSchema.Enum.Praeposition),
  possibleGoverningKasuss: z.optional(z.array(KasusSchema)),
  ...CommonFeildsSchema.shape,
});

const NumeraleTypeSchema = z.enum(["Grundzahl", "Ordnungszahl", "Bruchzahl", "Multiplikativ", "Kollektiv"]);
const NumeraleSchema = z.object({
  wortart: z.literal(WortartSchema.Enum.Numerale),
  numeraleType: z.array(NumeraleTypeSchema),
  ...CommonFeildsSchema.shape,
});

const PraefixSchema = z.object({
  wortart: z.literal(WortartSchema.Enum.Praefix),
  ...CommonFeildsSchema.shape,
});

const InterjektionSchema = z.object({
  wortart: z.literal(WortartSchema.Enum.Interjektion),
  ...CommonFeildsSchema.shape,
});

const RedewendungSchema = z.object({
    wortart: z.literal(WortartSchema.Enum.Redewendung),
    ...CommonFeildsSchema.shape,
});

const UnbekanntSchema = z.object({
    wortart: z.literal(WortartSchema.Enum.Unbekannt),
    ...CommonFeildsSchema.shape,
});

const GrundformSchema = z.discriminatedUnion("wortart", [
  NomenSchema,
  PronomenSchema,
  VerbSchema,
  AdjektivSchema,
  AdverbSchema,
  ArtikelSchema,
  PartikelSchema,
  KonjunktionSchema,
  PraepositionSchema,
  NumeraleSchema,
  PraefixSchema,
  InterjektionSchema,
  PartizipialesAdjektivSchema,
  RedewendungSchema,
  UnbekanntSchema,
]);

const grundformsOutputSchema = z.array(GrundformSchema);

export {
  grundformsOutputSchema,
  GenusSchema,
  KasusSchema,
  WortartSchema,
  NomenSchema,
  PronomenTypeSchema,
  NumerusSchema,
  PronomenSchema,
  SeparabilitySchema,
  GoverningPrepositionSchema,
  VerbSchema,
  AdjektivSchema,
  PartizipVarianteSchema,
  PartizipialesAdjektivSchema,
  AdverbCategorySchema,
  AdverbSchema,
  ArtikelTypeSchema,
  ArtikelSchema,
  PartikelTypeSchema,
  PartikelSchema,
  KonjunktionTypeSchema,
  KonjunktionSchema,
  PraepositionSchema,
  NumeraleTypeSchema,
  NumeraleSchema,
  PraefixSchema,
  InterjektionSchema,
  GrundformSchema,
  RedewendungSchema,
  VergleichsformSchema,
  VerbFormTagSchema,
  FormSchema,
  RegelmaessigkeitsSchema,
  ConjugationSchema,
  AdjektivDeklinationSchema,
};