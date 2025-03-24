import { Trennbarkeit, Regelmaessigkeit } from "prompts/endgame/zod/types";

const sitzen = {
  "sitzen": [
    {
      wortart: "Verb",
      rechtschreibung: "sitzen",
      grundform: "sitzen",
      emojiBeschreibungs: ["💺"],
      regelmaessigkeit: Regelmaessigkeit.Regelmaessig,
    }
  ]
};

const sitz = {
  "sitz": [
    {
      wortart: "Verb",
      rechtschreibung: "sitz",
      grundform: "sitzen",
      emojiBeschreibungs: ["💺"],
      regelmaessigkeit: Regelmaessigkeit.Regelmaessig,
    },
    {
      wortart: "Nomen",
      rechtschreibung: "Sitz",
      grundform: "Sitz",
      emojiBeschreibungs: ["🪑"],
      genus: "Maskulin",
      deklination: "Stark",
    }
  ]
};

const untergen = {
  "untergen": [
    {
      wortart: "Verb",
      rechtschreibung: "untergehen",
      grundform: "untergehen",
      emojiBeschreibungs: ["🌅"],
      trennbarkeit: Trennbarkeit.Trennbar,
      regelmaessigkeit: Regelmaessigkeit.Regelmaessig,
    }
  ]
};

const aufgepast = {
  "aufgepast": [
    {
      wortart: "Verb",
      rechtschreibung: "aufgepasst",
      grundform: "aufpassen",
      emojiBeschreibungs: ["👀"],
      trennbarkeit: Trennbarkeit.Trennbar,
      regelmaessigkeit: Regelmaessigkeit.Regelmaessig,
    }
  ]
};

const Hoffungen = {
  "Hoffungen": [
    {
      wortart: "Nomen",
      rechtschreibung: "Hoffnungen",
      grundform: "Hoffnung",
      emojiBeschreibungs: ["🙏"],
      genus: "Feminin",
      deklination: "Stark",
    }
  ]
};

const hangstauf = {
  "hangstauf": [
    {
      wortart: "Verb",
      rechtschreibung: "hängst auf",
      grundform: "aufhängen",
      emojiBeschreibungs: ["🖼️"],
      trennbarkeit: Trennbarkeit.Trennbar,
      regelmaessigkeit: Regelmaessigkeit.Regelmaessig,
    }
  ]
};

const nieser = {
  "nieser": [
    {
      wortart: "Verb",
      rechtschreibung: "niest",
      grundform: "niesen",
      emojiBeschreibungs: ["🤧"],
      regelmaessigkeit: Regelmaessigkeit.Regelmaessig,
    },
    {
      wortart: "Nomen",
      rechtschreibung: "Nieser",
      grundform: "Nieser",
      emojiBeschreibungs: ["🤧"],
      genus: "Maskulin",
      deklination: "Schwach",
    }
  ]
};

const klares = {
  "klares": [
    {
      wortart: "Adjektiv",
      rechtschreibung: "klares",
      grundform: "klar",
      emojiBeschreibungs: ["✨"],
    }
  ]
};

const klar = {
  "klar": [
    {
      wortart: "Adjektiv",
      rechtschreibung: "klar",
      grundform: "klar",
      emojiBeschreibungs: ["✨"],
    },
    {
      wortart: "Adverb",
      rechtschreibung: "klar",
      grundform: "klar",
      emojiBeschreibungs: ["✨"],
      category: ["Grad"],
    },
    {
      wortart: "Nomen",
      rechtschreibung: "Klare",
      grundform: "Klare",
      emojiBeschreibungs: ["✨"],
      genus: "Neutrum",
      deklination: "Stark",
    }
  ]
};

const hiemwerken = {
  "hiemwerken": [
    {
      wortart: "Verb",
      rechtschreibung: "heimwerken",
      grundform: "heimwerken",
      emojiBeschreibungs: ["🔨"],
      trennbarkeit: Trennbarkeit.Untrennbar,
      regelmaessigkeit: Regelmaessigkeit.Regelmaessig,
    },
    {
      wortart: "Nomen",
      rechtschreibung: "Heimwerken",
      grundform: "Heimwerk",
      emojiBeschreibungs: ["🛠"],
      genus: "Neutrum",
      deklination: "Stark",
    }
  ]
};

