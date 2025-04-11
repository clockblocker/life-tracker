import { z } from 'zod';

import {
	GoogleGenerativeAI,
	GenerationConfig,
	HarmCategory,
	HarmBlockThreshold,
	ResponseSchema,
} from '@google/generative-ai';
import { TextEaterSettings } from './types';
import { TFile, Vault, Notice, TAbstractFile, requestUrl } from 'obsidian';
import { prompts } from './prompts';

export class ApiService {
	private genAI: GoogleGenerativeAI | null = null;
	private model = 'gemini-2.0-flash-lite';
	private chatSessions: { [key: string]: any } = {};

	constructor(
		private settings: TextEaterSettings,
		private vault: Vault
	) {
		try {
			if (this.settings.apiProvider === 'google') {
				this.genAI = new GoogleGenerativeAI(this.settings.googleApiKey);
			}
		} catch (error) {
			new Notice(`Error initializing API service: ${error.message}`);
		}
	}

	async generateContent(
		systemPrompt: string,
		userInput: string,
		responseSchema?: boolean
	): Promise<string> {
		const startTime = performance.now();
		try {
			let response: string | null = null;
			// Remove leading tab characters from the system prompt
			systemPrompt = systemPrompt.replace(/^\t+/gm, '');

			// console.log("systemPrompt", systemPrompt)

			if (this.settings.apiProvider !== 'google') {
				if (!this.settings.googleApiKey) {
					throw new Error('Google API key not configured.');
				}
				console.log('this.settings.apiProvider', this.settings.apiProvider);
				throw new Error('API provider not configured correctly.');
			}

			if (!this.genAI) {
				this.genAI = new GoogleGenerativeAI(this.settings.googleApiKey);
			}

			const generationConfig: GenerationConfig = !responseSchema
				? {
						temperature: 0,
						topP: 0.95,
						topK: 64,
						maxOutputTokens: 2048,
					}
				: {
						temperature: 0,
						topP: 0.95,
						topK: 64,
						maxOutputTokens: 1024,
						responseMimeType: `application/json`,
					};

			const chatKey = systemPrompt;
			if (!this.chatSessions[chatKey]) {
				const model = this.genAI.getGenerativeModel({
					model: this.model,
					systemInstruction: systemPrompt,
				});
				this.chatSessions[chatKey] = model.startChat({
					generationConfig: generationConfig,
					history: [],
				});
			}

			const chatSession = this.chatSessions[chatKey];

			// time it, log to console
			const result = await chatSession.sendMessage(userInput);
			response = result.response.text();

			const logResponse = response === null ? '' : response;
			const endTime = performance.now();
			const duration = endTime - startTime;
			console.log(
				`Generated content for word "${userInput}" in ${duration.toFixed(2)}ms`
			);
			return logResponse;
		} catch (error: any) {
			const endTime = performance.now();
			const duration = endTime - startTime;
			console.error(
				`Error generating content for word "${userInput}" after ${duration.toFixed(2)}ms:`,
				error
			);
			throw new Error(error.message);
		}
	}

	async fetchTemplate(word: string): Promise<string> {
		const [dictionaryEntry, valenceBlock] = await Promise.all([
			this.generateContent(prompts.generate_dictionary_entry, word),
			this.generateContent(prompts.generate_valence_block, word),
		]);
		return `${dictionaryEntry.replace('<agent_output>', '').replace('</agent_output>', '')}\n\n---\n${valenceBlock}`;
	}

	async determineInfinitiveAndEmoji(word: string): Promise<string> {
		return this.generateContent(
			prompts.determine_infinitive_and_pick_emoji,
			word
		);
	}

	async normalize(text: string): Promise<string> {
		return this.generateContent(prompts.normalize, text);
	}

	async translateText(text: string): Promise<string> {
		return this.generateContent(prompts.translate_de_to_eng, text);
	}

	async consultKeymaker(text: string): Promise<string> {
		return this.generateContent(prompts.keymaker, text);
	}

	async consultC1Richter(text: string, v2?: boolean): Promise<string> {
		return await '';
		// 	return this.generateContent(
		// 		v2 ? prompts.c1Richter2 : prompts.c1Richter,
		// 		text
		// 	);
	}
}
