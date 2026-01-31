export interface NBATeamInfo {
  name: string;
  abbreviation: string;
  primaryColor: string;
  secondaryColor: string;
}

export const NBA_TEAMS: Record<string, NBATeamInfo> = {
  // Atlantic Division
  celtics: {
    name: "Celtics",
    abbreviation: "BOS",
    primaryColor: "#007A33",
    secondaryColor: "#BA9653",
  },
  nets: {
    name: "Nets",
    abbreviation: "BKN",
    primaryColor: "#000000",
    secondaryColor: "#FFFFFF",
  },
  knicks: {
    name: "Knicks",
    abbreviation: "NYK",
    primaryColor: "#006BB6",
    secondaryColor: "#F58426",
  },
  sixers: {
    name: "76ers",
    abbreviation: "PHI",
    primaryColor: "#006BB6",
    secondaryColor: "#ED174C",
  },
  raptors: {
    name: "Raptors",
    abbreviation: "TOR",
    primaryColor: "#CE1141",
    secondaryColor: "#000000",
  },

  // Central Division
  bulls: {
    name: "Bulls",
    abbreviation: "CHI",
    primaryColor: "#CE1141",
    secondaryColor: "#000000",
  },
  cavaliers: {
    name: "Cavaliers",
    abbreviation: "CLE",
    primaryColor: "#860038",
    secondaryColor: "#041E42",
  },
  pistons: {
    name: "Pistons",
    abbreviation: "DET",
    primaryColor: "#C8102E",
    secondaryColor: "#1D42BA",
  },
  pacers: {
    name: "Pacers",
    abbreviation: "IND",
    primaryColor: "#002D62",
    secondaryColor: "#FDBB30",
  },
  bucks: {
    name: "Bucks",
    abbreviation: "MIL",
    primaryColor: "#00471B",
    secondaryColor: "#EEE1C6",
  },

  // Southeast Division
  hawks: {
    name: "Hawks",
    abbreviation: "ATL",
    primaryColor: "#E03A3E",
    secondaryColor: "#C1D32F",
  },
  hornets: {
    name: "Hornets",
    abbreviation: "CHA",
    primaryColor: "#1D1160",
    secondaryColor: "#00788C",
  },
  heat: {
    name: "Heat",
    abbreviation: "MIA",
    primaryColor: "#98002E",
    secondaryColor: "#F9A01B",
  },
  magic: {
    name: "Magic",
    abbreviation: "ORL",
    primaryColor: "#0077C0",
    secondaryColor: "#C4CED4",
  },
  wizards: {
    name: "Wizards",
    abbreviation: "WAS",
    primaryColor: "#002B5C",
    secondaryColor: "#E31837",
  },

  // Northwest Division
  nuggets: {
    name: "Nuggets",
    abbreviation: "DEN",
    primaryColor: "#0E2240",
    secondaryColor: "#FEC524",
  },
  timberwolves: {
    name: "Timberwolves",
    abbreviation: "MIN",
    primaryColor: "#0C2340",
    secondaryColor: "#236192",
  },
  thunder: {
    name: "Thunder",
    abbreviation: "OKC",
    primaryColor: "#007AC1",
    secondaryColor: "#EF3B24",
  },
  trailblazers: {
    name: "Trail Blazers",
    abbreviation: "POR",
    primaryColor: "#E03A3E",
    secondaryColor: "#000000",
  },
  jazz: {
    name: "Jazz",
    abbreviation: "UTA",
    primaryColor: "#002B5C",
    secondaryColor: "#00471B",
  },

  // Pacific Division
  warriors: {
    name: "Warriors",
    abbreviation: "GSW",
    primaryColor: "#1D428A",
    secondaryColor: "#FFC72C",
  },
  clippers: {
    name: "Clippers",
    abbreviation: "LAC",
    primaryColor: "#C8102E",
    secondaryColor: "#1D428A",
  },
  lakers: {
    name: "Lakers",
    abbreviation: "LAL",
    primaryColor: "#552583",
    secondaryColor: "#FDB927",
  },
  suns: {
    name: "Suns",
    abbreviation: "PHX",
    primaryColor: "#1D1160",
    secondaryColor: "#E56020",
  },
  kings: {
    name: "Kings",
    abbreviation: "SAC",
    primaryColor: "#5A2D81",
    secondaryColor: "#63727A",
  },

  // Southwest Division
  mavericks: {
    name: "Mavericks",
    abbreviation: "DAL",
    primaryColor: "#00538C",
    secondaryColor: "#002B5E",
  },
  rockets: {
    name: "Rockets",
    abbreviation: "HOU",
    primaryColor: "#CE1141",
    secondaryColor: "#000000",
  },
  grizzlies: {
    name: "Grizzlies",
    abbreviation: "MEM",
    primaryColor: "#5D76A9",
    secondaryColor: "#12173F",
  },
  pelicans: {
    name: "Pelicans",
    abbreviation: "NOP",
    primaryColor: "#0C2340",
    secondaryColor: "#C8102E",
  },
  spurs: {
    name: "Spurs",
    abbreviation: "SAS",
    primaryColor: "#C4CED4",
    secondaryColor: "#000000",
  },
};

export const QUARTERS = ["1st", "2nd", "3rd", "4th", "OT"] as const;

export type Quarter = (typeof QUARTERS)[number];
