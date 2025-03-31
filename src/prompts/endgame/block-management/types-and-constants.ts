import { z } from 'zod';

const blockIds = [
	'Formen',
	'Kontexte',
	'Synonyme',
	'Morpheme',
	'Translations',
	'Related',
	'Flexion',
	'Grammatik',
	'Tags',
] as const;
// Assume these constants are defined elsewhere in your code:
const BlockIdSchema = z.enum(blockIds);

export type BlockId = z.infer<typeof BlockIdSchema>;
export const BlockId = BlockIdSchema.Enum;
export const ALL_BLOCK_IDS = [...blockIds] as BlockId[];

export const cssClassNameFromBlockId: Record<BlockId, string> = {
	[BlockId.Formen]: 'block_title_formen',
	[BlockId.Kontexte]: 'block_title_kontexte',
	[BlockId.Synonyme]: 'block_title_synonyme',
	[BlockId.Morpheme]: 'block_title_morpheme',
	[BlockId.Translations]: 'block_title_translations',
	[BlockId.Related]: 'block_title_related',
	[BlockId.Flexion]: 'block_title_flexion',
	[BlockId.Grammatik]: 'block_title_grammatik',
	[BlockId.Tags]: 'block_title_tags',
};

export const deBlockTitleFromBlockId: Record<BlockId, string> = {
	[BlockId.Formen]: 'Formen',
	[BlockId.Kontexte]: 'Kontexte',
	[BlockId.Synonyme]: 'Beziehungen',
	[BlockId.Morpheme]: 'Morpheme',
	[BlockId.Translations]: 'Übersetzung',
	[BlockId.Related]: 'Verweise',
	[BlockId.Flexion]: 'Flexion',
	[BlockId.Grammatik]: 'Grammatik',
	[BlockId.Tags]: 'Tags',
};

export const NEW_LINE = '\n';

export const preDelimeterSpacingFromBlockId: Record<BlockId, string> = {
	[BlockId.Formen]: NEW_LINE,
	[BlockId.Kontexte]: `${NEW_LINE + NEW_LINE}`,
	[BlockId.Synonyme]: NEW_LINE,
	[BlockId.Morpheme]: NEW_LINE,
	[BlockId.Translations]: NEW_LINE,
	[BlockId.Related]: NEW_LINE,
	[BlockId.Flexion]: NEW_LINE,
	[BlockId.Grammatik]: NEW_LINE,
	[BlockId.Tags]: NEW_LINE,
};

export const weightFromBlockId: Record<BlockId, number> = {
	[BlockId.Formen]: 0,
	[BlockId.Kontexte]: 1,
	[BlockId.Synonyme]: 10,
	[BlockId.Morpheme]: 20,
	[BlockId.Translations]: 30,
	[BlockId.Related]: 40,
	[BlockId.Flexion]: 50,
	[BlockId.Grammatik]: 60,
	[BlockId.Tags]: 100,
};

export const blockHeaderElementFromBlockId: Record<BlockId, string> = {
	[BlockId.Formen]: `<span class="block_title ${cssClassNameFromBlockId[BlockId.Formen]}">${deBlockTitleFromBlockId[BlockId.Formen]}</span>`,
	[BlockId.Kontexte]: `<span class="block_title ${cssClassNameFromBlockId[BlockId.Kontexte]}">${deBlockTitleFromBlockId[BlockId.Kontexte]}</span>`,
	[BlockId.Synonyme]: `<span class="block_title ${cssClassNameFromBlockId[BlockId.Synonyme]}">${deBlockTitleFromBlockId[BlockId.Synonyme]}</span>`,
	[BlockId.Morpheme]: `<span class="block_title ${cssClassNameFromBlockId[BlockId.Morpheme]}">${deBlockTitleFromBlockId[BlockId.Morpheme]}</span>`,
	[BlockId.Translations]: `<span class="block_title ${cssClassNameFromBlockId[BlockId.Translations]}">${deBlockTitleFromBlockId[BlockId.Translations]}</span>`,
	[BlockId.Related]: `<span class="block_title ${cssClassNameFromBlockId[BlockId.Related]}">${deBlockTitleFromBlockId[BlockId.Related]}</span>`,
	[BlockId.Flexion]: `<span class="block_title ${cssClassNameFromBlockId[BlockId.Flexion]}">${deBlockTitleFromBlockId[BlockId.Flexion]}</span>`,
	[BlockId.Grammatik]: `<span class="block_title ${cssClassNameFromBlockId[BlockId.Grammatik]}">${deBlockTitleFromBlockId[BlockId.Grammatik]}</span>`,
	[BlockId.Tags]: `<span class="block_title ${cssClassNameFromBlockId[BlockId.Tags]}">${deBlockTitleFromBlockId[BlockId.Tags]}</span>`,
};

