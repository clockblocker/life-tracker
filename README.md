# Custom Dictionary Builder (Obsidian Plugin)

Open a file with German text.
For every unknown word, generate a structured vocabulary entry with context from the text.
Enjoy the web of your personal dictionary.

![Graph View Example](img/graph.png)

## Overview

This plugin helps you create and maintain a comprehensive German language learning system in Obsidian. It automatically generates structured entries for: Verbs, Nouns (with gender color-coding: 🔵 masculine, 🔴 feminine, 🟢 neuter), Adjectives, and other parts of speech.

Once any form of a word appears in your text:
![Example Text with "du hast"](img/du_hast.png)

It and all of its other forms will be linked to its infinitive form:
![Past Participle Entry Example](img/gefragt.png)

The infinitive form points to all forms of the word, its antonyms, and synonyms:
![Infinitive Form Example](img/fragen.png)


## Key Features

### 1. Structured Entry Templates
Each word type has a specialized template that includes:
- Pronunciation
- Conjugation/declension tables
- Synonyms and antonyms
- Translation
- Morphological breakdown
- Part of speech tagging


### 2. Automatic Backlink Management
The plugin automatically maintains bidirectional links between related words, helping you build a network of connected vocabulary:
- Links between base verbs and their prefixed forms
- Connections between synonyms and antonyms
- References between related grammatical forms

## Usage

1. Create a new note in your vault
2. Open the command palette (Cmd/Ctrl + P)
3. Choose the appropriate template for your word type
4. Fill in the basic information - the plugin will handle the formatting and linking

## Network Use

This plugin utilizes network requests to communicate with the following remote services:

*   **Google Gemini API:** Used for translation, dictionary entry generation, and other language processing tasks.
*   **DeepSeek API:** Used as an alternative API provider for translation and language processing tasks.

These APIs require network access to function properly. The plugin sends text to these services for processing and receives the results back. Your API keys are stored securely within your Obsidian vault and are not shared with any third parties.

## API Keys

This plugin requires you to provide your own API keys for the Google Gemini API and/or the DeepSeek API. You can obtain these keys by creating accounts on the respective platforms.

## Disclaimer

This plugin is not affiliated with or endorsed by Google or DeepSeek. The use of the Google Gemini API and DeepSeek API is subject to their respective terms of service.

## License

This plugin is licensed under the MIT License. See the `LICENSE` file for the full license text.
