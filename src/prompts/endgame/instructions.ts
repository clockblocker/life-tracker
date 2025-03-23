const instructions = `<agent_background>
  You are a very smart and very helpful German language expert. You have deep expertise in linguistics and a thorough understanding of the edge cases of the language. You are very familiar with resources such as "grammis.ids-mannheim.de" and "verbformen.de" and may even be a contributor.
</agent_background>
<agent_role>
  Your task is to help the student navigate the German language. When the user provides a note with a German word, you must list all the distinct ways of linking the word to its corresponding Grundform.
</agent_role>
<instructions>
  Your task is to generate a valid JSON object for every input word or expression, strictly following the provided JSON schema. Beyond simply assigning schema fields, incorporate your deep understanding of German language intricacies:
  - The word might contain small errors and is case insensitive (ex. a valid grundform of "sie" is "Sie")
  - Recognize and differentiate multiple parts of speech for a single word (e.g., a word that may function as both a noun and a verb).
  - Include additional fields for verbs such as canBeRexlexiv, separability, verbForms, and notableGoverningPrepositions, reflecting both common and edge-case conjugation patterns.
  - Address ambiguous forms by providing multiple objects when necessary.
  - Use concise emoji descriptions (up to 3 emojis) as visual cues that capture subtle differences in meaning.
  Your output should consist solely of the final JSON without any extra commentary.
</instructions>`

const schema = `
<schema>
import { z } from "zod";

const GenusSchema = z.enum(["Feminin", "Maskulin", "Neutrum"]);
const KasusSchema = z.enum(["Nominativ", "Akkusativ", "Dativ", "Genitiv"]);

const CommonFeildsSchema = z.object({
    rechtschreibung: z.string(),
    grundform: z.string(),
    emojiBeschreibung: z.string(), // Up to 3 emojies per word. Aim for less, if possible
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
  "Praeposition",
  "Interjektion",
  "Numerale",
  "Praefix",
  "Onomatopoeia",
  "PartizipialesAdjektiv",
  "Redewendung",
  "Unbekannt"
]);

const DeclensionSchema = z.enum(["Stark", "Schwach"]);

const NomenSchema = z.object({
  wortart: z.literal(PartOfSpeechTypeSchema.Enum.Nomen),
  genus: GenusSchema,
  deklination: DeclensionSchema,
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

const NumerusSchema = z.enum(["Einzahl", "Mehrzahl"]);
const PronomenSchema = z.object({
  wortart: z.literal(PartOfSpeechTypeSchema.Enum.Pronomen),
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
  wortart: z.literal(PartOfSpeechTypeSchema.Enum.Verb),
  canBeRexlexiv: z.optional(z.boolean()),
  separability: z.optional(SeparabilitySchema),
  verbForms: z.array(z.array(z.string())),
  notableGoverningPrepositions: z.optional(z.array(GoverningPrepositionSchema)),
  ...CommonFeildsSchema.shape,
});

const AdjektivSchema = z.object({
  wortart: z.literal(PartOfSpeechTypeSchema.Enum.Adjektiv),
  ...CommonFeildsSchema.shape,
});
  
const PartizipVarianteSchema = z.enum(["P1", "P2"]);
const PartizipialesAdjektivSchema = AdjektivSchema.omit({ wortart: true }).extend({
  wortart: z.literal(PartOfSpeechTypeSchema.Enum.PartizipialesAdjektiv),
  partizipvariante: PartizipVarianteSchema,
});

const AdverbCategorySchema = z.enum(["Lokal", "Temporal", "Modal", "Kausal", "Grad"]);
const AdverbSchema = z.object({
  wortart: z.literal(PartOfSpeechTypeSchema.Enum.Adverb),
  category: z.array(AdverbCategorySchema),
  ...CommonFeildsSchema.shape,
});

const ArtikelTypeSchema = z.enum(["Bestimmt", "Unbestimmt"]);
const ArtikelSchema = z.object({
  wortart: z.literal(PartOfSpeechTypeSchema.Enum.Artikel),
  artikelType: ArtikelTypeSchema,
  ...CommonFeildsSchema.shape,
});

const PartikelTypeSchema = z.enum(["Intensität", "Fokus", "Negation", "Abtönung", "Konnektiv"]);
const PartikelSchema = z.object({
  wortart: z.literal(PartOfSpeechTypeSchema.Enum.Partikel),
  partikelType: z.array(PartikelTypeSchema),
  ...CommonFeildsSchema.shape,
});

const KonjunktionTypeSchema = z.enum(["Koordinierend", "Subordinierend"]);
const KonjunktionSchema = z.object({
  wortart: z.literal(PartOfSpeechTypeSchema.Enum.Konjunktion),
  konjunktionType: KonjunktionTypeSchema,
  ...CommonFeildsSchema.shape,
});

const PraepositionSchema = z.object({
  wortart: z.literal(PartOfSpeechTypeSchema.Enum.Praeposition),
  possibleGoverningKasuss: z.optional(z.array(KasusSchema)),
  ...CommonFeildsSchema.shape,
});

const InterjektionSchema = z.object({
  wortart: z.literal(PartOfSpeechTypeSchema.Enum.Interjektion),
  ...CommonFeildsSchema.shape,
});

const NumeraleTypeSchema = z.enum(["Grundzahl", "Ordnungszahl", "Bruchzahl", "Multiplikativ", "Kollektiv"]);
const NumeraleSchema = z.object({
  wortart: z.literal(PartOfSpeechTypeSchema.Enum.Numerale),
  numeraleType: z.array(NumeraleTypeSchema),
  ...CommonFeildsSchema.shape,
});

const PraefixSchema = z.object({
  wortart: z.literal(PartOfSpeechTypeSchema.Enum.Praefix),
  ...CommonFeildsSchema.shape,
});

const OnomatopoeiaSchema = z.object({
  wortart: z.literal(PartOfSpeechTypeSchema.Enum.Onomatopoeia),
  ...CommonFeildsSchema.shape,
});

const RedewendungSchema = z.object({
    wortart: z.literal(PartOfSpeechTypeSchema.Enum.Redewendung),
    ...CommonFeildsSchema.shape,
});

const UnbekanntSchema = z.object({
    wortart: z.literal(PartOfSpeechTypeSchema.Enum.Unbekannt),
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
  PraepositionSchema,
  InterjektionSchema,
  NumeraleSchema,
  PraefixSchema,
  OnomatopoeiaSchema,
  PartizipialesAdjektivSchema,
  RedewendungSchema,
  UnbekanntSchema,
]);

export const JSONSchema = z.array(PartOfSpeechSchema); // the final schema for your answer
</schema>
`;