export const BLOCK_DELIMETER = '---' as const;
export type BlockContent = string;
export type BlockHeaderElement = string;
export type BlockPreDelimeterSpacing = string;

export type BlockStructure = {
	headerElement: BlockHeaderElement;
	content: BlockContent;
	preDelimeterSpacing: BlockPreDelimeterSpacing;
	delimeter: typeof BLOCK_DELIMETER;
};

export type BlockRepr = string;
export type FileContent = string;
export type ContentFromBlockId = Record<BlockId, BlockStructure['content']>;

export const reprFromBlockSchema = z.record(BlockIdSchema, z.string());

// ---
const meningfullBlockIdsSet = new Set([BlockId.Formen, BlockId.Kontexte]);
const blockIdForFlexersSet = new Set([
	BlockId.Synonyme,
	BlockId.Morpheme,
	BlockId.Translations,
	BlockId.Flexion,
]);

export const SET_OF_REQUIRED_TECHNIKAL_BLOCK_IDS = new Set([
	BlockId.Related,
	BlockId.Tags,
]);

export const RequiredSetOfBlockIdsFromWortart = {
	Nomen: new Set([
		...meningfullBlockIdsSet,
		...blockIdForFlexersSet,
		...SET_OF_REQUIRED_TECHNIKAL_BLOCK_IDS,
	]),
	Pronomen: new Set([
		...meningfullBlockIdsSet,
		...blockIdForFlexersSet,
		...SET_OF_REQUIRED_TECHNIKAL_BLOCK_IDS,
	]),
	Verb: new Set([
		...meningfullBlockIdsSet,
		...blockIdForFlexersSet,
		...SET_OF_REQUIRED_TECHNIKAL_BLOCK_IDS,
	]),
	Adjektiv: new Set([
		...meningfullBlockIdsSet,
		...blockIdForFlexersSet,
		...SET_OF_REQUIRED_TECHNIKAL_BLOCK_IDS,
	]),
	Numerale: new Set([
		...meningfullBlockIdsSet,
		...blockIdForFlexersSet,
		...SET_OF_REQUIRED_TECHNIKAL_BLOCK_IDS,
	]),

	Artikel: new Set([
		...meningfullBlockIdsSet,
		BlockId.Grammatik,
		...SET_OF_REQUIRED_TECHNIKAL_BLOCK_IDS,
	]),
	Partikel: new Set([
		...meningfullBlockIdsSet,
		BlockId.Grammatik,
		...SET_OF_REQUIRED_TECHNIKAL_BLOCK_IDS,
	]),
	Praeposition: new Set([
		...meningfullBlockIdsSet,
		BlockId.Grammatik,
		...SET_OF_REQUIRED_TECHNIKAL_BLOCK_IDS,
	]),
	Konjunktion: new Set([
		...meningfullBlockIdsSet,
		BlockId.Grammatik,
		...SET_OF_REQUIRED_TECHNIKAL_BLOCK_IDS,
	]),

	Adverb: new Set([
		...meningfullBlockIdsSet,
		...SET_OF_REQUIRED_TECHNIKAL_BLOCK_IDS,
	]),
	Redewendung: new Set([
		...meningfullBlockIdsSet,
		...SET_OF_REQUIRED_TECHNIKAL_BLOCK_IDS,
	]),
	Interjektion: new Set([
		...meningfullBlockIdsSet,
		...SET_OF_REQUIRED_TECHNIKAL_BLOCK_IDS,
	]),

	Unbekannt: new Set([...SET_OF_REQUIRED_TECHNIKAL_BLOCK_IDS]),
	Morphem: new Set([...SET_OF_REQUIRED_TECHNIKAL_BLOCK_IDS]),
	Praefix: new Set([...SET_OF_REQUIRED_TECHNIKAL_BLOCK_IDS]),
};

// ---

export const noteExample = `
<span class="block_title block_title_formen">Formen</span>
🏭 🟢 das [[Kohlekraftwerk]], [ˈkoːləˌkraftvɛɐ̯k ♫](https://youglish.com/pronounce/Kohlekraftwerk/german)

----
<span class="block_title block_title_kontexte">Deine Kontexte</span>
*[[Atom#^7|^]]* Polen will weg von der Kohle. Noch 2024 wurde weit über die [[Hälfte]] des polnischen Stroms durch [[Kohlekraftwerke]] [[erzeugt]] – mit fatalen Folgen für Klima und Umwelt. ^7


*[[Atom#^13|^]]* Wenn sie die [[Kohlekraftwerke]] [[abschalten]], womit werden wir dann heizen? Wir haben kleine Kinder, also sind wir [[dagegen]]. ^13


---
<span class="block_title block_title_synonyme">Semantische Beziehungen</span>
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
`;
