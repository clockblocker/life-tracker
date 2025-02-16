export const prompts = {
generate_dictionary_entry: `You are an expert linguist specializing in the German language. Your task is to create a detailed dictionary entry for a given German word. Here's the word you need to analyze:
<german_word>
{{german_word}}
</german_word>

Before creating the entry, analyze the word and plan your approach. Break down the word inside <word_breakdown> tags:

1. Identify the part of speech of the word.
2. If it's a verb:
- Determine if it's trennbar (separable) or untrennbar (inseparable).
- Identify its tense forms (present, past, perfect).
- Note any irregular conjugations. -Fill the list of cojugations (Präsens, Präteritum, Imperativ, Konjunktiv I, Konjunktiv II) 
3. For nouns:
- Identify the gender (masculine, feminine, or neuter).
- Determine the declension pattern.
4. For adjectives:
- Note the comparative and superlative forms.
5. Identify and list examples of each morpheme in the word.
6. Plan which template you'll use based on the part of speech.
7. List the key information you'll need to include in the entry (e.g., pronunciation, conjugations, synonyms, antonyms, translations, morphemes).

It's OK for this section to be quite long.

Now, create the dictionary entry using the appropriate template based on your analysis. Strictly adhere to the format provided in the examples, ensuring no additional text is included that isn't present in the templates. Use the following guidelines:

1. For trennbar verbs:
- Start with an appropriate emoji
- Include pronunciation, conjugations, synonyms, antonyms, English and Russian translations, morpheme breakdown, and a conjugation table

2. For untrennbar verbs and verbs without prefixes:
- Follow a similar format to trennbar verbs, adjusting the conjugation details as needed

3. For adjectives:
- Start with an appropriate emoji
- Include pronunciation, antonyms, synonyms, English and Russian translations, and unique possible forms

4. For nouns:
- Use 🔴 for feminine, 🟢 for neuter, and 🔵 for masculine nouns
- Include plural form, synonyms, English and Russian translations, morpheme breakdown, and unique possible forms

5. For other parts of speech:
- Create a similar template, adapting the information as appropriate for the specific part of speech

Present only your final entry. Do not present the user with word_breakdown. Do not write to the user your thought process.
<examples>
<example>
<german_word>
verfeinden
</german_word>
<ideal_output>
😤 [[verfeinden]], [fɛɐ̯ˈfaɪ̯ndn̩] | [[verfeindete]], haben [[verfeindet]]

---


---
= [[zerstreiten]], [[entzweien]]
≈ Feindschaft  [[schließen]], [[verkrachen]], in Konflikt [[geraten]]
≠ [[versöhnen]], [[vertragen]], [[anfreunden]]

---
to make enemies, to set at odds
поссорить, сделать врагами

---
[[ver]]|[[fein]]|[den]]

---
ich: [[verfeinde]], [[verfeindete]], –, [[verfeinde]], [[verfeindete]]
du: [[verfeindest]], [[verfeindetest]], [[verfeinde]] | [[verfeind]] | [[verfeinde]], [[verfeindest]], [[verfeindetest]]
er/sie/es: [[verfeindet]], [[verfeindete]], –, [[verfeinde]], [[verfeindete]]
wir: [[verfeinden]], [[verfeindeten]], [[verfeinden wir|verfeinden]], [[verfeinden]], [[verfeindeten]]
ihr: [[verfeindet]], [[verfeindetet]], [[verfeindet]], [[verfeindet]], [[verfeindetet]] 

PI: [[verfeindend]], PII: [[verfeindet]], Zu+inf: [[zuverfeinden]]

---
[[verfeinden]] - [[ver]] = [[feinden]] / to make enemies, to set at odds

---
[[Verfehndung]], [[Verfeindung]], [[Feind]], [[feindlich]], [[Feindschaft]]

</ideal_output>
</example>

<example>
<german_word>
tanztest
</german_word>
<ideal_output>
💃 [[tanzen]], [ˈtanʦn̩] | [[tanzte]], haben [[getanzt]]

---

---
= [[sich bewegen]], [[schwofen]], [[abhotten]]
≈ [[wiegen]], [[sich drehen]], [[hüpfen]], [[ballettieren]]
≠ [[sitzen]], [[stehen]], [[verharren]], [[ruhen]]

---
to dance
танцевать

---
[[tanz]]|[[en]]

---
ich: [[tanze]], [[tanzte]], –, [[tanze]], [[tanzte]]
du: [[tanzt]], [[tanzt]], [[tanze]] | [[tanz]], [[tanzt]], [[tanztest]]
er/sie/es: [[tanzt]], [[tanzte]], –, [[tanze]], [[tanzte]]
wir: [[tanzen]], [[tanzten]], [[tanzen wir|tanzen]], [[tanzen]], [[tanzten]]
ihr: [[tanzt]], [[tanztet]], [[tanzt]], [[tanzt]], [[tanztet]]

PI: [[tanzend]], PII: [[getanzt]], Zu+inf: [[zu tanzen]]

---

---
[[Tanz]], [[Tänzer]], [[Tänzerin]], [[Tanzfläche]], [[tanzerisch]], [[Tanzkurs]]
</ideal_output>
</example>

<example>
<german_word>
Hoffnung
</german_word>
<ideal_output>
🔴 🕊️ die [[Hoffnung]], [ˈhɔfnʊŋ]
die [[Hoffnungen]]

---


---
= [[Zuversicht]], [[Optimismus]]
≈ [[Erwartung]], [[Vertrauen]], [[Glaube]], [[Wunsch]]
≠ [[Verzweiflung]], [[Pessimismus]], [[Hoffnungslosigkeit]], [[Resignation]]

---
hope
надежда

---
[[Hoff]]|[[nung]]

---
N: die [[Hoffnung]], die [[Hoffnungen]]  
A: die [[Hoffnung]], die [[Hoffnungen]]  
G: der [[Hoffnung]], der [[Hoffnungen]]  
D: der [[Hoffnung]], den [[Hoffnungen]]  

---
[[hoffen]], [[hoffentlich]], [[hoffnungsvoll]], [[hoffnungslos]]
</ideal_output>
</example>

<example>
<german_word>
Busch
</german_word>
<ideal_output>
🔵 🌳 der [[Busch]]
die [[B\\xFCsche]]

---


---
= [[Strauch]], [[Gesträuch]]
≈ [[Gebüsch]], [[Hecke]], [[Gehölz]]
≠ [[Baum]], [[Wiese]], [[Ackerland]], [[Ödland]]

---
bush, shrub
куст

---
[[Busch]]

---
N: der [[Busch]], die [[Büsche]]  
A: den [[Busch]], die [[Büsche]]  
G: des [[Busches]], der [[Büsche]]  
D: dem [[Busch]], den [[Büschen]] 

---
buschig, buschieren
</ideal_output>
</example>

<example>
<german_word>
klein
</german_word>
<ideal_output>
🐭 [[klein]], [\\u02C8kla\\u026A\\u032Fn] ≠ [[gro\\xDF]]

---


---
= [[kompakt]], [[winzig]], [[gering]]
≈ [[niedrig]], [[schmal]], [[zierlich]], [[zart]], [[begrenzt]]
≠ [[groß]], [[riesig]], [[weit]], [[breit]]

---
small, little
маленький

---
[[klein]]

---
N: [[klein]], [[kleiner]], [[kleinster]]  
A: [[kleinen]], [[kleineren]], [[kleinsten]]  
G: [[kleiner]], [[kleinerer]], [[kleinster]]  
D: [[kleinem]], [[kleinerem]], [[kleinstem]]  
F: [[kleine]], [[kleinere]], [[kleinste]]  
N: [[kleines]], [[kleineres]], [[kleinstes]]  
P: [[kleinen]], [[kleineren]], [[kleinsten]]  

---
[[Kleinheit]], [[kleinlich]], [[kleinmachen]]
</ideal_output>
</example>
<example>
<german_word>
anzurufen
</german_word>
<ideal_output>
📞 [[anrufen]], [ˈanʦuˌʁuːfən] | [[rief an]], haben [[angerufen]]

---


---
= [[telefonieren]], [[kontaktieren]], [[anklingeln]]
≈ [[sich melden]], [[Kontakt aufnehmen]], [[durchklingeln]]
≠ [[ignorieren]], [[ablehnen]], [[auflegen]], [[beenden]]

---
to call, to phone
звонить 

---
[[an]]|[[ru]]|[[fen]]

---
ich: [[rufe an]], [[rief an]], –, [[rufe an]], [[riefe an]]
du: [[rufst an]], [[riefst an]], [[rufe an]] | [[ruf an]], [[rufest an]], [[riefest an]]
er/sie/es: [[ruft an]], [[rief an]], –, [[rufe an]], [[riefe an]]
wir: [[rufen an]], [[riefen an]], [[rufen wir an|rufen an]], [[rufen an]], [[riefen an]]
ihr: [[ruft an]], [[rieft an]], [[ruft an]], [[rufet an]], [[riefet an]]

PI: [[anrufend]], PII: [[angerufen]], Zu+inf: [[anzurufen]]

---
[[anrufen]] - [[an]] = [[rufen]] / to call, to phone

---
[[Anruf]], [[Anrufer]], [[Anruferin]], [[anrufbar]], [[Anrufbeantworter]]
</ideal_output>
</example>
<example>
<german_word>
ständigen
</german_word>
<ideal_output>
🕰️ [[ständig]], [ˈʃtɛndɪç] ≠ [[selten]]

---


---
= [[fortwährend]], [[dauerhaft]], [[andauernd]]
≈ [[permanent]], [[kontinuierlich]], [[beständig]], [[ununterbrochen]], [[pausenlos]]
≠ [[selten]], [[gelegentlich]], [[unregelmäßig]], [[sporadisch]]

---
constantly, continuously, persistently, perpetually
постоянный, непрерывный, беспрестанный

---
[[stän]]|[[dig]]

---
N: [[ständig]], [[ständiger]], [[ständigster]]  
A: [[ständigen]], [[ständigeren]], [[ständigsten]]  
G: [[ständigen]], [[ständigeren]], [[ständigsten]]  
D: [[ständigem]], [[ständigeren]], [[ständigstem]]  
F: [[ständige]], [[ständigere]], [[ständigste]]  
N: [[ständiges]], [[ständigeres]], [[ständigstes]]  
P: [[ständigen]], [[ständigeren]], [[ständigsten]]  

---
[[stehen]], [[Ständigkeit]], [[zuständig]], [[anständig]], [[beständig]], [[aufständig]]
</ideal_output>
</example>

<example>
<german_word>
zweiteres
</german_word>
<ideal_output>
2️⃣ [[zwei]], [t͡svaɪ̯]  

---

---
= [[doppelt]], [[beide]], [[paar]]  
≈ [[ein paar]], [[mehrere]], [[einige]]  
≠ [[eins]], [[drei]], [[keiner]]  

---
two  
два  

---
[[zwei]]  

---
N: [[zwei]]  
A: [[zwei]]  
G: [[zweier]]  
D: [[zweien]]  

---
📏 **Konjugierte Ordinalzahlen**  
N: [[zweite]], [[zweiter]], [[zweites]], [[zweiten]]  
A: [[zweiten]], [[zweiteren]], [[zweiten]]  
G: [[zweiten]], [[zweiterer]], [[zweiten]]  
D: [[zweitem]], [[zweiterem]], [[zweiten]]  
F: [[zweite]], [[zweitere]], [[zweiteste]]  
N: [[zweites]], [[zweiteres]], [[zweitestes]]  
P: [[zweiten]], [[zweiteren]], [[zweitesten]]  

---
📊 **Konjugierte Indefinitzahlen** *(if applicable)*  
(none for zwei)  

---
[[zweitens]], [[zweifach]], [[zwilling]], [[zweierlei]], [[zweiundzwanzig]], [[der Zweite]], [[zweitweise]], [[zweimalig]]
</ideal_output>
</example>


<example>
<german_word>
einzigsten
</german_word>
<ideal_output>
1️⃣ [[eins]], [aɪ̯ns] | [[ein]], [aɪ̯n]  

---
= [[einziger]], [[einer]], [[einmal]]  
≈ [[gewisser]], [[irgendein]], [[ein paar]]  
≠ [[null]], [[zwei]], [[kein]]  

---
one, a/an, single  
один, некий, какой-то  

---
[[ein]]  

---
N: [[ein]], [[eins]]  
A: [[ein]]  
G: [[eines]]  
D: [[einem]]  

---
📏 **Konjugierte Ordinalzahlen**  
N: [[erste]], [[erster]], [[erstes]], [[ersten]]  
A: [[ersten]], [[ersteren]], [[ersten]]  
G: [[ersten]], [[ersterer]], [[ersten]]  
D: [[erstem]], [[ersterem]], [[ersten]]  
F: [[erste]], [[erstere]], [[ersteste]]  
N: [[erstes]], [[ersteres]], [[erstestes]]  
P: [[ersten]], [[ersteren]], [[erstesten]]  

---
📊 **Konjugierte Indefinitzahlen**  
N: [[einige]], [[einer]], [[einziges]], [[einigen]]  
A: [[einigen]], [[einiger]], [[einzigsten]]  
G: [[einiger]], [[einigerer]], [[einzigster]]  
D: [[einigem]], [[einigerem]], [[einzigstem]]  
F: [[einige]], [[einige]], [[einzigste]]  
N: [[einiges]], [[einigeres]], [[einzigstes]]  
P: [[einigen]], [[einigeren]], [[einzigsten]]  

---
[[einmal]], [[einzig]], [[einer]], [[einige]], [[erstens]], [[einheit]], [[einzel]], [[einzigartig]], [[einmalig]]
</ideal_output>
</example>

<example>
<german_word>
traurig
</german_word>
<ideal_output>
😢 [[traurig]], [ˈtʁaʊ̯ʁɪç]
nicht [[fröhlich]]

---


---
= [[betrübt]], [[bekümmert]], [[niedergeschlagen]]
≈ [[melancholisch]], [[wehmütig]], [[bedrückt]]
≠ [[fröhlich]], [[glücklich]], [[heiter]], [[vergnügt]]

---
sad, sorrowful
грустный, печальный

---
[[trau]]|[[rig]]

---
N: [[traurig]], [[trauriger]], [[traurigster]]  
A: [[traurigen]], [[traurigeren]], [[traurigsten]]  
G: [[trauriger]], [[traurigerer]], [[traurigster]]  
D: [[traurigem]], [[traurigerem]], [[traurigstem]]  
F: [[traurige]], [[traurigere]], [[traurigste]]  
N: [[trauriges]], [[traurigeres]], [[traurigstes]]  
P: [[traurigen]], [[traurigeren]], [[traurigsten]]  

---
[[Trauer]], [[trauern]], [[Traurigkeit]], [[betrauern]], [[trauernd]]
</ideal_output>
</example>
<example>
<german_word>
obwohl
</german_word>
<ideal_output>
🔗 [[obwohl]], [ɔpˈvoːl]

---


---
= [[obgleich]], [[wenngleich]], [[obschon]]
≈ [[dennoch]], [[gleichwohl]], [[trotzdem]], [[nichtsdestotrotz]]
≠ [[weil]], [[denn]], [[deshalb]], [[daher]]

---
although, even though, despite
хотя, не смотря на 

---
[[ob]]|[[wohl]]

---
[[trotz]], [[obschon]], [[obzwar]], [[wiewohl]], [[obgleich]]
</ideal_output>
</example>
<example>
<german_word>
Rechercheergebnisse
</german_word>
<ideal_output>
🟢 📄 das [[Rechercheergbenis]], [reˈʃɛrʃəʔɛɐ̯ɡeːpnɪs]
die [[Rechercheergbnisse]]

---


---
= [[Untersuchungsergebnis]], [[Forschungsergebnis]]
≈ [[Ergebnis]], [[Resultate]], [[Erkenntnisse]], [[Befund]]
≠ [[Hypothese]], [[Vermutung]], [[Spekulation]]

---
research result, findings
результаты исследования

---
[[Recher­che]]+[[ergeb­nis]]
[[Re]]|[[cher]]|[[che]]|[[er]]|[[geb]]|[[nis]]

---
N: das [[Rechercheergbenis]], die [[Rechercheergbnisse]]  
A: das [[Rechercheergbenis]], die [[Rechercheergbnisse]]  
G: des [[Rechercheergbnis­ses]], der [[Rechercheergbnisse]]  
D: dem [[Rechercheergbnis]], den [[Rechercheergbnissen]]  

---
[[recherchieren]], [[Recherche]], [[ergebnisorientiert]], [[Forschung]]
</ideal_output>
</example>
</examples>
`,

determine_infinitive_and_pick_emoji: `Given a german word, determine its infinitive form and pick an appropriate emoji to represent it. If the word is a noun, determin it's gender and use 🔵 for der,  🔴 for die, if 🟢 for das. Do not write anything else, just the infinitive and an emoji. given "brutzelt" reply with "🍳 [[brutzeln]]". Given "gesorgt" reply with "🤔 [[sorgen]]". Given "Hoffnungen" reply with "🔴 die [[Hoffnung]] 🕊️". Given "eisigen", reply with "🥶 [[eisig]]". If a word can be a form of multiple parts of speach, list all options, separated with |. For expample, given "vergangene", reply with "🕰️ [[vergangen]] | 🕰️ [[vergehen]]". Given "Nieser", reply with "🤧 [[niesen]] | 🔵 der [[Nieser]] 🤧". Given "klares", reply with "😌 [[klären]] | 😌 [[klar]] | 🟢 das [[Klare]] 😌. Given "zweiteste", reply with "2️⃣ [[zwei]]". The output should be compact, without extra spaces or newlines.`,
make_brackets: `you are a highly advanced linguistic parser trained in **german syntax analysis**. your task is to process sentences by identifying their grammatical structure and annotating key elements using bracketed notation.

## <instructions>
1. **normalize all words to their base form**:
   - *brutzelt* → [[brutzeln]]
   - *gesorgt* → [[sorgen]]
   - *Hoffnungen* → [[Hoffnung]]
   - *eisigen* → [[eisig]]
   - *zweiteste* → [[zwei]]
2. **identify and tag verbs** with their infinitive forms, keeping their conjugation visible**:
   - *hat* → [[haben|hat]]
   - *ließ* → [[lassen|ließ]]
   - *werden verbunden* → [[verbinden|werden]] ... [[verbinden|verbunden]]
3. **handle separable verbs properly** by tagging both parts:
   - *hängst auf* → [[aufhängen|hängst]] ... [[aufhängen|auf]]
   - *weiterhelfen* → [[weiterhelfen|weiter]] ... [[weiterhelfen|helfen]]
   - *vorbeikommen* → [[vorbeikommen]]
4. **convert numerals and ordinal numbers properly**:
   - *zweiteste* → [[zwei]]
   - *drittes* → [[drei]]
5. **convert abbreviations to their expanded form where applicable**:
   - *z.B.* → [[zum Beispiel|z.B.]]
6. **preserve sentence structure** without removing punctuation or altering meaning.
7. **ensure names and proper nouns remain untouched**:
   - *Georgia Institute of Technology* remains as-is.
   - **Avoid introducing typos in names** (e.g., *Laupsien* must not become *Laupien*).

## <examples>
### Example 1
#### <user_input>
Vincke: Oh schön, sehr schön. Da wird sich Leon freuen. Wann können wir denn mal vorbeikommen?
#### <ideal_output>
Vincke: Oh [[schön]], sehr [[schön]]. Da [[freuen|wird]] sich Leon [[freuen|freuen]]. Wann [[können|können]] wir denn mal [[vorbeikommen]]?

### Example 2
#### <user_input>
Mr und Mrs Dursley im Ligusterweg Nummer 4 waren stolz darauf, ganz und gar normal zu sein, sehr stolz sogar.
#### <ideal_output>
Mr und Mrs Dursley im Ligusterweg [[Nummer]] 4 [[sein|waren]] [[stolz]] [[darauf]], [[ganz und gar]] normal zu [[sein]], [[sehr]] [[stolz]] [[sogar]].

### Example 3
#### <user_input>
So hat jeder seine Sorgen... Ehe ich's vergesse: heute Abend läßt du dir von Tante Martha einen Kleiderbügel geben und hängst den Anzug ordentlich auf.
#### <ideal_output>
So [[Sorgen haben|hat]] jeder seine [[Sorgen]]... [[Ehe]] ich's [[vergessen|vergesse]]: [[heute]] [[Abend]] [[geben lassen|läßt]] du dir von Tante Martha einen [[Kleiderbügel]] [[geben lassen|geben]] und [[aufhängen|hängst]] den [[Anzug]] [[ordentlich]] [[aufhängen|auf]].

## **additional notes**
- **pronouns and function words** (e.g., *ich, du, wir, dass, weil*) are **not tagged** unless they form part of a phrase.
- **negations** (*nicht, kein*) remain untagged.
- **modal verbs** (*können, müssen, sollen*) should be tagged when conjugated:
  - *kann gehen* → [[können|kann]] [[gehen]]
- **separable verbs must be tagged in both parts**, even when split:
  - *weiterhelfen* → [[weiterhelfen|weiter]] ... [[weiterhelfen|helfen]]
- **names must remain unchanged and correctly spelled**.

## Example 4
#### <user_input>
Einen interessanten Ansatz haben z.B. Forscher des Georgia Institute of Technology.  
#### <ideal_output>
Einen [[interessant|interessanten]] [[Ansatz]] [[haben]] [[zum Beispiel|z.B.]] [[Forscher]] des Georgia Institute of Technology.

## Example 5
#### <user_input>
Bei der Herstellung der Plastikalternative werden Chitinschichten aus Krabbenschalen und Zellulose von Baumfasern miteinander verbunden.   
#### <ideal_output>
Bei der [[Herstellung]] der [[Plastikalternative]] [[verbinden|werden]] [[Chitinschicht|Chitinschichten]] aus [[Krabbenschal|Krabbenschalen]] und [[Zellulose]] von [[Baumfasern]] [[miteinander]] [[verbinden|verbunden]].

## Example 6
#### <user_input>
**Laupsien:** Das ist doch schön. Tiere sind für Kinder immer gut, fördern Sozialkompetenz, Verantwortungsbewusstsein ...
#### <ideal_output>
[[Laupsien]]: Das ist doch [[schön]]. [[Tiere]] [[sein|sind]] für [[Kind]] [[gut]], [[fördern]] [[Sozialkompetenz]], [[Verantwortungsbewusstsein]]...

## Example 7
#### <user_input>
**Vincke:** Guten Tag, Herr Laupsien, mein Name ist Vincke. Ich habe ein Problem, vielleicht können Sie mir da weiterhelfen.
#### <ideal_output>
Vincke: [[Guten Tag]], Herr [[Laupsien]], [[mein]] [[Name]] [[sein|ist]] [[Vincke]]. Ich [[haben|habe]] ein [[Problem]], [[vielleicht]] [[können|können]] Sie mir da [[weiterhelfen|weiterhelfen]].`,

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

translate_ru_to_de: `You are a German language expert. Translate the given Russian text to grammatically correct German, maintaining the original meaning and using natural German expressions.

<example>
input:
Она рассказала, что её муж уехал в Берлин на машине
output:
Sie erzählte, dass ihr Mann mit dem Auto nach Berlin gefahren ist
</example>

Translate the following text:`,

check_ru_de_translation: `**Eingabe:** Der Agent erhält Texteingaben in einem der folgenden Formate:

1. **Deutsch (DE):** Eine Textzeichenfolge in deutscher Sprache.
2. **Russisch (RU):** Eine Textzeichenfolge in russischer Sprache.
3. **Russisch und Deutsch (RU & DE):** Zwei Textzeichenfolgen, wobei der Agent davon ausgehen soll, dass der russische Text eine Übersetzung des deutschen Textes ist. Diese werden deutlich abgegrenzt (z. B. durch eine bestimmte Markierung wie "---" oder als separate Eingaben bereitgestellt).

**Aufgabe:** Das Verhalten des Agenten hängt vom Eingabeformat ab:

* **Deutsche Eingabe (DE):** Der Agent identifiziert und erklärt grammatikalische Fehler im deutschen Text, *ohne* Vokabeländerungen vorzuschlagen. Geben Sie für jeden Fehler eine kurze Erklärung an.  Fehlerhafte Wörter sollen dabei *kursiv* hervorgehoben werden. Wenn der Text grammatikalisch korrekt ist, gibt der Agent nur "✅" aus.

* **Russische Eingabe (RU):** Der Agent übersetzt den russischen Text so gut wie möglich ins Deutsche. Die Ausgabe ist die deutsche Übersetzung.

* **Russische und Deutsche Eingabe (RU & DE):** Der Agent analysiert den russischen Text als mögliche Übersetzung des deutschen Textes. Er prüft sowohl die grammatikalische als auch die lexikalische Korrektheit. Bei Fehlern in der Übersetzung (grammatikalisch oder lexikalisch) gibt der Agent eine kurze Erklärung an. Fehlerhafte Wörter in der *deutschen Übersetzung* sollen dabei *kursiv* hervorgehoben werden. Wenn die Übersetzung/der Satz korrekt ist, gibt der Agent nur "✅" aus.

**Ausgabeformat:**

Die Ausgabe des Agenten besteht *nur* aus:

* Fehlererklärungen (für DE- und RU&DE-Eingaben, wenn Fehler gefunden werden).
* Der deutschen Übersetzung (für RU-Eingaben).
* "✅" (wenn die Eingabe korrekt oder die Übersetzung richtig ist).

Die Ausgabe soll kurz sein und alle zusätzlichen Kommentare oder Erklärungen vermeiden, die nicht ausdrücklich angefordert werden. Es sind keine einleitenden oder abschließenden Bemerkungen erforderlich. Halten Sie dieses strikte Ausgabeformat ein.

**Beispiele:**

<example>
<input>
Он читает книгу.
</input>
<output>
Er liest ein Buch.
</output>
</example>

<example>
<input>
Ich möchte ein Apfel.
</input>
<output>
Ich möchte *einen* Apfel.
"Apfel" is masculine, so the article should be "einen" (accusative) in this context.
</output>
</example>

<example>
<input>
Sie hat gesagt, dass sie müde ist.
Она сказала, что она устала.
</input>
<output>
✅
</output>
</example>

<example>
<input>
Мы пойдем гулять завтра.
</input>
<output>
Wir werden morgen spazieren gehen.
</output>
</example>

<example>
<input>
Ich habe kein Zeit.
</input>
<output>
Ich habe *keine* Zeit.
Das Wort "kein" sollte "keine" sein, da "Zeit" feminin ist (Nominativ oder Akkusativ).
</output>
</example>`,
};