const unbandiges = {
  "unbandiges": [
    {
      wortart: "Adjektiv",
      rechtschreibung: "unbandiges",
      grundform: "unbändig",
      emojiBeschreibungs: ["🔥"],
    },
  ]
};

const backen = {
  "backen": [
    {
      wortart: "Verb",
      rechtschreibung: "backen",
      grundform: "backen",
      emojiBeschreibungs: ["🍞"],
      trennbarkeit: Trennbarkeit.Trennbar,
      regelmaessigkeit: Regelmaessigkeit.Unregelmaessig,
    },
    {
      wortart: "Verb",
      rechtschreibung: "backen",
      grundform: "backen",
      emojiBeschreibungs: ["🍞"],
      regelmaessigkeit: Regelmaessigkeit.Regelmaessig,
    },
    {
      wortart: "Nomen",
      rechtschreibung: "Backe",
      grundform: "Backe",
      emojiBeschreibungs: ["😊"],
      genus: "Feminin",
      deklination: "Stark",
    }
  ]
};

const Rechercheergbnisse = {
  "Rechercheergbnisse": [
    {
      wortart: "Nomen",
      rechtschreibung: "Rechercheergebnisse",
      grundform: "Rechercheergebnis",
      emojiBeschreibungs: ["🔍"],
      genus: "Neutrum",
      deklination: "Stark",
    }
  ]
};

const See = {
  "See": [
    {
      wortart: "Nomen",
      rechtschreibung: "See",
      grundform: "See",
      emojiBeschreibungs: ["🏞"],
      genus: "Maskulin",
      deklination: "Stark",
    },
    {
      wortart: "Nomen",
      rechtschreibung: "See",
      grundform: "See",
      emojiBeschreibungs: ["🌊"],
      genus: "Feminin",
      deklination: "Stark",
    }
  ]
};

const trotz = {
  "trotz": [
    {
      wortart: "Praeposition",
      rechtschreibung: "trotz",
      grundform: "trotz",
      emojiBeschreibungs: ["🛡"],
      possibleGoverningKasuss: ["Genitiv"],
    },
    {
      wortart: "Nomen",
      rechtschreibung: "Trotz",
      grundform: "Trotz",
      emojiBeschreibungs: ["😤"],
      genus: "Maskulin",
      deklination: "Stark",
      isProperNoun: false,
    },
    {
      wortart: "Verb",
      rechtschreibung: "trotzen",
      grundform: "trotzen",
      emojiBeschreibungs: ["😤"],
      regelmaessigkeit: Regelmaessigkeit.Regelmaessig,
    }
  ]
};

const mit = {
  "mit": [
    {
      wortart: "Praeposition",
      rechtschreibung: "mit",
      grundform: "mit",
      emojiBeschreibungs: ["🤝"],
      possibleGoverningKasuss: ["Dativ"],
    },
    {
      wortart: "Praefix",
      rechtschreibung: "mit",
      grundform: "mit",
      emojiBeschreibungs: ["🤝"],
    }
  ]
};

const an = {
  "an": [
    {
      wortart: "Praeposition",
      rechtschreibung: "an",
      grundform: "an",
      emojiBeschreibungs: ["📍"],
      possibleGoverningKasuss: ["Dativ", "Akkusativ"],
    },
    {
      wortart: "Praefix",
      rechtschreibung: "an",
      grundform: "an",
      emojiBeschreibungs: ["📍"],
    }
  ]
};

const selbst = {
  "selbst": [
    {
      wortart: "Adverb",
      rechtschreibung: "selbst",
      grundform: "selbst",
      emojiBeschreibungs: ["🙋"],
      category: ["Modal"],
    },
    {
      wortart: "Nomen",
      rechtschreibung: "Selbst",
      grundform: "Selbst",
      emojiBeschreibungs: ["🪞"],
      genus: "Neutrum",
      deklination: "Stark",
    },
  ]
};

