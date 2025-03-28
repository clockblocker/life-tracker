import { Trennbarkeit, Regelmaessigkeit, Genus, Wortart, NomenDeklination, Kasus, PartikelType, AdverbCategory, Numerus, PronomenType, Match } from "prompts/endgame/zod/types";
const sitzen = {
  "sitzen": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Verb,
        grundform: "sitzen",
        emojiBeschreibungs: ["💺"]
      }
    ]
  }
};

const sitz = {
  "sitz": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Nomen,
        grundform: "Sitz",
        emojiBeschreibungs: ["🪑"],
        genus: Genus.M
      }
    ],
    [Match.Flexion]: [
      {
        wortart: Wortart.Verb,
        grundform: "sitzen",
        emojiBeschreibungs: ["💺"]
      }
    ]
  }
};

const untergen = {
  "untergen": {
    [Match.Tippfehler]: [
      {
        wortart: Wortart.Verb,
        grundform: "untergehen",
        emojiBeschreibungs: ["🌅"]
      }
    ]
  }
};

const untergehen = {
  "untergehen": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Verb,
        grundform: "untergehen",
        emojiBeschreibungs: ["🌅"]
      }
    ]
  }
};

const aufgepast = {
  "aufgepast": {
    [Match.Tippfehler]: [
      {
        wortart: Wortart.Verb,
        grundform: "aufpassen",
        emojiBeschreibungs: ["👀"]
      }
    ]
  }
};

const aufgepasst = {
  "aufgepasst": {
    [Match.Flexion]: [
      {
        wortart: Wortart.Verb,
        grundform: "aufpassen",
        emojiBeschreibungs: ["👀"]
      }
    ]
  }
};

const aufpassen = {
  "aufpassen": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Verb,
        grundform: "aufpassen",
        emojiBeschreibungs: ["👀"]
      }
    ]
  }
};

const Hoffungen = {
  "Hoffungen": {
    [Match.Flexion]: [
      {
        wortart: Wortart.Nomen,
        grundform: "Hoffnung",
        emojiBeschreibungs: ["🙏"],
        genus: Genus.F
      }
    ]
  }
};

const hangstauf = {
  "hangstauf": {
    [Match.Tippfehler]: [
      {
        wortart: Wortart.Verb,
        grundform: "aufhängen",
        emojiBeschreibungs: ["🖼️"]
      }
    ]
  }
};

const aufhängen = {
  "aufhängen": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Verb,
        grundform: "aufhängen",
        emojiBeschreibungs: ["🖼️"]
      }
    ]
  }
};

const nieser = {
  "nieser": {
    [Match.Tippfehler]: [
      {
        wortart: Wortart.Verb,
        grundform: "niesen",
        emojiBeschreibungs: ["🤧"]
      }
    ],
    [Match.Grundform]: [
      {
        wortart: Wortart.Nomen,
        grundform: "Nieser",
        emojiBeschreibungs: ["🤧"],
        genus: Genus.M
      }
    ]
  }
};

const niesen = {
  "niesen": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Verb,
        grundform: "niesen",
        emojiBeschreibungs: ["🤧"]
      }
    ]
  }
};

const klares = {
  "klares": {
    [Match.Flexion]: [
      {
        wortart: Wortart.Adjektiv,
        grundform: "klar",
        emojiBeschreibungs: ["✨"]
      }
    ]
  }
};

const klar = {
  "klar": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Adjektiv,
        grundform: "klar",
        emojiBeschreibungs: ["✨"]
      },
      {
        wortart: Wortart.Adverb,
        grundform: "klar",
        emojiBeschreibungs: ["✨"],
        adverbCategory: [AdverbCategory.Grad]
      },
      {
        wortart: Wortart.Nomen,
        grundform: "Klar",
        emojiBeschreibungs: ["✨"],
        genus: Genus.N
      }
    ]
  }
};

