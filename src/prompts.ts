export const prompts = {
    generate_dictionary_entry: `You are an expert linguist specializing in the German language. Your task is to create a detailed dictionary entry for a given German word. Here's the word you need to analyze:\n\n<german_word>\n{{german_word}}\n</german_word>\n\nBefore creating the entry, analyze the word and plan your approach. Break down the word inside <word_breakdown> tags:\n\n1. Identify the part of speech of the word.\n2. If it's a verb:\n   - Determine if it's trennbar (separable) or untrennbar (inseparable).\n   - Identify its tense forms (present, past, perfect).\n   - Note any irregular conjugations. -Fill the list of cojugations (Präsens, Präteritum, Imperativ, Konjunktiv I, Konjunktiv II) \n3. For nouns:\n   - Identify the gender (masculine, feminine, or neuter).\n   - Determine the declension pattern.\n4. For adjectives:\n   - Note the comparative and superlative forms.\n5. Identify and list examples of each morpheme in the word.\n6. Plan which template you'll use based on the part of speech.\n7. List the key information you'll need to include in the entry (e.g., pronunciation, conjugations, synonyms, antonyms, translations, morphemes).\n\nIt's OK for this section to be quite long.\n\nNow, create the dictionary entry using the appropriate template based on your analysis. Strictly adhere to the format provided in the examples, ensuring no additional text is included that isn't present in the templates. Use the following guidelines:\n\n1. For trennbar verbs:\n   - Start with an appropriate emoji\n   - Include pronunciation, conjugations, synonyms, antonyms, English translation, morpheme breakdown, and a conjugation table\n\n2. For untrennbar verbs and verbs without prefixes:\n   - Follow a similar format to trennbar verbs, adjusting the conjugation details as needed\n\n3. For adjectives:\n   - Start with an appropriate emoji\n   - Include pronunciation, antonyms, synonyms, English translation, and unique possible forms\n\n4. For nouns:\n   - Use 🔴 for feminine, 🟢 for neuter, and 🔵 for masculine nouns\n   - Include plural form, synonyms, English translation, morpheme breakdown, and unique possible forms\n\n5. For other parts of speech:\n   - Create a similar template, adapting the information as appropriate for the specific part of speech\n\nPresent only your final entry. Do not present the user with word_breakdown. Do not write to the user your thought process.
<examples>\n<example>\n<german_word>\nverfeinden\n</german_word>\n<ideal_output>\n😤 [[verfeinden]], [fɛɐ̯ˈfaɪ̯ndən] | [[verfeindete]], haben [[verfeindet]]\n\n---\n\n---\n= [[zerstreiten]], [[entzweien]]\n≈ Feindschaft  [[schließen]], [[verkrachen]], in Konflikt [[geraten]]\n≠ [[versöhnen]], [[vertragen]], [[anfreunden]]\n\n---\nto make enemies, to set at odds\n\n---\n[[ver]][[feind]][[en]]\n\n---\nich: [[verfeinde]], [[verfeindete]], –, [[verfeinde]], [[verfeindete]]\ndu: [[verfeindest]], [[verfeindetest]], [[verfeinde]] | [[verfeind]] | [[verfeinde]], [[verfeindest]], [[verfeindetest]]\ner/sie/es: [[verfeindet]], [[verfeindete]], –, [[verfeinde]], [[verfeindete]]\nwir: [[verfeinden]], [[verfeindeten]], [[verfeinden wir|verfeinden]], [[verfeinden]], [[verfeindeten]]\nihr: [[verfeindet]], [[verfeindetet]], [[verfeindet]], [[verfeindet]], [[verfeindetet]] \n\nPI: [[verfeindend]], PII: [[verfeindet]], Zu+inf: [[zuverfeinden]]\n\n---\n[[verfeinden]] - [[ver]] = [[feinden]] / to make enemies, to set at odds\n\n---\n[[Verfehndung]], [[Verfeindung]], [[Feind]], [[feindlich]], [[Feindschaft]]\n\n</ideal_output>\n</example>\n<example>\n<german_word>\nHoffnung\n</german_word>\n<ideal_output>\n🔴 die [[Hoffnung]], [ˈhɔfnʊŋ]\ndie [[Hoffnungen]]\n\n\n---\n\n\n---\n= [[Zuversicht]], [[Optimismus]]\n≈ [[Erwartung]], [[Vertrauen]], [[Glaube]], [[Wunsch]]\n≠ [[Verzweiflung]], [[Pessimismus]], [[Hoffnungslosigkeit]], [[Resignation]]\n\n---\nhope\n\n---\n[[Hoff]][[nung]]\n\n---\nN: die [[Hoffnung]], die [[Hoffnungen]]  \nA: die [[Hoffnung]], die [[Hoffnungen]]  \nG: der [[Hoffnung]], der [[Hoffnungen]]  \nD: der [[Hoffnung]], den [[Hoffnungen]]  \n\n---\n[[hoffen]], [[hoffentlich]], [[hoffnungsvoll]], [[hoffnungslos]]\n</ideal_output>\n</example>\n<example>\n<german_word>\nBusch\n</german_word>\n<ideal_output>\n🔵 der [[Busch]]\ndie [[B\\xFCsche]]\n\n---\n\n\n---\n= [[Strauch]], [[Gesträuch]]\n≈ [[Gebüsch]], [[Hecke]], [[Gehölz]]\n≠ [[Baum]], [[Wiese]], [[Ackerland]], [[Ödland]]\n\n---\nbush, shrub\n\n---\n[[Busch]]\n\n---\nN: der [[Busch]], die [[Büsche]]  \nA: den [[Busch]], die [[Büsche]]  \nG: des [[Busches]], der [[Büsche]]  \nD: dem [[Busch]], den [[Büschen]] \n\n---\nbuschig, buschieren\n</ideal_output>\n</example>\n<example>\n<german_word>\nklein\n</german_word>\n<ideal_output>\n🐭 [[klein]], [\\u02C8kla\\u026A\\u032Fn] ≠ [[gro\\xDF]]\n\n---\n\n\n---\n= [[kompakt]], [[winzig]], [[gering]]\n≈ [[niedrig]], [[schmal]], [[zierlich]], [[zart]], [[begrenzt]]\n≠ [[groß]], [[riesig]], [[weit]], [[breit]]\n\n---\nsmall, little\n\n---\n[[klein]]\n\n---\nN: [[klein]], [[kleiner]], [[kleinster]]  \nA: [[kleinen]], [[kleineren]], [[kleinsten]]  \nG: [[kleiner]], [[kleinerer]], [[kleinster]]  \nD: [[kleinem]], [[kleinerem]], [[kleinstem]]  \nF: [[kleine]], [[kleinere]], [[kleinste]]  \nN: [[kleines]], [[kleineres]], [[kleinstes]]  \nP: [[kleinen]], [[kleineren]], [[kleinsten]]  \n\n---\n[[Kleinheit]], [[kleinlich]], [[kleinmachen]]\n</ideal_output>\n</example>\n<example>\n<german_word>\nanzurufen\n</german_word>\n<ideal_output>\n📞 [[anrufen]], [ˈanʦuˌʁuːfən] | [[rief an]], haben [[angerufen]]\n\n---\n\n---\n= [[telefonieren]], [[kontaktieren]], [[anklingeln]]\n≈ [[sich melden]], [[Kontakt aufnehmen]], [[durchklingeln]]\n≠ [[ignorieren]], [[ablehnen]], [[auflegen]], [[beenden]]\n\n---\nto call, to phone\n\n---\n[[an]][[rufen]]\n\n---\nich: [[rufe an]], [[rief an]], –, [[rufe an]], [[riefe an]]\ndu: [[rufst an]], [[riefst an]], [[rufe an]] | [[ruf an]], [[rufest an]], [[riefest an]]\ner/sie/es: [[ruft an]], [[rief an]], –, [[rufe an]], [[riefe an]]\nwir: [[rufen an]], [[riefen an]], [[rufen wir an|rufen an]], [[rufen an]], [[riefen an]]\nihr: [[ruft an]], [[rieft an]], [[ruft an]], [[rufet an]], [[riefet an]]\n\nPI: [[anrufend]], PII: [[angerufen]], Zu+inf: [[anzurufen]]\n\n---\n[[anrufen]] - [[an]] = [[rufen]] / to call, to phone\n\n---\n[[Anruf]], [[Anrufer]], [[Anruferin]], [[anrufbar]], [[Anrufbeantworter]]\n</ideal_output>\n</example>\n<example>\n<german_word>\nständigen\n</german_word>\n<ideal_output>\n🕰️ [[ständig]], [ˈʃtɛndɪç] ≠ [[selten]]\n\n---\n\n\n---\n= [[fortwährend]], [[dauerhaft]], [[andauernd]]\n≈ [[permanent]], [[kontinuierlich]], [[beständig]], [[ununterbrochen]], [[pausenlos]]\n≠ [[selten]], [[gelegentlich]], [[unregelmäßig]], [[sporadisch]]\n\n---\nconstantly, continuously, persistently, perpetually\n\n---\n[[ständig]]\n\n---\nN: [[ständig]], [[ständiger]], [[ständigster]]  \nA: [[ständigen]], [[ständigeren]], [[ständigsten]]  \nG: [[ständigen]], [[ständigeren]], [[ständigsten]]  \nD: [[ständigem]], [[ständigeren]], [[ständigstem]]  \nF: [[ständige]], [[ständigere]], [[ständigste]]  \nN: [[ständiges]], [[ständigeres]], [[ständigstes]]  \nP: [[ständigen]], [[ständigeren]], [[ständigsten]]  \n\n---\n[[stehen]], [[Ständigkeit]], [[zuständig]], [[anständig]], [[beständig]], [[aufständig]]\n\n\n\n</ideal_output>\n</example>\n<example>\n<german_word>\ntraurig\n</german_word>\n<ideal_output>\n😢 [[traurig]], [ˈtʁaʊ̯ʁɪç]\nnicht [[fröhlich]]\n\n---\n\n\n---\n= [[betrübt]], [[bekümmert]], [[niedergeschlagen]]\n≈ [[melancholisch]], [[wehmütig]], [[bedrückt]]\n≠ [[fröhlich]], [[glücklich]], [[heiter]], [[vergnügt]]\n\n---\nsad, sorrowful\n\n---\n[[traurig]]\n\n---\nN: [[traurig]], [[trauriger]], [[traurigster]]  \nA: [[traurigen]], [[traurigeren]], [[traurigsten]]  \nG: [[trauriger]], [[traurigerer]], [[traurigster]]  \nD: [[traurigem]], [[traurigerem]], [[traurigstem]]  \nF: [[traurige]], [[traurigere]], [[traurigste]]  \nN: [[trauriges]], [[traurigeres]], [[traurigstes]]  \nP: [[traurigen]], [[traurigeren]], [[traurigsten]]  \n\n---\n[[Trauer]], [[trauern]], [[Traurigkeit]], [[betrauern]], [[trauernd]]\n</ideal_output>\n</example>\n<example>\n<german_word>\nobwohl\n</german_word>\n<ideal_output>\n🔗 [[obwohl]], [ɔpˈvoːl]\n\n---\n\n\n---\n= [[obgleich]], [[wenngleich]], [[obschon]]\n≈ [[dennoch]], [[gleichwohl]], [[trotzdem]], [[nichtsdestotrotz]]\n≠ [[weil]], [[denn]], [[deshalb]], [[daher]]\n\n---\nalthough, even though, despite\n\n---\n[[ob]][[wohl]]\n\n---\n[[trotz]], [[obschon]], [[obzwar]], [[wiewohl]], [[obgleich]]\n</ideal_output>\n</example>\n</examples>\n\n`,

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
