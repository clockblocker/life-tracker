import { GoogleGenerativeAI, GenerationConfig, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { TextEaterSettings } from "./types";
import { TFile, Vault, Notice, TAbstractFile, requestUrl } from 'obsidian';
import { prompts } from './prompts';

export class ApiService {
    private genAI: GoogleGenerativeAI | null = null;
    private model = "gemini-2.0-flash-lite";
    private logFile = "api-logs.md";
    private chatSessions: { [key: string]: any } = {};

    constructor(private settings: TextEaterSettings, private vault: Vault) {
        try {
            if (this.settings.apiProvider === 'deepseek') {
                // No initialization needed here
            } else if (this.settings.apiProvider === 'google') {
                this.genAI = new GoogleGenerativeAI(this.settings.googleApiKey);
            }
            this.ensureLogFile();
        } catch (error) {
            new Notice(`Error initializing API service: ${error.message}`);
        }
    }

    private async ensureLogFile() {
        try {
            const existingFile = this.vault.getAbstractFileByPath(this.logFile);
            if (!existingFile) {
                try {
                    await this.vault.create(this.logFile, "# API Logs\n\n");
                } catch (createError) {
                    // If the error is because the file already exists, that's fine
                    if (!(createError.message && createError.message.includes("already exists"))) {
                        console.error('Error creating log file:', createError);
                    }
                }
            }
        } catch (error) {
            console.error('Error checking for log file:', error);
        }
    }

    async generateContent(systemPrompt: string, userInput: string): Promise<string> {
        try {
            let response: string | null = null;
            // Remove leading tab characters from the system prompt
            systemPrompt = systemPrompt.replace(/^\t+/gm, '');

            if (this.settings.apiProvider === 'deepseek') {
                if (!this.settings.deepseekApiKey) {
                    throw new Error('DeepSeek API key not configured.');
                }

                const url = 'https://api.deepseek.com/v1/generation/inference';
                const deepseekData = {
                    model: 'deepseek-chat',
                    messages: [
                        {
                            role: 'system',
                            content: systemPrompt
                        },
                        {
                            role: 'user',
                            content: userInput
                        }
                    ],
                    stream: false,
                };

                const res = await requestUrl({
                    url: url,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.settings.deepseekApiKey}`
                    },
                    body: JSON.stringify(deepseekData)
                });

                if (res.status !== 200) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const deepseekResponse = res.json;
                response = deepseekResponse.choices[0].message.content;

            } else if (this.settings.apiProvider === 'google') {
                if (!this.settings.googleApiKey) {
                    throw new Error('Google API key not configured.');
                }
                if (!this.genAI) {
                    this.genAI = new GoogleGenerativeAI(this.settings.googleApiKey);
                }

                const generationConfig: GenerationConfig = {
                    temperature: 0,
                    topP: 0.95,
                    topK: 64,
                    maxOutputTokens: 8192,
                };

                const chatKey = systemPrompt;
                if (!this.chatSessions[chatKey]) {
                    const model = this.genAI.getGenerativeModel({
                        model: this.model,
                        systemInstruction: systemPrompt
                    });
                    this.chatSessions[chatKey] = model.startChat({
                        generationConfig: generationConfig,
                        history: [],
                    });
                }

                const chatSession = this.chatSessions[chatKey];
                const result = await chatSession.sendMessage(userInput);
                response = result.response.text();

            } else {
                throw new Error('API provider not configured correctly.');
            }

            const logResponse = response === null ? "" : response;
            return logResponse;
        } catch (error: any) {
            console.error('Error generating content:', error);
            throw new Error(error.message);
        }
    }
    
    async fetchTemplate(word: string): Promise<string> {
        const [dictionaryEntry, valenceBlock] = await Promise.all([
            this.generateContent(prompts.generate_dictionary_entry, word),
            this.generateContent(prompts.generate_valence_block, word)
        ]);
        return `${dictionaryEntry.replace('<agent_output>', '').replace('</agent_output>', '')}\n\n---\n${valenceBlock}`;
    }

    async determineInfinitiveAndEmoji(word: string): Promise<string> {
        return this.generateContent(prompts.determine_infinitive_and_pick_emoji, word);
    }

    async normalize(text: string): Promise<string> {
        return this.generateContent(prompts.normalize, text);
    }

    async translateText(text: string): Promise<string> {
        return this.generateContent(prompts.translate_de_to_eng, text);
    }

    async consultKeymaker(text: string): Promise<string> {
        return this.generateContent(prompts.check_ru_de_translation, text);
    }
}
