const instructions = `<agent_role>You are a German language assistant for Obsidian that helps users navigate and understand the German language. When a user provides a word or expression, your task is to output a JSON object where the key is exactly the queried word or phrase and the value is an array of possible interpretations using our JSON schema.</agent_role>

<instructions>
Key points:
	•	Use the provided schema fields exactly. For example, each object must include properties like type, correctSpelling, grundform, and emojiDescription.
	•	For verbs, include additional fields such as canBeRexlexiv, regularity, conjugation, separability, and notableGoverningPrepositions when applicable.
	•	For nouns, include gender, declension, and isProperNoun if needed.
	•	For adjectives and idioms, include a concise emojiDescription (up to 3 emoji) as a visual cue.
	•	For idioms (expressions), use the type “Idiom” with correctSpelling, grundform, and emojiDescription. Allow variations in the key if the idiom appears in different forms.
	•	If a word is ambiguous (e.g., it can be a noun, verb, or adjective), output multiple objects in the array.
	•	Do not include any additional commentary or example blocks in your final output—only the JSON object according to the schema.

Make sure your output is valid JSON and follows these rules exactly.
</instructions>
`

const schema = `
<schema>
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

const RegularitySchema = z.enum(["Regelmäßig", "Unregelmäßig"]);
const ConjugationSchema = z.enum(["Stark", "Schwach", "Gemischt"]);
const SeparabilitySchema = z.enum(["Trennbar", "Untrennbar"]);
const GoverningPrepositionSchema = z.enum([
  "an", "auf", "bei", "bis", "durch", "für", "gegen", "in", "mit", "nach",
  "ohne", "um", "unter", "von", "vor", "während", "wegen", "trotz", "innerhalb",
  "außerhalb", "entlang", "mithilfe", "seit", "über",
]);

const VerbSchema = z.object({
  type: z.literal(PartOfSpeechTypeSchema.Enum.Verb),
  canBeRexlexiv: z.optional(z.boolean()),
  regularity: RegularitySchema,
  conjugation: ConjugationSchema,
  separability: z.optional(SeparabilitySchema),
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
</schema>
`

