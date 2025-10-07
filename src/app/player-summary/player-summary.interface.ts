/**
 * Player Summary API Response Interfaces
 * 
 * These interfaces describe the structure of data returned from 
 * /api/v1/playerSummary/{playerID} endpoint.
 * 
 * Coordinates (x, y) are measured in feet relative to the center 
 * of the offensive basket (see court_diagram.jpg).
 */

/**
 * Represents a shot location and result
 */
export interface Shot {
  /** Location [x, y] in feet relative to offensive basket center */
  loc: [number, number];
  /** Points scored (0, 2, 3, or 4) */
  points: number;
}

/**
 * Represents a pass with start/end locations and outcome
 */
export interface Pass {
  /** Starting location [x, y] in feet */
  startLoc: [number, number];
  /** Ending location [x, y] in feet */
  endLoc: [number, number];
  /** Whether the pass was completed successfully */
  isCompleted: boolean;
  /** Whether the pass led to a scoring opportunity */
  isPotentialAssist: boolean;
  /** Whether the pass resulted in a turnover */
  isTurnover: boolean;
}

/**
 * Represents a turnover location
 */
export interface Turnover {
  /** Location [x, y] in feet where turnover occurred */
  loc: [number, number];
}

/**
 * Statistics for a specific halfcourt action type
 */
export interface HalfcourtActionStats {
  /** Total shot attempts in this action type */
  totalShotAttempts: number;
  /** Total points scored in this action type */
  totalPoints: number;
  /** Total passes made in this action type */
  totalPasses: number;
  /** Total passes that led to scoring opportunities */
  totalPotentialAssists: number;
  /** Total turnovers in this action type */
  totalTurnovers: number;
  /** Total turnovers from passing in this action type */
  totalPassingTurnovers: number;
  /** Array of all shots in this action type */
  shots: Shot[];
  /** Array of all passes in this action type */
  passes: Pass[];
  /** Array of all turnovers in this action type */
  turnovers: Turnover[];
}

/**
 * Player ranking statistics
 */
export interface PlayerRanks {
  /** Rank of total shot attempts (1 = most attempts) */
  totalShotAttemptsRank?: number;
  /** Rank of total points scored (1 = most points) */
  totalPointsRank?: number;
  /** Rank of total passes made (1 = most passes) */
  totalPassesRank?: number;
  /** Rank of total potential assists (1 = most potential assists) */
  totalPotentialAssistsRank?: number;
  /** Rank of total turnovers (1 = most turnovers) */
  totalTurnoversRank?: number;
  /** Rank of total passing turnovers (1 = most passing turnovers) */
  totalPassingTurnoversRank?: number;
}

/**
 * Complete player summary response from API
 */
export interface PlayerSummary {
  /** Player's full name */
  playerName: string;
  /** Team name */
  teamName: string;
  /** Unique player identifier */
  playerID: number;
  
  // Season totals
  /** Total shot attempts across all actions */
  totalShotAttempts: number;
  /** Total points scored across all actions */
  totalPoints: number;
  /** Total passes made across all actions */
  totalPasses: number;
  /** Total potential assists across all actions */
  totalPotentialAssists: number;
  /** Total turnovers across all actions */
  totalTurnovers: number;
  /** Total turnovers from passing across all actions */
  totalPassingTurnovers: number;
  
  // Halfcourt action counts
  /** Number of pick & roll actions */
  pickAndRollCount: number;
  /** Number of isolation actions */
  isolationCount: number;
  /** Number of post-up actions */
  postUpCount: number;
  /** Number of off-ball screen actions */
  offBallScreenCount: number;
  
  // Detailed stats by halfcourt action type
  /** Pick & Roll action statistics and events */
  pickAndRoll: HalfcourtActionStats;
  /** Isolation action statistics and events */
  isolation: HalfcourtActionStats;
  /** Post-up action statistics and events */
  postUp: HalfcourtActionStats;
  /** Off-Ball Screen action statistics and events */
  offBallScreen: HalfcourtActionStats;
  
  // Player rankings (1 = best/most)
  /** Rank of total shot attempts (1 = most attempts) */
  totalShotAttemptsRank?: number;
  /** Rank of total points scored (1 = most points) */
  totalPointsRank?: number;
  /** Rank of total passes made (1 = most passes) */
  totalPassesRank?: number;
  /** Rank of total potential assists (1 = most potential assists) */
  totalPotentialAssistsRank?: number;
  /** Rank of total turnovers (1 = most turnovers) */
  totalTurnoversRank?: number;
  /** Rank of total passing turnovers (1 = most passing turnovers) */
  totalPassingTurnoversRank?: number;
  /** Rank of pick & roll action count */
  pickAndRollCountRank?: number;
  /** Rank of isolation action count */
  isolationCountRank?: number;
  /** Rank of post-up action count */
  postUpCountRank?: number;
  /** Rank of off-ball screen action count */
  offBallScreenCountRank?: number;
}

/**
 * Enum for halfcourt action types
 */
export enum HalfcourtActionType {
  PickAndRoll = 'pickAndRoll',
  Isolation = 'isolation',
  PostUp = 'postUp',
  OffBallScreen = 'offBallScreen'
}

/**
 * Type guard to check if a value is a valid HalfcourtActionType
 */
export function isHalfcourtActionType(value: string): value is HalfcourtActionType {
  return Object.values(HalfcourtActionType).includes(value as HalfcourtActionType);
}

/**
 * Helper type for accessing action stats by key
 */
export type HalfcourtActionStatsMap = {
  [K in HalfcourtActionType]: HalfcourtActionStats;
};
