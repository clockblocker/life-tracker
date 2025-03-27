import { Morphem, Regelmaessigkeit, Steigerungsfaehigkeit, Vergleichsgrad, Wortart } from "prompts/endgame/zod/types";

const gut = {
  "gut": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "gut",
      [Vergleichsgrad.Komparativ]: "bess",
      [Vergleichsgrad.Superlativ]: "best",
    },
    regelmaessigkeit: Regelmaessigkeit.Unregelmaessig,
    steigerungsfaehigkeit: Steigerungsfaehigkeit.Steigerungsfaehig,
  }]
};

const gross = {
  "groß": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "groß",
      [Vergleichsgrad.Komparativ]: "größ",
      [Vergleichsgrad.Superlativ]: "größt",
    },
    regelmaessigkeit: Regelmaessigkeit.Unregelmaessig,
    steigerungsfaehigkeit: Steigerungsfaehigkeit.Steigerungsfaehig,
  }]
};

const klein = {
  "klein": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "klein",
      [Vergleichsgrad.Komparativ]: "klein",
      [Vergleichsgrad.Superlativ]: "kleinst",
    },
    regelmaessigkeit: Regelmaessigkeit.Regelmaessig,
    steigerungsfaehigkeit: Steigerungsfaehigkeit.Steigerungsfaehig,
  }]
};

const aussehend = {
  "aussehend": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "aussehend",
    },
    regelmaessigkeit: Regelmaessigkeit.Regelmaessig,
    steigerungsfaehigkeit: Steigerungsfaehigkeit.Unsteigerungsfaehig,
  }]
};

const tot = {
  "tot": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "tot",
    },
    regelmaessigkeit: Regelmaessigkeit.Regelmaessig,
    steigerungsfaehigkeit: Steigerungsfaehigkeit.Unsteigerungsfaehig,
  }]
};

const fleissig = {
  "fleißig": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "fleißig",
      [Vergleichsgrad.Komparativ]: "fleißig",
      [Vergleichsgrad.Superlativ]: "fleißigst",
    },
    regelmaessigkeit: Regelmaessigkeit.Regelmaessig,
    steigerungsfaehigkeit: Steigerungsfaehigkeit.Steigerungsfaehig,
  }]
};

const selbstbewusst = {
  "selbstbewusst": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "selbstbewusst",
      [Vergleichsgrad.Komparativ]: "selbstbewusst",
      [Vergleichsgrad.Superlativ]: "selbstbewusstest",
    },
    regelmaessigkeit: Regelmaessigkeit.Regelmaessig,
    steigerungsfaehigkeit: Steigerungsfaehigkeit.Steigerungsfaehig,
  }]
};

const hoch = {
  "hoch": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "hoch",
      [Vergleichsgrad.Komparativ]: "höh",
      [Vergleichsgrad.Superlativ]: "höchst",
    },
    regelmaessigkeit: Regelmaessigkeit.Unregelmaessig,
    steigerungsfaehigkeit: Steigerungsfaehigkeit.Steigerungsfaehig,
  }]
};

const langsam = {
  "langsam": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "langsam",
      [Vergleichsgrad.Komparativ]: "langsam",
      [Vergleichsgrad.Superlativ]: "langsamst",
    },
    regelmaessigkeit: Regelmaessigkeit.Regelmaessig,
    steigerungsfaehigkeit: Steigerungsfaehigkeit.Steigerungsfaehig,
  }]
};

const fromm = {
  "fromm": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "fromm",
      [Vergleichsgrad.Komparativ]: "fromm",
      [Vergleichsgrad.Superlativ]: "frommst",
    },
    regelmaessigkeit: Regelmaessigkeit.Regelmaessig,
    steigerungsfaehigkeit: Steigerungsfaehigkeit.Steigerungsfaehig,
  },
  {
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "fromm",
      [Vergleichsgrad.Komparativ]: "frömm",
      [Vergleichsgrad.Superlativ]: "frömmst",
    },
    regelmaessigkeit: Regelmaessigkeit.Unregelmaessig,
    steigerungsfaehigkeit: Steigerungsfaehigkeit.Steigerungsfaehig,
  }]
};

const glatt = {
  "glatt": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "glatt",
      [Vergleichsgrad.Komparativ]: "glatt",
      [Vergleichsgrad.Superlativ]: "glattst",
    },
    regelmaessigkeit: Regelmaessigkeit.Regelmaessig,
    steigerungsfaehigkeit: Steigerungsfaehigkeit.Steigerungsfaehig,
  }, 
  {
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "glatt",
      [Vergleichsgrad.Komparativ]: "glätt",
      [Vergleichsgrad.Superlativ]: "glättst",
    },
    regelmaessigkeit: Regelmaessigkeit.Unregelmaessig,
    steigerungsfaehigkeit: Steigerungsfaehigkeit.Steigerungsfaehig,
  }]
};

