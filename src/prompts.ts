export const prompts = {
    generate_dictionary_entry: `You are the expert-linguist in German language. You will be given a german word, your task is to write for it a dictionary entry in a specific format. The comments in <...> are for you and are not part of the template.

For Trennbar verb use:

<example>
<pick appropriate emoji for this word>[[anrufen]] + Akk, [ˈanruːfn̩]
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
 #Verb  #Trennbar
 

| Person | Präsens | Präteritum | Imperativ | Konjunktiv I | Konjunktiv II |
| --------- | ------------------- | --------------------- | --------------------------- | --------------------- | ----------------------- |
| Ich | [[rufe an]] | [[rief an]] | - | [[rufe an]] | [[riefe an]] |
| Du | [[rufst an]] | [[riefst an]] | [[ruf an]] | [[rufest an]] | [[riefest an]] |
| Er/sie/es | [[ruft an]] | [[rief an]] | - | [[rufe an]] | [[riefe an]] |
| Wir | [[rufen an]] | [[riefen an]] | - | [[rufen an]] | [[riefen an]] |
| Ihr | [[ruft an]] | [[rieft an]] | [[ruft an]] | [[rufet an]] | [[riefet an]] |
| Sie | [[rufen an]] | [[riefen an]] | [[rufen Sie an]] | [[rufen an]] | [[riefen an]] |

Partizip I: [[anrufend]], 
Partizip II: [[angerufen]]
Zu+infinifive: [[anzurufen]]

[[anrufen]] - [[an]] = [[rufen]]

for non-prefixed verbs use:
<example>
🌿 [[pflegen]] + Akk, [ˈpfleːɡən]
[[pflegte]]
haben [[gepflegt]]

---


---
Synonyme: [[betreuen]], [[versorgen]], [[kümmern]], [[umsorgen]], [[behandeln]]
Antonyme: [[vernachlässigen]], [[ignorieren]], [[missachten]]

---
Übersetzung: to care for, to nurse, to maintain

---
Morpheme: [[pfleg]][[en]]
 #Verb  #Untrennbar

---

| Person    | Präsens              | Präteritum            | Imperativ         | Konjunktiv I           | Konjunktiv II           |
| --------- | -------------------- | --------------------- | ----------------- | ---------------------- | ----------------------- |
| Ich       | [[pflege]]           | [[pflegte]]           | -                 | [[pflege]]             | [[pflegte]]             |
| Du        | [[pflegst]]          | [[pflegtest]]         | [[pflege]]        | [[pflegest]]           | [[pflegtest]]           |
| Er/sie/es | [[pflegt]]           | [[pflegte]]           | -                 | [[pflege]]             | [[pflegte]]             |
| Wir       | [[pflegen]]          | [[pflegten]]          | -                 | [[pflegen]]            | [[pflegten]]            |
| Ihr       | [[pflegt]]           | [[pflegtet]]          | [[pflegt]]        | [[pfleget]]            | [[pflegtet]]            |
| Sie       | [[pflegen]]          | [[pflegten]]          | [[pflegen Sie]]   | [[pflegen]]            | [[pflegten]]            |

Partizip I: [[pflegend]], 
Partizip II: [[gepflegt]]
| Form       | Positive            | Comparative             | Superlative              |
| ---------- | ------------------- | ----------------------- | ------------------------ |
| Nominative | [[gepflegt]]        | [[gepflegter]]          | [[gepflegtester]]        |
| Accusative | [[gepflegten]]      | [[gepflegteren]]        | [[gepflegtesten]]        |
| Genitive   | [[gepflegter]]      | [[gepflegterer]]        | [[gepflegtester]]        |
| Dative     | [[gepflegtem]]      | [[gepflegterem]]        | [[gepflegtestem]]        |
| Feminine   | [[gepflegte]]       | [[gepflegtere]]         | [[gepflegteste]]         |
| Neuter     | [[gepflegtes]]      | [[gepflegteres]]        | [[gepflegtestes]]        |
| Plural     | [[gepflegten]]      | [[gepflegteren]]        | [[gepflegtesten]]        |


For Untrennbares verbs and verbs without prefixis, use: 
<example>
<pick appropriate emoji for this word>[[bekommen]] + Akk, [bəˈkɔmən]
[[bekam]]
haben [[bekommen]]

---

---
Synonyme: [[erhalten]], [[empfangen]], [[kriegen]], [[erlangen]], [[erreichen]]
Antonyme: [[geben]], [[verlieren]], [[abgeben]]


---
Übersetzung: to get, to receive


---
Morpheme: [[be]][[komm]][[en]]
 #Verb  #Untrennbar

---

| Person    | Präsens              | Präteritum            | Imperativ         | Konjunktiv I           | Konjunktiv II           |
| --------- | -------------------- | --------------------- | ----------------- | ---------------------- | ----------------------- |
| Ich       | [[bekomme]]          | [[bekam]]             | -                 | [[bekomme]]            | [[bekäme]]              |
| Du        | [[bekommst]]         | [[bekamst]]           | [[bekomm]]        | [[bekommest]]          | [[bekämest]]            |
| Er/sie/es | [[bekommt]]          | [[bekam]]             | -                 | [[bekomme]]            | [[bekäme]]              |
| Wir       | [[bekommen]]         | [[bekamen]]           | -                 | [[bekommen]]           | [[bekämen]]             |
| Ihr       | [[bekommt]]          | [[bekamt]]            | [[bekommt]]       | [[bekommet]]           | [[bekämet]]             |
| Sie       | [[bekommen]]         | [[bekamen]]           | [[bekommen Sie]]  | [[bekommen]]           | [[bekämen]]             |

Partizip I: [[bekommend]], 
Partizip II: [[bekommen]], 
Zu infinitive: [[zubekommen]]

[[bekommen]] - [[be]] = [[kommen]]
</example>

For adjectives use:

<example>
klein, [ˈklaɪ̯n]
nicht [[groß]]

---


---
Synonyme: [[winzig]], [[gering]], [[minimal]], [[unbedeutend]], [[bescheiden]]
Antonyme: [[groß]], [[riesig]], [[hoch]], [[weit]], [[lang]]

---
**Übersetzung**:
small, little

---
#Adjective [[klein]]


Einzigartige mögliche Formen: 
| Form       | Positive           | Comparative          | Superlative          |
| ---------- | ------------------ | -------------------- | -------------------- |
| Nominative | [[klein]]          | [[kleiner]]          | [[kleinster]]        |
| Accusative | [[kleinen]]        | [[kleineren]]        | [[kleinsten]]        |
| Genitive   | [[kleiner]]        | [[kleinerer]]        | [[kleinster]]        |
| Dative     | [[kleinem]]        | [[kleinerem]]        | [[kleinstem]]        |
| Feminine   | [[kleine]]         | [[kleinere]]         | [[kleinste]]         |
| Neuter     | [[kleines]]        | [[kleineres]]        | [[kleinstes]]        |
| Plural     | [[kleinen]]        | [[kleineren]]        | [[kleinsten]]        |
</example>

For nouns, use the template below. For feminin words, use 🔴, for neutral use 🟢, for Maskulin use 🔵
<example>
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
Einzigartige mögliche Formen: 

| Case        | Singular ([[Busch]]) | Plural ([[Büsche]]) |
| ----------- | --------------------- | ------------------- |
| Nominative  | der [[Busch]]         | die [[Büsche]]      |
| Accusative  | den [[Busch]]         | die [[Büsche]]      |
| Genitive    | des [[Busches]]       | der [[Büsche]]      |
| Dative      | dem [[Busch]]         | den [[Büschen]]     |

---
#Substantiv #Maskulin
</example>

for other parts of speech, come up with a simmilar template and fill it in.

Make shure that you are filling the template for the identified part of speech. 
Do not add any text that is not in the template.`,

    determine_infinitive_and_pick_emoji: `Given a german word, determine its infinitive form and pick an appropriate emoji to represent it. If the word is a noun, determin it's gender and use 🔵 for der,  🔴 for die, if 🟢 for das. Do not write anything else, just the infinitive and an emoji. given "brutzelt"   "🍳[[brutzeln]]". Given "gesorgt" reply with "🤔 [[sorgen]]". Given "Hoffnungen" reply with "🤞 🔴 die [[Hoffnung]]. Given "eisigen", reply with "🥶 [[eisig]]. I a word can be a form of multiple parts of speach, list all options, separated with |. For expample, given "vergangene", reply with "🕰️, [[vergangen]] | 🕰️, [[vergehen]]. Given "Nieser", reply with "🤧 [[niesen]] | 🔵 🤧 der [[Nieser]]. Gigen "klares", reply with "😌 [[klären]] | 😌 [[klar]] | 😌 🟢 das [[Klare]]"`,
    make_brackets: `Process the given German text and generate output following these rules:

For verbs:
a. If the verb is in its basic form (infinitive), enclose it in double square brackets: [[infinitive]]
b. If the verb is not in its basic form, use this format: [[infinitive|encountered form]]
b. If the verb is trenbarren, add the prefix to the infinitive: [[prefixed infinitive|encountered form]]
For nouns:
a. If the noun is singular, enclose it in double square brackets: [[singular form]]
b. If the noun is plural, use this format: [[singular form|plural form]]
For adjectives:
a. If the adjective is in its basic form, enclose it in double square brackets: [[basic form]]
b. If the adjective is not in its basic form, use this format: [[basic form|encountered form]]
Ignore haben/sein, articles (definite and indefinite), names, proper nouns and pronomen

<example>
Der fleißige Student fängt an, das schwierige Buch zu lesen, das sein Lehrer empfohlen hat.
Der [[fleißig|fleißige]] [[Student]] [[anfangen|fängt]] an, das [[schwierig|schwierige]] [[Buch]] zu [[lesen]], das sein [[Lehrer]] [[empfehlen|empfohlen]] hat.
</example>

<example>
(Schubst Sokka weg) Genau, er ist bestimmt ein Spion der Feuermarine! Das sieht man schon an dem furchtbar bösen Blick in seinen Augen!
([[wegschubsen|Schubst]] [[schubsen|Sokka]] weg) Genau, er ist [[bestimmt]] ein [[Spion]] der [[Feuermarine]]! Das [[sehen|sieht]] man [[schon]] an dem [[furchtbar|furchtbare]] [[böse|bösen]] [[Blick]] in seinen [[Auge|Augen]]!
</example>

<example>
Keine Angst. Mit Wasser kriegt man das wieder ab. Und, wohnt ihr hier in der Gegend?
Keine [[Angst]]. Mit [[Wasser]] [[abkriegen|kriegt]] man das wieder ab. Und, [[wohnen|wohnt]] ihr hier in der [[Gegend]]?
</example>

<example>
und riß ihnen die Flügel aus.  
und [[ausreißen|riß]] ihnen die [[Flügel]] aus.
</example>

<example>
Er schlug die Stühl und Vögel tot,  
Er [[totschlagen|schlug]] die [[Stuhl|Stühl]] und [[Vogel|Vögel]] tot,
<example>
</example>

<example>
So hab ich mich schon früh gezwungen  
So hab ich mich [[schon]] [[früh]] [[zwingen|gezwungen]]
<example>


The output should only contain the processed text, without explanations or additional content. Ensure grammatical accuracy in the final output.
`,

    translate_text: `Translate the given German text to English. The translation should be staying true to the original meaning. When possible, mimic german sentance structure. Only provide the translation, no explanations or additional content.

<example>
input:
Der fleißige Student fängt an, das schwierige Buch zu lesen.
output:
The diligent student begins the difficult book to read.
</example>

<example>
input:
Keine Angst. Mit Wasser kriegt man das wieder ab.
output:
No worry. With water can one wash it off.
</example>`,
};
