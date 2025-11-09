import { BET_OPTIONS } from "./bet";

export const LANGUAGES = {
  ENGLISH: "en",
  CHINESE: "zh",
} as const;

export const GAME_SUMMARY_CONFIG = {
  activePlayers: 1280,
  wonToday: 2400000,
  gamesPlayed: 15678,
};

export const GAME_ROUND_CONFIG = {
  countdown: 60,
  [BET_OPTIONS.SMALL]: [4, 5, 6, 7, 8, 9, 10],
  [BET_OPTIONS.BIG]: [11, 12, 13, 14, 15, 16, 17],
  [BET_OPTIONS.ODD]: [3, 5, 7, 9, 11, 13, 15, 17],
  [BET_OPTIONS.EVEN]: [4, 6, 8, 10, 12, 14, 16],
  [BET_OPTIONS.TRIPLE]: [
    3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
  ],
};