const arg = {
  "arg": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "arg",
      [Vergleichsgrad.Komparativ]: "ärg",
      [Vergleichsgrad.Superlativ]: "ärgst",
    },
    regelmaessigkeit: Regelmaessigkeit.Unregelmaessig,
    steigerungsfaehigkeit: Steigerungsfaehigkeit.Steigerungsfaehig,
  }]
};

const bange = {
  "bange": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "bange",
      [Vergleichsgrad.Komparativ]: "bang",
      [Vergleichsgrad.Superlativ]: "bangst",
    },
    regelmaessigkeit: Regelmaessigkeit.Unregelmaessig,
    steigerungsfaehigkeit: Steigerungsfaehigkeit.Steigerungsfaehig,
  },
  {
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "bange",
      [Vergleichsgrad.Komparativ]: "bäng",
      [Vergleichsgrad.Superlativ]: "bängst",
    },
    regelmaessigkeit: Regelmaessigkeit.Unregelmaessig,
    steigerungsfaehigkeit: Steigerungsfaehigkeit.Steigerungsfaehig,
  }]
};

const blass = {
  "blass": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "blass",
      [Vergleichsgrad.Komparativ]: "blass",
      [Vergleichsgrad.Superlativ]: "blassest",
    },
    regelmaessigkeit: Regelmaessigkeit.Unregelmaessig,
    steigerungsfaehigkeit: Steigerungsfaehigkeit.Steigerungsfaehig,
  },
  {
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "blass",
      [Vergleichsgrad.Komparativ]: "bläss",
      [Vergleichsgrad.Superlativ]: "blässest",
    },
    regelmaessigkeit: Regelmaessigkeit.Unregelmaessig,
    steigerungsfaehigkeit: Steigerungsfaehigkeit.Steigerungsfaehig,
  }]
};

const dumm = {
  "dumm": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "dumm",
      [Vergleichsgrad.Komparativ]: "dümm",
      [Vergleichsgrad.Superlativ]: "dümmst",
    },
    regelmaessigkeit: Regelmaessigkeit.Unregelmaessig,
    steigerungsfaehigkeit: Steigerungsfaehigkeit.Steigerungsfaehig,
  }]
};

const gesund = {
  "gesund": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "gesund",
      [Vergleichsgrad.Komparativ]: "gesünd",
      [Vergleichsgrad.Superlativ]: "gesündest",
    },
    regelmaessigkeit: Regelmaessigkeit.Unregelmaessig,
    steigerungsfaehigkeit: Steigerungsfaehigkeit.Steigerungsfaehig,
  },
  {
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "gesund",
      [Vergleichsgrad.Komparativ]: "gesund",
      [Vergleichsgrad.Superlativ]: "gesundest",
    },
    regelmaessigkeit: Regelmaessigkeit.Regelmaessig,
    steigerungsfaehigkeit: Steigerungsfaehigkeit.Steigerungsfaehig,
  }]
};

const grob = {
  "grob": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "grob",
      [Vergleichsgrad.Komparativ]: "gröb",
      [Vergleichsgrad.Superlativ]: "gröbst",
    },
    regelmaessigkeit: Regelmaessigkeit.Unregelmaessig,
    steigerungsfaehigkeit: Steigerungsfaehigkeit.Steigerungsfaehig,
  }]
};

const karg = {
  "karg": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "karg",
      [Vergleichsgrad.Komparativ]: "karg",
      [Vergleichsgrad.Superlativ]: "kargst",
    },
    regelmaessigkeit: Regelmaessigkeit.Regelmaessig,
    steigerungsfaehigkeit: Steigerungsfaehigkeit.Steigerungsfaehig,
  },
  {
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "karg",
      [Vergleichsgrad.Komparativ]: "kärg",
      [Vergleichsgrad.Superlativ]: "kärgst",
    },
    regelmaessigkeit: Regelmaessigkeit.Unregelmaessig,
    steigerungsfaehigkeit: Steigerungsfaehigkeit.Steigerungsfaehig,
  }]
};

const klug = {
  "klug": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "klug",
      [Vergleichsgrad.Komparativ]: "klüg",
      [Vergleichsgrad.Superlativ]: "klügst",
    },
    regelmaessigkeit: Regelmaessigkeit.Unregelmaessig,
    steigerungsfaehigkeit: Steigerungsfaehigkeit.Steigerungsfaehig,
  }]
};

const krank = {
  "krank": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "krank",
      [Vergleichsgrad.Komparativ]: "kränk",
      [Vergleichsgrad.Superlativ]: "kränkst",
    },
    regelmaessigkeit: Regelmaessigkeit.Unregelmaessig,
    steigerungsfaehigkeit: Steigerungsfaehigkeit.Steigerungsfaehig,
  }]
};