const uber = {
  "uber": [
    {
      wortart: "Praeposition",
      rechtschreibung: "über",
      grundform: "über",
      emojiBeschreibungs: ["🔝"],
      possibleGoverningKasuss: ["Dativ", "Akkusativ"],
    },
    {
      wortart: "Praefix",
      rechtschreibung: "über",
      grundform: "über",
      emojiBeschreibungs: ["🔝"],
    },
    {
      wortart: "Nomen",
      rechtschreibung: "Uber",
      grundform: "Uber",
      emojiBeschreibungs: ["🏙️"],
      genus: "Neutrum",
      deklination: "Stark",
      isProperNoun: true,
    }
  ]
};

const umfaren = {
  "umfaren": [
    {
      wortart: "Verb",
      rechtschreibung: "umfahren",
      grundform: "umfahren",
      emojiBeschreibungs: ["🚗🔄"],
      trennbarkeit: Trennbarkeit.Trennbar,
      regelmaessigkeit: Regelmaessigkeit.Unregelmaessig,
    },
    {
      wortart: "Verb",
      rechtschreibung: "umfahren",
      grundform: "umfahren",
      emojiBeschreibungs: ["🚗💥"],
      trennbarkeit: Trennbarkeit.Untrennbar,
      regelmaessigkeit: Regelmaessigkeit.Unregelmaessig,
    },
    {
      wortart: "Nomen",
      rechtschreibung: "Umfahren",
      grundform: "Umfahrt",
      emojiBeschreibungs: ["🚗🔄"],
      genus: "Feminin",
      deklination: "Stark",
    }
  ]
};

const geoffnet = {
  "geoffnet": [
    {
      wortart: "PartizipialesAdjektiv",
      rechtschreibung: "geöffnet",
      grundform: "öffnen",
      emojiBeschreibungs: ["🚪👐"],
      partizipvariante: "P2",
    },
  ]
};

const verfallen = {
  "verfallen": [
    {
      wortart: "Verb",
      rechtschreibung: "verfallen",
      grundform: "verfallen",
      emojiBeschreibungs: ["🏚️"],
      trennbarkeit: Trennbarkeit.Untrennbar,
      regelmaessigkeit: Regelmaessigkeit.Unregelmaessig,
    },
    {
      wortart: "PartizipialesAdjektiv",
      rechtschreibung: "verfallen",
      grundform: "verfallen",
      emojiBeschreibungs: ["🏚️"],
      partizipvariante: "P2",
    }
  ]
};

const Schloss = {
  "Schloss": [
    {
      wortart: "Nomen",
      rechtschreibung: "Schloss",
      grundform: "Schloss",
      emojiBeschreibungs: ["🏰", "🔒"],
      genus: "Neutrum",
      deklination: "Stark",
      isProperNoun: false,
    },
    {
      wortart: "Verb",
      rechtschreibung: "schließen",
      grundform: "schließen",
      emojiBeschreibungs: ["🚪"],
      regelmaessigkeit: Regelmaessigkeit.Unregelmaessig,
    }
  ]
};

const gehobener = {
  "gehobener": [
    {
      wortart: "Adjektiv",
      rechtschreibung: "gehoben",
      grundform: "gehoben",
      emojiBeschreibungs: ["🎩"],
    }
  ]
};

const wahlwiese = {
  "wahlwiese": [
    {
      wortart: "Adverb",
      rechtschreibung: "wahlweise",
      grundform: "wahlweise",
      emojiBeschreibungs: ["🔀"],
      category: ["Modal"],
    }
  ]
};

const deutschen = {
  "deutschen": [
    {
      wortart: "Adjektiv",
      rechtschreibung: "deutschen",
      grundform: "deutsch",
      emojiBeschreibungs: ["🇩🇪"],
    },
    {
      wortart: "Nomen",
      rechtschreibung: "Deutsche",
      grundform: "Deutsche",
      emojiBeschreibungs: ["🇩🇪"],
      genus: "Neutrum",
      deklination: "Stark",
      isProperNoun: false,
    }
  ]
};

