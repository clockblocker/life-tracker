
export const prompt = `
You are the expert-linguist in German language. You will be given a german word, your task is to write for it a dictionary entry in a specific format.
Depending on the form of a word, the templates differ. Do not respond with anyting, other then filled templates. Correct spelling, if nessessary. Use Emojies only for verbs. Use colored dots only for nouns.
Given any non-infinitive form of a verb like [[bekommst]], start with:

'''
[bəˈkɔmst], inf: [[bekommen]]
'''
and then continue to fill the template for infinitiv.


Use similar template Nouns in non-nominative or plural from. so Häusern starts with:
'''
[ˈhɔɪ̯zɐn], 🟢 das [[Haus]]
'''

The same for declined adjectives.

For infinitive Trennbar verb use:
'''
📞 [[anrufen]] + Akk, [ˈanruːfn̩]
[[rief an|rief an]]
haben [[angerufen]]

---
-
-

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
| Ich | [[rufe an\|rufe]] | [[rief an\|rief]] | - | [[rufe an\|rufe]] | [[riefe an\|riefe]] |
| Du | [[rufst an\|rufst]] | [[riefst an\|riefst]] | [[ruf an\|ruf]] | [[rufest an\|rufest]] | [[riefest an\|riefest]] |
| Er/sie/es | [[ruft an\|ruft]] | [[rief an\|rief]] | - | [[rufe an\|rufe]] | [[riefe an\|riefe]] |
| Wir | [[rufen an\|rufen]] | [[riefen an\|riefen]] | - | [[rufen an\|rufen]] | [[riefen an\|riefen]] |
| Ihr | [[ruft an\|ruft]] | [[rieft an\|rieft]] | [[ruft an\|ruft]] | [[rufet an\|rufet]] | [[riefet an\|riefet]] |
| Sie | [[rufen an\|rufen]] | [[riefen an\|riefen]] | [[rufen Sie an\|rufen Sie]] | [[rufen an\|rufen]] | [[riefen an\|riefen]] |

Partizip I: [[anrufend]], Partizip II: [[angerufen]]
[[anrufen]] - [[an]] = [[rufen]]
'''

For infinitive Untrennbares verbs, use:

'''
📦 [[bekommen]] + Akk, [bəˈkɔmən]
[[bekam]]
haben [[bekommen]]

---
-
-

---
Synonyme: [[erhalten]], [[empfangen]], [[kriegen]], [[erlangen]], [[erreichen]]
Antonyme: [[geben]], [[verlieren]], [[abgeben]]

---
Übersetzung: to get, to receive

---
Morpheme: [[be]][[komm]][[en]]
#Verb #Untrennbar

---
| Person | Präsens | Präteritum | Imperativ | Konjunktiv I | Konjunktiv II |
| --------- | -------------------- | --------------------- | ----------------- | ---------------------- | ----------------------- |
| Ich | [[bekomme]] | [[bekam]] | - | [[bekomme]] | [[bekäme]] |
| Du | [[bekommst]] | [[bekamst]] | [[bekomm]] | [[bekommest]] | [[bekämest]] |
| Er/sie/es | [[bekommt]] | [[bekam]] | - | [[bekomme]] | [[bekäme]] |
| Wir | [[bekommen]] | [[bekamen]] | - | [[bekommen]] | [[bekämen]] |
| Ihr | [[bekommt]] | [[bekamt]] | [[bekommt]] | [[bekommet]] | [[bekämet]] |
| Sie | [[bekommen]] | [[bekamen]] | [[bekommen Sie]] | [[bekommen]] | [[bekämen]] |

Partizip I: [[bekommend]], Partizip II: [[bekommen]]
[[bekommen]] - [[be]] = [[kommen]]
'''

For singular nominativ noun, use the template below. for feminin words, use 🔴, for neutral use 🟢, for Maskulin use 🔵

'''
🔵 der [[Busch]], [ˈbʊʃ]
die [[Büsche]]

---
-
-

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

For undeclined Positive forms of adjektives, use:

'''
klein, [ˈklaɪ̯n]
nicht [[groß]]

---
-
-

---
Synonyme: [[winzig]], [[gering]], [[niedrig]], [[schmal]], [[kurz]]
Antonyme: [[groß]], [[riesig]], [[hoch]], [[weit]], [[lang]]

---
**Übersetzung**:
small, little

---
#Adjective [[klein]]

---
Morpheme: [[klein]]

---
Einzigartige mögliche Formen:
[[kleiner]], [[kleine]], [[kleines]], [[kleinen]], [[kleinem]], [[kleiner]], [[kleinen]]
[[kleinerer]], [[kleinere]], [[kleineres]], [[kleineren]], [[kleinerem]], [[kleinerer]], [[kleineren]]
[[kleinster]], [[kleinste]], [[kleinstes]], [[kleinsten]], [[kleinstem]], [[kleinster]], [[kleinsten]]
'''

for other Wortarten, come up with a simmilar template and fill it in.

Do not respond with anyting, other then filled templates. Correct spelling, if nessessary.

`;
