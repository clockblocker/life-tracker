import { Editor, Notice, TFile } from 'obsidian';
import TextEaterPlugin from '../main';
import { grundformsOutputSchema } from 'prompts/endgame/zod/schemas';
import { Grundform, Wortart, Nomen, Genus } from 'prompts/endgame/zod/types';
import { z } from "zod";
import { makeGrundformsPrompt } from 'prompts/endgame/grundform/prompts/grundforms/grundformsPrompt';
import { makeAnEndgameNote } from 'prompts/endgame/makeAnEndgameNote';

export default async function endgame(plugin: TextEaterPlugin, editor: Editor, file: TFile) {
    const word = file.basename.toLocaleLowerCase();
    try {
        const grundformsPrompt = makeGrundformsPrompt();
        const generatedGrundforms = await plugin.apiService.generateContent(grundformsPrompt, word, true);

        const parsedGrungforms = grundformsOutputSchema.safeParse(JSON.parse(generatedGrundforms));
        
        if (parsedGrungforms.error) {
            console.error({zodError: parsedGrungforms.error, output: generatedGrundforms});
            await plugin.fileService.appendToFile(file.path, "Contact t.me/@clockblocker");
            return;
        }

        await makeAnEndgameNote(plugin, file, parsedGrungforms.data, word);        
    } catch (error) {
        new Notice(`Error: ${error.message}`);
    }
};