const deutsch = {
  "deutsch": [
    {
      wortart: "Adjektiv",
      rechtschreibung: "deutsch",
      grundform: "deutsch",
      emojiBeschreibungs: ["🇩🇪"],
    },
    {
      wortart: "Adverb",
      rechtschreibung: "deutsch",
      grundform: "deutsch",
      emojiBeschreibungs: ["🇩🇪"],
      category: ["Modal"],
    },
    {
      wortart: "Nomen",
      rechtschreibung: "Deutsche",
      grundform: "Deutsche",
      emojiBeschreibungs: ["🇩🇪"],
      genus: "Neutrum",
      deklination: "Stark",
    }
  ]
};

const Laden = {
  "Laden": [
    {
      wortart: "Verb",
      rechtschreibung: "laden",
      grundform: "laden",
      emojiBeschreibungs: ["📦"],
      regelmaessigkeit: Regelmaessigkeit.Unregelmaessig,
    },
    {
      wortart: "Nomen",
      rechtschreibung: "Laden",
      grundform: "Laden",
      emojiBeschreibungs: ["🏪"],
      genus: "Maskulin",
      deklination: "Stark",
      isProperNoun: false,
    }
  ]
};

const gefallen = {
  "gefallen": [
    {
      wortart: "Verb",
      rechtschreibung: "gefallen",
      grundform: "gefallen",
      emojiBeschreibungs: ["👍"],
      trennbarkeit: Trennbarkeit.Untrennbar,
      regelmaessigkeit: Regelmaessigkeit.Unregelmaessig,
    },
    {
      wortart: "PartizipialesAdjektiv",
      rechtschreibung: "gefallen",
      grundform: "gefallen",
      emojiBeschreibungs: ["👍"],
      partizipvariante: "P2",
    }
  ]
};

const Wende = {
  "Wende": [
    {
      wortart: "Nomen",
      rechtschreibung: "Wende",
      grundform: "Wende",
      emojiBeschreibungs: ["🔄"],
      genus: "Feminin",
      deklination: "Stark",
      isProperNoun: false,
    },
    {
      wortart: "Verb",
      rechtschreibung: "wende",
      grundform: "wenden",
      emojiBeschreibungs: ["🔄"],
      regelmaessigkeit: Regelmaessigkeit.Regelmaessig,
    },
    {
      wortart: "Verb",
      rechtschreibung: "wende",
      grundform: "wenden",
      emojiBeschreibungs: ["👉💬"],
      regelmaessigkeit: Regelmaessigkeit.Unregelmaessig,
    }
  ]
};

const stapelbaren = {
  "stapelbaren": [
    {
      wortart: "Adjektiv",
      rechtschreibung: "stapelbaren",
      grundform: "stapelbar",
      emojiBeschreibungs: ["📦"],
    }
  ]
};

const vorbei = {
  "vorbei": [
    {
      wortart: "Praeposition",
      rechtschreibung: "vorbei",
      grundform: "vorbei",
      emojiBeschreibungs: ["🏃‍♂️💨"],
    },
    {
      wortart: "Adverb",
      rechtschreibung: "vorbei",
      grundform: "vorbei",
      emojiBeschreibungs: ["🏁"],
      category: ["Lokal"],
    }
  ]
};

const mystery = `a – das Kissen hab' ich auch [[bekommen]].  
Aber es ist vorbei! [[vorbei]]! Und [[jetzt]] [[heul]] bitte nicht!  
Tschüs.  
Männer!`

const shit = {
  [`${mystery}`]: [
    {
      wortart: "Unbekannt", 
      rechtschreibung: "Unbekannt",
      grundform: "Unbekannt",
      emojiBeschreibungs: ["❓"],
      comment: "Der Text ist kein einzelnes Wort und enthält keine bekannten Redewendungen.",
    }
  ]
};

