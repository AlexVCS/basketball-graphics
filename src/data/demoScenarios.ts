import type { ScoreboardData } from "../types/scorebug";

export interface DemoScenario {
  id: string;
  name: string;
  videoFile: string;
  gameClockStartsAtVideoTime: number; // When in the video the game clock starts
  initialGameClockSeconds: number; // Starting game clock in seconds (14.2)
  shotVideoTime: number; // When the shot is made in the video
  shotGameClockSeconds: number; // What the game clock shows when shot is made
  initialScoreboard: ScoreboardData;
  finalHomeScore: number;
  finalAwayScore: number;
}

export const CELTICS_VS_BULLS_DEMO: DemoScenario = {
  id: "celtics-bulls-game-winner",
  name: "Bulls vs Celtics - Game Winner",
  videoFile: "/videos/bulls-celtics.mp4",
  gameClockStartsAtVideoTime: 3, // Game clock starts at 3 seconds into video
  initialGameClockSeconds: 14.2, // :14.2 on the clock
  shotVideoTime: 18, // Shot is made at 18 seconds into video
  shotGameClockSeconds: 0.2, // Clock shows :00.2 when shot is made
  initialScoreboard: {
    homeTeam: "bulls",
    awayTeam: "celtics",
    homeScore: 111,
    awayScore: 111,
    homeRecord: "(22-22)",
    awayRecord: "(28-16)",
    quarter: "4th",
    gameClock: ":14.2",
    shotClock: "",
  },
  finalHomeScore: 114, // Bulls win with a 3-pointer
  finalAwayScore: 111,
};

// Helper function to format game clock
export function formatGameClock(seconds: number): string {
  if (seconds <= 0) {
    return ":00.0";
  }
  
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  
  if (mins > 0) {
    // Format as M:SS.T (e.g., 1:05.3) - pad seconds when there's a minute
    const wholeSeconds = Math.floor(secs);
    const tenths = Math.floor((secs - wholeSeconds) * 10);
    const secsStr = wholeSeconds.toString().padStart(2, "0");
    return `${mins}:${secsStr}.${tenths}`;
  } else {
    // Format as :SS.T (e.g., :14.2, :05.3, :00.2)
    const wholeSeconds = Math.floor(secs);
    const tenths = Math.floor((secs - wholeSeconds) * 10);
    return `:${wholeSeconds.toString().padStart(2, "0")}.${tenths}`;
  }
}
