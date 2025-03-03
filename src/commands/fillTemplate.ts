import { Editor, MarkdownView, Notice, TFile } from 'obsidian';
import TextEaterPlugin from '../main';
import { prompts } from 'prompts';
import { longDash } from 'utils';

export default async function fillTemplate(plugin: TextEaterPlugin, editor: Editor, file: TFile) {
    const word = file.basename;

    try {
        const [dictionaryEntry, froms, morphems, valence] = await Promise.all([
            plugin.apiService.generateContent(prompts.generate_dictionary_entry, word),
            plugin.apiService.generateContent(prompts.generate_forms, word),
            plugin.apiService.generateContent(prompts.morphems, word),
            plugin.apiService.generateContent(prompts.generate_valence_block, word)
        ]);
        
        const adjForms = extractAdjectiveForms(froms);

        const baseBlock = `${dictionaryEntry.replace('<agent_output>', '').replace('</agent_output>', '')}`;
        const morphemsBlock = morphems.replace('\n', "") === longDash ? "" : `${morphems}`;
        const valenceBlock = valence.replace('\n', "") === longDash ? "" : `${valence}`;
        const fromsBlock = froms.replace('\n', "") === longDash ? "" : `${froms}`;
        const adjFormsBlock = adjForms.replace('\n', "") === longDash ? "" : `${adjForms}`;

        console.log('[baseBlock, morphemsBlock, valenceBlock, fromsBlock, adjFormsBlock]', [baseBlock, morphemsBlock, valenceBlock, fromsBlock, adjFormsBlock])
        const blocks = [baseBlock, morphemsBlock, valenceBlock, fromsBlock, adjFormsBlock];
        const entrie = blocks.filter(Boolean).join('\n---\n')

        await plugin.fileService.appendToFile(file.path, entrie);
    } catch (error) {
        new Notice(`Error: ${error.message}`);
    }
} 

function extractBaseForms(text: string): string[] | null {
    const match = text.match(/Adjektive:\s*\[\[(.*?)\]\],\s*\[\[(.*?)\]\],\s*\[\[(.*?)\]\]/);
    if (!match) {
        return null;
    }
    
    let [_, base, comparative, superlative] = match;
    
    return [base, comparative, superlative];
    
}


function extractAdjectiveForms(text: string): string {
    const baseForms = extractBaseForms(text);

    if (!baseForms) {
        return longDash;
    }
 
    const endings = ["er", "es", "e", "en", "em"];
    
    const result: string[] = [];
    
    for (const suf of baseForms) {
        for (const end of endings) {
            result.push(`[[${suf + end}]]`);
        }
    }
    
    return result.join(', ');
}