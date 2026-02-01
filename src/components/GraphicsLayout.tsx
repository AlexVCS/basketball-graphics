import { useState, useCallback } from "react";
import "../styles/graphicsLayout.css";
import PreviewPanel from "./PreviewPanel";
import EditControls from "./EditControls";
import type { ScoreboardData, ValidationErrors, ScoreboardField } from "../types/scorebug";
import {
  validateShotClock,
  validateGameClock,
  validateQuarter,
  validateTeam,
  validateScore,
  validateRecord,
} from "../utils/validationUtils";

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
  
  // Edit mode state
  const [isEditMode, setIsEditMode] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});

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
    } else {
      // Entering edit mode, copy saved to draft
      setDraftScoreboard(savedScoreboard);
    }
    setIsEditMode((prev) => !prev);
  }, [isEditMode, savedScoreboard]);

  // Save changes
  const handleSave = useCallback(() => {
    if (validateAll()) {
      setSavedScoreboard(draftScoreboard);
      setIsEditMode(false);
      setErrors({});
    }
  }, [draftScoreboard, validateAll]);

  // Cancel changes
  const handleCancel = useCallback(() => {
    setDraftScoreboard(savedScoreboard);
    setErrors({});
    setIsEditMode(false);
  }, [savedScoreboard]);

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
        <PreviewPanel
          scoreboard={displayData}
          isEditMode={isEditMode}
          errors={errors}
          onFieldChange={handleFieldChange}
        />
      </div>

      {/* Floating Edit Controls */}
      <EditControls
        isEditMode={isEditMode}
        hasErrors={hasErrors}
        onToggleEdit={handleToggleEdit}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </>
  );
}
