export interface NBATeamInfo {
  teamId: number;
  name: string;
  abbreviation: string;
  primaryColor: string;
  secondaryColor: string;
}

export const NBA_TEAMS: Record<string, NBATeamInfo> = {
  // Atlantic Division
  celtics: {
    teamId: 1610612738,
    name: "Celtics",
    abbreviation: "BOS",
    primaryColor: "#007A33",
    secondaryColor: "#BA9653",
  },
  nets: {
    teamId: 1610612751,
    name: "Nets",
    abbreviation: "BKN",
    primaryColor: "#000000",
    secondaryColor: "#FFFFFF",
  },
  knicks: {
    teamId: 1610612752,
    name: "Knicks",
    abbreviation: "NYK",
    primaryColor: "#006BB6",
    secondaryColor: "#F58426",
  },
  sixers: {
    teamId: 1610612755,
    name: "76ers",
    abbreviation: "PHI",
    primaryColor: "#006BB6",
    secondaryColor: "#ED174C",
  },
  raptors: {
    teamId: 1610612761,
    name: "Raptors",
    abbreviation: "TOR",
    primaryColor: "#CE1141",
    secondaryColor: "#000000",
  },

  // Central Division
  bulls: {
    teamId: 1610612741,
    name: "Bulls",
    abbreviation: "CHI",
    primaryColor: "#CE1141",
    secondaryColor: "#000000",
  },
  cavaliers: {
    teamId: 1610612739,
    name: "Cavaliers",
    abbreviation: "CLE",
    primaryColor: "#860038",
    secondaryColor: "#041E42",
  },
  pistons: {
    teamId: 1610612765,
    name: "Pistons",
    abbreviation: "DET",
    primaryColor: "#C8102E",
    secondaryColor: "#1D42BA",
  },
  pacers: {
    teamId: 1610612754,
    name: "Pacers",
    abbreviation: "IND",
    primaryColor: "#002D62",
    secondaryColor: "#FDBB30",
  },
  bucks: {
    teamId: 1610612749,
    name: "Bucks",
    abbreviation: "MIL",
    primaryColor: "#00471B",
    secondaryColor: "#EEE1C6",
  },

  // Southeast Division
  hawks: {
    teamId: 1610612737,
    name: "Hawks",
    abbreviation: "ATL",
    primaryColor: "#E03A3E",
    secondaryColor: "#C1D32F",
  },
  hornets: {
    teamId: 1610612766,
    name: "Hornets",
    abbreviation: "CHA",
    primaryColor: "#1D1160",
    secondaryColor: "#00788C",
  },
  heat: {
    teamId: 1610612748,
    name: "Heat",
    abbreviation: "MIA",
    primaryColor: "#98002E",
    secondaryColor: "#F9A01B",
  },
  magic: {
    teamId: 1610612753,
    name: "Magic",
    abbreviation: "ORL",
    primaryColor: "#0077C0",
    secondaryColor: "#C4CED4",
  },
  wizards: {
    teamId: 1610612764,
    name: "Wizards",
    abbreviation: "WAS",
    primaryColor: "#002B5C",
    secondaryColor: "#E31837",
  },

  // Northwest Division
  nuggets: {
    teamId: 1610612743,
    name: "Nuggets",
    abbreviation: "DEN",
    primaryColor: "#0E2240",
    secondaryColor: "#FEC524",
  },
  timberwolves: {
    teamId: 1610612750,
    name: "Timberwolves",
    abbreviation: "MIN",
    primaryColor: "#0C2340",
    secondaryColor: "#236192",
  },
  thunder: {
    teamId: 1610612760,
    name: "Thunder",
    abbreviation: "OKC",
    primaryColor: "#007AC1",
    secondaryColor: "#EF3B24",
  },
  trailblazers: {
    teamId: 1610612757,
    name: "Trail Blazers",
    abbreviation: "POR",
    primaryColor: "#E03A3E",
    secondaryColor: "#000000",
  },
  jazz: {
    teamId: 1610612762,
    name: "Jazz",
    abbreviation: "UTA",
    primaryColor: "#002B5C",
    secondaryColor: "#00471B",
  },

  // Pacific Division
  warriors: {
    teamId: 1610612744,
    name: "Warriors",
    abbreviation: "GSW",
    primaryColor: "#1D428A",
    secondaryColor: "#FFC72C",
  },
  clippers: {
    teamId: 1610612746,
    name: "Clippers",
    abbreviation: "LAC",
    primaryColor: "#C8102E",
    secondaryColor: "#1D428A",
  },
  lakers: {
    teamId: 1610612747,
    name: "Lakers",
    abbreviation: "LAL",
    primaryColor: "#552583",
    secondaryColor: "#FDB927",
  },
  suns: {
    teamId: 1610612756,
    name: "Suns",
    abbreviation: "PHX",
    primaryColor: "#1D1160",
    secondaryColor: "#E56020",
  },
  kings: {
    teamId: 1610612758,
    name: "Kings",
    abbreviation: "SAC",
    primaryColor: "#5A2D81",
    secondaryColor: "#63727A",
  },

  // Southwest Division
  mavericks: {
    teamId: 1610612742,
    name: "Mavericks",
    abbreviation: "DAL",
    primaryColor: "#00538C",
    secondaryColor: "#002B5E",
  },
  rockets: {
    teamId: 1610612745,
    name: "Rockets",
    abbreviation: "HOU",
    primaryColor: "#CE1141",
    secondaryColor: "#000000",
  },
  grizzlies: {
    teamId: 1610612763,
    name: "Grizzlies",
    abbreviation: "MEM",
    primaryColor: "#5D76A9",
    secondaryColor: "#12173F",
  },
  pelicans: {
    teamId: 1610612740,
    name: "Pelicans",
    abbreviation: "NOP",
    primaryColor: "#0C2340",
    secondaryColor: "#C8102E",
  },
  spurs: {
    teamId: 1610612759,
    name: "Spurs",
    abbreviation: "SAS",
    primaryColor: "#C4CED4",
    secondaryColor: "#000000",
  },
};

export const QUARTERS = ["1st", "2nd", "3rd", "4th", "OT"] as const;

export type Quarter = (typeof QUARTERS)[number];