const hiemwerken = {
  "hiemwerken": {
    [Match.Tippfehler]: [
      {
        wortart: Wortart.Verb,
        grundform: "heimwerken",
        emojiBeschreibungs: ["🔨"]
      },
      {
        wortart: Wortart.Nomen,
        grundform: "Heimwerk",
        emojiBeschreibungs: ["🛠"],
        genus: Genus.N
      }
    ]
  }
};

const heimwerken = {
  "heimwerken": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Verb,
        grundform: "heimwerken",
        emojiBeschreibungs: ["🔨"]
      },
    ],
    [Match.Flexion]: [
      {
        wortart: Wortart.Nomen,
        grundform: "Heimwerk",
        emojiBeschreibungs: ["🛠"],
        genus: Genus.N
      }
    ]
  }
};

const heimwerkst = {
  "heimwerkst": {
    [Match.Flexion]: [
      {
        wortart: Wortart.Verb,
        grundform: "heimwerken",
        emojiBeschreibungs: ["🔨"]
      }
    ]
  }
};

const unbandiges = {
  "unbandiges": {
    [Match.Tippfehler]: [
      {
        wortart: Wortart.Adjektiv,
        grundform: "unbändig",
        emojiBeschreibungs: ["🔥"]
      }
    ]
  }
};

const backen = {
  "backen": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Verb,
        grundform: "backen",
        emojiBeschreibungs: ["🍞"]
      },
      {
        wortart: Wortart.Verb,
        grundform: "backen",
        emojiBeschreibungs: ["🍞"]
      },
      {
        wortart: Wortart.Nomen,
        grundform: "Backe",
        emojiBeschreibungs: ["😊"],
        genus: Genus.F
      }
    ]
  }
};

const Rechercheergbnisse = {
  "Rechercheergbnisse": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Nomen,
        grundform: "Rechercheergebnis",
        emojiBeschreibungs: ["🔍"],
        genus: Genus.N
      }
    ]
  }
};

const See = {
  "See": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Nomen,
        grundform: "See",
        emojiBeschreibungs: ["🏞"],
        genus: Genus.M
      },
      {
        wortart: Wortart.Nomen,
        grundform: "See",
        emojiBeschreibungs: ["🌊"],
        genus: Genus.F
      }
    ]
  }
};

const trotz = {
  "trotz": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Praeposition,
        grundform: "trotz",
        emojiBeschreibungs: ["🛡"]
      },
      {
        wortart: Wortart.Nomen,
        grundform: "Trotz",
        emojiBeschreibungs: ["😤"],
        genus: Genus.M
      }
    ],
    [Match.Flexion]: [
      {
        wortart: Wortart.Verb,
        grundform: "trotzen",
        emojiBeschreibungs: ["😤"]
      }
    ]
  }
};

const trozdem = {
  "trozdem": {
    [Match.Tippfehler]: [
      {
        wortart: Wortart.Adverb,
        grundform: "trotzdem",
        emojiBeschreibungs: ["💪🔥"]
      }
    ]
  }
};

const mit = {
  "mit": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Praeposition,
        grundform: "mit",
        emojiBeschreibungs: ["🤝"]
      },
      {
        wortart: Wortart.Praefix,
        grundform: "mit",
        emojiBeschreibungs: ["🤝"]
      }
    ]
  }
};

const an = {
  "an": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Praeposition,
        grundform: "an",
        emojiBeschreibungs: ["📍"]
      },
      {
        wortart: Wortart.Praefix,
        grundform: "an",
        emojiBeschreibungs: ["📍"]
      }
    ]
  }
};

const selbst = {
  "selbst": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Adverb,
        grundform: "selbst",
        emojiBeschreibungs: ["🙋"],
        adverbCategory: [AdverbCategory.Modal]
      },
      {
        wortart: Wortart.Nomen,
        grundform: "Selbst",
        emojiBeschreibungs: ["🪞"],
        genus: Genus.N
      }
    ]
  }
};