const nah = {
  "nah": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "nah",
      [Vergleichsgrad.Komparativ]: "näh",
      [Vergleichsgrad.Superlativ]: "nächst",
    },
    regelmaessigkeit: Regelmaessigkeit.Unregelmaessig,
    steigerungsfaehigkeit: Steigerungsfaehigkeit.Steigerungsfaehig,
  }]
};

const nass = {
  "nass": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "nass",
      [Vergleichsgrad.Komparativ]: "nass",
      [Vergleichsgrad.Superlativ]: "nassest",
    },
    regelmaessigkeit: Regelmaessigkeit.Unregelmaessig,
    steigerungsfaehigkeit: Steigerungsfaehigkeit.Steigerungsfaehig,
  },
  {
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "nass",
      [Vergleichsgrad.Komparativ]: "näss",
      [Vergleichsgrad.Superlativ]: "nässest",
    },
    regelmaessigkeit: Regelmaessigkeit.Unregelmaessig,
    steigerungsfaehigkeit: Steigerungsfaehigkeit.Steigerungsfaehig,
  }]
};

const schmal = {
  "schmal": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "schmal",
      [Vergleichsgrad.Komparativ]: "schmäl",
      [Vergleichsgrad.Superlativ]: "schmälst",
    },
    regelmaessigkeit: Regelmaessigkeit.Unregelmaessig,
    steigerungsfaehigkeit: Steigerungsfaehigkeit.Steigerungsfaehig,
  },
  {
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "schmal",
      [Vergleichsgrad.Komparativ]: "schmal",
      [Vergleichsgrad.Superlativ]: "schmalst",
    },
    regelmaessigkeit: Regelmaessigkeit.Regelmaessig,
    steigerungsfaehigkeit: Steigerungsfaehigkeit.Steigerungsfaehig,
  }]
};

const schön = {
  "schön": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "schön",
      [Vergleichsgrad.Komparativ]: "schön",
      [Vergleichsgrad.Superlativ]: "schönst",
    },
    regelmaessigkeit: Regelmaessigkeit.Unregelmaessig,
    steigerungsfaehigkeit: Steigerungsfaehigkeit.Steigerungsfaehig,
  }]
};

const schwarz = {
  "schwarz": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "schwarz",
      [Vergleichsgrad.Komparativ]: "schwärz",
      [Vergleichsgrad.Superlativ]: "schwärzest",
    },
    regelmaessigkeit: Regelmaessigkeit.Unregelmaessig,
    steigerungsfaehigkeit: Steigerungsfaehigkeit.Steigerungsfaehig,
  }]
};

const teuer = {
  "teu": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "teu",
      [Vergleichsgrad.Komparativ]: "teur",
      [Vergleichsgrad.Superlativ]: "teuerst",
    },
    regelmaessigkeit: Regelmaessigkeit.Regelmaessig,
    steigerungsfaehigkeit: Steigerungsfaehigkeit.Steigerungsfaehig,
  }]
};

const viel = {
  "viel": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "viel",
      [Vergleichsgrad.Komparativ]: "mehr",
      [Vergleichsgrad.Superlativ]: "meist",
    },
    regelmaessigkeit: Regelmaessigkeit.Unregelmaessig,
    steigerungsfaehigkeit: Steigerungsfaehigkeit.Steigerungsfaehig,
  }]
};

const wenig = {
  "wenig": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "wenig",
      [Vergleichsgrad.Komparativ]: "wenig",
      [Vergleichsgrad.Superlativ]: "wenigst",
    },
    regelmaessigkeit: Regelmaessigkeit.Unregelmaessig,
    steigerungsfaehigkeit: Steigerungsfaehigkeit.Steigerungsfaehig,
  },
  {
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "wenig",
      [Vergleichsgrad.Komparativ]: "mind",
      [Vergleichsgrad.Superlativ]: "mindest",
    },
    regelmaessigkeit: Regelmaessigkeit.Unregelmaessig,
    steigerungsfaehigkeit: Steigerungsfaehigkeit.Steigerungsfaehig,
  }]
};

const wild = {
  "wild": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "wild",
      [Vergleichsgrad.Komparativ]: "wild",
      [Vergleichsgrad.Superlativ]: "wildest",
    },
    regelmaessigkeit: Regelmaessigkeit.Regelmaessig,
    steigerungsfaehigkeit: Steigerungsfaehigkeit.Steigerungsfaehig,
  }]
};

export const tests = {
  ...arg,
  ...bange,
  ...blass,
  ...dumm,
  ...gesund,
  ...grob,
  ...karg,
  ...klug,
  ...krank,
  ...nah,
  ...nass,
  ...schmal,
  ...schön,
  ...schwarz,
  ...teuer,
  ...viel,
  ...wenig,
  ...wild,
  ...gut,
  ...gross,
  ...klein,
  ...aussehend,
  ...tot,
  ...fleissig,
  ...selbstbewusst,
  ...hoch,
  ...langsam,
  ...fromm,
  ...glatt,
};

