import { keymaker } from "prompts/keymaker";
import { determine_infinitive_and_pick_emoji } from "prompts/determine-infinitive-and-pick-emoji";
import { generate_dictionary_entry } from "prompts/generate-dictinary-entrie";
import { normalize } from "prompts/normalize";
import { translate_de_to_eng } from "prompts/translate-de-to-eng";
import { generate_valence_block } from "./valence";
import { generate_forms } from "./generate-forms";
import { C1_RICHTER_PROMPT } from "./c1Richter";
import { C1_RICHTER_PROMPT_V2 } from "./wip/c1RichterCorrectedDECorrectionFirst";
import { C1_RICHTER_PROMPT_V1 } from "./wip/c1RichterCorrectedDE";
import { morphems2 } from "./wip/morphems2";

export const prompts = {
   generate_dictionary_entry,
   generate_forms,
   morphems: morphems2,
   determine_infinitive_and_pick_emoji, 
   normalize,
   translate_de_to_eng,
   keymaker,
   c1Richter: C1_RICHTER_PROMPT_V1,
   c1Richter2: C1_RICHTER_PROMPT_V2,
   generate_valence_block,
};