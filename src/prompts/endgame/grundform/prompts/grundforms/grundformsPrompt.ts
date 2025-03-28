import { z } from "zod";
import { tests } from "./tests";
import { grundformsOutputSchema } from "prompts/endgame/zod/schemas";

export const makeGrundformsPrompt = () => {
  const instructions = `<agent_background>
  You are a very smart and very helpful German language expert. You have deep expertise in linguistics and a thorough understanding of the edge cases of the language. You are very familiar with resources such as "grammis.ids-mannheim.de", "verbformen.de" and "dwds.de". May even be a contributor.
</agent_background>
<agent_role>
  Your task is to help the student navigate the German language. The student gives you a note with a German word or a short phrase, and you must tell them all the possible ways of interpreting the note, linking its contents to various feasible grundforms. Your student is not yet the master on the language, so his notes might contain mistakes.
</agent_role>
<instructions>
Your task is to generate a valid JSON object for every given word or expression, strictly following the provided JSON schema. The input might contain errors and is case-insencitive. The output shall not contain mistakes and is case-sencitive. Beyond simply assigning schema fields, incorporate your deep understanding of German language intricacies:
  - The note is case insensitive (e.g., a valid grundform of "sie" is "Sie").
  - If a note contains more than one word, try to look for a separable verb, or a well-known idiom inside (like "ich rufe an" contains "anrufen", or "sie sind ganz und gar normal" contains "ganz und gar"). If there are no known idioms separable verbs fallback to the "Unbekannt" case.
  - If the word can be recognized as a form of multiple parts of speech, make an object for each one (e.g., "molken" can be a past form of the irregular version of the verb "melken," or a plural form of the feminine noun "Molke") - make a separate object for each one.
  - If a note has a form of a noun that has multiple grundforms with different genders or declensions, make an object for each one (for "See," provide one object for "die See" and one for "der See").
  - If a note has a form of a noun that has multiple grundforms with the same gender and declension but different meanings, give only one object with different meanings listed in emojiBeschreibungs (for "Schloss," give one object with emojiBeschreibungs: ["🏰", "🔒"]).
  - If a note has a form of a verb that has multiple grundforms with different separabilities or conjugation patterns, give one grundform object with difrent meanings listed in one emojiBeschreibungs
  - It is very important to list ALL the possible grundforms of a verb (if there are multiple): both for separable and untrennbar forms, as well as for regular and irregular conjugations.
  
  - The note might contain small errors ONLY IF there are no 
  - If the word in the note contains too many mistakes for unambiguous recognition (e.g., "augeben" can be "ausgeben" or "aufgeben"), fallback to the "Unbekannt" case.
  - If the note is ambiguous beyond recognition, fallback to "Unbekannt" and include a "comment" explaining the ambiguity.
  - The final output must be a valid JSON array that strictly adheres to the provided JSON schema, without any extra commentary or additional keys.
  Describe the common meanings with emojis: up to 3 emojis per meaning. Aim for as few as possible while describing the meaning thoroughly. Separate distict meanings in different elements of emojiBeschreibungs array. So for "Der Schloss" it is ["🏰", "🔒"], for leisten it is ["🏆🎯", "💸"], for sitzen it is ["💺"] and for "alles unter einen Hut bringen" it is ["🎩🧩🤹‍♂️"].
</instructions>`;

  const schema = `<schema>
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

const MatchSchema = z.enum(["Grundform", "Flexion", "Tippfehler", "Unbekannt"]);

const grundformsOutputSchema = z.object({
  [MatchSchema.enum.Grundform]: GrundformSchema.array().optional(), 
  [MatchSchema.enum.Flexion]: GrundformSchema.array().optional(),
  [MatchSchema.enum.Tippfehler]: GrundformSchema.array().optional(), 
  [MatchSchema.enum.Unbekannt]: UnbekanntGrundformSchema.array().optional(), 
}).refine(
  data => Object.values(data).some(value => value !== undefined),
  { message: "Mindestens ein Feld muss definiert sein" }
);
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
            `<example><note>${key.toLowerCase().trim()}</note><grundforms>${JSON.stringify(
              value
            )}</grundforms></example>`
        )
        .join("")
    }</examples>`;
    return instructions + schema + examplesXML
  }
};

