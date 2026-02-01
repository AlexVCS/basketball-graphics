import { useState, useEffect, useRef } from "react";
import { NBA_TEAMS } from "../data/nbaTeams";
import "./TeamSelector.css";

interface TeamSelectorProps {
  currentTeam: string;
  teamSide: "away" | "home";
  onSelect: (teamKey: string) => void;
  onClose: () => void;
  position: { top: number; left: number };
}

export default function TeamSelector({
  currentTeam,
  teamSide,
  onSelect,
  onClose,
  position,
}: TeamSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Get filtered teams and sort by abbreviation
  const teamEntries = Object.entries(NBA_TEAMS);
  const filteredTeams = teamEntries
    .filter(([key, team]) => {
      const search = searchTerm.toLowerCase();
      return (
        team.name.toLowerCase().includes(search) ||
        team.abbreviation.toLowerCase().includes(search) ||
        key.toLowerCase().includes(search)
      );
    })
    .sort((a, b) => a[1].abbreviation.localeCompare(b[1].abbreviation));

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Reset highlight when search changes
  useEffect(() => {
    setHighlightedIndex(0);
  }, [searchTerm]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((prev) =>
            Math.min(prev + 1, filteredTeams.length - 1)
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case "Enter":
          e.preventDefault();
          if (filteredTeams[highlightedIndex]) {
            onSelect(filteredTeams[highlightedIndex][0]);
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [filteredTeams, highlightedIndex, onSelect]);

  // Scroll highlighted item into view
  useEffect(() => {
    const list = listRef.current;
    const highlighted = list?.children[highlightedIndex] as HTMLElement;
    if (highlighted) {
      highlighted.scrollIntoView({ block: "nearest" });
    }
  }, [highlightedIndex]);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".team-selector")) {
        onClose();
      }
    };

    // Delay adding listener to avoid immediate close
    const timer = setTimeout(() => {
      window.addEventListener("click", handleClick);
    }, 0);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("click", handleClick);
    };
  }, [onClose]);

  // Get current team data for header display
  const currentTeamData = NBA_TEAMS[currentTeam];
  const currentTeamLogo = currentTeamData
    ? `https://cdn.nba.com/logos/nba/${currentTeamData.teamId}/global/L/logo.svg`
    : undefined;

  return (
    <div
      className="team-selector"
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      {/* Header with team side and current team */}
      <div className="team-selector-header">
        <span className="team-selector-title">
          Select {teamSide === "away" ? "Away" : "Home"} Team
        </span>
        {currentTeamData && (
          <div className="team-selector-current">
            <span className="team-selector-current-label">Current:</span>
            {currentTeamLogo && (
              <img
                src={currentTeamLogo}
                alt={currentTeamData.abbreviation}
                className="team-selector-current-logo"
              />
            )}
            <span className="team-selector-current-name">
              {currentTeamData.abbreviation}
            </span>
          </div>
        )}
      </div>
      <div className="team-selector-search">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search teams..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="team-selector-input"
        />
      </div>
      <div className="team-selector-list" ref={listRef}>
        {filteredTeams.length === 0 ? (
          <div className="team-selector-empty">No teams found</div>
        ) : (
          filteredTeams.map(([key, team], index) => (
            <div
              key={key}
              className={`team-selector-item ${
                key === currentTeam ? "current" : ""
              } ${index === highlightedIndex ? "highlighted" : ""}`}
              onClick={() => onSelect(key)}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              <img
                src={`https://cdn.nba.com/logos/nba/${team.teamId}/global/L/logo.svg`}
                alt={team.abbreviation}
                className="team-selector-logo"
              />
              <span className="team-selector-name">{team.name}</span>
              <span className="team-selector-abbr">({team.abbreviation})</span>
            </div>
          ))
        )}
      </div>
      <div className="team-selector-hint">
        <kbd>&#8593;</kbd><kbd>&#8595;</kbd> Navigate
        <kbd>Enter</kbd> Select
      </div>
    </div>
  );
}