const augeben = {
  "augeben": [
    {
      wortart: "Unbekannt", 
      rechtschreibung: "Unbekannt",
      grundform: "Unbekannt",
      emojiBeschreibungs: ["❓"],
      comment: "Ich kann deine Absicht nicht feststellen. Vielleicht hast du [[ausgeben]] oder [[aufgeben]] gemeint?",
    }
  ]
};


const spazirengegangen = {
  "ging spaziren": [
    {
      wortart: "Verb",
      rechtschreibung: "ging spazieren",
      grundform: "spazieren gehen",
      emojiBeschreibungs: ["🚶‍♂️"],
      trennbarkeit: Trennbarkeit.Trennbar,
      regelmaessigkeit: Regelmaessigkeit.Unregelmaessig,
    }
  ]
};

const doch = {
  "doch": [
    {
      wortart: "Partikel",
      rechtschreibung: "doch",
      grundform: "doch",
      emojiBeschreibungs: ["💬"],
      partikelType: ["Konnektiv"],
    }
  ]
};

const Redewendung1 = {
  "Das Eis zwischen sie ist gebrochen": [
    {
      wortart: "Redewendung",
      rechtschreibung: "Das Eis brechen",
      grundform: "Das Eis brechen",
      emojiBeschreibungs: ["❄️🧊"],
    }
  ],
};


const schafen = {
  "schafen": [
    {
      wortart: "Verb",
      rechtschreibung: "schaffen",
      grundform: "schaffen",
      emojiBeschreibungs: ["💪✅"],
      regelmaessigkeit: Regelmaessigkeit.Regelmaessig,
    },
    {
      wortart: "Verb",
      rechtschreibung: "schaffen",
      grundform: "schaffen",
      emojiBeschreibungs: ["✨🌍"],
      regelmaessigkeit: Regelmaessigkeit.Unregelmaessig,
    },
    {
      wortart: "Nomen",
      rechtschreibung: "Schafen",
      grundform: "Schaf",
      emojiBeschreibungs: ["🐑"],
      genus: "Neutrum",
      deklination: "Stark",
    }
  ]
};

const mleken = {
  "mleken": [
    {
      wortart: "Verb",
      rechtschreibung: "melken",
      grundform: "melken",
      emojiBeschreibungs: ["🐄"],
      regelmaessigkeit: Regelmaessigkeit.Regelmaessig,
    },
    {
      wortart: "Verb",
      rechtschreibung: "melken",
      grundform: "melken",
      emojiBeschreibungs: ["🐄"],
      regelmaessigkeit: Regelmaessigkeit.Unregelmaessig,
    }
  ]
};

const bewegen = {
  "bewegen": [
    {
      wortart: "Verb",
      rechtschreibung: "bewegen",
      grundform: "bewegen",
      emojiBeschreibungs: ["💪➡️🪑"],
      regelmaessigkeit: Regelmaessigkeit.Regelmaessig,
    },
    {
      wortart: "Verb",
      rechtschreibung: "bewegen",
      grundform: "bewegen",
      emojiBeschreibungs: ["💬➡️😢"],
      regelmaessigkeit: Regelmaessigkeit.Unregelmaessig,
    },
  ]
};

const senden = {
  "senden": [
    {
      wortart: "Verb",
      rechtschreibung: "senden",
      grundform: "senden",
      emojiBeschreibungs: ["📤"],
      regelmaessigkeit: Regelmaessigkeit.Regelmaessig
    },
    {
      wortart: "Verb",
      rechtschreibung: "senden",
      grundform: "senden",
      emojiBeschreibungs: ["📡"],
      regelmaessigkeit: Regelmaessigkeit.Unregelmaessig
    }
  ]
};

const genau = {
  "genau": [
    {
      wortart: "Adverb",
      rechtschreibung: "genau",
      grundform: "genau",
      emojiBeschreibungs: ["✔️"],
      category: ["Modal"],
    },
    {
      wortart: "Adjektiv",
      rechtschreibung: "genau",
      grundform: "genau",
      emojiBeschreibungs: ["✔️"],
    }
  ]
};

