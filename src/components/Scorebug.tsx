import { useState, useRef, useEffect } from "react";
import type { ScoreboardData, ValidationErrors, ScoreboardField } from "../types/scorebug";
import { NBA_TEAMS } from "../data/nbaTeams";
import { VALID_QUARTERS } from "../utils/validationUtils";
import TeamSelector from "./TeamSelector";
import "./Scorebug.css";

interface ScoreboardProps {
  data: ScoreboardData;
  isEditMode: boolean;
  errors: ValidationErrors;
  onFieldChange: (field: ScoreboardField, value: string | number) => void;
}

export default function Scorebug({
  data,
  isEditMode,
  errors,
  onFieldChange,
}: ScoreboardProps) {
  const [activeField, setActiveField] = useState<ScoreboardField | null>(null);
  const [teamSelectorFor, setTeamSelectorFor] = useState<"homeTeam" | "awayTeam" | null>(null);
  const [teamSelectorPosition, setTeamSelectorPosition] = useState({ top: 0, left: 0 });
  
  const scorebugRef = useRef<HTMLDivElement>(null);

  // Close team selector when edit mode is turned off
  useEffect(() => {
    if (!isEditMode) {
      setTeamSelectorFor(null);
    }
  }, [isEditMode]);

  const awayTeam = NBA_TEAMS[data.awayTeam];
  const homeTeam = NBA_TEAMS[data.homeTeam];

  const awayLogoUrl = awayTeam?.teamId
    ? `https://cdn.nba.com/logos/nba/${awayTeam.teamId}/global/L/logo.svg`
    : undefined;
  const homeLogoUrl = homeTeam?.teamId
    ? `https://cdn.nba.com/logos/nba/${homeTeam.teamId}/global/L/logo.svg`
    : undefined;

  // Handle team click (logo or tricode)
  const handleTeamClick = (field: "homeTeam" | "awayTeam") => {
    if (!isEditMode) return;
    
    if (!scorebugRef.current) return;
    
    const scorebugRect = scorebugRef.current.getBoundingClientRect();
    const dropdownWidth = 280;
    const dropdownHeight = 400;
    const gap = 16;
    
    // Position dropdown above the scorebug
    // Away team: left side, Home team: right side
    if (field === "awayTeam") {
      setTeamSelectorPosition({
        top: scorebugRect.top - dropdownHeight - gap,
        left: scorebugRect.left,
      });
    } else {
      setTeamSelectorPosition({
        top: scorebugRect.top - dropdownHeight - gap,
        left: scorebugRect.right - dropdownWidth,
      });
    }
    
    setTeamSelectorFor(field);
  };

  const handleFieldClick = (field: ScoreboardField) => {
    if (!isEditMode) return;
    
    if (field === "homeTeam" || field === "awayTeam") {
      handleTeamClick(field);
    } else {
      setActiveField(field);
    }
  };

  const handleTeamSelect = (teamKey: string) => {
    if (teamSelectorFor) {
      onFieldChange(teamSelectorFor, teamKey);
      setTeamSelectorFor(null);
    }
  };

  const handleInputChange = (field: ScoreboardField, value: string) => {
    if (field === "homeScore" || field === "awayScore") {
      const numValue = parseInt(value, 10);
      onFieldChange(field, isNaN(numValue) ? 0 : numValue);
    } else {
      onFieldChange(field, value);
    }
  };

  const handleInputBlur = () => {
    setActiveField(null);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === "Escape") {
      setActiveField(null);
      (e.target as HTMLElement).blur();
    }
  };

  const renderEditableField = (
    field: ScoreboardField,
    displayValue: string | number,
    className: string,
    type: "text" | "number" | "select" = "text",
    options?: readonly string[]
  ) => {
    const isActive = activeField === field;
    const hasError = !!errors[field];
    const fieldError = errors[field];

    if (!isEditMode) {
      return <span className={className}>{displayValue}</span>;
    }

    // Team fields - show as clickable, open dropdown
    if (field === "homeTeam" || field === "awayTeam") {
      return (
        <span
          className={`${className} editable-field team-field ${hasError ? "has-error" : ""}`}
          onClick={() => handleFieldClick(field)}
          title="Click to change team"
        >
          {displayValue}
          {hasError && <span className="field-error">{fieldError}</span>}
        </span>
      );
    }

    // Quarter field - select dropdown
    if (field === "quarter" && options) {
      return (
        <div className={`editable-wrapper ${hasError ? "has-error" : ""}`}>
          <select
            className={`${className} editable-field editable-select`}
            value={data[field] as string}
            onChange={(e) => handleInputChange(field, e.target.value)}
            onBlur={handleInputBlur}
          >
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {hasError && <span className="field-error">{fieldError}</span>}
        </div>
      );
    }

    // Score fields - number input
    if (type === "number") {
      return (
        <div className={`editable-wrapper ${hasError ? "has-error" : ""}`}>
          {isActive ? (
            <input
              type="number"
              className={`${className} editable-field editable-input`}
              value={data[field]}
              onChange={(e) => handleInputChange(field, e.target.value)}
              onBlur={handleInputBlur}
              onKeyDown={handleInputKeyDown}
              autoFocus
              min={0}
              max={999}
            />
          ) : (
            <span
              className={`${className} editable-field`}
              onClick={() => handleFieldClick(field)}
              title="Click to edit"
            >
              {displayValue}
            </span>
          )}
          {hasError && <span className="field-error">{fieldError}</span>}
        </div>
      );
    }

    // Text fields (game clock, shot clock, record)
    return (
      <div className={`editable-wrapper ${hasError ? "has-error" : ""}`}>
        {isActive ? (
          <input
            type="text"
            className={`${className} editable-field editable-input`}
            value={data[field] as string}
            onChange={(e) => handleInputChange(field, e.target.value)}
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyDown}
            autoFocus
          />
        ) : (
          <span
            className={`${className} editable-field`}
            onClick={() => handleFieldClick(field)}
            title="Click to edit"
          >
            {displayValue}
          </span>
        )}
        {hasError && <span className="field-error">{fieldError}</span>}
      </div>
    );
  };

  return (
    <>
      <div
        ref={scorebugRef}
        className={`scorebug ${isEditMode ? "edit-mode" : ""}`}
      >
        {/* Main Content Area */}
        <div className="scorebug-main">
          {/* Away Team Logo - LEFT */}
          <div
            className={`scorebug-logo-section scorebug-logo-section--away ${isEditMode ? "editable" : ""}`}
            style={{ "--team-primary": awayTeam?.primaryColor || "#333" } as React.CSSProperties}
            onClick={() => handleTeamClick("awayTeam")}
            title={isEditMode ? "Click to change team" : undefined}
          >
            {awayLogoUrl && (
              <img
                className="scorebug-team-logo"
                src={awayLogoUrl}
                alt={`${awayTeam?.abbreviation ?? "AWY"} logo`}
              />
            )}
          </div>

          {/* Center Content: Game Info + Scores */}
          <div className="scorebug-center">
            {/* Scores - Full area with team colors */}
            <div className="scorebug-scores">
              <div
                className="scorebug-score scorebug-score--away"
                style={{ "--team-primary": awayTeam?.primaryColor || "#333" } as React.CSSProperties}
              >
                {renderEditableField("awayScore", data.awayScore, "score-value", "number")}
              </div>
              <div
                className="scorebug-score scorebug-score--home"
                style={{ "--team-primary": homeTeam?.primaryColor || "#333" } as React.CSSProperties}
              >
                {renderEditableField("homeScore", data.homeScore, "score-value", "number")}
              </div>
            </div>

            {/* Game Info Bar - Compact, Floating on top */}
            <div className="scorebug-game-info">
              {renderEditableField("quarter", data.quarter, "scorebug-quarter", "select", VALID_QUARTERS)}
              {renderEditableField("gameClock", data.gameClock, "scorebug-clock")}
              {renderEditableField("shotClock", data.shotClock, "scorebug-shot-clock")}
            </div>
          </div>

          {/* Home Team Logo - RIGHT */}
          <div
            className={`scorebug-logo-section scorebug-logo-section--home ${isEditMode ? "editable" : ""}`}
            style={{ "--team-primary": homeTeam?.primaryColor || "#333" } as React.CSSProperties}
            onClick={() => handleTeamClick("homeTeam")}
            title={isEditMode ? "Click to change team" : undefined}
          >
            {homeLogoUrl && (
              <img
                className="scorebug-team-logo"
                src={homeLogoUrl}
                alt={`${homeTeam?.abbreviation ?? "HME"} logo`}
              />
            )}
          </div>
        </div>

        {/* Bottom Row: Team Names & Records */}
        <div className="scorebug-bottom">
          <div className="scorebug-team-info scorebug-team-info--away">
            <span className="scorebug-team-abbr">{awayTeam?.abbreviation || "AWY"}</span>
            <span className="scorebug-team-record">
              {renderEditableField("awayRecord", data.awayRecord, "record-value")}
            </span>
          </div>
          <div className="scorebug-team-info scorebug-team-info--home">
            <span className="scorebug-team-abbr">{homeTeam?.abbreviation || "HME"}</span>
            <span className="scorebug-team-record">
              {renderEditableField("homeRecord", data.homeRecord, "record-value")}
            </span>
          </div>
        </div>
      </div>

      {/* Team Selector Modal */}
      {teamSelectorFor && (
        <TeamSelector
          currentTeam={data[teamSelectorFor]}
          teamSide={teamSelectorFor === "awayTeam" ? "away" : "home"}
          onSelect={handleTeamSelect}
          onClose={() => setTeamSelectorFor(null)}
          position={teamSelectorPosition}
        />
      )}
    </>
  );
}
