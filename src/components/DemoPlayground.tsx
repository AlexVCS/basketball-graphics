import { useRef } from "react";
import type { ScoreboardData } from "../types/scorebug";
import type { DemoScenario } from "../data/demoScenarios";
import { useDemoPlayback } from "../hooks/useDemoPlayback";
import Scorebug from "./Scorebug";
import "./DemoPlayground.css";

interface DemoPlaygroundProps {
  scenario: DemoScenario;
  scoreboard: ScoreboardData;
  onScoreboardUpdate: (scoreboard: ScoreboardData) => void;
}

export default function DemoPlayground({
  scenario,
  scoreboard,
  onScoreboardUpdate,
}: DemoPlaygroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const {
    isPlaying,
    currentTime,
    duration,
    togglePlayPause,
    seek,
  } = useDemoPlayback({
    scenario,
    videoRef,
    onScoreboardUpdate,
  });

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    seek(parseFloat(e.target.value));
  };

  const formatTime = (time: number): string => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleVideoClick = () => {
    togglePlayPause();
  };

  return (
    <div className="demo-playground">
      {/* Video Layer */}
      <video
        ref={videoRef}
        className="demo-video"
        src={scenario.videoFile}
        onClick={handleVideoClick}
        playsInline
      />

      {/* Scorebug Overlay */}
      <div className="demo-scorebug-overlay">
        <Scorebug
          data={scoreboard}
          isEditMode={false}
          errors={{}}
          onFieldChange={() => {}}
        />
      </div>

      {/* Video Controls */}
      <div className="demo-controls">
        <button
          className="demo-play-btn"
          onClick={togglePlayPause}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? "⏸" : "▶"}
        </button>

        <div className="demo-timeline">
          <span className="demo-time">{formatTime(currentTime)}</span>
          <input
            type="range"
            className="demo-seek"
            min={0}
            max={duration || 100}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
          />
          <span className="demo-time">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Play overlay when paused */}
      {!isPlaying && currentTime === 0 && (
        <div className="demo-play-overlay" onClick={togglePlayPause}>
          <div className="demo-play-overlay-btn">▶</div>
        </div>
      )}
    </div>
  );
}
