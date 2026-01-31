export interface ScoreboardData {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  homeRecord: string;
  awayRecord: string;
  quarter: string;
  gameClock: string;
  shotClock: string;
}

export interface ScoreboardHandlers {
  onHomeTeamChange: (team: string) => void;
  onAwayTeamChange: (team: string) => void;
  onHomeScoreChange: (score: number) => void;
  onAwayScoreChange: (score: number) => void;
  onHomeRecordChange: (record: string) => void;
  onAwayRecordChange: (record: string) => void;
  onQuarterChange: (quarter: string) => void;
  onGameClockChange: (clock: string) => void;
  onShotClockChange: (clock: string) => void;
}
