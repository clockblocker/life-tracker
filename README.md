# Obsidian Backlink Filler Plugin

An Obsidian plugin that automates the process of managing backlinks in your notes, particularly designed for language learning and vocabulary management.

## Features

- **Automatic Backlink Creation**: Automatically adds backlinks to referenced files in your vault
- **Vocabulary Management**: Specifically designed to work with vocabulary notes in the "Worter" directory
- **Bidirectional Linking**: Ensures that when you reference a note, the reference is reciprocated in the target note
- **Duplicate Prevention**: Intelligently checks for existing backlinks to prevent duplicates

## Entry Format Examples

The plugin supports different templates for various parts of speech. Here are examples of how entries are structured:

### Trennbare Verben (Separable Verbs)

```markdown
📞 [[anrufen]] + Akk, [ˈanruːfn̩]
[[rief an|rief an]]  
haben [[angerufen]]

---

---
Synonyme: [[telefonieren]], [[kontaktieren]], [[anklingeln]], [[durchklingeln]], [[wählen]]
Antonyme: [[auflegen]], [[ignorieren]], [[schweigen]]

---
Übersetzung: to call (on the phone)

---
Morpheme: [[an]][[ruf]][[en]]
#Verb #Trennbar

---

| Person | Präsens | Präteritum | Imperativ | Konjunktiv I | Konjunktiv II |
| --------- | ------------------- | --------------------- | --------------------------- | --------------------- | ----------------------- |
| Ich | [[rufe an]] | [[rief an]] | - | [[rufe an]] | [[riefe an]] |
| Du | [[rufst an]] | [[riefst an]] | [[ruf an]] | [[rufest an]] | [[riefest an]] |
| Er/sie/es | [[ruft an]] | [[rief an]] | - | [[rufe an]] | [[riefe an]] |
| Wir | [[rufen an]] | [[riefen an]] | - | [[rufen an]] | [[riefen an]] |
| Ihr | [[ruft an]] | [[rieft an]] | [[ruft an]] | [[rufet an]] | [[riefet an]] |
| Sie | [[rufen an]] | [[riefen an]] | [[rufen Sie an Sie]] | [[rufen an]] | [[riefen an]] |
```

### Substantive (Nouns)

```markdown
🔵 der [[Busch]], [ˈbʊʃ]
die [[Büsche]]

---

---
Synonyme:
- [[Strauch]], [[Gebüsch]], [[Hecke]]

---
Übersetzung: bush, shrub

---
Morpheme:
[[Busch]]

---
Einzigartige mögliche Formen: [[Hauses]], [[Hause]], [[Häuser]], [[Häusern]]

---
#Substantiv #Maskulin
```

### Adjektive (Adjectives)

```markdown
[[klein]], [ˈklaɪ̯n]
nicht [[groß]]

---

---
Synonyme: [[winzig]], [[gering]], [[niedrig]], [[schmal]], [[kurz]]
Antonyme: [[groß]], [[riesig]], [[hoch]], [[weit]], [[lang]]

---
**Übersetzung**:
small, little

---
#Adjective [[klein]]

---
Morpheme:
[[klein]]

---

Einzigartige mögliche Formen: 
[[klein]], [[kleiner]], [[kleine]], [[kleines]], [[kleinen]], [[kleinem]], [[kleiner]], [[kleinen]]
[[kleiner]], [[kleinerer]], [[kleinere]], [[kleineres]], [[kleineren]], [[kleinerem]], [[kleinerer]], [[kleineren]]
[[kleinsten]], [[kleinster]], [[kleinste]], [[kleinstes]], [[kleinsten]], [[kleinstem]], [[kleinster]], [[kleinsten]]
```

## Installation

1. Open Obsidian Settings
2. Navigate to Community Plugins and disable Safe Mode
3. Click Browse and search for "Backlink Filler"
4. Install the plugin
5. Enable the plugin in your Community Plugins list

## Usage

The plugin adds a command "Add backlinks to the current file in all referenced files" that you can use to automatically create backlinks. Here's how to use it:

1. Open a note that contains references to other notes (using the `[[]]` syntax)
2. Open the command palette (Cmd/Ctrl + P)
3. Run the "Add backlinks to the current file in all referenced files" command
4. The plugin will automatically add backlinks in all referenced files

## Configuration

Currently, the plugin works with files in the "Worter" directory. Make sure your vocabulary notes are stored in this location.

## Development

If you want to contribute to the development:

1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start compilation in watch mode
4. Copy the `main.js`, `manifest.json`, and `styles.css` to your Obsidian plugins folder

## Requirements

- Obsidian v1.0.0 or higher
- Files should be organized with vocabulary notes in the "Worter" directory

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have suggestions for improvements, please file an issue on the GitHub repository.
