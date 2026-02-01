import { useRef } from "react";
import type { ScoreboardData, ValidationErrors, ScoreboardField } from "../types/scorebug";
import Scorebug from "./Scorebug";
import RecordErrorTooltip from "./RecordErrorTooltip";

interface PreviewPanelProps {
  scoreboard: ScoreboardData;
  isEditMode: boolean;
  errors: ValidationErrors;
  onFieldChange: (field: ScoreboardField, value: string | number) => void;
}

export default function PreviewPanel({
  scoreboard,
  isEditMode,
  errors,
  onFieldChange,
}: PreviewPanelProps) {
  const scorebugWrapperRef = useRef<HTMLDivElement>(null);

  return (
    <section className="preview-panel">
      <div className="preview-aspect">
        <div className="preview-content">
          <div ref={scorebugWrapperRef}>
            <Scorebug
              data={scoreboard}
              isEditMode={isEditMode}
              errors={errors}
              onFieldChange={onFieldChange}
            />
          </div>
          
          {/* Record Error Tooltips - Show below scorebug */}
          {isEditMode && (
            <RecordErrorTooltip
              awayRecordError={errors.awayRecord}
              homeRecordError={errors.homeRecord}
              scorebugRef={scorebugWrapperRef}
            />
          )}
        </div>
      </div>
    </section>
  );
}