const uber = {
  "uber": {
    [Match.Tippfehler]: [
      {
        wortart: Wortart.Praeposition,
        grundform: "über",
        emojiBeschreibungs: ["🔝"],
        possibleGoverningKasuss: [Kasus.D, Kasus.A]
      },
      {
        wortart: Wortart.Praefix,
        grundform: "über",
        emojiBeschreibungs: ["🔝"]
      }
    ],
    [Match.Grundform]: [
      {
        wortart: Wortart.Nomen,
        grundform: "Uber",
        emojiBeschreibungs: ["🏙️"],
        genus: Genus.N,
        eigenname: true
      }
    ]
  }
};

const umfaren = {
  "umfaren": {
    [Match.Tippfehler]: [
      {
        wortart: Wortart.Verb,
        grundform: "umfahren",
        emojiBeschreibungs: ["🚗🔄"]
      },
      {
        wortart: Wortart.Verb,
        grundform: "umfahren",
        emojiBeschreibungs: ["🚗💥"]
      },
      {
        // Although a noun reading exists, the input "umfaren" contains too many errors;
        // hence we keep the entire interpretation under Tippfehler.
        wortart: Wortart.Nomen,
        grundform: "Umfahrt",
        emojiBeschreibungs: ["🚗🔄"],
        genus: Genus.F
      }
    ]
  }
};

const geoffnet = {
  "geoffnet": {
    [Match.Tippfehler]: [
      {
        wortart: Wortart.Verb,
        grundform: "öffnen",
        emojiBeschreibungs: ["🚪👐"]
      }
    ]
  }
};

const verfallen = {
  "verfallen": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Verb,
        grundform: "verfallen",
        emojiBeschreibungs: ["🏚️"]
      }
    ]
  }
};

const verfall = {
  "verfall": {
    [Match.Flexion]: [
      {
        wortart: Wortart.Verb,
        grundform: "verfallen",
        emojiBeschreibungs: ["🏚️"]
      }
    ],
    [Match.Grundform]: [
      {
        wortart: Wortart.Nomen,
        grundform: "Verfall",
        emojiBeschreibungs: ["🏚️"],
        genus: Genus.M
      }
    ]
  }
};

const derVerfall = {
  "der verfall": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Nomen,
        grundform: "Verfall",
        emojiBeschreibungs: ["🏚️"],
        genus: Genus.M
      }
    ]
  }
};

const schloss = {
  "schloss": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Nomen,
        grundform: "Schloss",
        emojiBeschreibungs: ["🏰", "🔒"],
        genus: Genus.N
      }
    ],
    [Match.Flexion]: [
      {
        wortart: Wortart.Verb,
        grundform: "schließen",
        emojiBeschreibungs: ["🚪"]
      }
    ]
  }
};

const gehobener = {
  "gehobener": {
    [Match.Flexion]: [
      {
        wortart: Wortart.Adjektiv,
        grundform: "gehoben",
        emojiBeschreibungs: ["🎩"]
      }
    ]
  }
};

const wahlwiese = {
  "wahlwiese": {
    [Match.Tippfehler]: [
      {
        wortart: Wortart.Adverb,
        grundform: "wahlweise",
        emojiBeschreibungs: ["🔀"],
        adverbCategory: [AdverbCategory.Modal]
      }
    ]
  }
};

const deutschen = {
  "deutschen": {
    [Match.Flexion]: [
      {
        wortart: Wortart.Adjektiv,
        grundform: "deutsch",
        emojiBeschreibungs: ["🇩🇪"]
      },
      {
        wortart: Wortart.Nomen,
        grundform: "Deutsche",
        emojiBeschreibungs: ["🇩🇪"],
        genus: Genus.N
      }
    ]
  }
};

const deutsch = {
  "deutsch": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Adjektiv,
        grundform: "deutsch",
        emojiBeschreibungs: ["🇩🇪"]
      },
      {
        wortart: Wortart.Adverb,
        grundform: "deutsch",
        emojiBeschreibungs: ["🇩🇪"],
        adverbCategory: [AdverbCategory.Modal]
      }
    ],
    [Match.Flexion]: [
      {
        wortart: Wortart.Nomen,
        grundform: "Deutsche",
        emojiBeschreibungs: ["🇩🇪"],
        genus: Genus.N
      }
    ]
  }
};

