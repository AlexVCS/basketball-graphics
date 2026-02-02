# AGENTS.md - Basketball Graphics Development Guide

## Project Overview

**Basketball Graphics** is a React-based web application for managing and displaying NBA game scorebug graphics. It provides real-time scoreboard editing, validation, and demonstration playback features.

**Tech Stack**: React 19 + TypeScript 5.9 + Vite 7 + ESLint 9

## Development Commands

### Build & Development
```bash
npm run dev          # Start Vite dev server with HMR
npm run build        # TypeScript check + Vite production build
npm run lint         # ESLint check (tsc -b && vite build)
npm run preview      # Preview production build locally
```

### Running a Single Test
**No testing framework currently configured.** Add Vitest:
```bash
npm install -D vitest @vitest/ui
npm test -- path/to/file.test.ts
npm test -- --ui  # Interactive UI
```

## TypeScript Configuration

- **Target**: ES2022
- **Module**: ESNext
- **Strict Mode**: Enabled
- **JSX**: react-jsx
- **Notable Settings**:
  - `noUnusedLocals: true` - Unused variables caught
  - `noUnusedParameters: true` - Unused parameters caught
  - `noUncheckedSideEffectImports: true` - Explicit side-effect imports
  - `noFallthroughCasesInSwitch: true` - Switch case validation

## Code Style Guidelines

### Imports
- Use `import type { ... }` for TypeScript-only imports
- React hooks imported individually: `import { useState, useCallback } from "react"`
- Local imports use relative paths: `import App from "./App.tsx"`
- CSS imported directly into components: `import "./Component.css"`
- Order: React imports → type imports → local imports → CSS

**Example**:
```typescript
import { useState, useCallback } from "react";
import type { ScoreboardData } from "../types/scorebug";
import { validateScore } from "../utils/validationUtils";
import "./Component.css";
```

### TypeScript Conventions
- **Interfaces over types** for object shapes (especially component props)
- **Export interfaces alongside implementations** - same file organization
- **Union types** for restricted string values:
  ```typescript
  export type ViewMode = "view" | "edit" | "demo";
  ```
- **Strict null checking** - use `const ref = useRef<HTMLDivElement>(null)`
- **Type guard patterns** - validate before using:
  ```typescript
  if (value in NBA_TEAMS) { /* safe to use */ }
  ```

### Component Patterns
```typescript
// Props interface ABOVE component
interface ComponentNameProps {
  data: ScoreboardData;
  onFieldChange: (field: ScoreboardField, value: string | number) => void;
}

// Function component with default export
export default function ComponentName({
  data,
  onFieldChange,
}: ComponentNameProps) {
  // Hooks at top of function
  const [state, setState] = useState<Type>(initial);
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Event handlers with const handleXxx pattern
  const handleClick = useCallback(() => {
    // Implementation
  }, [dependencies]);

  return <div>...</div>;
}
```

### Naming Conventions
- **Components & Interfaces**: PascalCase (`Scorebug`, `ScoreboardData`)
- **Functions & Variables**: camelCase (`handleFieldChange`, `displayData`)
- **Constants**: SCREAMING_SNAKE_CASE (`VALID_QUARTERS`, `NBA_TEAMS`)
- **CSS Files**: Match component name (`Scorebug.css`, `TeamSelector.css`)
- **Event Handlers**: `handleXxx` (e.g., `handleFieldChange`, `handleSave`)
- **Boolean States**: Prefix with `is` or `has` (`isEditMode`, `hasErrors`)
- **Toggle Functions**: `toggleXxx` (e.g., `togglePlayPause`)

### Error Handling Pattern
Create validation functions returning a result object:
```typescript
export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateScore(value: number | string): ValidationResult {
  const score = typeof value === "string" ? parseInt(value, 10) : value;
  if (isNaN(score)) return { valid: false, error: "Score must be a number" };
  if (score < 0) return { valid: false, error: "Score cannot be negative" };
  return { valid: true };
}
```

Store validation errors in state:
```typescript
const [errors, setErrors] = useState<ValidationErrors>({});
// Update on field change
const error = validateField(field, value);
setErrors((prev) => ({ ...prev, [field]: error }));
```

### Callback Dependencies
- Use `useCallback` for memoized event handlers
- Always include proper dependency arrays
- Example: Event handler updating state + validation
  ```typescript
  const handleFieldChange = useCallback((field: ScoreboardField, value: string | number) => {
    setDraftScoreboard((prev) => ({ ...prev, [field]: value }));
    const error = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: error }));
  }, [validateField]); // validateField changes trigger update
  ```

## File Organization

```
src/
├── components/         # React components
│   ├── Scorebug.tsx   # Main scorebug display (props: data, isEditMode, errors, onFieldChange)
│   ├── EditControls.tsx # Mode buttons (view/edit/demo)
│   ├── GraphicsLayout.tsx # Main state orchestration
│   ├── PreviewPanel.tsx # Display container
│   └── DemoPlayground.tsx # Video + playback controls
├── hooks/             # Custom React hooks
│   └── useDemoPlayback.ts # Video playback synchronization
├── types/             # TypeScript type definitions
│   └── scorebug.ts    # Core interfaces (ScoreboardData, ScoreboardField, etc.)
├── data/              # Constants and configuration
│   ├── nbaTeams.ts    # NBA team data with colors
│   └── demoScenarios.ts # Demo video scenarios
├── utils/             # Utility functions
│   └── validationUtils.ts # Field validation functions
├── styles/            # Global styles
│   └── graphicsLayout.css
└── index.css          # Root styles
```

## Key Types & Interfaces

**ScoreboardData** (src/types/scorebug.ts):
- Core state: `homeTeam`, `awayTeam`, `homeScore`, `awayScore`, `homeRecord`, `awayRecord`, `quarter`, `gameClock`, `shotClock`

**ScoreboardField**: Union type of all scoreboard data keys, used for dynamic field updates

**ViewMode**: `"view"` | `"edit"` | `"demo"` - Determines UI state and available actions

## Validation

- Centralized in `src/utils/validationUtils.ts`
- Game Clock: MM:SS format, max 12:00
- Shot Clock: :00 to :24 format
- Scores: 0-999 range
- Records: (XX-XX) format where wins + losses = 82
- Quarters: "1st", "2nd", "3rd", "4th", "OT", "OT1"-"OT5"

## ESLint Configuration

- Uses flat config format (eslint.config.js)
- Extends: @eslint/js, typescript-eslint, react-hooks, react-refresh
- Ignores: dist/ directory
- No custom rules currently configured

## Development Notes

- **No tests configured** - Add Vitest for unit tests
- **No Cursor/Copilot rules** - No .cursor/ or .github/copilot-instructions.md files
- **HMR enabled** - Changes hot-reload in dev mode
- **Strict types everywhere** - TypeScript strict mode enforced
- Component state pattern: Save → Draft → Display (prevents accidental loss of edits)
