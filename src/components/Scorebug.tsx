import type { ScoreboardData } from "../types/scorebug";
import { NBA_TEAMS } from "../data/nbaTeams";
import "./Scorebug.css";

interface ScoreboardProps {
  data: ScoreboardData;
}

export default function Scorebug({ data }: ScoreboardProps) {
  const awayTeam = NBA_TEAMS[data.awayTeam];
  const homeTeam = NBA_TEAMS[data.homeTeam];

  const awayLogoUrl = awayTeam?.teamId
    ? `https://cdn.nba.com/logos/nba/${awayTeam.teamId}/global/L/logo.svg`
    : undefined;
  const homeLogoUrl = homeTeam?.teamId
    ? `https://cdn.nba.com/logos/nba/${homeTeam.teamId}/global/L/logo.svg`
    : undefined;

  return (
    <div className="scorebug">
      {/* ROW 1: Game Info */}
      <div className="scorebug-game-info">
        <div className="scorebug-quarter">{data.quarter}</div>
        <div className="scorebug-clock">{data.gameClock}</div>
        <div className="scorebug-shot-clock">{data.shotClock}</div>
      </div>

      {/* ROW 2: Teams & Scores */}
      <div className="scorebug-scores-row">
        {/* Away Team Info - LEFT */}
        <div
          className="scorebug-team-section scorebug-team-section--away"
          style={
            {
              "--team-primary": awayTeam?.primaryColor || "#333",
              "--team-secondary": awayTeam?.secondaryColor || "#fff",
            } as React.CSSProperties
          }
        >
          <div className="scorebug-team-info">
            {awayLogoUrl ? (
              <img
                className="scorebug-team-logo"
                src={awayLogoUrl}
                alt={`${awayTeam?.abbreviation ?? "AWY"} logo`}
              />
            ) : null}
            <div className="scorebug-team-text">
              <span className="scorebug-team-abbr">{awayTeam?.abbreviation || "AWY"}</span>
              <span className="scorebug-team-record">({data.awayRecord})</span>
            </div>
          </div>
        </div>

        {/* Scores - CENTER */}
        <div className="scorebug-scores-center">
          <div
            className="scorebug-score scorebug-score--away"
            style={
              {
                "--team-primary": awayTeam?.primaryColor || "#333",
                "--team-secondary": awayTeam?.secondaryColor || "#fff",
              } as React.CSSProperties
            }
          >
            {data.awayScore}
          </div>
          <div
            className="scorebug-score scorebug-score--home"
            style={
              {
                "--team-primary": homeTeam?.primaryColor || "#333",
                "--team-secondary": homeTeam?.secondaryColor || "#fff",
              } as React.CSSProperties
            }
          >
            {data.homeScore}
          </div>
        </div>

        {/* Home Team Info - RIGHT */}
        <div
          className="scorebug-team-section scorebug-team-section--home"
          style={
            {
              "--team-primary": homeTeam?.primaryColor || "#333",
              "--team-secondary": homeTeam?.secondaryColor || "#fff",
            } as React.CSSProperties
          }
        >
          <div className="scorebug-team-info">
            {homeLogoUrl ? (
              <img
                className="scorebug-team-logo"
                src={homeLogoUrl}
                alt={`${homeTeam?.abbreviation ?? "HME"} logo`}
              />
            ) : null}
            <div className="scorebug-team-text">
              <span className="scorebug-team-abbr">{homeTeam?.abbreviation || "HME"}</span>
              <span className="scorebug-team-record">({data.homeRecord})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
