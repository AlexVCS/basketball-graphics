import { useEffect } from "react";
import "./EditControls.css";

interface EditControlsProps {
  isEditMode: boolean;
  hasErrors: boolean;
  onToggleEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function EditControls({
  isEditMode,
  hasErrors,
  onToggleEdit,
  onSave,
  onCancel,
}: EditControlsProps) {
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
        if (e.key === "Escape" && isEditMode) {
          e.preventDefault();
          onCancel();
        }
        return;
      }

      switch (e.key.toLowerCase()) {
        case "e":
          e.preventDefault();
          onToggleEdit();
          break;
        case "s":
          if (isEditMode) {
            e.preventDefault();
            onSave();
          }
          break;
        case "escape":
          if (isEditMode) {
            e.preventDefault();
            onCancel();
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isEditMode, onToggleEdit, onSave, onCancel]);

  return (
    <header className={`edit-controls-bar ${isEditMode ? "edit-mode" : "view-mode"}`}>
      <div className="edit-controls-content">
        {/* Mode Indicator */}
        <div className="edit-controls-mode">
          {isEditMode ? (
            <>
              <span className="mode-icon">&#9998;</span>
              <span className="mode-text">EDIT MODE</span>
            </>
          ) : (
            <span className="mode-text">VIEW MODE</span>
          )}
        </div>

        {/* Buttons */}
        <div className="edit-controls-buttons">
          {isEditMode ? (
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
          ) : (
            <button
              className="edit-control-btn edit-btn"
              onClick={onToggleEdit}
              title="Enter edit mode (E)"
            >
              <span className="btn-icon">&#9998;</span>
              Edit
              <kbd>E</kbd>
            </button>
          )}
        </div>

        {/* Keyboard shortcuts legend */}
        <div className="edit-controls-shortcuts">
          <span className="shortcut-label">Shortcuts:</span>
          {isEditMode ? (
            <>
              <span className="shortcut"><kbd>S</kbd> Save</span>
              <span className="shortcut"><kbd>Esc</kbd> Cancel</span>
            </>
          ) : (
            <span className="shortcut"><kbd>E</kbd> Edit</span>
          )}
        </div>
      </div>
    </header>
  );
}
