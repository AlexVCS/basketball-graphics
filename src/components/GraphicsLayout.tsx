import "../styles/graphicsLayout.css";
import ControlsPanel from "./ControlsPanel";
import PreviewPanel from "./PreviewPanel";

export default function GraphicsLayout() {
  return (
    <>
      <div className="mobile-fallback">
        <p>
          This graphics control interface is designed for desktop use.
          <br />
          Please use a larger screen.
        </p>
      </div>

      <div className="graphics-layout">
        <ControlsPanel />
        <PreviewPanel />
      </div>
    </>
  );
}