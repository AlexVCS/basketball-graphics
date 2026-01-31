import type { ScoreboardData, ScoreboardHandlers } from "../types/scorebug";
import { NBA_TEAMS, QUARTERS } from "../data/nbaTeams";
import "./ControlsPanel.css";

interface ControlsPanelProps {
  scoreboard: ScoreboardData;
  handlers: ScoreboardHandlers;
}

export default function ControlsPanel({
  scoreboard,
  handlers,
}: ControlsPanelProps) {
  const teamOptions = Object.entries(NBA_TEAMS).map(([key, team]) => (
    <option key={key} value={key}>
      {team.name} ({team.abbreviation})
    </option>
  ));

  return (
    <aside className="controls-panel">
      <h2>Scoreboard Controls</h2>

      {/* Away Team Section */}
      <div className="control-section">
        <h3>Away Team</h3>
        <div className="control-group">
          <label htmlFor="away-team">Team</label>
          <select
            id="away-team"
            value={scoreboard.awayTeam}
            onChange={(e) => handlers.onAwayTeamChange(e.target.value)}
          >
            {teamOptions}
          </select>
        </div>
        <div className="control-group">
          <label htmlFor="away-record">Record</label>
          <input
            id="away-record"
            type="text"
            placeholder="W-L"
            value={scoreboard.awayRecord}
            onChange={(e) => handlers.onAwayRecordChange(e.target.value)}
          />
        </div>
        <div className="control-group">
          <label htmlFor="away-score">Score</label>
          <div className="score-input">
            <button
              type="button"
              onClick={() =>
                handlers.onAwayScoreChange(Math.max(0, scoreboard.awayScore - 1))
              }
            >
              -
            </button>
            <input
              id="away-score"
              type="number"
              min="0"
              max="999"
              value={scoreboard.awayScore}
              onChange={(e) =>
                handlers.onAwayScoreChange(parseInt(e.target.value) || 0)
              }
            />
            <button
              type="button"
              onClick={() => handlers.onAwayScoreChange(scoreboard.awayScore + 1)}
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Home Team Section */}
      <div className="control-section">
        <h3>Home Team</h3>
        <div className="control-group">
          <label htmlFor="home-team">Team</label>
          <select
            id="home-team"
            value={scoreboard.homeTeam}
            onChange={(e) => handlers.onHomeTeamChange(e.target.value)}
          >
            {teamOptions}
          </select>
        </div>
        <div className="control-group">
          <label htmlFor="home-record">Record</label>
          <input
            id="home-record"
            type="text"
            placeholder="W-L"
            value={scoreboard.homeRecord}
            onChange={(e) => handlers.onHomeRecordChange(e.target.value)}
          />
        </div>
        <div className="control-group">
          <label htmlFor="home-score">Score</label>
          <div className="score-input">
            <button
              type="button"
              onClick={() =>
                handlers.onHomeScoreChange(Math.max(0, scoreboard.homeScore - 1))
              }
            >
              -
            </button>
            <input
              id="home-score"
              type="number"
              min="0"
              max="999"
              value={scoreboard.homeScore}
              onChange={(e) =>
                handlers.onHomeScoreChange(parseInt(e.target.value) || 0)
              }
            />
            <button
              type="button"
              onClick={() => handlers.onHomeScoreChange(scoreboard.homeScore + 1)}
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Game Info Section */}
      <div className="control-section">
        <h3>Game Info</h3>
        <div className="control-group">
          <label>Quarter</label>
          <div className="quarter-buttons">
            {QUARTERS.map((q) => (
              <button
                key={q}
                type="button"
                className={scoreboard.quarter === q ? "active" : ""}
                onClick={() => handlers.onQuarterChange(q)}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
        <div className="control-group">
          <label htmlFor="game-clock">Game Clock</label>
          <input
            id="game-clock"
            className="clock-input"
            type="text"
            placeholder="12:00"
            value={scoreboard.gameClock}
            onChange={(e) => handlers.onGameClockChange(e.target.value)}
          />
        </div>
        <div className="control-group">
          <label htmlFor="shot-clock">Shot Clock</label>
          <input
            id="shot-clock"
            className="clock-input"
            type="text"
            placeholder=":24"
            value={scoreboard.shotClock}
            onChange={(e) => handlers.onShotClockChange(e.target.value)}
          />
        </div>
      </div>
    </aside>
  );
}
