import { useEffect, useState } from "react";
import "./RecordErrorTooltip.css";

interface RecordErrorTooltipProps {
  awayRecordError?: string;
  homeRecordError?: string;
  scorebugRef: React.RefObject<HTMLDivElement | null>;
}

export default function RecordErrorTooltip({
  awayRecordError,
  homeRecordError,
  scorebugRef,
}: RecordErrorTooltipProps) {
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

  // Update position when scorebug position changes
  useEffect(() => {
    const updatePosition = () => {
      if (scorebugRef.current) {
        const rect = scorebugRef.current.getBoundingClientRect();
        setPosition({
          top: rect.bottom + 8,
          left: rect.left,
          width: rect.width,
        });
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, [scorebugRef]);

  // Don't render if no errors
  if (!awayRecordError && !homeRecordError) {
    return null;
  }

  return (
    <div
      className="record-error-container"
      style={{
        top: position.top,
        left: position.left,
        width: position.width,
      }}
    >
      {/* Away Team Error (Left Side) */}
      <div className={`record-error-box away-error ${awayRecordError ? "visible" : ""}`}>
        {awayRecordError && (
          <>
            <span className="record-error-icon">&#10005;</span>
            <span className="record-error-message">{awayRecordError}</span>
          </>
        )}
      </div>

      {/* Home Team Error (Right Side) */}
      <div className={`record-error-box home-error ${homeRecordError ? "visible" : ""}`}>
        {homeRecordError && (
          <>
            <span className="record-error-icon">&#10005;</span>
            <span className="record-error-message">{homeRecordError}</span>
          </>
        )}
      </div>
    </div>
  );
}
