import { z } from "zod";
import { grundformsOutputSchema } from "../../zod/schemas";
import { tests } from "./tests";

export const makeGrundformsPrompt = () => {
  const instructions = `<agent_background>
  You are a very smart and very helpful German language expert. You have deep expertise in linguistics and a thorough understanding of the edge cases of the language. You are very familiar with resources such as "grammis.ids-mannheim.de" and "verbformen.de" and may even be a contributor.
</agent_background>
<agent_role>
  Your task is to help the student navigate the German language. The student gives you a note with a German word or a short phrase, and you must tell them all the possible ways of interpreting the note, linking its contents to various feasible grundforms.
</agent_role>
<instructions>
Your task is to generate a valid JSON object for every input word or expression, strictly following the provided JSON schema. Beyond simply assigning schema fields, incorporate your deep understanding of German language intricacies:
  - If a note contains a sentence or a phrase, determine whether there is a known idiom inside. If there is, add to the grundforms ONLY the idiom. If there are no known idioms and the text cannot be interpreted as a singular word, fallback to the "Unbekannt" case.
  - The note might contain small errors and is case insensitive (e.g., a valid grundform of "sie" is "Sie").
  - If the word in the note contains too many mistakes for unambiguous recognition (e.g., "augeben" can be "ausgeben" or "aufgeben"), fallback to the "Unbekannt" case.
  - If the word can be recognized as a form of multiple parts of speech, make an object for each one (e.g., "molken" can be a past form of the irregular version of the verb "melken," or a plural form of the feminine noun "Molke").
  - Recognize and differentiate multiple parts of speech for a single word (e.g., a word that may function as both a noun and a verb).
  - If a note has a form of a noun that has multiple grundforms with different genders or declensions, make an object for each one (for "See," provide one object for "die See" and one for "der See").
  - If a note has a form of a noun that has multiple grundforms with the same gender and declension but different meanings, give only one object with different meanings listed in emojiBeschreibungs (for "Schloss," give one object with emojiBeschreibungs: ["🏰", "🔒"]).
  - If a note has a form of a verb that has multiple grundforms with different separabilities or conjugation patterns, make an object for each one (for "melken," give one object for regular [["melkt"], ["melkte"], ["gemelkt"]] and one object for irregular [["melkt", "milkt"], ["molk"], ["gemelkt", "gemolken"]]).
  - If a note has a form of a verb that has multiple grundforms with the same separability and conjugation but different meanings, give only one object with different meanings listed in emojiBeschreibungs (for "leisten," give one object with emojiBeschreibungs: ["🏆🎯", "💸"]).
  - It is very important to list ALL the possible grundforms of a verb (if there are multiple): both separable and Untrennbar, as well as Regular and Irregular.
  - Any potential spelling or declension errors in the input should be corrected in the "rechtschreibung" field, while the "grundform" field must always contain the standard base form.
  Your output should consist solely of the final JSON without any extra commentary.
  Describe the common meanings with emojis: up to 3 emojis per meaning. Aim for as few as possible while describing the meaning thoroughly.
</instructions>`;

const schema = `<schema>
import { z } from 'zod';

const KasusSchema = z.enum(["Nominativ", "Genitiv", "Dativ", "Akkusativ"]);
const GenusSchema = z.enum(["Feminin", "Maskulin", "Neutrum"]);
const NumerusSchema = z.enum(["Einzahl", "Mehrzahl"]);

const NomenDeklinationSchema = z.enum(["Stark", "Schwach"]);
const RegelmaessigkeitSchema = z.enum(["Regelmaessig", "Unregelmaessig"]);
const TrennbarkeitSchema = z.enum(["Trennbar", "Untrennbar"]);

const VergleichsformSchema = z.enum(["Positiv", "Komparativ", "Superlativ"]);
const VerbFormTagSchema = z.enum(["Praesens", "Praeteritum", "Perfekt", "Imperativ", "K1", "K2", "P1", "P2", "ZuInfinitiv"]);

const FormSchema = z.enum(["Grundform", "Flektiert"]);

const ConjugationSchema = z.enum(["Stark", "Schwach", "Gemischt"]);
const AdjektivDeklinationSchema = z.enum(["Stark", "Schwach", "Gemischt"]);

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

const CommonFeildsSchema = z.object({
    rechtschreibung: z.string(),
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
  "PartizipialesAdjektiv",
  "Redewendung",
  "Interjektion",
  "Unbekannt"
]);

const GoverningPrepositionSchema = z.enum([
  "an", "auf", "bei", "bis", "durch", "für", "gegen", "in", "mit", "nach",
  "ohne", "um", "unter", "von", "vor", "während", "wegen", "trotz", "innerhalb",
  "außerhalb", "entlang", "mithilfe", "seit", "über", "als"
]);

const NomenSchema = z.object({
  wortart: z.literal(WortartSchema.Enum.Nomen),
  genus: GenusSchema,
  deklination: NomenDeklinationSchema,
  eigenname: z.optional(z.boolean()),
  ...CommonFeildsSchema.shape,
});

const PronomenSchema = z.object({
  wortart: z.literal(WortartSchema.Enum.Pronomen),
  pronomenType: PronomenTypeSchema,
  number: z.optional(z.array(NumerusSchema)),
  genus: z.optional(z.array(GenusSchema)),
  ...CommonFeildsSchema.shape,
});

const VerbSchema = z.object({
  wortart: z.literal(WortartSchema.Enum.Verb),
  trennbarkeit: z.optional(TrennbarkeitSchema),
  regelmaessigkeit: RegelmaessigkeitSchema,
  ...CommonFeildsSchema.shape,
});

const AdjektivSchema = z.object({
  wortart: z.literal(WortartSchema.Enum.Adjektiv),
  ...CommonFeildsSchema.shape,
});
  
const PartizipVariantSchema = z.enum(["P1", "P2"]);
const PartizipialesAdjektivSchema = AdjektivSchema.omit({ wortart: true }).extend({
  wortart: z.literal(WortartSchema.Enum.PartizipialesAdjektiv),
  partizipVariant: PartizipVariantSchema,
});

const AdverbSchema = z.object({
  wortart: z.literal(WortartSchema.Enum.Adverb),
  adverbCategory: z.array(AdverbCategorySchema),
  ...CommonFeildsSchema.shape,
});

const ArtikelSchema = z.object({
  wortart: z.literal(WortartSchema.Enum.Artikel),
  artikelType: ArtikelTypeSchema,
  ...CommonFeildsSchema.shape,
});

const PartikelSchema = z.object({
  wortart: z.literal(WortartSchema.Enum.Partikel),
  partikelType: z.array(PartikelTypeSchema),
  ...CommonFeildsSchema.shape,
});

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

const NumeraleSchema = z.object({
  wortart: z.literal(WortartSchema.Enum.Numerale),
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
    comment: z.string(),
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
</schema>
<outputformat>outputformat shall be formattes as grundformsOutputSchema</outputformat>`;

const testsSchema = z.record(grundformsOutputSchema);
const validationResult = testsSchema.safeParse(tests);

if (!validationResult.success) {
  console.error("Validation error:", validationResult.error);
  return "";
} else {
  const examplesXML = `<examples>${
    Object.entries(tests)
      .map(
        ([key, value]) =>
          `<example><note>${key.trim()}</note><grundforms>${JSON.stringify(
            value
          )}</grundforms></example>`
      )
      .join("")
  }</examples>`;
  return instructions + schema + examplesXML
}
};
