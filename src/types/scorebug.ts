export interface ScoreboardData {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  quarter: string;
  gameClock: string;
}

export interface ScoreboardHandlers {
  onHomeTeamChange: (team: string) => void;
  onAwayTeamChange: (team: string) => void;
  onHomeScoreChange: (score: number) => void;
  onAwayScoreChange: (score: number) => void;
  onQuarterChange: (quarter: string) => void;
  onGameClockChange: (clock: string) => void;
}