const laden = {
  "laden": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Verb,
        grundform: "laden",
        emojiBeschreibungs: ["📦➡️🚚"]
      },
      {
        wortart: Wortart.Verb,
        grundform: "laden",
        emojiBeschreibungs: ["✉️➡️👥"]
      },
      {
        wortart: Wortart.Nomen,
        grundform: "Laden",
        emojiBeschreibungs: ["🏪🛍️"],
        genus: Genus.M
      }
    ]
  }
};

const gefallen = {
  "gefallen": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Verb,
        grundform: "gefallen",
        emojiBeschreibungs: ["👍"]
      }
    ]
  }
};

const wende = {
  "wende": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Nomen,
        grundform: "Wende",
        emojiBeschreibungs: ["🔄"],
        genus: Genus.F
      }
    ],
    [Match.Flexion]: [
      {
        wortart: Wortart.Verb,
        grundform: "wenden",
        emojiBeschreibungs: ["🔄", "👉💬"]
      }
    ]
  }
};

const wenden = {
  "wenden": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Verb,
        grundform: "wenden",
        emojiBeschreibungs: ["🔄"]
      },
      {
        wortart: Wortart.Verb,
        grundform: "wenden",
        emojiBeschreibungs: ["👉💬"]
      },
      {
        wortart: Wortart.Nomen,
        // Although the note "wenden" differs in ending from the canonical noun "Wende",
        // we now correct the spelling and treat it as the base form.
        grundform: "Wende",
        emojiBeschreibungs: ["🔄"],
        genus: Genus.F
      }
    ]
  }
};

const stapelbaren = {
  "stapelbaren": {
    [Match.Flexion]: [
      {
        wortart: Wortart.Adjektiv,
        grundform: "stapelbar",
        emojiBeschreibungs: ["📦"]
      }
    ]
  }
};

const vorbei = {
  "vorbei": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Praeposition,
        grundform: "vorbei",
        emojiBeschreibungs: ["🏃‍♂️💨"]
      }
    ],
    [Match.Flexion]: [
      {
        wortart: Wortart.Adverb,
        grundform: "vorbei",
        emojiBeschreibungs: ["🏁"],
        adverbCategory: [AdverbCategory.Lokal]
      }
    ]
  }
};

const mystery = `a – das Kissen hab' ich auch [[bekommen]].  
Aber es ist vorbei! [[vorbei]]! Und [[jetzt]] [[heul]] bitte nicht!  
Tschüs.  
Männer!`;

const shit = {
  [mystery]: {
    [Match.Unbekannt]: [
      {
        wortart: Wortart.Unbekannt,
        grundform: "Unbekannt",
        emojiBeschreibungs: ["❓"],
        comment: "Der Text ist kein einzelnes Wort und enthält keine bekannten Redewendungen."
      }
    ]
  }
};

const augeben = {
  "augeben": {
    [Match.Unbekannt]: [
      {
        wortart: Wortart.Unbekannt,
        grundform: "Unbekannt",
        emojiBeschreibungs: ["❓"],
        comment: "Ich kann deine Absicht nicht feststellen. Vielleicht hast du 'ausgeben' oder 'aufgeben' gemeint?"
      }
    ]
  }
};

const spazirengegangen = {
  "ging spaziren": {
    [Match.Flexion]: [
      {
        wortart: Wortart.Verb,
        grundform: "spazieren gehen",
        emojiBeschreibungs: ["🚶‍♂️"]
      }
    ]
  }
};

const spazierenGehen = {
  "spazieren gehen": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Verb,
        grundform: "spazieren gehen",
        emojiBeschreibungs: ["🚶‍♂️"]
      }
    ]
  }
};

const doch = {
  "doch": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Partikel,
        grundform: "doch",
        emojiBeschreibungs: ["💬"],
        partikelType: [PartikelType.Konnektiv]
      }
    ]
  }
};

const Redewendung1 = {
  "das eis zwischen sie ist gebrochen": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Redewendung,
        grundform: "Das Eis brechen",
        emojiBeschreibungs: ["❄️🧊"]
      }
    ]
  }
};

