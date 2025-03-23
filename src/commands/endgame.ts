import { Editor, MarkdownView, Notice, TFile } from 'obsidian';
import TextEaterPlugin from '../main';
import { prompts } from 'prompts';
import { longDash } from 'utils';
import { grundformsPrompt } from 'prompts/endgame/prompts/grundforms/grundformsPrompt';

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
    const sysprompt = grundformsPrompt.instructions + grundformsPrompt.examples;
    try {
        const [dictionaryEntry] = await Promise.all([
            plugin.apiService.generateContent(sysprompt, word, grundformsPrompt.schema),
        ]);

        await plugin.fileService.appendToFile(file.path, dictionaryEntry);

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