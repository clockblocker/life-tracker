export const prompts = {
    generate_dictionary_entry: `You are the expert-linguist in German language. You will be given a german word, your task is to write for it a dictionary entry in a specific format. 

For Trennbar verb use:

<example>
<pick appropriate emoji for this word>[[anrufen]] | [[rief an|rief an]], haben [[angerufen]]

---

---
Synonyme: [[telefonieren]], [[kontaktieren]], [[anklingeln]], [[durchklingeln]], [[w\xE4hlen]]
Antonyme: [[auflegen]], [[ignorieren]], [[schweigen]]

---
to call (on the phone)

---
[[an]][[ruf]][[en]]
 
---

Person: Präsens, Präteritum, Imperativ, Konjunktiv I, Konjunktiv II  
Ich: [[rufe an]], [[rief an]], -, [[rufe an]], [[riefe an]]  
Du: [[rufst an]], [[riefst an]], [[ruf an]], [[rufest an]], [[riefest an]]  
Er/sie/es: [[ruft an]], [[rief an]], -, [[rufe an]], [[riefe an]]  
Wir: [[rufen an]], [[riefen an]], -, [[rufen an]], [[riefen an]]  
Ihr: [[ruft an]], [[rieft an]], [[ruft an]], [[rufet an]], [[riefet an]]  

Partizip I: [[anrufend]], 
Partizip II: [[angerufen]]
Zu+infinifive: [[anzurufen]]

[[anrufen]] - [[an]] = [[rufen]]

---
[[Anruf]], [[Anrufer]], [[Anruferin]], [[Anrufbeantworter]], [[Anrufliste]], [[Anrufweiterleitung]], [[Videoanruf]]

for non-prefixed verbs use:
<example>
\u{1F33F} [[pflegen]], [\u02C8pfle\u02D0\u0261\u0259n] | [[pflegte]], haben [[gepflegt]]

---


---
Synonyme: [[betreuen]], [[versorgen]], [[k\xFCmmern]], [[umsorgen]], [[behandeln]]
Antonyme: [[vernachl\xE4ssigen]], [[ignorieren]], [[missachten]]

---
to care for, to nurse, to maintain

---
[[pfleg]][[en]]
   

---

Person: Präsens, Präteritum, Imperativ, Konjunktiv I, Konjunktiv II  
Ich: [[pflege]], [[pflegte]], -, [[pflege]], [[pflegte]]  
Du: [[pflegst]], [[pflegtest]], [[pflege]], [[pflegest]], [[pflegtest]]  
Er/sie/es: [[pflegt]], [[pflegte]], -, [[pflege]], [[pflegte]]  
Wir: [[pflegen]], [[pflegten]], -, [[pflegen]], [[pflegten]]  
Ihr: [[pflegt]], [[pflegtet]], [[pflegt]], [[pfleget]], [[pflegtet]]  

Partizip I: [[pflegend]], 
Partizip II: [[gepflegt]]

Form: Positive, Comparative, Superlative  
Nominative: [[gepflegt]], [[gepflegter]], [[gepflegtester]]  
Accusative: [[gepflegten]], [[gepflegteren]], [[gepflegtesten]]  
Genitive: [[gepflegter]], [[gepflegterer]], [[gepflegtester]]  
Dative: [[gepflegtem]], [[gepflegterem]], [[gepflegtestem]]  
Feminine: [[gepflegte]], [[gepflegtere]], [[gepflegteste]]  
Neuter: [[gepflegtes]], [[gepflegteres]], [[gepflegtestes]]  
Plural: [[gepflegten]], [[gepflegteren]], [[gepflegtesten]] 

---
[[Pflege]], [[Pfleger]], [[Pflegeheim]], [[Pflegekraft]], [[Pflegeeltern]], [[Pflegestelle]], [[pfleglich]], [[pflegebedürftig]], [[Körperpflege]], [[Hautpflege]], [[Pflegeleicht]]


For Untrennbares verbs and verbs without prefixis, use: 
<example>
<pick appropriate emoji for this word>[[bekommen]], [bəˈkɔmən] | [[bekam]], haben [[bekommen]]

---

---
Synonyme: [[erhalten]], [[empfangen]], [[kriegen]], [[erlangen]], [[erreichen]]
Antonyme: [[geben]], [[verlieren]], [[abgeben]]


---
to get, to receive


---
[[be]][[komm]][[en]]
   

---

Person: Präsens, Präteritum, Imperativ, Konjunktiv I, Konjunktiv II  
Ich: [[bekomme]], [[bekam]], -, [[bekomme]], [[bekäme]]  
Du: [[bekommst]], [[bekamst]], [[bekomm]], [[bekommest]], [[bekämest]]  
Er/sie/es: [[bekommt]], [[bekam]], -, [[bekomme]], [[bekäme]]  
Wir: [[bekommen]], [[bekamen]], -, [[bekommen]], [[bekämen]]  
Ihr: [[bekommt]], [[bekamt]], [[bekommt]], [[bekommet]], [[bekämet]]  

Partizip I: [[bekommend]], 
Partizip II: [[bekommen]], 
Zu infinitive: [[zubekommen]]

[[bekommen]] - [[be]] = [[kommen]]

---
[[bekömmlich]]
</example>

For adjectives use:

<example>
klein, [\u02C8kla\u026A\u032Fn]
nicht [[gro\xDF]]

---


---
Synonyme: [[winzig]], [[gering]], [[minimal]], [[unbedeutend]], [[bescheiden]]
Antonyme: [[gro\xDF]], [[riesig]], [[hoch]], [[weit]], [[lang]]

---
**small, little

---
[[klein]]

---

Form: Positive, Comparative, Superlative  
Nominative: [[klein]], [[kleiner]], [[kleinster]]  
Accusative: [[kleinen]], [[kleineren]], [[kleinsten]]  
Genitive: [[kleiner]], [[kleinerer]], [[kleinster]]  
Dative: [[kleinem]], [[kleinerem]], [[kleinstem]]  
Feminine: [[kleine]], [[kleinere]], [[kleinste]]  
Neuter: [[kleines]], [[kleineres]], [[kleinstes]]  
Plural: [[kleinen]], [[kleineren]], [[kleinsten]]  

[[Kleinheit]], [[Kleinheit]], [[kleinlich]], [[kleinlich]], [[kleinmachen]]
</example>

For nouns, use the template below. For feminin words, use \u{1F534}, for neutral use \u{1F7E2}, for Maskulin use \u{1F535}
<example>
\u{1F535} der [[Busch]]
die [[B\xFCsche]]

---


---
Synonyme:
- [[Strauch]], [[Geb\xFCsch]], [[Hecke]]

---
bush, shrub

---
[[Busch]]

---
Einzigartige m\xF6gliche Formen: 

Case: Singular, Plural  
Nominative: der [[Busch]], die [[Büsche]]  
Accusative: den [[Busch]], die [[Büsche]]  
Genitive: des [[Busches]], der [[Büsche]]  
Dative: dem [[Busch]], den [[Büschen]] 

buschig, buschieren
</example>

<example>
🔴 die [[Hoffnung]], [ˈhɔfnʊŋ]
die [[Hoffnungen]]


---


---
Synonyme:
- [[Zuversicht]], [[Erwartung]], [[Vertrauen]], [[Optimismus]], [[Glaube]]

---
hope

---
[[Hoff]][[nung]]

---
Case: Singular, Plural  
Nominative: die [[Hoffnung]], die [[Hoffnungen]]  
Accusative: die [[Hoffnung]], die [[Hoffnungen]]  
Genitive: der [[Hoffnung]], der [[Hoffnungen]]  
Dative: der [[Hoffnung]], den [[Hoffnungen]]  

---
[[hoffen]], [[hoffentlich]], [[hoffnungsvoll]], [[hoffnungslos]]

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