const genauso = {
  "genauso": [
    {
      wortart: "Adverb",
      rechtschreibung: "genauso",
      grundform: "genauso",
      emojiBeschreibungs: ["🤝"],
      category: ["Modal"],
    }
  ]
};

const fussballbegeistert = {
  "fussballbegeistert": [
    {
      wortart: "Adjektiv",
      rechtschreibung: "fußballbegeistert",
      grundform: "fußballbegeistert",
      emojiBeschreibungs: ["⚽️🔥"],
    }
  ]
};

const sofort = {
  "sofort": [
    {
      wortart: "Adverb",
      rechtschreibung: "sofort",
      grundform: "sofort",
      emojiBeschreibungs: ["⏱️"],
      category: ["Temporal"],
    }
  ]
};

const zwar = {
  "zwar": [
    {
      wortart: "Partikel",
      rechtschreibung: "zwar",
      grundform: "zwar",
      emojiBeschreibungs: ["🔗"],
      partikelType: ["Konnektiv"],
    }
  ]
};

const Weiss = {
  "Weiss": [
    {
      wortart: "Verb",
      rechtschreibung: "weiß",
      grundform: "wissen",
      emojiBeschreibungs: ["🧠"],
      regelmaessigkeit: Regelmaessigkeit.Unregelmaessig
    },
    {
      wortart: "Nomen",
      rechtschreibung: "Weiß",
      grundform: "Weiß",
      emojiBeschreibungs: ["⚪️"],
      genus: "Neutrum",
      deklination: "Stark",
    },
    {
      wortart: "Adjektiv",
      rechtschreibung: "weiß",
      grundform: "weiß",
      emojiBeschreibungs: ["⚪️"],
    }
  ]
};

const wissen = {
  "wissen": [
    {
      wortart: "Verb",
      rechtschreibung: "weiß",
      grundform: "wissen",
      emojiBeschreibungs: ["🧠"],
      regelmaessigkeit: Regelmaessigkeit.Unregelmaessig
    },
    {
      wortart: "Nomen",
      rechtschreibung: "Wissen",
      grundform: "Wissen",
      emojiBeschreibungs: ["🧠"],
      genus: "Neutrum",
      deklination: "Stark"
    },
  ]
};

const erinern = {
  "erinern": [
    {
      wortart: "Verb",
      rechtschreibung: "erinnern",
      grundform: "erinnern",
      emojiBeschreibungs: ["🧠"],
      regelmaessigkeit: Regelmaessigkeit.Regelmaessig,
    }
  ]
};

const rechnen = {
  "rechnen": [
    {
      wortart: "Verb",
      rechtschreibung: "rechnen",
      grundform: "rechnen",
      emojiBeschreibungs: ["🧮"],
      regelmaessigkeit: Regelmaessigkeit.Regelmaessig,
    }
  ]
};

const glaubiger = {
  "glaubiger": [
    {
      wortart: "Adjektiv",
      rechtschreibung: "gläubiger",
      grundform: "gläubig",
      emojiBeschreibungs: ["🙏"],
    },
    {
      wortart: "Nomen",
      rechtschreibung: "Gläubiger",
      grundform: "Gläubiger",
      emojiBeschreibungs: ["💰"],
      genus: "Maskulin",
      deklination: "Stark",
    }
  ]
};

const sie = {
  "sie": [
    {
      wortart: "Pronomen",
      rechtschreibung: "sie",
      grundform: "sie",
      emojiBeschreibungs: ["👩"],
      pronomenType: "Personal",
      number: ["Einzahl"],
      genus: ["Feminin"],
    },
    {
      wortart: "Pronomen",
      rechtschreibung: "sie",
      grundform: "sie",
      emojiBeschreibungs: ["👥"],
      pronomenType: "Personal",
      number: ["Mehrzahl"],
    },
    {
      wortart: "Pronomen",
      rechtschreibung: "Sie",
      grundform: "sie",
      emojiBeschreibungs: ["🧑‍💼"],
      pronomenType: "Personal",
      number: ["Einzahl", "Mehrzahl"],
    }
  ]
};