const schaffen = {
  "schaffen": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Verb,
        grundform: "schaffen",
        emojiBeschreibungs: ["💪✅"]
      },
      {
        wortart: Wortart.Verb,
        grundform: "schaffen",
        emojiBeschreibungs: ["✨🌍"]
      }
    ]
  }
};

const DieKuhIstNunVomEis = {
  "kuh ist nun vom eis": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Redewendung,
        grundform: "die Kuh ist vom Eis",
        emojiBeschreibungs: ["🐄🧊"]
      }
    ]
  }
};

const schafen = {
  "schafen": {
    [Match.Flexion]: [
      {
        wortart: Wortart.Nomen,
        grundform: "Schaf",
        emojiBeschreibungs: ["🐑"],
        genus: Genus.N
      }
    ]
  }
};

const mleken = {
  "mleken": {
    [Match.Tippfehler]: [
      {
        wortart: Wortart.Verb,
        grundform: "melken",
        emojiBeschreibungs: ["🐄"]
      }
    ]
  }
};

const melken = {
  "melken": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Verb,
        grundform: "melken",
        emojiBeschreibungs: ["🐄"]
      },
      {
        wortart: Wortart.Verb,
        grundform: "melken",
        emojiBeschreibungs: ["🐄"]
      }
    ]
  }
};

const bewegen = {
  "bewegen": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Verb,
        grundform: "bewegen",
        emojiBeschreibungs: ["💪➡️🪑"]
      },
      {
        wortart: Wortart.Verb,
        grundform: "bewegen",
        emojiBeschreibungs: ["💬➡️😢"]
      }
    ]
  }
};

const senden = {
  "senden": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Verb,
        grundform: "senden",
        emojiBeschreibungs: ["📤"]
      },
      {
        wortart: Wortart.Verb,
        grundform: "senden",
        emojiBeschreibungs: ["📡"]
      }
    ]
  }
};

const genau = {
  "genau": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Adverb,
        grundform: "genau",
        emojiBeschreibungs: ["✔️"],
        adverbCategory: [AdverbCategory.Modal]
      },
      {
        wortart: Wortart.Adjektiv,
        grundform: "genau",
        emojiBeschreibungs: ["✔️"]
      }
    ]
  }
};

const genauso = {
  "genauso": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Adverb,
        grundform: "genauso",
        emojiBeschreibungs: ["🤝"],
        adverbCategory: [AdverbCategory.Modal]
      }
    ]
  }
};

const fussballbegeistert = {
  "fussballbegeistert": {
    [Match.Tippfehler]: [
      {
        wortart: Wortart.Adjektiv,
        grundform: "fußballbegeistert",
        emojiBeschreibungs: ["⚽️🔥"]
      }
    ]
  }
};

const sofort = {
  "sofort": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Adverb,
        grundform: "sofort",
        emojiBeschreibungs: ["⏱️"],
        adverbCategory: [AdverbCategory.Temporal]
      }
    ]
  }
};

const zwar = {
  "zwar": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Partikel,
        grundform: "zwar",
        emojiBeschreibungs: ["🔗"],
        partikelType: [PartikelType.Konnektiv]
      }
    ]
  }
};

const weiss = {
  "weiss": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Nomen,
        grundform: "Weiß",
        emojiBeschreibungs: ["⚪️"],
        genus: Genus.N
      },
      {
        wortart: Wortart.Adjektiv,
        grundform: "weiß",
        emojiBeschreibungs: ["⚪️"]
      }
    ],
    [Match.Tippfehler]: [
      {
        wortart: Wortart.Verb,
        grundform: "wissen",
        emojiBeschreibungs: ["🧠"]
      }
    ]
  }
};

const wissen = {
  "wissen": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Verb,
        grundform: "wissen",
        emojiBeschreibungs: ["🧠"]
      },
      {
        wortart: Wortart.Nomen,
        grundform: "Wissen",
        emojiBeschreibungs: ["🧠"],
        genus: Genus.N
      }
    ]
  }
};

