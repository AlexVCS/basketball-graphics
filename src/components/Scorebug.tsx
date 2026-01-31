import type { ScoreboardData } from "../types/scorebug";
import { NBA_TEAMS } from "../data/nbaTeams";
import "./Scorebug.css";

interface ScoreboardProps {
  data: ScoreboardData;
}

export default function Scorebug({ data }: ScoreboardProps) {
  const awayTeam = NBA_TEAMS[data.awayTeam];
  const homeTeam = NBA_TEAMS[data.homeTeam];

  return (
    <div className="scorebug">
      {/* Away Team */}
      <div
        className="scorebug-team scorebug-team--away"
        style={
          {
            "--team-primary": awayTeam?.primaryColor || "#333",
            "--team-secondary": awayTeam?.secondaryColor || "#fff",
          } as React.CSSProperties
        }
      >
        <div className="scorebug-team-info">
          <span className="scorebug-team-abbr">{awayTeam?.abbreviation || "AWY"}</span>
        </div>
        <div className="scorebug-score">{data.awayScore}</div>
      </div>

      {/* Center - Quarter & Clock */}
      <div className="scorebug-center">
        <div className="scorebug-quarter">{data.quarter}</div>
        <div className="scorebug-clock">{data.gameClock}</div>
      </div>

      {/* Home Team */}
      <div
        className="scorebug-team scorebug-team--home"
        style={
          {
            "--team-primary": homeTeam?.primaryColor || "#333",
            "--team-secondary": homeTeam?.secondaryColor || "#fff",
          } as React.CSSProperties
        }
      >
        <div className="scorebug-team-info">
          <span className="scorebug-team-abbr">{homeTeam?.abbreviation || "HME"}</span>
        </div>
        <div className="scorebug-score">{data.homeScore}</div>
      </div>
    </div>
  );
}
