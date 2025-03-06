import { keymaker } from "prompts/keymaker";
import { determine_infinitive_and_pick_emoji } from "prompts/determine-infinitive-and-pick-emoji";
import { generate_dictionary_entry } from "prompts/generate-dictinary-entrie";
import { normalize } from "prompts/normalize";
import { translate_de_to_eng } from "prompts/translate-de-to-eng";
import { generate_valence_block } from "./valence";
import { generate_forms } from "./generate-forms";
import { morphems } from "./morphems";

export const prompts = {
   generate_dictionary_entry,
   generate_forms,
   morphems,
   determine_infinitive_and_pick_emoji, 
   normalize,
   translate_de_to_eng,
   check_ru_de_translation: keymaker,
   generate_valence_block,
};