const erinern = {
  "erinern": {
    [Match.Tippfehler]: [
      {
        wortart: Wortart.Verb,
        grundform: "erinnern",
        emojiBeschreibungs: ["🧠"]
      }
    ]
  }
};

const erinnern = {
  "erinnern": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Verb,
        grundform: "erinnern",
        emojiBeschreibungs: ["🧠"]
      }
    ]
  }
};

const rechnen = {
  "rechnen": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Verb,
        grundform: "rechnen",
        emojiBeschreibungs: ["🧮"]
      }
    ]
  }
};

const glaubiger = {
  "glaubiger": {
    [Match.Tippfehler]: [
      {
        wortart: Wortart.Adjektiv,
        grundform: "gläubig",
        emojiBeschreibungs: ["🙏"]
      }
    ],
    [Match.Grundform]: [
      {
        wortart: Wortart.Nomen,
        grundform: "Gläubiger",
        emojiBeschreibungs: ["💰"],
        genus: Genus.M
      }
    ]
  }
};

const sie = {
  "sie": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Pronomen,
        grundform: "sie",
        emojiBeschreibungs: ["👩"],
        pronomenType: PronomenType.Personal,
        number: [Numerus.Einzahl],
        genera: [Genus.F]
      },
      {
        wortart: Wortart.Pronomen,
        grundform: "sie",
        emojiBeschreibungs: ["👥"],
        pronomenType: PronomenType.Personal,
        number: [Numerus.Mehrzahl]
      },
      {
        wortart: Wortart.Pronomen,
        grundform: "sie",
        emojiBeschreibungs: ["🧑‍💼"],
        pronomenType: PronomenType.Personal,
        number: [Numerus.Einzahl, Numerus.Mehrzahl]
      }
    ],
  }
};

const DasEisBrechen = {
  "eis zwischen ihnen ist gebrochen": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Redewendung,
        grundform: "das Eis brechen",
        emojiBeschreibungs: ["❄️🧊"]
      }
    ]
  }
};

const halbenMette = {
  "halben Miete": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Redewendung,
        grundform: "halbe Miete",
        emojiBeschreibungs: ["🔑🧩🎯"]
      }
    ]
  }
};

const ganzUndGar = {
  "ganz und gar": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Redewendung,
        grundform: "ganz und gar",
        emojiBeschreibungs: ["💯👌"]
      }
    ]
  }
};

const tomatenAufDenAugen = {
  "hast do tomaten auf den augen?": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Redewendung,
        grundform: "Tomaten auf den Augen haben",
        emojiBeschreibungs: ["🍅🙈🤷‍♂️"]
      }
    ]
  }
};

const baerenAufgebracht = {
  "und ihm einen bären aufzubinden?": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Redewendung,
        grundform: "Jemandem einen Bären aufbinden",
        emojiBeschreibungs: ["🐻🤥🙄"]
      }
    ]
  }
};

const durchUndDurch = {
  "durch und durch": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Redewendung,
        grundform: "durch und durch",
        emojiBeschreibungs: ["💯👌"]
      }
    ]
  }
};

const vollUndGanz = {
  "voll und ganz": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Redewendung,
        grundform: "voll und ganz",
        emojiBeschreibungs: ["🎯👌"]
      }
    ]
  }
};

const nullUndNichtig = {
  "null und nichtig": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Redewendung,
        grundform: "null und nichtig",
        emojiBeschreibungs: ["0️⃣🚫"]
      }
    ]
  }
};

const klippUndKlar = {
  "klipp und klar": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Redewendung,
        grundform: "klipp und klar",
        emojiBeschreibungs: ["✅"]
      }
    ]
  }
};

const reinUndGar = {
  "rein und gar": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Redewendung,
        grundform: "rein und gar",
        emojiBeschreibungs: ["✨👌"]
      }
    ]
  }
};

const molken = {
  "molken": {
    [Match.Tippfehler]: [
      {
        wortart: Wortart.Verb,
        grundform: "melken",
        emojiBeschreibungs: ["🐄"]
      }
    ],
    [Match.Grundform]: [
      {
        wortart: Wortart.Nomen,
        grundform: "Molke",
        emojiBeschreibungs: ["🥛"],
        genus: Genus.F
      }
    ]
  }
};

