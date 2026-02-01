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

// Edit mode types
export type ScoreboardField = keyof ScoreboardData;

export interface ValidationErrors {
  homeTeam?: string;
  awayTeam?: string;
  homeScore?: string;
  awayScore?: string;
  homeRecord?: string;
  awayRecord?: string;
  quarter?: string;
  gameClock?: string;
  shotClock?: string;
}

export interface EditModeState {
  isEditMode: boolean;
  activeField: ScoreboardField | null;
  errors: ValidationErrors;
}

export interface EditModeHandlers {
  onToggleEditMode: () => void;
  onSave: () => boolean; // Returns true if save was successful
  onCancel: () => void;
  onFieldChange: (field: ScoreboardField, value: string | number) => void;
  onFieldFocus: (field: ScoreboardField) => void;
  onFieldBlur: () => void;
}

// Combined props for editable scorebug
export interface EditableScoreboardProps {
  data: ScoreboardData;
  editState: EditModeState;
  handlers: ScoreboardHandlers;
  editHandlers: EditModeHandlers;
}
