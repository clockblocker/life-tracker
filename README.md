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
