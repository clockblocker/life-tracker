import { z } from "zod";
import { tests } from "./tests";
import { grundformsOutputSchema, morphemAnalysisOutputSchema } from "prompts/endgame/zod/schemas";

export const makeEndgameMorhpemsPrompt = () => {
  const instructions = `<agent_background>You are a language expert, highly knowledgeable in German linguistics, particularly in morphology and word formation. You are well-versed in traditional German linguistic terminology as well as modern analytical approaches.
</agent_background>
<agent_role>
Your role is to provide detailed morphemic analyses of German words. Decompose words into their individual morphemes (e.g., Stamm, Praefix, Suffix, Endung, Fugenelement) and, when applicable, summarize the compound’s principal components using their Grundformen. Adhere to a strict schema that distinguishes between the detailed breakdown and the compound summary.
</agent_role>
<instructions>
1. Analyze each German word by identifying its morphemic components based on the provided schema.
2. For the field <code>morphemischeZerlegung</code>, list each morpheme with its corresponding type (e.g., Morphem.Stamm, Morphem.Praefix, Morphem.Suffix, etc.).
3. For the field <code>zusammengesetztAus</code>, list the main components of the compound (using their Grundformen) as objects with the correct Wortart (e.g., Nomen, Verb, Praefix, Adjektiv...). Only Nomen should be capitalized.
4. If the word is a prefixed verb or a compound noun, include the <code>zusammengesetztAus</code> field; otherwise, omit it.
6. Ensure that the output strictly follows the given code format and schema definitions.
</instructions>
`;

  const schema = `<schema>
import { z } from "zod";
const SteigerungsfaehigSchema = z.enum(["Steigerungsfaehig", "Nicht steigerungsfaehig"]);
const VergleichsgradSchema = z.enum(["Positiv", "Komparativ", "Superlativ"]);
const RegelmaessigSchema = z.enum(["Regelmaessig", "Unregelmaessig"]);

const AdjektivOutputSchema = z.array(z.object({
  "adjektivstamm": z.object({
    [VergleichsgradSchema.enum.Positiv]: z.string(),
    [VergleichsgradSchema.enum.Komparativ]: z.string().optional(),
    [VergleichsgradSchema.enum.Superlativ]: z.string().optional(),
  }),
  "regelmaessig": RegelmaessigSchema,
  "steigerungsfaehig": SteigerungsfaehigSchema,
}));

</schema>
<outputformat>outputformat shall be formattes as AdjektivOutputSchema</outputformat>`;

  const testsSchema = z.record(morphemAnalysisOutputSchema);
  const validationResult = testsSchema.safeParse(tests);

  if (!validationResult.success) {
    console.error("Validation error:", validationResult.error);
    return "";
  } else {
    const examplesXML = `<examples>${
      Object.entries(tests)
        .map(
          ([key, value]) =>
            `<example><word>${key.toLowerCase().trim()}</word><morphemicAnalyses>${JSON.stringify(
              value
            )}</morphemicAnalyses></example>`
        )
        .join("")
    }</examples>`;
    return instructions + schema + examplesXML
  }
};
