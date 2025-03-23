import { Editor, Notice, TFile } from 'obsidian';
import TextEaterPlugin from '../main';
import { longDash } from 'utils';
import { makeGrundformsPrompt } from 'prompts/endgame/prompts/grundforms/grundformsPrompt';
import { grundformsOutputSchema } from 'prompts/endgame/schemas/zodSchemas';

function extractFirstBracketedWord(text: string) {
    const match = text.match(/\[\[([^\]]+)\]\]/);
    return match ? match[1] : null;
}

function getIPAIndexes(str: string) {
    const regex = /(?<!\[)\[(?!\[)(.*?)(?<!\])\](?!\])/g;
    let matches = [];
    let match;
    
    while ((match = regex.exec(str)) !== null) {
        matches.push([match.index, regex.lastIndex - 1]);
    }
    
    return matches.length ? matches[0] : null;
}

function incertYouglishLinkInIpa(baseBlock: string) {
    const ipaI = getIPAIndexes(baseBlock);
    const word = extractFirstBracketedWord(baseBlock);

    if (!ipaI || !word) {
        return baseBlock;
    }
    
    return baseBlock.slice(0, ipaI[1] + 1) + `(https://youglish.com/pronounce/${word}/german)` + baseBlock.slice(ipaI[1] + 1);
}

async function incertClipbordContentsInContextsBlock(baseBlock: string): Promise<string> {
    try {
        const clipboardContent = await navigator.clipboard.readText();
        const [first, ...rest] = baseBlock.split('---');

        
        if (rest.length >= 1) {
            // Insert clipboard content between the first two dividers
            return first + '---\n' + clipboardContent.trim() + rest.map(a => a.trim()).join("\n\n---\n") + "\n";
        }
        
        return baseBlock;
    } catch (error) {
        console.error('Failed to read clipboard:', error);
        return baseBlock;
    }
}

export default async function endgame(plugin: TextEaterPlugin, editor: Editor, file: TFile, callBack?: () => void) {
    const word = file.basename;
    try {
        const grundformsPrompt = makeGrundformsPrompt();
        const dictionaryEntry = await plugin.apiService.generateContent(grundformsPrompt, word, true);

        const parsed = grundformsOutputSchema.safeParse(JSON.parse(dictionaryEntry));
        
        if (parsed.error) {
            console.error({zodError: parsed.error, output: dictionaryEntry});
            await plugin.fileService.appendToFile(file.path, "Contact t.me/@clockblocker");
            return;
        }

        const grundforms = parsed.data.map(({rechtschreibung, grundform, ...rest}) => ({rechtschreibung, grundform, ...rest, isGrundform: word === rechtschreibung && rechtschreibung === grundform})).sort(({isGrundform}) => isGrundform ? 1 : 0);
        console.log('grundforms', grundforms);
        await plugin.fileService.appendToFile(file.path, grundforms.toString());

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