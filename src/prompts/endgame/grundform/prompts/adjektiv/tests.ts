import { Regelmaessigkeit, Steigerungsfaehigkeit, Vergleichsgrad } from "prompts/endgame/zod/types";

const gut = {
  "gut": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "gut",
      [Vergleichsgrad.Komparativ]: "bess",
      [Vergleichsgrad.Superlativ]: "best",
    },
    regelmaessig: false,
    steigerungsfaehig: true,
  }]
};

const gross = {
  "groß": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "groß",
      [Vergleichsgrad.Komparativ]: "größ",
      [Vergleichsgrad.Superlativ]: "größt",
    },
    regelmaessig: false,
    steigerungsfaehig: true,
  }]
};

const klein = {
  "klein": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "klein",
      [Vergleichsgrad.Komparativ]: "klein",
      [Vergleichsgrad.Superlativ]: "kleinst",
    },
    regelmaessig: true,
    steigerungsfaehig: true,
  }]
};

const aussehend = {
  "aussehend": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "aussehend",
    },
    regelmaessig: true,
    steigerungsfaehig: false,
  }]
};

const tot = {
  "tot": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "tot",
    },
    regelmaessig: true,
    steigerungsfaehig: false,
  }]
};

const fleissig = {
  "fleißig": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "fleißig",
      [Vergleichsgrad.Komparativ]: "fleißig",
      [Vergleichsgrad.Superlativ]: "fleißigst",
    },
    regelmaessig: true,
    steigerungsfaehig: true,
  }]
};

const selbstbewusst = {
  "selbstbewusst": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "selbstbewusst",
      [Vergleichsgrad.Komparativ]: "selbstbewusst",
      [Vergleichsgrad.Superlativ]: "selbstbewusstest",
    },
    regelmaessig: true,
    steigerungsfaehig: true,
  }]
};

const hoch = {
  "hoch": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "hoch",
      [Vergleichsgrad.Komparativ]: "höh",
      [Vergleichsgrad.Superlativ]: "höchst",
    },
    regelmaessig: false,
    steigerungsfaehig: true,
  }]
};

const langsam = {
  "langsam": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "langsam",
      [Vergleichsgrad.Komparativ]: "langsam",
      [Vergleichsgrad.Superlativ]: "langsamst",
    },
    regelmaessig: true,
    steigerungsfaehig: true,
  }]
};

const fromm = {
  "fromm": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "fromm",
      [Vergleichsgrad.Komparativ]: "fromm",
      [Vergleichsgrad.Superlativ]: "frommst",
    },
    regelmaessig: true,
    steigerungsfaehig: true,
  },
  {
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "fromm",
      [Vergleichsgrad.Komparativ]: "frömm",
      [Vergleichsgrad.Superlativ]: "frömmst",
    },
    regelmaessig: false,
    steigerungsfaehig: true,
  }]
};

const glatt = {
  "glatt": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "glatt",
      [Vergleichsgrad.Komparativ]: "glatt",
      [Vergleichsgrad.Superlativ]: "glattst",
    },
    regelmaessig: true,
    steigerungsfaehig: true,
  }, 
  {
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "glatt",
      [Vergleichsgrad.Komparativ]: "glätt",
      [Vergleichsgrad.Superlativ]: "glättst",
    },
    regelmaessig: false,
    steigerungsfaehig: true,
  }]
};

const arg = {
  "arg": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "arg",
      [Vergleichsgrad.Komparativ]: "ärg",
      [Vergleichsgrad.Superlativ]: "ärgst",
    },
    regelmaessig: false,
    steigerungsfaehig: true,
  }]
};

const bange = {
  "bange": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "bange",
      [Vergleichsgrad.Komparativ]: "bang",
      [Vergleichsgrad.Superlativ]: "bangst",
    },
    regelmaessig: false,
    steigerungsfaehig: true,
  },
  {
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "bange",
      [Vergleichsgrad.Komparativ]: "bäng",
      [Vergleichsgrad.Superlativ]: "bängst",
    },
    regelmaessig: false,
    steigerungsfaehig: true,
  }]
};

const blass = {
  "blass": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "blass",
      [Vergleichsgrad.Komparativ]: "blass",
      [Vergleichsgrad.Superlativ]: "blassest",
    },
    regelmaessig: false,
    steigerungsfaehig: true,
  },
  {
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "blass",
      [Vergleichsgrad.Komparativ]: "bläss",
      [Vergleichsgrad.Superlativ]: "blässest",
    },
    regelmaessig: false,
    steigerungsfaehig: true,
  }]
};

const dumm = {
  "dumm": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "dumm",
      [Vergleichsgrad.Komparativ]: "dümm",
      [Vergleichsgrad.Superlativ]: "dümmst",
    },
    regelmaessig: false,
    steigerungsfaehig: true,
  }]
};