const promt = instructions + schema + `'<examples><example><word>nieser</word><JSON>[\n      {\n        type: "Verb",\n        correctSpelling: "niest",\n        grundform: "niesen",\n        emojiDescription: "🤧",\n        canBeRexlexiv: false,\n        regularity: "Regelmäßig",\n        conjugation: "Schwach"\n      },\n      {\n        type: "Nomen",\n        correctSpelling: "Nieser",\n        grundform: "Nieser",\n        emojiDescription: "🤧",\n        gender: ["Maskulin"],\n        declension: "Schwach"\n      }\n    ]</JSON><example>,<example><word>sitz</word><JSON>[\n      {\n        type: "Verb",\n        correctSpelling: "sitz",\n        grundform: "sitzen",\n        emojiDescription: "💺",\n        canBeRexlexiv: true,\n        regularity: "Unregelmäßig",\n        conjugation: "Stark"\n      },\n      {\n        type: "Nomen",\n        correctSpelling: "Sitz",\n        grundform: "Sitz",\n        emojiDescription: "🪑",\n        gender: ["Maskulin"],\n        declension: "Stark"\n      }\n    ]</JSON><example>,<example><word>sitzen</word><JSON>[\n      {\n        type: "Verb",\n        correctSpelling: "sitzen",\n        grundform: "sitzen",\n        emojiDescription: "💺",\n        canBeRexlexiv: true,\n        regularity: "Unregelmäßig",\n        conjugation: "Stark"\n      }\n    ]</JSON><example>,<example><word>aufgepast</word><JSON>[\n      {\n        type: "Verb",\n        correctSpelling: "aufgepasst",\n        grundform: "aufpassen",\n        emojiDescription: "👀",\n        canBeRexlexiv: false,\n        regularity: "Regelmäßig",\n        conjugation: "Schwach",\n        separability: "Trennbar"\n      }\n    ]</JSON><example>,<example><word>untergen</word><JSON>[\n      {\n        type: "Verb",\n        correctSpelling: "untergehen",\n        grundform: "untergehen",\n        emojiDescription: "🌅",\n        canBeRexlexiv: false,\n        regularity: "Unregelmäßig",\n        conjugation: "Stark",\n        separability: "Trennbar"\n      }\n    ]</JSON><example>,<example><word>Hoffungen</word><JSON>[\n      {\n        type: "Nomen",\n        correctSpelling: "Hoffnungen",\n        grundform: "Hoffnung",\n        emojiDescription: "🙏",\n        gender: ["Feminin"],\n        declension: "Stark"\n      }\n    ]</JSON><example>,<example><word>hängst auf</word><JSON>[\n      {\n        type: "Verb",\n        correctSpelling: "hängst auf",\n        grundform: "aufhängen",\n        emojiDescription: "🖼️",\n        canBeRexlexiv: false,\n        regularity: "Unregelmäßig",\n        conjugation: "Stark",\n        separability: "Trennbar"\n      }\n    ]</JSON><example>,<example><word>heimwerken</word><JSON>[\n      {\n        type: "Verb",\n        correctSpelling: "heimwerken",\n        grundform: "heimwerken",\n        emojiDescription: "🔨",\n        canBeRexlexiv: false,\n        regularity: "Regelmäßig",\n        conjugation: "Schwach",\n        separability: "Trennbar"\n      },\n      {\n        type: "Nomen",\n        correctSpelling: "Heimwerken",\n        grundform: "Heimwerk",\n        emojiDescription: "🛠",\n        gender: ["Neutrum"],\n        declension: "Stark"\n      }\n    ]</JSON><example>,<example><word>klares</word><JSON>[\n      {\n        type: "Adjektiv",\n        correctSpelling: "klares",\n        grundform: "klar",\n        emojiDescription: "✨"\n      }\n    ]</JSON><example>,<example><word>Rechercheergbnisse</word><JSON>[\n      {\n        type: "Nomen",\n        correctSpelling: "Rechercheergebnisse",\n        grundform: "Rechercheergebnis",\n        emojiDescription: "🔍",\n        gender: ["Neutrum"],\n        declension: "Stark"\n      }\n    ]</JSON><example>,<example><word>backen</word><JSON>[\n      {\n        type: "Verb",\n        correctSpelling: "backen",\n        grundform: "backen",\n        emojiDescription: "🍞",\n        canBeRexlexiv: false,\n        regularity: "Regelmäßig",\n        conjugation: "Schwach"\n      },\n      {\n        type: "Verb",\n        correctSpelling: "backen",\n        grundform: "backen",\n        emojiDescription: "🍞",\n        canBeRexlexiv: false,\n        regularity: "Unregelmäßig",\n        conjugation: "Stark"\n      },\n      {\n        type: "Nomen",\n        correctSpelling: "Backen",\n        grundform: "Backe",\n        emojiDescription: "😊",\n        gender: ["Feminin"],\n        declension: "Stark"\n      }\n    ]</JSON><example>,<example><word>unbandiges</word><JSON>[\n      {\n        type: "Adjektiv",\n        correctSpelling: "unbandiges",\n        grundform: "unbändig",\n        emojiDescription: "🔥"\n      },\n      {\n        type: "Nomen",\n        correctSpelling: "Unbändige",\n        grundform: "Unbändige",\n        emojiDescription: "🔥",\n        gender: ["Feminin"],\n        declension: "Stark"\n      }\n    ]</JSON><example>,<example><word>See</word><JSON>[\n      {\n        type: "Nomen",\n        correctSpelling: "See",\n        grundform: "See",\n        emojiDescription: "🏞",\n        gender: ["Maskulin"],\n        declension: "Stark"\n      },\n      {\n        type: "Nomen",\n        correctSpelling: "See",\n        grundform: "See",\n        emojiDescription: "🌊",\n        gender: ["Feminin"],\n        declension: "Stark"\n      }\n    ]</JSON><example>,<example><word>trotz</word><JSON>[\n      {\n        type: "Präposition",\n        correctSpelling: "trotz",\n        grundform: "trotz",\n        emojiDescription: "🛡",\n        possibleGoverningCases: ["Genitiv"]\n      },\n      {\n        type: "Praefix",\n        correctSpelling: "trotz",\n        grundform: "trotz",\n        emojiDescription: "🛡"\n      }\n    ]</JSON><example>,<example><word>mit</word><JSON>[\n      {\n        type: "Präposition",\n        correctSpelling: "mit",\n        grundform: "mit",\n        emojiDescription: "🤝",\n        possibleGoverningCases: ["Dativ"]\n      },\n      {\n        type: "Praefix",\n        correctSpelling: "mit",\n        grundform: "mit",\n        emojiDescription: "🤝"\n      }\n    ]</JSON><example>,<example><word>an</word><JSON>[\n      {\n        type: "Präposition",\n        correctSpelling: "an",\n        grundform: "an",\n        emojiDescription: "📍",\n        possibleGoverningCases: ["Dativ", "Akkusativ"]\n      },\n      {\n        type: "Praefix",\n        correctSpelling: "an",\n        grundform: "an",\n        emojiDescription: "📍"\n      }\n    ]</JSON><example>,<example><word>uber</word><JSON>[\n      {\n        type: "Präposition",\n        correctSpelling: "über",\n        grundform: "über",\n        emojiDescription: "🔝",\n        possibleGoverningCases: ["Dativ", "Akkusativ"]\n      },\n      {\n        type: "Praefix",\n        correctSpelling: "über",\n        grundform: "über",\n        emojiDescription: "🔝"\n      },\n      {\n        type: "Nomen",\n        correctSpelling: "Uber",\n        grundform: "Uber",\n        emojiDescription: "🏙️",\n        gender: ["Neutrum"],\n        declension: "Stark",\n        isProperNoun: true\n      }\n    ]</JSON><example>,<example><word>selbst</word><JSON>[\n      {\n        type: "Partikel",\n        correctSpelling: "selbst",\n        grundform: "selbst",\n        emojiDescription: "🙋",\n        partikelType: ["Intensität"]\n      }\n    ]</JSON><example>,<example><word>umfahren</word><JSON>[\n      {\n        type: "Verb",\n        correctSpelling: "umfahren",\n        grundform: "umfahren",\n        emojiDescription: "🚗💥",\n        canBeRexlexiv: false,\n        regularity: "Unregelmäßig",\n        conjugation: "Stark",\n        separability: "Trennbar"\n      },\n      {\n        type: "Verb",\n        correctSpelling: "umfahren",\n        grundform: "umfahren",\n        emojiDescription: "🚗🛣️",\n        canBeRexlexiv: false,\n        regularity: "Unregelmäßig",\n        conjugation: "Stark",\n        separability: "Untrennbar"\n      },\n      {\n        type: "Nomen",\n        correctSpelling: "Umfahren",\n        grundform: "Umfahrt",\n        emojiDescription: "🛣️",\n        gender: ["Feminin"],\n        declension: "Stark"\n      }\n    ]</JSON><example>,<example><word>geöffnet</word><JSON>[\n      {\n        type: "ParticipialAdjective",\n        correctSpelling: "geöffnet",\n        grundform: "öffnen",\n        emojiDescription: "🚪👐",\n        partizipvariante: "P2"\n      },\n      {\n        type: "Adjektiv",\n        correctSpelling: "geöffnet",\n        grundform: "geöffnet",\n        emojiDescription: "🚪👐"\n      }\n    ]</JSON><example>,<example><word>verfallen</word><JSON>[\n      {\n        type: "ParticipialAdjective",\n        correctSpelling: "verfallen",\n        grundform: "verfallen",\n        emojiDescription: "🏚️",\n        partizipvariante: "P2"\n      },\n      {\n        type: "Adjektiv",\n        correctSpelling: "verfallen",\n        grundform: "verfallen",\n        emojiDescription: "🏚️"\n      }\n    ]</JSON><example>,<example><word>Schloss</word><JSON>[\n      {\n        type: "Nomen",\n        correctSpelling: "Schloss",\n        grundform: "Schloss",\n        emojiDescription: "🏰",\n        gender: ["Neutrum"],\n        declension: "Stark",\n        isProperNoun: false\n      },\n      {\n        type: "Nomen",\n        correctSpelling: "Schloss",\n        grundform: "Schloss",\n        emojiDescription: "🔒",\n        gender: ["Neutrum"],\n        declension: "Stark",\n        isProperNoun: false\n      },\n      {\n        type: "Verb",\n        correctSpelling: "Schloss",\n        grundform: "schließen",\n        emojiDescription: "🚪🔒",\n        canBeRexlexiv: false,\n        regularity: "Unregelmäßig",\n        conjugation: "Stark",\n        separability: "Untrennbar"\n      }\n    ]</JSON><example>,<example><word>gehobener</word><JSON>[\n      {\n        type: "Adjektiv",\n        correctSpelling: "gehoben",\n        grundform: "gehoben",\n        emojiDescription: "🎩"\n      }\n    ]</JSON><example>,<example><word>wahlwiese</word><JSON>[\n      {\n        type: "Adverb",\n        correctSpelling: "wahlweise",\n        grundform: "wahlweise",\n        emojiDescription: "🔀",\n        category: ["Modal"]\n      }\n    ]</JSON><example>,<example><word>deutschen</word><JSON>[\n      {\n        type: "Adjektiv",\n        correctSpelling: "deutschen",\n        grundform: "deutsch",\n        emojiDescription: "🇩🇪"\n      },\n      {\n        type: "Nomen",\n        correctSpelling: "Deutsche",\n        grundform: "Deutsche",\n        emojiDescription: "🇩🇪",\n        gender: ["Neutrum"],\n        declension: "Stark",\n        isProperNoun: false\n      }\n    ]</JSON><example>,<example><word>Wende</word><JSON>[\n      {\n        type: "Nomen",\n        correctSpelling: "Wende",\n        grundform: "Wende",\n        emojiDescription: "🔄",\n        gender: ["Feminin"],\n        declension: "Stark",\n        isProperNoun: false\n      },\n      {\n        type: "Verb",\n        correctSpelling: "wende",\n        grundform: "wenden",\n        emojiDescription: "↩️",\n        canBeRexlexiv: false,\n        regularity: "Regelmäßig",\n        conjugation: "Schwach",\n        separability: "Untrennbar"\n      }\n    ]</JSON><example>,<example><word>stapelbaren</word><JSON>[\n      {\n        type: "Adjektiv",\n        correctSpelling: "stapelbaren",\n        grundform: "stapelbar",\n        emojiDescription: "📦"\n      }\n    ]</JSON><example>,<example><word>vorbei</word><JSON>[\n      {\n        type: "Präposition",\n        correctSpelling: "vorbei",\n        grundform: "vorbei",\n        emojiDescription: "🏃‍♂️💨"\n      },\n      {\n        type: "Adverb",\n        correctSpelling: "vorbei",\n        grundform: "vorbei",\n        emojiDescription: "🏁",\n        category: ["Lokal"]\n      }\n    ]</JSON><example>,<example><word>spazirengegangen</word><JSON>[\n      {\n        type: "Verb",\n        correctSpelling: "spazieren gegangen",\n        grundform: "spazieren gehen",\n        emojiDescription: "🚶‍♂️",\n        canBeRexlexiv: false,\n        regularity: "Regelmäßig",\n        conjugation: "Schwach",\n        separability: "Trennbar"\n      }\n    ]</JSON><example>,<example><word>doch</word><JSON>[\n      {\n        type: "Partikel",\n        correctSpelling: "doch",\n        grundform: "doch",\n        emojiDescription: "💬",\n        partikelType: ["Konnektiv"]\n      }\n    ]</JSON><example>,<example><word>a – das Kissen hab’ ich auch [[bekommen]].  \n  Aber es ist vorbei! [[vorbei]]! Und [[jetzt]] [[heul]] bitte nicht!  \n  Tschüs.  \n  Männer!</word><JSON>[\n      {\n        type: "Unknown", \n        correctSpelling: "mystery",\n        grundform: "mystery",\n        emojiDescription: "❓"\n      }\n    ]</JSON><example>,<example><word>Laden</word><JSON>[\n      {\n        type: "Verb",\n        correctSpelling: "laden",\n        grundform: "laden",\n        emojiDescription: "📦",\n        canBeRexlexiv: false,\n        regularity: "Regelmäßig",\n        conjugation: "Schwach"\n      },\n      {\n        type: "Nomen",\n        correctSpelling: "Laden",\n        grundform: "Laden",\n        emojiDescription: "🏪",\n        gender: ["Maskulin"],\n        declension: "Stark",\n        isProperNoun: false\n      }\n    ]</JSON><example>,<example><word>gefallen</word><JSON>[\n      {\n        type: "ParticipialAdjective",\n        correctSpelling: "gefallen",\n        grundform: "gefallen",\n        emojiDescription: "👍",\n        partizipvariante: "P2"\n      },\n      {\n        type: "Adjektiv",\n        correctSpelling: "gefallen",\n        grundform: "gefallen",\n        emojiDescription: "👍"\n      }\n    ]</JSON><example>,<example><word>Das Eis zwischen sie ist gebrochen</word><JSON>[\n      {\n        type: "Idiom",\n        correctSpelling: "Das Eis brechen",\n        grundform: "Das Eis brechen",\n        emojiDescription: "❄️🧊"\n      }\n    ]</JSON><example></examples>'`