import { useState, useCallback } from "react";
import "../styles/graphicsLayout.css";
import PreviewPanel from "./PreviewPanel";
import EditControls from "./EditControls";
import DemoPlayground from "./DemoPlayground";
import { CELTICS_VS_BULLS_DEMO } from "../data/demoScenarios";
import type { ScoreboardData, ValidationErrors, ScoreboardField } from "../types/scorebug";
import {
  validateShotClock,
  validateGameClock,
  validateQuarter,
  validateTeam,
  validateScore,
  validateRecord,
  formatGameClock,
} from "../utils/validationUtils";

export type ViewMode = "view" | "edit" | "demo";

export default function GraphicsLayout() {
  // Saved values (displayed in view mode)
  const [savedScoreboard, setSavedScoreboard] = useState<ScoreboardData>({
    homeTeam: "lakers",
    awayTeam: "celtics",
    homeScore: 108,
    awayScore: 102,
    homeRecord: "(29-53)",
    awayRecord: "(38-44)",
    quarter: "3rd",
    gameClock: "5:42",
    shotClock: ":24",
  });

  // Draft values (editable in edit mode)
  const [draftScoreboard, setDraftScoreboard] = useState<ScoreboardData>(savedScoreboard);
  
  // Demo scoreboard (live updates during demo)
  const [demoScoreboard, setDemoScoreboard] = useState<ScoreboardData>(
    CELTICS_VS_BULLS_DEMO.initialScoreboard
  );
  
  // Pre-demo saved state (to restore when exiting demo)
  const [preDemoScoreboard, setPreDemoScoreboard] = useState<ScoreboardData | null>(null);
  
  // View mode state: "view" | "edit" | "demo"
  const [viewMode, setViewMode] = useState<ViewMode>("view");
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Derived states
  const isEditMode = viewMode === "edit";
  const isDemoMode = viewMode === "demo";

  // Validate a single field
  const validateField = useCallback((field: ScoreboardField, value: string | number): string | undefined => {
    switch (field) {
      case "shotClock":
        const shotClockResult = validateShotClock(value as string);
        return shotClockResult.valid ? undefined : shotClockResult.error;
      
      case "gameClock":
        const gameClockResult = validateGameClock(value as string);
        return gameClockResult.valid ? undefined : gameClockResult.error;
      
      case "quarter":
        const quarterResult = validateQuarter(value as string);
        return quarterResult.valid ? undefined : quarterResult.error;
      
      case "homeTeam":
      case "awayTeam":
        const teamResult = validateTeam(value as string);
        return teamResult.valid ? undefined : teamResult.error;
      
      case "homeScore":
      case "awayScore":
        const scoreResult = validateScore(value);
        return scoreResult.valid ? undefined : scoreResult.error;
      
      case "homeRecord":
      case "awayRecord":
        const recordResult = validateRecord(value as string);
        return recordResult.valid ? undefined : recordResult.error;
      
      default:
        return undefined;
    }
  }, []);

  // Validate all fields
  const validateAll = useCallback((): boolean => {
    const newErrors: ValidationErrors = {};
    let hasErrors = false;

    (Object.keys(draftScoreboard) as ScoreboardField[]).forEach((field) => {
      const error = validateField(field, draftScoreboard[field]);
      if (error) {
        newErrors[field] = error;
        hasErrors = true;
      }
    });

    setErrors(newErrors);
    return !hasErrors;
  }, [draftScoreboard, validateField]);

  // Handle field change
  const handleFieldChange = useCallback((field: ScoreboardField, value: string | number) => {
    setDraftScoreboard((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Validate field on change
    const error = validateField(field, value);
    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  }, [validateField]);

  // Toggle edit mode
  const handleToggleEdit = useCallback(() => {
    if (isEditMode) {
      // If exiting edit mode without saving, revert to saved values
      setDraftScoreboard(savedScoreboard);
      setErrors({});
      setViewMode("view");
    } else {
      // Entering edit mode, copy saved to draft
      setDraftScoreboard(savedScoreboard);
      setViewMode("edit");
    }
  }, [isEditMode, savedScoreboard]);

  // Save changes
  const handleSave = useCallback(() => {
    if (validateAll()) {
      // Format game clock before saving (e.g., "5" → "5:00", "5:1" → "5:10")
      const formattedScoreboard = {
        ...draftScoreboard,
        gameClock: formatGameClock(draftScoreboard.gameClock),
      };
      setSavedScoreboard(formattedScoreboard);
      setViewMode("view");
      setErrors({});
    }
  }, [draftScoreboard, validateAll]);

  // Cancel changes
  const handleCancel = useCallback(() => {
    setDraftScoreboard(savedScoreboard);
    setErrors({});
    setViewMode("view");
  }, [savedScoreboard]);

  // Enter demo mode
  const handleEnterDemo = useCallback(() => {
    // Save current state to restore later
    setPreDemoScoreboard(savedScoreboard);
    // Initialize demo scoreboard
    setDemoScoreboard(CELTICS_VS_BULLS_DEMO.initialScoreboard);
    setViewMode("demo");
  }, [savedScoreboard]);

  // Exit demo mode
  const handleExitDemo = useCallback(() => {
    // Restore pre-demo state
    if (preDemoScoreboard) {
      setSavedScoreboard(preDemoScoreboard);
    }
    setPreDemoScoreboard(null);
    setViewMode("view");
  }, [preDemoScoreboard]);

  // Update demo scoreboard (called by DemoPlayground)
  const handleDemoScoreboardUpdate = useCallback((scoreboard: ScoreboardData) => {
    setDemoScoreboard(scoreboard);
  }, []);

  // Check if there are any errors
  const hasErrors = Object.values(errors).some((error) => !!error);

  // Use draft values in edit mode, saved values in view mode
  const displayData = isEditMode ? draftScoreboard : savedScoreboard;

  return (
    <>
      <div className="mobile-fallback">
        <p>
          This graphics control interface is designed for desktop use.
          <br />
          Please use a larger screen.
        </p>
      </div>

      <div className="graphics-layout graphics-layout--preview-only">
        {isDemoMode ? (
          <section className="preview-panel">
            <div className="preview-aspect">
              <DemoPlayground
                scenario={CELTICS_VS_BULLS_DEMO}
                scoreboard={demoScoreboard}
                onScoreboardUpdate={handleDemoScoreboardUpdate}
              />
            </div>
          </section>
        ) : (
          <PreviewPanel
            scoreboard={displayData}
            isEditMode={isEditMode}
            errors={errors}
            onFieldChange={handleFieldChange}
          />
        )}
      </div>

      {/* Floating Edit Controls */}
      <EditControls
        viewMode={viewMode}
        hasErrors={hasErrors}
        onToggleEdit={handleToggleEdit}
        onSave={handleSave}
        onCancel={handleCancel}
        onEnterDemo={handleEnterDemo}
        onExitDemo={handleExitDemo}
      />
    </>
  );
}