const DasEisBrechen = {
  "eis zwischen ihnen ist gebrochen": [
    {
      wortart: "Redewendung",
      rechtschreibung: "das Eis zwischen ihnen ist gebrochen",
      grundform: "das Eis brechen",
      emojiBeschreibungs: ["🤝"],
    }
  ]
};

const halbenMette = {
  "halben Miete": [
    {
      wortart: "Redewendung",
      rechtschreibung: "halbe Miete",
      grundform: "die halbe Miete",
      emojiBeschreibungs: ["🔑🧩🎯"],
    }
  ]
};

const ganzUndGar = {
  "ganz und gar": [
    {
      wortart: "Redewendung",
      rechtschreibung: "ganz und gar",
      grundform: "ganz und gar",
      emojiBeschreibungs: ["💯👌"],
    }
  ]
};

const tomatenAufDenAugen = {
  "tomaten auf den Augen?": [
    {
      wortart: "Redewendung",
      rechtschreibung: "Tomaten auf den Augen?",
      grundform: "Tomaten auf den Augen haben",
      emojiBeschreibungs: ["🍅🙈🤷‍♂️"],
    }
  ]
};

const baerenAufgebracht = {
  "mir der Bär aufgebracht": [
    {
      wortart: "Redewendung",
      rechtschreibung: "Mir ist der Bär aufgebracht",
      grundform: "Einen Bären aufbinden",
      emojiBeschreibungs: ["🐻🤥🙄"],
    }
  ]
};

const durchUndDurch = {
  "durch und durch": [
    {
      wortart: "Redewendung",
      rechtschreibung: "durch und durch",
      grundform: "durch und durch",
      emojiBeschreibungs: ["💯👌"],
    }
  ]
};

const vollUndGanz = {
  "voll und ganz": [
    {
      wortart: "Redewendung",
      rechtschreibung: "voll und ganz",
      grundform: "voll und ganz",
      emojiBeschreibungs: ["🎯👌"],
    }
  ]
};

const nullUndNichtig = {
  "null und nichtig": [
    {
      wortart: "Redewendung",
      rechtschreibung: "null und nichtig",
      grundform: "null und nichtig",
      emojiBeschreibungs: ["0️⃣🚫"],
    }
  ]
};

const klippUndKlar = {
  "klipp und klar": [
    {
      wortart: "Redewendung",
      rechtschreibung: "klipp und klar",
      grundform: "klipp und klar",
      emojiBeschreibungs: ["✅"],
    }
  ]
};

const reinUndGar = {
  "rein und gar": [
    {
      wortart: "Redewendung",
      rechtschreibung: "rein und gar",
      grundform: "rein und gar",
      emojiBeschreibungs: ["✨👌"],
    }
  ]
};

const molken = {
  "molken": [
    {
      wortart: "Verb",
      rechtschreibung: "molken",
      grundform: "melken",
      emojiBeschreibungs: ["🐄"],
      regelmaessigkeit: Regelmaessigkeit.Unregelmaessig
    },
    {
      wortart: "Nomen",
      rechtschreibung: "Molken",
      grundform: "Molke",
      emojiBeschreibungs: ["🥛"],
      genus: "Feminin",
      deklination: "Stark",
    }
  ]
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
  ...Weiss,
  ...erinern,
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
  ...Schloss,
  ...gehobener,
  ...wahlwiese,
  ...deutschen,
  ...Wende,
  ...stapelbaren,
  ...vorbei,
  ...spazirengegangen,
  ...doch,
  ...shit,
  ...Laden,
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
};


// export const b = `<examples>` + Object.entries(a).map(([k, v]) => `<example><note>${k.trim()}</note><grundforms>${(v)}</grundforms>`.replaceAll("\n      ", "").replaceAll(",  ", ",").replaceAll("\n    ", "").replaceAll("{  ", "{").replaceAll('>,<', '><').replaceAll(", ", ",").replaceAll(": ", ":").replaceAll("  \n  ","").replaceAll("\n]","]") + `</example>`) + `</examples>`;