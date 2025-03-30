export const BlockTitle = {
    Formen: "Formen",
    Kontexte: "Kontexte",
    Synonyme: "Synonyme",
    Morpheme: "Morpheme",
    Translations: "Translations",
    Related: "Related",
    Flexion: "Flexion",
    Grammatik: "Grammatik",
    Tags: "Tags"
}

export const ReprFromBlockTitle = {
    [BlockTitle.Formen]: "Formen",
    [BlockTitle.Kontexte]: "Deine Kontexte",
    [BlockTitle.Synonyme]: "Semantische Beziehungen",
    [BlockTitle.Morpheme]: "Morpheme",
    [BlockTitle.Translations]: "Übersetzung",
    [BlockTitle.Related]: "Verweise",
    [BlockTitle.Flexion]: "Flexion",
    [BlockTitle.Grammatik]: "Grammatik",
    [BlockTitle.Tags]: "Tags",
};

export const WeightsFromBlockTitle = {
    [BlockTitle.Formen]: 0,
    [BlockTitle.Kontexte]: 10,
    [BlockTitle.Synonyme]: 20,
    [BlockTitle.Morpheme]: 30,
    [BlockTitle.Translations]: 40,
    [BlockTitle.Related]: 50,
    [BlockTitle.Flexion]: 60,
    [BlockTitle.Grammatik]: 70,
    [BlockTitle.Tags]: 100,
};

export const cssClassNameFromBlockTitle = {
    [BlockTitle.Formen]: "block_title_formen",
    [BlockTitle.Kontexte]: "block_title_kontexte",
    [BlockTitle.Synonyme]: "block_title_synonyme",
    [BlockTitle.Morpheme]: "block_title_morpheme",
    [BlockTitle.Translations]: "block_title_translations",
    [BlockTitle.Related]: "block_title_related",
    [BlockTitle.Flexion]: "block_title_flexion",
    [BlockTitle.Grammatik]: "block_title_grammatik",
    [BlockTitle.Tags]: "block_title_tags",
};

export const blockTitleClass = "block_title"

export const elementStringFromBlockTitle = {
    [BlockTitle.Formen]: `<span class="${blockTitleClass} ${cssClassNameFromBlockTitle[BlockTitle.Formen]}">${ReprFromBlockTitle[BlockTitle.Formen]}</span>`,
    [BlockTitle.Kontexte]: `<span class="${blockTitleClass} ${cssClassNameFromBlockTitle[BlockTitle.Kontexte]}">${ReprFromBlockTitle[BlockTitle.Kontexte]}</span>`,
    [BlockTitle.Synonyme]: `<span class="${blockTitleClass} ${cssClassNameFromBlockTitle[BlockTitle.Synonyme]}">${ReprFromBlockTitle[BlockTitle.Synonyme]}</span>`,
    [BlockTitle.Morpheme]: `<span class="${blockTitleClass} ${cssClassNameFromBlockTitle[BlockTitle.Morpheme]}">${ReprFromBlockTitle[BlockTitle.Morpheme]}</span>`,
    [BlockTitle.Translations]: `<span class="${blockTitleClass} ${cssClassNameFromBlockTitle[BlockTitle.Translations]}">${ReprFromBlockTitle[BlockTitle.Translations]}</span>`,
    [BlockTitle.Related]: `<span class="${blockTitleClass} ${cssClassNameFromBlockTitle[BlockTitle.Related]}">${ReprFromBlockTitle[BlockTitle.Related]}</span>`,
    [BlockTitle.Flexion]: `<span class="${blockTitleClass} ${cssClassNameFromBlockTitle[BlockTitle.Flexion]}">${ReprFromBlockTitle[BlockTitle.Flexion]}</span>`,
    [BlockTitle.Grammatik]: `<span class="${blockTitleClass} ${cssClassNameFromBlockTitle[BlockTitle.Grammatik]}">${ReprFromBlockTitle[BlockTitle.Grammatik]}</span>`,
    [BlockTitle.Tags]: `<span class="${blockTitleClass} ${cssClassNameFromBlockTitle[BlockTitle.Tags]}">${ReprFromBlockTitle[BlockTitle.Tags]}</span>`,
};

export const BlockDelimeter = `
---`

