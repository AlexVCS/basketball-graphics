import type { ScoreboardData } from "../types/scorebug";
import Scorebug from "./Scorebug";

interface PreviewPanelProps {
  scoreboard: ScoreboardData;
}

export default function PreviewPanel({ scoreboard }: PreviewPanelProps) {
  return (
    <section className="preview-panel">
      <div className="preview-aspect">
        <div className="preview-content">
          <Scorebug data={scoreboard} />
        </div>
      </div>
    </section>
  );
}
