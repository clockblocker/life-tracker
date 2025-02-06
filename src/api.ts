import { GoogleGenerativeAI } from "@google/generative-ai";
import { MyPluginSettings } from "./types";
import { TFile, Vault } from 'obsidian';
import { prompts } from './prompts';

export class ApiService {
    private genAI: GoogleGenerativeAI;
    private model: any; // Using any for now since types might not be available
    private logFile = "gemini-api.md";

    constructor(private settings: MyPluginSettings, private vault: Vault) {
        this.genAI = new GoogleGenerativeAI(this.settings.googleApiKey);
        this.model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite-preview-02-05" });
        this.ensureLogFile();
    }

    private async ensureLogFile() {
        try {
            if (!(await this.vault.adapter.exists(this.logFile))) {
                await this.vault.create(this.logFile, "# Gemini API Logs\n\n");
            }
        } catch (error) {
            console.error('Error creating log file:', error);
        }
    }

    private async appendToLog(prompt: string, response: string, error?: any) {
        try {
            const timestamp = new Date().toISOString();
            const logEntry = `
## ${timestamp}
### Prompt:
\`\`\`
${prompt}
\`\`\`

### Response:
\`\`\`
${response}
\`\`\`
${error ? `\n### Error:\n\`\`\`\n${JSON.stringify(error, null, 2)}\n\`\`\`\n` : ''}
---
`;
            
            const file = this.vault.getAbstractFileByPath(this.logFile) as TFile;
            if (file) {
                const currentContent = await this.vault.read(file);
                await this.vault.modify(file, currentContent + logEntry);
            } else {
                await this.ensureLogFile();
                const newFile = this.vault.getAbstractFileByPath(this.logFile) as TFile;
                if (newFile) {
                    await this.vault.modify(newFile, logEntry);
                }
            }
        } catch (error) {
            console.error('Error appending to log:', error);
        }
    }

    private async generateContent(prompt: string): Promise<string> {
        try {
            const result = await this.model.generateContent(prompt);
            const response = result.response.text();
            await this.appendToLog(prompt, response);
            return response;
        } catch (error) {
            await this.appendToLog(prompt, "", error);
            console.error('Error generating content:', error);
            throw error;
        }
    }

    async fetchTemplate(word: string): Promise<string> {
        const prompt = prompts.generate_dictionary_entry.replace('{{german_word}}', word);
        return this.generateContent(prompt);
    }

    async determineInfinitiveAndEmoji(word: string): Promise<string> {
        return this.generateContent(prompts.determine_infinitive_and_pick_emoji + '\n' + word);
    }

    async makeBrackets(text: string): Promise<string> {
        return this.generateContent(prompts.make_brackets + '\n' + text);
    }

    async translateText(text: string): Promise<string> {
        return this.generateContent(prompts.translate_text + '\n' + text);
    }
}