const MeningfullBlockTitlesForEveryone = [BlockTitle.Formen, BlockTitle.Kontexte];
const TechnikalBlockTitlesForEveryone = [BlockTitle.Related, BlockTitle.Tags];
const BlockTitlesForFlexers = [BlockTitle.Synonyme, BlockTitle.Morpheme, BlockTitle.Translations, BlockTitle.Flexion];
export const BlockTitlesFromWortart = {
    Nomen: [...MeningfullBlockTitlesForEveryone, ...BlockTitlesForFlexers, ...TechnikalBlockTitlesForEveryone],
    Pronomen: [...MeningfullBlockTitlesForEveryone, ...BlockTitlesForFlexers, ...TechnikalBlockTitlesForEveryone],
    Verb: [...MeningfullBlockTitlesForEveryone, ...BlockTitlesForFlexers, ...TechnikalBlockTitlesForEveryone],
    Adjektiv: [...MeningfullBlockTitlesForEveryone, ...BlockTitlesForFlexers, ...TechnikalBlockTitlesForEveryone],
    Numerale: [...MeningfullBlockTitlesForEveryone, ...BlockTitlesForFlexers, ...TechnikalBlockTitlesForEveryone],
    
    Artikel: [...MeningfullBlockTitlesForEveryone, BlockTitle.Grammatik, ...TechnikalBlockTitlesForEveryone],
    Partikel: [...MeningfullBlockTitlesForEveryone, BlockTitle.Grammatik, ...TechnikalBlockTitlesForEveryone],
    Praeposition: [...MeningfullBlockTitlesForEveryone, BlockTitle.Grammatik, ...TechnikalBlockTitlesForEveryone],
    Konjunktion: [...MeningfullBlockTitlesForEveryone, BlockTitle.Grammatik, ...TechnikalBlockTitlesForEveryone],
    
    Adverb: [...MeningfullBlockTitlesForEveryone, ...TechnikalBlockTitlesForEveryone],
    Redewendung: [...MeningfullBlockTitlesForEveryone, ...TechnikalBlockTitlesForEveryone],
    Interjektion: [...MeningfullBlockTitlesForEveryone, ...TechnikalBlockTitlesForEveryone],

    Unbekannt: [...TechnikalBlockTitlesForEveryone],
    Morphem: [...TechnikalBlockTitlesForEveryone],
    Praefix: [...TechnikalBlockTitlesForEveryone],
};

export const noteExample = `
<span class="block_title block_title_formen">Formen</span>
🏭 🟢 das [[Kohlekraftwerk]], [ˈkoːləˌkraftvɛɐ̯k ♫](https://youglish.com/pronounce/Kohlekraftwerk/german)

----
<span class="block_title block_title_kontexte">Deine Kontexte</span>
*[[Atom#^7|^]]* Polen will weg von der Kohle. Noch 2024 wurde weit über die [[Hälfte]] des polnischen Stroms durch [[Kohlekraftwerke]] [[erzeugt]] – mit fatalen Folgen für Klima und Umwelt. ^7


*[[Atom#^13|^]]* Wenn sie die [[Kohlekraftwerke]] [[abschalten]], womit werden wir dann heizen? Wir haben kleine Kinder, also sind wir [[dagegen]]. ^13


---
<span class="block_title block_title_synonyme" Beziehungen>Semantische Beziehungen</span>
= [[Kraftwerk]], [[Stromerzeugungsanlage]], [[Stromerzeugungsanlage]]
≈ [[Industrieanlage]], [[Fabrik]]
≠ [[Windrad]], [[Solaranlage]]

---
<span class="block_title block_title_morpheme">Morpheme</span>
[[Kohle]]|[[kraft]]|[[werk]]|[[e]]
[[Kohle]] + [[Kraftwerke]]

---
<span class="block_title block_title_translations">Übersetzung</span>
coal-fired power plant | 
угольная электростанция | 

---
<span class="block_title block_title_related">Verweise</span>
[[Kohle]], [[Kraftwerk]]

---
<span class="block_title block_title_flexion">Flexion</span>
N: das [[Kohlekraftwerk]], die [[Kohlekraftwerke]]  
A: das [[Kohlekraftwerk]], die [[Kohlekraftwerke]]  
G: des [[Kohlekraftwerkes]], der [[Kohlekraftwerke]]  
D: dem [[Kohlekraftwerk]], den [[Kohlekraftwerken]]

---
<span class="block_title block_title_tags">Tags</span>
#Ablaut  #Ableitung  #Abtönung 
`