const gesund = {
  "gesund": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "gesund",
      [Vergleichsgrad.Komparativ]: "gesünd",
      [Vergleichsgrad.Superlativ]: "gesündest",
    },
    regelmaessig: false,
    steigerungsfaehig: true,
  },
  {
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "gesund",
      [Vergleichsgrad.Komparativ]: "gesund",
      [Vergleichsgrad.Superlativ]: "gesundest",
    },
    regelmaessig: true,
    steigerungsfaehig: true,
  }]
};

const grob = {
  "grob": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "grob",
      [Vergleichsgrad.Komparativ]: "gröb",
      [Vergleichsgrad.Superlativ]: "gröbst",
    },
    regelmaessig: false,
    steigerungsfaehig: true,
  }]
};

const karg = {
  "karg": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "karg",
      [Vergleichsgrad.Komparativ]: "karg",
      [Vergleichsgrad.Superlativ]: "kargst",
    },
    regelmaessig: true,
    steigerungsfaehig: true,
  },
  {
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "karg",
      [Vergleichsgrad.Komparativ]: "kärg",
      [Vergleichsgrad.Superlativ]: "kärgst",
    },
    regelmaessig: false,
    steigerungsfaehig: true,
  }]
};

const klug = {
  "klug": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "klug",
      [Vergleichsgrad.Komparativ]: "klüg",
      [Vergleichsgrad.Superlativ]: "klügst",
    },
    regelmaessig: false,
    steigerungsfaehig: true,
  }]
};

const krank = {
  "krank": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "krank",
      [Vergleichsgrad.Komparativ]: "kränk",
      [Vergleichsgrad.Superlativ]: "kränkst",
    },
    regelmaessig: false,
    steigerungsfaehig: true,
  }]
};

const nah = {
  "nah": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "nah",
      [Vergleichsgrad.Komparativ]: "näh",
      [Vergleichsgrad.Superlativ]: "nächst",
    },
    regelmaessig: false,
    steigerungsfaehig: true,
  }]
};

const nass = {
  "nass": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "nass",
      [Vergleichsgrad.Komparativ]: "nass",
      [Vergleichsgrad.Superlativ]: "nassest",
    },
    regelmaessig: false,
    steigerungsfaehig: true,
  },
  {
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "nass",
      [Vergleichsgrad.Komparativ]: "näss",
      [Vergleichsgrad.Superlativ]: "nässest",
    },
    regelmaessig: false,
    steigerungsfaehig: true,
  }]
};

const schmal = {
  "schmal": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "schmal",
      [Vergleichsgrad.Komparativ]: "schmäl",
      [Vergleichsgrad.Superlativ]: "schmälst",
    },
    regelmaessig: false,
    steigerungsfaehig: true,
  },
  {
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "schmal",
      [Vergleichsgrad.Komparativ]: "schmal",
      [Vergleichsgrad.Superlativ]: "schmalst",
    },
    regelmaessig: true,
    steigerungsfaehig: true,
  }]
};

const schön = {
  "schön": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "schön",
      [Vergleichsgrad.Komparativ]: "schön",
      [Vergleichsgrad.Superlativ]: "schönst",
    },
    regelmaessig: false,
    steigerungsfaehig: true,
  }]
};

const schwarz = {
  "schwarz": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "schwarz",
      [Vergleichsgrad.Komparativ]: "schwärz",
      [Vergleichsgrad.Superlativ]: "schwärzest",
    },
    regelmaessig: false,
    steigerungsfaehig: true,
  }]
};

const teuer = {
  "teu": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "teu",
      [Vergleichsgrad.Komparativ]: "teur",
      [Vergleichsgrad.Superlativ]: "teuerst",
    },
    regelmaessig: true,
    steigerungsfaehig: true,
  }]
};

const viel = {
  "viel": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "viel",
      [Vergleichsgrad.Komparativ]: "mehr",
      [Vergleichsgrad.Superlativ]: "meist",
    },
    regelmaessig: false,
    steigerungsfaehig: true,
  }]
};

const wenig = {
  "wenig": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "wenig",
      [Vergleichsgrad.Komparativ]: "wenig",
      [Vergleichsgrad.Superlativ]: "wenigst",
    },
    regelmaessig: false,
    steigerungsfaehig: true,
  },
  {
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "wenig",
      [Vergleichsgrad.Komparativ]: "mind",
      [Vergleichsgrad.Superlativ]: "mindest",
    },
    regelmaessig: false,
    steigerungsfaehig: true,
  }]
};

const wild = {
  "wild": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "wild",
      [Vergleichsgrad.Komparativ]: "wild",
      [Vergleichsgrad.Superlativ]: "wildest",
    },
    regelmaessig: true,
    steigerungsfaehig: true,
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