const schleifen = {
  "schleifen": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Verb,
        grundform: "schleifen",
        emojiBeschreibungs: ["⚙️✨"]
      },
      {
        wortart: Wortart.Verb,
        grundform: "schleifen",
        emojiBeschreibungs: ["🚶‍♂️💤"]
      },
      {
        wortart: Wortart.Nomen,
        // Even though the note is lower-case, for nouns we correct the form.
        grundform: "Schleife",
        emojiBeschreibungs: ["🎀"],
        genus: Genus.F
      }
    ]
  }
};

const mietschuldenfreiheitsbescheinigung = {
  "mietschuldenfreiheitsbescheinigung": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Nomen,
        grundform: "Mietschuldenfreiheitsbescheinigung",
        emojiBeschreibungs: ["🏠✅📄"],
        genus: Genus.F
      }
    ]
  }
};

const arbeitsunfaehigkeitsbescheinigung = {
  "arbeitsunfaehigkeitsbescheinigung": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Nomen,
        grundform: "Arbeitsunfaehigkeitsbescheinigung",
        emojiBeschreibungs: ["🤒🏥📄"],
        genus: Genus.F
      }
    ]
  }
};

const bundesverfassungsgericht = {
  "bundesverfassungsgericht": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Nomen,
        grundform: "Bundesverfassungsgericht",
        emojiBeschreibungs: ["⚖️🏛️📜"],
        genus: Genus.N
      }
    ]
  }
};

const bildungsurlaub = {
  "bildungsurlaub": {
    [Match.Grundform]: [
      {
        wortart: Wortart.Nomen,
        grundform: "Bildungsurlaub",
        emojiBeschreibungs: ["📚🏖️"],
        genus: Genus.M
      }
    ]
  }
};

export const tests = {
  ...molken,
  ...sie,
  ...glaubiger,
  ...genau,
  ...genauso,
  ...fussballbegeistert,
  ...sofort,
  ...zwar,
  ...weiss,
  ...erinern,
  ...erinnern,
  ...rechnen,
  ...nieser,
  ...sitz,
  ...sitzen,
  ...aufgepast, 
  ...untergen,
  ...Hoffungen,
  ...hangstauf,
  ...deutsch,
  ...hiemwerken,
  ...klares,
  ...Rechercheergbnisse,
  ...backen,
  ...unbandiges,
  ...See,
  ...trotz,
  ...mit,
  ...an,
  ...uber,
  ...selbst,
  ...umfaren,
  ...geoffnet,
  ...verfallen,
  ...schloss,
  ...gehobener,
  ...wahlwiese,
  ...deutschen,
  ...wende,
  ...stapelbaren,
  ...vorbei,
  ...spazirengegangen,
  ...spazierenGehen,
  ...doch,
  ...shit,
  ...laden,
  ...gefallen,
  ...Redewendung1,
  ...klar,
  ...mleken,
  ...bewegen,
  ...senden,
  ...DasEisBrechen,
  ...halbenMette,
  ...ganzUndGar,
  ...tomatenAufDenAugen,
  ...baerenAufgebracht,
  ...durchUndDurch,
  ...vollUndGanz,
  ...nullUndNichtig,
  ...klippUndKlar,
  ...reinUndGar,
  ...augeben,
  ...schafen,
  ...wissen,
  ...schaffen,
  ...DieKuhIstNunVomEis,
  ...verfall,
  ...derVerfall,
  ...trozdem,
  ...schleifen,
  ...mietschuldenfreiheitsbescheinigung,
  ...arbeitsunfaehigkeitsbescheinigung,
  ...bundesverfassungsgericht,
  ...bildungsurlaub,
  ...untergehen,
  ...aufgepasst,
  ...aufpassen,
  ...aufhängen,
  ...niesen,
  ...heimwerken,
  ...heimwerkst,
  ...wenden,
  ...melken,
};