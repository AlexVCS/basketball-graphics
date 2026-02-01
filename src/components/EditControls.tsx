import { useEffect } from "react";
import type { ViewMode } from "./GraphicsLayout";
import "./EditControls.css";

interface EditControlsProps {
  viewMode: ViewMode;
  hasErrors: boolean;
  onToggleEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onEnterDemo: () => void;
  onExitDemo: () => void;
}

export default function EditControls({
  viewMode,
  hasErrors,
  onToggleEdit,
  onSave,
  onCancel,
  onEnterDemo,
  onExitDemo,
}: EditControlsProps) {
  const isEditMode = viewMode === "edit";
  const isDemoMode = viewMode === "demo";
  const isViewMode = viewMode === "view";

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        // Allow Escape to still work
        if (e.key === "Escape") {
          e.preventDefault();
          if (isEditMode) {
            onCancel();
          } else if (isDemoMode) {
            onExitDemo();
          }
        }
        return;
      }

      switch (e.key.toLowerCase()) {
        case "e":
          if (isViewMode) {
            e.preventDefault();
            onToggleEdit();
          }
          break;
        case "d":
          if (isViewMode) {
            e.preventDefault();
            onEnterDemo();
          }
          break;
        case "s":
          if (isEditMode) {
            e.preventDefault();
            onSave();
          }
          break;
        case "escape":
          e.preventDefault();
          if (isEditMode) {
            onCancel();
          } else if (isDemoMode) {
            onExitDemo();
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [viewMode, isEditMode, isDemoMode, isViewMode, onToggleEdit, onSave, onCancel, onEnterDemo, onExitDemo]);

  const getModeClass = () => {
    if (isEditMode) return "edit-mode";
    if (isDemoMode) return "demo-mode";
    return "view-mode";
  };

  return (
    <header className={`edit-controls-bar ${getModeClass()}`}>
      <div className="edit-controls-content">
        {/* Mode Indicator */}
        <div className="edit-controls-mode">
          {isEditMode && (
            <>
              <span className="mode-icon">&#9998;</span>
              <span className="mode-text">EDIT MODE</span>
            </>
          )}
          {isDemoMode && (
            <>
              <span className="mode-icon">&#9654;</span>
              <span className="mode-text">DEMO MODE</span>
            </>
          )}
          {isViewMode && (
            <span className="mode-text">VIEW MODE</span>
          )}
        </div>

        {/* Buttons */}
        <div className="edit-controls-buttons">
          {isEditMode && (
            <>
              <button
                className="edit-control-btn save-btn"
                onClick={onSave}
                disabled={hasErrors}
                title={hasErrors ? "Fix errors before saving" : "Save changes (S)"}
              >
                <span className="btn-icon">&#10003;</span>
                Save
                <kbd>S</kbd>
              </button>
              <button
                className="edit-control-btn cancel-btn"
                onClick={onCancel}
                title="Cancel changes (Esc)"
              >
                <span className="btn-icon">&#10005;</span>
                Cancel
                <kbd>Esc</kbd>
              </button>
            </>
          )}
          
          {isDemoMode && (
            <button
              className="edit-control-btn exit-demo-btn"
              onClick={onExitDemo}
              title="Exit demo mode (Esc)"
            >
              <span className="btn-icon">&#10005;</span>
              Exit Demo
              <kbd>Esc</kbd>
            </button>
          )}
          
          {isViewMode && (
            <>
              <button
                className="edit-control-btn edit-btn"
                onClick={onToggleEdit}
                title="Enter edit mode (E)"
              >
                <span className="btn-icon">&#9998;</span>
                Edit
                <kbd>E</kbd>
              </button>
              <button
                className="edit-control-btn demo-btn"
                onClick={onEnterDemo}
                title="Enter demo mode (D)"
              >
                <span className="btn-icon">&#9654;</span>
                Demo
                <kbd>D</kbd>
              </button>
            </>
          )}
        </div>

        {/* Keyboard shortcuts legend */}
        <div className="edit-controls-shortcuts">
          <span className="shortcut-label">Shortcuts:</span>
          {isEditMode && (
            <>
              <span className="shortcut"><kbd>S</kbd> Save</span>
              <span className="shortcut"><kbd>Esc</kbd> Cancel</span>
            </>
          )}
          {isDemoMode && (
            <span className="shortcut"><kbd>Esc</kbd> Exit</span>
          )}
          {isViewMode && (
            <>
              <span className="shortcut"><kbd>E</kbd> Edit</span>
              <span className="shortcut"><kbd>D</kbd> Demo</span>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
