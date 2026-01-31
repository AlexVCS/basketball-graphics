import { useState } from "react";
import "../styles/graphicsLayout.css";
import ControlsPanel from "./ControlsPanel";
import PreviewPanel from "./PreviewPanel";
import type { ScoreboardData, ScoreboardHandlers } from "../types/scorebug";

export default function GraphicsLayout() {
  const [scoreboard, setScoreboard] = useState<ScoreboardData>({
    homeTeam: "lakers",
    awayTeam: "celtics",
    homeScore: 108,
    awayScore: 102,
    quarter: "3rd",
    gameClock: "5:42",
  });

  const handlers: ScoreboardHandlers = {
    onHomeTeamChange: (team: string) =>
      setScoreboard((prev) => ({ ...prev, homeTeam: team })),
    onAwayTeamChange: (team: string) =>
      setScoreboard((prev) => ({ ...prev, awayTeam: team })),
    onHomeScoreChange: (score: number) =>
      setScoreboard((prev) => ({ ...prev, homeScore: score })),
    onAwayScoreChange: (score: number) =>
      setScoreboard((prev) => ({ ...prev, awayScore: score })),
    onQuarterChange: (quarter: string) =>
      setScoreboard((prev) => ({ ...prev, quarter })),
    onGameClockChange: (clock: string) =>
      setScoreboard((prev) => ({ ...prev, gameClock: clock })),
  };

  return (
    <>
      <div className="mobile-fallback">
        <p>
          This graphics control interface is designed for desktop use.
          <br />
          Please use a larger screen.
        </p>
      </div>

      <div className="graphics-layout">
        <ControlsPanel scoreboard={scoreboard} handlers={handlers} />
        <PreviewPanel scoreboard={scoreboard} />
      </div>
    </>
  );
}