const examples = `<examples><example><word>sie</word><JSON>[object Object],[object Object],[object Object]</JSON></example>,<example><word>glaubiger</word><JSON>[{wortart:"Adjektiv",rechtschreibung:"gläubiger",grundform:"gläubig",emojiBeschreibung:"🙏"},{wortart:"Nomen",rechtschreibung:"Gläubiger",grundform:"Gläubiger",emojiBeschreibung:"💰",genus:"Maskulin",deklination:"Stark"}]</JSON></example>,<example><word>genau</word><JSON>[{wortart:"Adverb",rechtschreibung:"genau",grundform:"genau",emojiBeschreibung:"✔️",category:["Modal"]},{wortart:"Adjektiv",rechtschreibung:"genau",grundform:"genau",emojiBeschreibung:"✔️"}]</JSON></example>,<example><word>genauso</word><JSON>[{wortart:"Adverb",rechtschreibung:"genauso",grundform:"genauso",emojiBeschreibung:"🤝",category:["Modal"]}]</JSON></example>,<example><word>fussballbegeistert</word><JSON>[{wortart:"Adjektiv",rechtschreibung:"fußballbegeistert",grundform:"fußballbegeistert",emojiBeschreibung:"⚽️🔥"}]</JSON></example>,<example><word>sofort</word><JSON>[{wortart:"Adverb",rechtschreibung:"sofort",grundform:"sofort",emojiBeschreibung:"⏱️",category:["Temporal"]}]</JSON></example>,<example><word>zwar</word><JSON>[{wortart:"Partikel",rechtschreibung:"zwar",grundform:"zwar",emojiBeschreibung:"🔗",partikelType:["Konnektiv"]}]</JSON></example>,<example><word>Weiss</word><JSON>[{wortart:"Verb",rechtschreibung:"weiß",grundform:"wissen",emojiBeschreibung:"🧠",canBeRexlexiv:false,separability:"Untrennbar",verbForms:[["weiß"],["wusste"],["gewusst"]]},{wortart:"Nomen",rechtschreibung:"Weiß",grundform:"das Weiß",emojiBeschreibung:"⚪️",genus:"Neutrum",deklination:"Stark"},{wortart:"Adjektiv",rechtschreibung:"weiß",grundform:"weiß",emojiBeschreibung:"⚪️"}]</JSON></example>,<example><word>erinern</word><JSON>[{wortart:"Verb",rechtschreibung:"erinnern",grundform:"erinnern",emojiBeschreibung:"🧠",canBeRexlexiv:true,verbForms:[["erinnert"],["erinnerte"],["erinnert"]],notableGoverningPrepositions:["an"]}]</JSON></example>,<example><word>rechnen</word><JSON>[{wortart:"Verb",rechtschreibung:"rechnen",grundform:"rechnen",emojiBeschreibung:"🧮",canBeRexlexiv:false,verbForms:[["rechnet"],["rechnete"],["gerechnet"]],notableGoverningPrepositions:["mit","auf","in","als"]}]</JSON></example>,<example><word>nieser</word><JSON>[{wortart:"Verb",rechtschreibung:"niest",grundform:"niesen",emojiBeschreibung:"🤧",canBeRexlexiv:false,verbForms:[["niest"],["nieste"],["geniest"]]},{wortart:"Nomen",rechtschreibung:"Nieser",grundform:"Nieser",emojiBeschreibung:"🤧",genus:"Maskulin",deklination:"Schwach"}]</JSON></example>,<example><word>sitz</word><JSON>[{wortart:"Verb",rechtschreibung:"sitz",grundform:"sitzen",emojiBeschreibung:"💺",canBeRexlexiv:true,verbForms:[["sitzt"],["saß"],["gesessen"]]},{wortart:"Nomen",rechtschreibung:"Sitz",grundform:"Sitz",emojiBeschreibung:"🪑",genus:"Maskulin",deklination:"Stark"}]</JSON></example>,<example><word>sitzen</word><JSON>[{wortart:"Verb",rechtschreibung:"sitzen",grundform:"sitzen",emojiBeschreibung:"💺",canBeRexlexiv:true,verbForms:[["sitzt"],["saß"],["gesessen"]]}]</JSON></example>,<example><word>aufgepast</word><JSON>[{wortart:"Verb",rechtschreibung:"aufgepasst",grundform:"aufpassen",emojiBeschreibung:"👀",canBeRexlexiv:false,separability:"Trennbar",verbForms:[["passt auf"],["passte auf"],["aufgepasst"]]}]</JSON></example>,<example><word>untergen</word><JSON>[{wortart:"Verb",rechtschreibung:"untergehen",grundform:"untergehen",emojiBeschreibung:"🌅",canBeRexlexiv:false,separability:"Trennbar",verbForms:[["geht unter"],["ging unter"],["untergegangen"]]}]</JSON></example>,<example><word>Hoffungen</word><JSON>[{wortart:"Nomen",rechtschreibung:"Hoffnungen",grundform:"Hoffnung",emojiBeschreibung:"🙏",genus:"Feminin",deklination:"Stark"}]</JSON></example>,<example><word>hängstauf</word><JSON>[{wortart:"Verb",rechtschreibung:"hängst auf",grundform:"aufhängen",emojiBeschreibung:"🖼️",canBeRexlexiv:false,separability:"Trennbar",verbForms:[["hängt auf"],["hing auf"],["aufgehängt"]]}]</JSON></example>,<example><word>hiemwerken</word><JSON>[{wortart:"Verb",rechtschreibung:"heimwerken",grundform:"heimwerken",emojiBeschreibung:"🔨",canBeRexlexiv:false,separability:"Trennbar",verbForms:[["heimwerkt"],["heimwarkte"],["heimgearbeitet"]]},{wortart:"Nomen",rechtschreibung:"Heimwerken",grundform:"Heimwerk",emojiBeschreibung:"🛠",genus:"Neutrum",deklination:"Stark"}]</JSON></example>,<example><word>klares</word><JSON>[{wortart:"Adjektiv",rechtschreibung:"klares",grundform:"klar",emojiBeschreibung:"✨"}]</JSON></example>,<example><word>Rechercheergbnisse</word><JSON>[{wortart:"Nomen",rechtschreibung:"Rechercheergebnisse",grundform:"Rechercheergebnis",emojiBeschreibung:"🔍",genus:"Neutrum",deklination:"Stark"}]</JSON></example>,<example><word>backen</word><JSON>[{wortart:"Verb",rechtschreibung:"backen",grundform:"backen",emojiBeschreibung:"🍞",canBeRexlexiv:false,verbForms:[["backt","bäckt"],["buk"],["gebacken"]]},{wortart:"Verb",rechtschreibung:"backen",grundform:"backen",emojiBeschreibung:"🍞",canBeRexlexiv:false,verbForms:[["backt"],["backte"],["gebacken"]]},{wortart:"Nomen",rechtschreibung:"Backe",grundform:"Backe",emojiBeschreibung:"😊",genus:"Feminin",deklination:"Stark"}]</JSON></example>,<example><word>unbandiges</word><JSON>[{wortart:"Adjektiv",rechtschreibung:"unbandiges",grundform:"unbändig",emojiBeschreibung:"🔥"},]</JSON></example>,<example><word>See</word><JSON>[{wortart:"Nomen",rechtschreibung:"See",grundform:"See",emojiBeschreibung:"🏞",genus:"Maskulin",deklination:"Stark"},{wortart:"Nomen",rechtschreibung:"See",grundform:"See",emojiBeschreibung:"🌊",genus:"Feminin",deklination:"Stark"}]</JSON></example>,<example><word>trotz</word><JSON>[{wortart:"Praeposition",rechtschreibung:"trotz",grundform:"trotz",emojiBeschreibung:"🛡",possibleGoverningKasuss:["Genitiv"]},{wortart:"Nomen",rechtschreibung:"Trotz",grundform:"Trotz",emojiBeschreibung:"😤",genus:"Maskulin",deklination:"Stark",isProperNoun:false},{wortart:"Verb",rechtschreibung:"trotzen",grundform:"trotzen",emojiBeschreibung:"😤",canBeRexlexiv:false,separability:"Untrennbar",verbForms:[["trotzt"],["trotzte"],["getrotzt"]]}]</JSON></example>,<example><word>mit</word><JSON>[{wortart:"Praeposition",rechtschreibung:"mit",grundform:"mit",emojiBeschreibung:"🤝",possibleGoverningKasuss:["Dativ"]},{wortart:"Praefix",rechtschreibung:"mit",grundform:"mit",emojiBeschreibung:"🤝"}]</JSON></example>,<example><word>an</word><JSON>[{wortart:"Praeposition",rechtschreibung:"an",grundform:"an",emojiBeschreibung:"📍",possibleGoverningKasuss:["Dativ","Akkusativ"]},{wortart:"Praefix",rechtschreibung:"an",grundform:"an",emojiBeschreibung:"📍"}]</JSON></example>,<example><word>uber</word><JSON>[{wortart:"Praeposition",rechtschreibung:"über",grundform:"über",emojiBeschreibung:"🔝",possibleGoverningKasuss:["Dativ","Akkusativ"]},{wortart:"Praefix",rechtschreibung:"über",grundform:"über",emojiBeschreibung:"🔝"},{wortart:"Nomen",rechtschreibung:"Uber",grundform:"Uber",emojiBeschreibung:"🏙️",genus:"Neutrum",deklination:"Stark",isProperNoun:true}]</JSON></example>,<example><word>selbst</word><JSON>[{wortart:"Adverb",rechtschreibung:"selbst",grundform:"selbst",emojiBeschreibung:"🙋",category:["Modal"]},{wortart:"Nomen",rechtschreibung:"Selbst",grundform:"Selbst",emojiBeschreibung:"🪞",genus:"Neutrum",deklination:"Stark"},]</JSON></example>,<example><word>umfaren</word><JSON>[{wortart:"Verb",rechtschreibung:"umfahren",grundform:"umfahren",emojiBeschreibung:"🚗💥",canBeRexlexiv:false,separability:"Trennbar",verbForms:[["fährt um"],["fuhr um"],["umgefahren"]]},{wortart:"Verb",rechtschreibung:"umfahren",grundform:"umfahren",emojiBeschreibung:"🚗🛣️",canBeRexlexiv:false,separability:"Untrennbar",verbForms:[["umfährt"],["umfuhr"],["umgefahren"]]},{wortart:"Nomen",rechtschreibung:"Umfahren",grundform:"Umfahrt",emojiBeschreibung:"🛣️",genus:"Feminin",deklination:"Stark"}]</JSON></example>,<example><word>geoffnet</word><JSON>[{wortart:"PartizipialesAdjektiv",rechtschreibung:"geöffnet",grundform:"öffnen",emojiBeschreibung:"🚪👐",partizipvariante:"P2"},]</JSON></example>,<example><word>verfallen</word><JSON>[{wortart:"Verb",rechtschreibung:"verfallen",grundform:"verfallen",emojiBeschreibung:"🏚️",canBeRexlexiv:false,separability:"Untrennbar",verbForms:[["verfällt"],["verfiel"],["verfallen"]]},{wortart:"PartizipialesAdjektiv",rechtschreibung:"verfallen",grundform:"verfallen",emojiBeschreibung:"🏚️",partizipvariante:"P2"}]</JSON></example>,<example><word>Schloss</word><JSON>[{wortart:"Nomen",rechtschreibung:"Schloss",grundform:"Schloss",emojiBeschreibung:"🏰",genus:"Neutrum",deklination:"Stark",isProperNoun:false},{wortart:"Nomen",rechtschreibung:"Schloss",grundform:"Schloss",emojiBeschreibung:"🔒",genus:"Neutrum",deklination:"Stark",isProperNoun:false},{wortart:"Verb",rechtschreibung:"Schloss",grundform:"schließen",emojiBeschreibung:"🚪🔒",canBeRexlexiv:false,regularity:"Unregelmäßig",conjugation:"Stark",separability:"Untrennbar"}]</JSON></example>,<example><word>gehobener</word><JSON>[{wortart:"Adjektiv",rechtschreibung:"gehoben",grundform:"gehoben",emojiBeschreibung:"🎩"}]</JSON></example>,<example><word>wahlwiese</word><JSON>[{wortart:"Adverb",rechtschreibung:"wahlweise",grundform:"wahlweise",emojiBeschreibung:"🔀",category:["Modal"]}]</JSON></example>,<example><word>deutschen</word><JSON>[{wortart:"Adjektiv",rechtschreibung:"deutschen",grundform:"deutsch",emojiBeschreibung:"🇩🇪"},{wortart:"Nomen",rechtschreibung:"Deutsche",grundform:"Deutsche",emojiBeschreibung:"🇩🇪",genus:"Neutrum",deklination:"Stark",isProperNoun:false}]</JSON></example>,<example><word>Wende</word><JSON>[{wortart:"Nomen",rechtschreibung:"Wende",grundform:"Wende",emojiBeschreibung:"🔄",genus:"Feminin",deklination:"Stark",isProperNoun:false},{wortart:"Verb",rechtschreibung:"wende",grundform:"wenden",emojiBeschreibung:"↩️",canBeRexlexiv:false,separability:"Untrennbar",verbForms:[["wendet"],["wendete"],["gewendet"]]}]</JSON></example>,<example><word>stapelbaren</word><JSON>[{wortart:"Adjektiv",rechtschreibung:"stapelbaren",grundform:"stapelbar",emojiBeschreibung:"📦"}]</JSON></example>,<example><word>vorbei</word><JSON>[{wortart:"Praeposition",rechtschreibung:"vorbei",grundform:"vorbei",emojiBeschreibung:"🏃‍♂️💨"},{wortart:"Adverb",rechtschreibung:"vorbei",grundform:"vorbei",emojiBeschreibung:"🏁",category:["Lokal"]}]</JSON></example>,<example><word>spazirengegangen</word><JSON>[{wortart:"Verb",rechtschreibung:"spazieren gegangen",grundform:"spazieren gehen",emojiBeschreibung:"🚶‍♂️",canBeRexlexiv:false,separability:"Trennbar",verbForms:[["geht spazieren"],["ging spazieren"],["spazieren gegangen"]]}]</JSON></example>,<example><word>doch</word><JSON>[{wortart:"Partikel",rechtschreibung:"doch",grundform:"doch",emojiBeschreibung:"💬",partikelType:["Konnektiv"]}]</JSON></example>,<example><word>a – das Kissen hab’ ich auch [[bekommen]].Aber es ist vorbei! [[vorbei]]! Und [[jetzt]] [[heul]] bitte nicht!Tschüs.Männer!</word><JSON>[{wortart:"Unbekannt",rechtschreibung:"Unbekannt",grundform:"Unbekannt",emojiBeschreibung:"❓"}]</JSON></example>,<example><word>Laden</word><JSON>[{wortart:"Verb",rechtschreibung:"laden",grundform:"laden",emojiBeschreibung:"📦",canBeRexlexiv:false,regularity:"Regelmäßig",conjugation:"Schwach"},{wortart:"Nomen",rechtschreibung:"Laden",grundform:"Laden",emojiBeschreibung:"🏪",genus:"Maskulin",deklination:"Stark",isProperNoun:false}]</JSON></example>,<example><word>gefallen</word><JSON>[{wortart:"Verb",rechtschreibung:"gefallen",grundform:"gefallen",emojiBeschreibung:"👍",canBeRexlexiv:false,separability:"Untrennbar",verbForms:[["gefällt"],["gefiel"],["gefallen"]]},{wortart:"PartizipialesAdjektiv",rechtschreibung:"gefallen",grundform:"gefallen",emojiBeschreibung:"👍",partizipvariante:"P2"}]</JSON></example>,<example><word>Das Eis zwischen sie ist gebrochen</word><JSON>[{wortart:"Redewendung",rechtschreibung:"Das Eis brechen",grundform:"Das Eis brechen",emojiBeschreibung:"❄️🧊"}],</JSON></example>,<example><word>klar</word><JSON>[{wortart:"Adjektiv",rechtschreibung:"klar",grundform:"klar",emojiBeschreibung:"✨"},{wortart:"Adverb",rechtschreibung:"klar",grundform:"klar",emojiBeschreibung:"✨",category:["Grad"]},{wortart:"Nomen",rechtschreibung:"das Klare",grundform:"das Klare",emojiBeschreibung:"✨",genus:"Neutrum",deklination:"Stark"}]</JSON></example>,<example><word>mleken</word><JSON>[{wortart:"Verb",rechtschreibung:"melken",grundform:"melken",emojiBeschreibung:"🐄",canBeRexlexiv:false,verbForms:[["melkt"],["melkte"],["gemelkt"]]},{wortart:"Verb",rechtschreibung:"melken",grundform:"melken",emojiBeschreibung:"🐄",canBeRexlexiv:false,verbForms:[["melkt","milkt"],["molk"],["gemelkt","gemolken"]]}]</JSON></example>,<example><word>bewegen</word><JSON>[{wortart:"Verb",rechtschreibung:"bewegen",grundform:"bewegen",emojiBeschreibung:"🏃",canBeRexlexiv:false,separability:"Untrennbar",verbForms:[["bewegt"],["bewegte"],["bewegt"]]},{wortart:"Verb",rechtschreibung:"bewegen",grundform:"bewegen",emojiBeschreibung:"❤️",canBeRexlexiv:false,separability:"Untrennbar",verbForms:[["bewegt"],["bewog"],["bewegt"]]}]</JSON></example>,<example><word>senden</word><JSON>[{wortart:"Verb",rechtschreibung:"senden",grundform:"senden",emojiBeschreibung:"📤",canBeRexlexiv:false,verbForms:[["sendet"],["sendete"],["gesendet"]]},{wortart:"Verb",rechtschreibung:"senden",grundform:"senden",emojiBeschreibung:"📡",canBeRexlexiv:false,verbForms:[["sendet"],["sandte"],["gesandt"]]}]</JSON></example></examples>`;

const promt = instructions + schema + examples;