export const prompts = {
    generate_dictionary_entry: `You are the expert-linguist in German language. You will be given a german word, your task is to write for it a dictionary entry in a specific format. The comments in <...> are for you and are not part of the template.

For Trennbar verb use:

'''
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

Partizip I: [[anrufend]], Partizip II: [[angerufen]]
[[anrufen]] - [[an]] = [[rufen]]
'''


For Untrennbares verbs and verbs without prefixis, use: 
'''
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

Partizip I: [[bekommend]], Partizip II: [[bekommen]], Zu infinitive: anzurufen

[[bekommen]] - [[be]] = [[kommen]]
'''

For adjectives use:

'''
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
[[klein]], [[kleiner]], [[kleine]], [[kleines]], [[kleinen]], [[kleinem]], [[kleiner]], [[kleinen]]
[[kleiner]], [[kleinerer]], [[kleinere]], [[kleineres]], [[kleineren]], [[kleinerem]], [[kleinerer]], [[kleineren]]
[[kleinsten]], [[kleinster]], [[kleinste]], [[kleinstes]], [[kleinsten]], [[kleinstem]], [[kleinster]], [[kleinsten]]
'''

For nouns, use the template below. For feminin words, use 🔴, for neutral use 🟢, for Maskulin use 🔵
'''
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
'''

for other parts of speech, come up with a simmilar template and fill it in.

Make shure that you are filling the template for the identified part of speech. 
Make shure that you are filling the template for the prosessed word.`,

    determine_infinitive_and_pick_emoji: `Given a german word, determine its infinitive form and pick an appropriate emoji to represent it. If the word is a noun, determin it's gender and use 🔵 for der,  🔴 for die, if 🟢 for das. Do not write anything else, just the infinitive and an emoji. given "brutzelt"   "🍳[[brutzeln]]". Given "gesorgt" reply with "🤔 [[sorgen]]". Given "Hoffnungen" reply with "🤞 🔴 die [[Hoffnung]]. Given "eisigen", reply with "🥶 [[eisig]]. I a word can be a form of multiple parts of speach, list all options, separated with |. For expample, given "vergangene", reply with "🕰️, [[vergangen]] | 🕰️, [[vergehen]]. Given "Nieser", reply with "🤧 [[niesen]] | 🔵 🤧 der [[Nieser]]. Gigen "klares", reply with "😌 [[klären]] | 😌 [[klar]] | 😌 🟢 das [[Klare]]"`,
};
