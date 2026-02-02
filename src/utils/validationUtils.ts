import { NBA_TEAMS } from "../data/nbaTeams";

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validates shot clock value
 * Must be 0-24 seconds
 * Only allows digits and colons - no letters
 * Accepts formats: ":24", ":00", "24", "0"
 */
export function validateShotClock(value: string): ValidationResult {
  // Check for any letters - reject immediately
  if (/[a-zA-Z]/.test(value)) {
    return { valid: false, error: "Shot clock cannot contain letters" };
  }
  
  // Only allow digits and colons
  if (!/^:?\d{1,2}$/.test(value)) {
    return { valid: false, error: "Shot clock format: :00 to :24" };
  }
  
  // Remove leading colon if present
  const normalizedValue = value.startsWith(":") ? value.slice(1) : value;
  
  // Parse the number
  const seconds = parseInt(normalizedValue, 10);
  
  if (isNaN(seconds)) {
    return { valid: false, error: "Shot clock must be a number (0-24)" };
  }
  
  if (seconds < 0 || seconds > 24) {
    return { valid: false, error: "Shot clock must be 0-24" };
  }
  
  return { valid: true };
}

/**
 * Validates game clock value
 * Accepts formats: "12:00", "5:42", "0:30", ":30", "12", "5", "0", "5:1" (becomes 5:10)
 * Max 12:00
 * Only allows digits and colons - no letters
 */
export function validateGameClock(value: string): ValidationResult {
  // Check for any letters - reject immediately
  if (/[a-zA-Z]/.test(value)) {
    return { valid: false, error: "Game clock cannot contain letters" };
  }
  
  let minutes = 0;
  let seconds = 0;
  
  // Case 1: Just a number (0, 5, 12, etc.) - treat as minutes
  if (/^\d{1,2}$/.test(value)) {
    minutes = parseInt(value, 10);
    seconds = 0;
  }
  // Case 2: :SS format (:30, :05, etc.)
  else if (/^:\d{1,2}$/.test(value)) {
    minutes = 0;
    seconds = parseInt(value.slice(1), 10);
  }
  // Case 3: MM:S format (5:4 becomes 5:40)
  else if (/^\d{1,2}:\d$/.test(value)) {
    const parts = value.split(":");
    minutes = parseInt(parts[0], 10);
    seconds = parseInt(parts[1], 10) * 10; // 5:1 → 5:10
  }
  // Case 4: MM:SS format (5:42, 12:00, etc.)
  else if (/^\d{1,2}:\d{2}$/.test(value)) {
    const parts = value.split(":");
    minutes = parseInt(parts[0], 10);
    seconds = parseInt(parts[1], 10);
  }
  // Case 5: Invalid format
  else {
    return { valid: false, error: "Enter MM:SS like '5:42' or just '5' for 5:00" };
  }
  
  // Validate ranges
  if (minutes > 12 || (minutes === 12 && seconds > 0)) {
    return { valid: false, error: "Game clock cannot exceed 12:00" };
  }
  
  if (seconds > 59) {
    return { valid: false, error: "Seconds must be 0-59" };
  }
  
  return { valid: true };
}

/**
 * Valid quarter values
 */
export const VALID_QUARTERS = [
  "1st", "2nd", "3rd", "4th",
  "OT", "OT1", "OT2", "OT3", "OT4", "OT5"
] as const;

export type ValidQuarter = typeof VALID_QUARTERS[number];

/**
 * Validates quarter value
 */
export function validateQuarter(value: string): ValidationResult {
  if (VALID_QUARTERS.includes(value as ValidQuarter)) {
    return { valid: true };
  }
  return { 
    valid: false, 
    error: `Quarter must be one of: ${VALID_QUARTERS.join(", ")}` 
  };
}

/**
 * Validates team key
 */
export function validateTeam(teamKey: string): ValidationResult {
  if (teamKey in NBA_TEAMS) {
    return { valid: true };
  }
  return { valid: false, error: "Invalid team selection" };
}

/**
 * Validates score value
 * Must be 0-999
 */
export function validateScore(value: number | string): ValidationResult {
  const score = typeof value === "string" ? parseInt(value, 10) : value;
  
  if (isNaN(score)) {
    return { valid: false, error: "Score must be a number" };
  }
  
  if (score < 0) {
    return { valid: false, error: "Score cannot be negative" };
  }
  
  if (score > 999) {
    return { valid: false, error: "Score cannot exceed 999" };
  }
  
  return { valid: true };
}

/**
 * Validates team record format (XX-XX) where wins + losses = 82
 * Format: (XX-XX) - opening paren, 2-digit wins, hyphen, 2-digit losses, closing paren
 * Example: (41-41), (50-32), (00-82)
 */
export function validateRecord(value: string): ValidationResult {
  // Check for any letters - reject immediately
  if (/[a-zA-Z]/.test(value)) {
    return { valid: false, error: "No letters allowed" };
  }

  // Check format: must be (XX-XX) with exactly 2 digits on each side
  const formatRegex = /^\(\d{2}-\d{2}\)$/;
  
  if (!formatRegex.test(value)) {
    return { 
      valid: false, 
      error: "Format: (XX-XX)" 
    };
  }
  
  // Extract wins and losses
  const match = value.match(/^\((\d{2})-(\d{2})\)$/);
  if (!match) {
    return { 
      valid: false, 
      error: "Format: (XX-XX)" 
    };
  }
  
  const wins = parseInt(match[1], 10);
  const losses = parseInt(match[2], 10);
  const total = wins + losses;
  
  // Check that wins + losses = 82 (NBA season games)
  if (total !== 82) {
    return { 
      valid: false, 
      error: `W+L must equal 82 (currently ${total})` 
    };
  }
  
  return { valid: true };
}

/**
 * Format shot clock for display
 */
export function formatShotClock(value: string): string {
  // Remove any existing colon prefix
  const normalized = value.startsWith(":") ? value.slice(1) : value;
  const seconds = parseInt(normalized, 10);
  
  if (isNaN(seconds)) return ":24";
  
  return `:${seconds.toString().padStart(2, "0")}`;
}

/**
 * Format game clock for display
 * Handles conversions: "5" → "5:00", "5:1" → "5:10", ":30" → "0:30"
 */
export function formatGameClock(value: string): string {
  // Already in correct MM:SS format
  if (value.match(/^\d{1,2}:\d{2}$/)) {
    return value;
  }
  
  // Just a number (5 or 12) → convert to MM:00
  if (/^\d{1,2}$/.test(value)) {
    return `${value}:00`;
  }
  
  // :SS format (":30") → convert to 0:SS
  if (/^:\d{1,2}$/.test(value)) {
    const seconds = parseInt(value.slice(1), 10);
    return `0:${seconds.toString().padStart(2, "0")}`;
  }
  
  // Partial seconds (5:4 or 5:1) → convert to 5:40 or 5:10
  if (/^\d{1,2}:\d$/.test(value)) {
    const parts = value.split(":");
    const seconds = parseInt(parts[1], 10) * 10;
    return `${parts[0]}:${seconds.toString().padStart(2, "0")}`;
  }
  
  return "12:00"; // Default fallback
}
