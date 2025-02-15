import { GoogleGenerativeAI } from "@google/generative-ai";
import { MyPluginSettings } from "./types";
import { TFile, Vault, Notice } from 'obsidian';
import { prompts } from './prompts';

export class ApiService {
    private genAI: GoogleGenerativeAI | null = null;
    private model = "deepseek-chat";
    private logFile = "api-logs.md";

    constructor(private settings: MyPluginSettings, private vault: Vault) {
        try {
            if (this.settings.apiProvider === 'deepseek') {
                // No initialization needed here
            } else if (this.settings.apiProvider === 'google') {
                this.genAI = new GoogleGenerativeAI(this.settings.googleApiKey);
            }
            this.ensureLogFile();
        } catch (error) {
            console.error('Error initializing API service:', error);
            new Notice(`Error initializing API service: ${error.message}`);
        }
    }

    private async ensureLogFile() {
        try {
            if (!(await this.vault.adapter.exists(this.logFile))) {
                await this.vault.create(this.logFile, "# API Logs\n\n");
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
            let response: string | null = null;
            if (this.settings.apiProvider === 'deepseek') {
                if (!this.settings.deepseekApiKey) {
                    throw new Error('DeepSeek API key not configured.');
                }

                const url = 'https://api.deepseek.com/chat/completions';
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.settings.deepseekApiKey}`
                };
                const body = JSON.stringify({
                    model: this.model,
                    messages: [
                        { role: "user", content: prompt }
                    ],
                    stream: false
                });

                const res = await fetch(url, {
                    method: 'POST',
                    headers: headers,
                    body: body
                });

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const data = await res.json();
                response = data.choices[0].message.content;

            } else if (this.settings.apiProvider === 'google') {
                if (!this.settings.googleApiKey) {
                    throw new Error('Google API key not configured.');
                }
                if (!this.genAI) {
                    this.genAI = new GoogleGenerativeAI(this.settings.googleApiKey);
                }
                const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
                const result = await model.generateContent(prompt);
                response = result.response.text();
            } else {
                throw new Error('API provider not configured correctly.');
            }

            // Check if response is null and convert to empty string
            const logResponse = response === null ? "" : response;
            await this.appendToLog(prompt, logResponse);
            return logResponse;
        } catch (error: any) {
            await this.appendToLog(prompt, "", error);
            console.error('Error generating content:', error);
            throw new Error(error.message);
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

    async translateRuToDe(text: string): Promise<string> {
        return this.generateContent(prompts.translate_ru_to_de + '\n' + text);
    }

    async checkRuDeTranslation(text: string): Promise<string> {
        return this.generateContent(prompts.check_ru_de_translation + '\n' + text);
    }
}
