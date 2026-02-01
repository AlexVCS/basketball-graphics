import { useState, useEffect, useCallback, useRef } from "react";
import type { ScoreboardData } from "../types/scorebug";
import type { DemoScenario } from "../data/demoScenarios";
import { formatGameClock } from "../data/demoScenarios";

interface UseDemoPlaybackOptions {
  scenario: DemoScenario;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  onScoreboardUpdate: (scoreboard: ScoreboardData) => void;
}

interface UseDemoPlaybackReturn {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
  togglePlayPause: () => void;
}

export function useDemoPlayback({
  scenario,
  videoRef,
  onScoreboardUpdate,
}: UseDemoPlaybackOptions): UseDemoPlaybackReturn {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const lastUpdateRef = useRef<number>(0);

  // Calculate scoreboard state based on video time
  const calculateScoreboardState = useCallback(
    (videoTime: number): ScoreboardData => {
      const { 
        gameClockStartsAtVideoTime, 
        initialGameClockSeconds, 
        shotVideoTime,
        shotGameClockSeconds,
        initialScoreboard,
        finalHomeScore,
        finalAwayScore,
      } = scenario;

      // Before game clock starts, show initial state
      if (videoTime < gameClockStartsAtVideoTime) {
        return {
          ...initialScoreboard,
          gameClock: formatGameClock(initialGameClockSeconds),
        };
      }

      // Calculate elapsed time since game clock started
      const elapsedGameTime = videoTime - gameClockStartsAtVideoTime;
      let gameClockSeconds = initialGameClockSeconds - elapsedGameTime;
      
      // Determine if shot has been made
      const shotMade = videoTime >= shotVideoTime;
      
      // Clamp the game clock to never go below shotGameClockSeconds
      // This ensures smooth countdown: :00.3 -> :00.2 -> stays at :00.2
      gameClockSeconds = Math.max(shotGameClockSeconds, gameClockSeconds);
      
      return {
        ...initialScoreboard,
        gameClock: formatGameClock(gameClockSeconds),
        homeScore: shotMade ? finalHomeScore : initialScoreboard.homeScore,
        awayScore: shotMade ? finalAwayScore : initialScoreboard.awayScore,
      };
    },
    [scenario]
  );

  // Update scoreboard based on current video time
  const updateFromVideoTime = useCallback(
    (videoTime: number) => {
      // Throttle updates to ~30fps for smooth performance
      const now = Date.now();
      if (now - lastUpdateRef.current < 33) return;
      lastUpdateRef.current = now;

      const newScoreboard = calculateScoreboardState(videoTime);
      onScoreboardUpdate(newScoreboard);
    },
    [calculateScoreboardState, onScoreboardUpdate]
  );

  // Handle video time updates
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      updateFromVideoTime(video.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    const handleSeeked = () => {
      // When user seeks, immediately update scoreboard
      updateFromVideoTime(video.currentTime);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("seeked", handleSeeked);

    // Initialize duration if already loaded
    if (video.duration) {
      setDuration(video.duration);
    }

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("seeked", handleSeeked);
    };
  }, [videoRef, updateFromVideoTime]);

  // Initialize scoreboard on mount
  useEffect(() => {
    onScoreboardUpdate(calculateScoreboardState(0));
  }, [calculateScoreboardState, onScoreboardUpdate]);

  const play = useCallback(() => {
    videoRef.current?.play();
  }, [videoRef]);

  const pause = useCallback(() => {
    videoRef.current?.pause();
  }, [videoRef]);

  const seek = useCallback(
    (time: number) => {
      if (videoRef.current) {
        videoRef.current.currentTime = time;
      }
    },
    [videoRef]
  );

  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  return {
    isPlaying,
    currentTime,
    duration,
    play,
    pause,
    seek,
    togglePlayPause,
  };
}
