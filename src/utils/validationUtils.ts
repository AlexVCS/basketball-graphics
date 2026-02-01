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
 * Must be MM:SS format, max 12:00
 * Only allows digits and colons - no letters
 * Accepts formats: "12:00", "5:42", "0:30", ":30"
 */
export function validateGameClock(value: string): ValidationResult {
  // Check for any letters - reject immediately
  if (/[a-zA-Z]/.test(value)) {
    return { valid: false, error: "Game clock cannot contain letters" };
  }
  
  // Handle ":SS" format (no minutes)
  if (value.startsWith(":")) {
    if (!/^:\d{1,2}$/.test(value)) {
      return { valid: false, error: "Game clock format: MM:SS" };
    }
    const seconds = parseInt(value.slice(1), 10);
    if (isNaN(seconds) || seconds < 0 || seconds > 59) {
      return { valid: false, error: "Seconds must be 0-59" };
    }
    return { valid: true };
  }
  
  // Handle "MM:SS" format
  const match = value.match(/^(\d{1,2}):(\d{2})$/);
  
  if (!match) {
    return { valid: false, error: "Game clock must be in MM:SS format" };
  }
  
  const minutes = parseInt(match[1], 10);
  const seconds = parseInt(match[2], 10);
  
  if (minutes > 12) {
    return { valid: false, error: "Game clock cannot exceed 12:00" };
  }
  
  if (minutes === 12 && seconds > 0) {
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
 */
export function formatGameClock(value: string): string {
  // Already in correct format
  if (value.match(/^\d{1,2}:\d{2}$/)) {
    return value;
  }
  
  // Handle ":SS" format
  if (value.startsWith(":")) {
    return `0${value}`;
  }
  
  return "12:00";
}
