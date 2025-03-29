import { Regelmaessigkeit, Steigerungsfaehigkeit, Vergleichsgrad } from "prompts/endgame/zod/types";

const gut = {
  "gut": [{
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "gut",
      [Vergleichsgrad.Komparativ]: "besser",
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
      [Vergleichsgrad.Komparativ]: "größer",
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
      [Vergleichsgrad.Komparativ]: "kleiner",
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
      [Vergleichsgrad.Komparativ]: "fleißiger",
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
      [Vergleichsgrad.Komparativ]: "selbstbewusster",
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
      [Vergleichsgrad.Komparativ]: "höher",
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
      [Vergleichsgrad.Komparativ]: "langsamer",
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
      [Vergleichsgrad.Komparativ]: "frommer",
      [Vergleichsgrad.Superlativ]: "frommst",
    },
    regelmaessig: true,
    steigerungsfaehig: true,
  },
  {
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "fromm",
      [Vergleichsgrad.Komparativ]: "frömmer",
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
      [Vergleichsgrad.Komparativ]: "glatter",
      [Vergleichsgrad.Superlativ]: "glattst",
    },
    regelmaessig: true,
    steigerungsfaehig: true,
  }, 
  {
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "glatt",
      [Vergleichsgrad.Komparativ]: "glätter",
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
      [Vergleichsgrad.Komparativ]: "ärger",
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
      [Vergleichsgrad.Komparativ]: "banger",
      [Vergleichsgrad.Superlativ]: "bangst",
    },
    regelmaessig: false,
    steigerungsfaehig: true,
  },
  {
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "bange",
      [Vergleichsgrad.Komparativ]: "bänger",
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
      [Vergleichsgrad.Komparativ]: "blasser",
      [Vergleichsgrad.Superlativ]: "blassest",
    },
    regelmaessig: false,
    steigerungsfaehig: true,
  },
  {
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "blass",
      [Vergleichsgrad.Komparativ]: "blässer",
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
      [Vergleichsgrad.Komparativ]: "dümmer",
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
      [Vergleichsgrad.Komparativ]: "gesünder",
      [Vergleichsgrad.Superlativ]: "gesündest",
    },
    regelmaessig: false,
    steigerungsfaehig: true,
  },
  {
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "gesund",
      [Vergleichsgrad.Komparativ]: "gesunder",
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
      [Vergleichsgrad.Komparativ]: "gröber",
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
      [Vergleichsgrad.Komparativ]: "karger",
      [Vergleichsgrad.Superlativ]: "kargst",
    },
    regelmaessig: true,
    steigerungsfaehig: true,
  },
  {
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "karg",
      [Vergleichsgrad.Komparativ]: "kärger",
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
      [Vergleichsgrad.Komparativ]: "klüger",
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
      [Vergleichsgrad.Komparativ]: "kränker",
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
      [Vergleichsgrad.Komparativ]: "näher",
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
      [Vergleichsgrad.Komparativ]: "nasser",
      [Vergleichsgrad.Superlativ]: "nassest",
    },
    regelmaessig: false,
    steigerungsfaehig: true,
  },
  {
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "nass",
      [Vergleichsgrad.Komparativ]: "nässer",
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
      [Vergleichsgrad.Komparativ]: "schmäler",
      [Vergleichsgrad.Superlativ]: "schmälst",
    },
    regelmaessig: false,
    steigerungsfaehig: true,
  },
  {
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "schmal",
      [Vergleichsgrad.Komparativ]: "schmaler",
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
      [Vergleichsgrad.Komparativ]: "schöner",
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
      [Vergleichsgrad.Komparativ]: "schwärzer",
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
      [Vergleichsgrad.Komparativ]: "teurer",
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
      [Vergleichsgrad.Komparativ]: "mehrer",
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
      [Vergleichsgrad.Komparativ]: "weniger",
      [Vergleichsgrad.Superlativ]: "wenigst",
    },
    regelmaessig: false,
    steigerungsfaehig: true,
  },
  {
    adjektivstamm: {
      [Vergleichsgrad.Positiv]: "wenig",
      [Vergleichsgrad.Komparativ]: "minder",
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
      [Vergleichsgrad.Komparativ]: "wilder",
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

