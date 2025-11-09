import type { BetRoom } from "~/types/bet";
import { ROLES } from "./auth";

export const BET_ROOM_TYPES = {
  BEGINNER_LUCK: "beginner-luck",
  HIGH_ROLLER: "high-roller",
  LIGHTNING_ROUND: "lightning-round",
  PRIVATE_LOUNGE: "private-lounge",
  FORTUNE_HALL: "fortune-hall",
  SPEED_DICE: "speed-dice",
} as const;

export const BET_OPTIONS = {
  SMALL: "small",
  BIG: "big",
  ODD: "odd",
  EVEN: "even",
  SINGLE: "single",
  TRIPLE: "triple",
} as const;

export const BETTING_ROOMS: Array<BetRoom> = [
  {
    id: "798",
    name: "Beginner's Luck",
    minBet: 10,
    maxBet: 100,
    players: 124,
    maxPlayers: 500,
    gameType: BET_ROOM_TYPES.BEGINNER_LUCK,
    permission: ROLES.REGULAR_PLAYER,
  },
  {
    id: "123",
    name: "High Roller Suite",
    minBet: 500,
    maxBet: 10000,
    players: 45,
    maxPlayers: 100,
    gameType: BET_ROOM_TYPES.HIGH_ROLLER,
    permission: ROLES.VVIP_PLAYER,
  },
  {
    id: "456",
    name: "Lightning Rounds",
    minBet: 50,
    maxBet: 500,
    players: 289,
    maxPlayers: 1000,
    gameType: BET_ROOM_TYPES.LIGHTNING_ROUND,
    permission: ROLES.VIP_PLAYER,
  },
  {
    id: "4579",
    name: "Private Lounge",
    minBet: 1000,
    maxBet: 50000,
    players: 12,
    maxPlayers: 50,
    gameType: BET_ROOM_TYPES.PRIVATE_LOUNGE,
    permission: ROLES.VVIP_PLAYER,
  },
  {
    id: "7680",
    name: "Fortune Hall",
    minBet: 25,
    maxBet: 250,
    players: 567,
    maxPlayers: 1000,
    gameType: BET_ROOM_TYPES.FORTUNE_HALL,
    permission: ROLES.REGULAR_PLAYER,
  },
  {
    id: "1111",
    name: "Speed Dice Arena",
    minBet: 100,
    maxBet: 1000,
    players: 198,
    maxPlayers: 500,
    gameType: BET_ROOM_TYPES.SPEED_DICE,
    permission: ROLES.REGULAR_PLAYER,
  },
];

export const GAME_ROUND_STATUS = {
  OPEN: "open",
  CLOSED: "closed",
};

export const GAME_PHASE = {
  IDLE: "idle",
  START: "start",
  ROLLING: "rolling",
  PENDING_RESULT: "pending-result",
  SETTLED: "settled",
} as const;

export const GAME_PREFIX_QUICK_BET = [10, 25, 50, 100] as const;

export const GAME_REDUCER_ACTIONS = {
  UPDATE_GAME_PHASE: "update-game-phase",
  UPDATE_GAME_ROUND_STATUS: "update-game-round-status",
  SETTLE_RESULT: "settle-result",
  RESET: "reset",
} as const;

export const BET_REDUCER_ACTIONS = {
  CHANGE_BET_AMOUNT: "change-bet-amount",
  INCREMENT_BET_AMOUNT: "increment-bet-amount",
  DECREMENT_BET_AMOUNT: "decrement-bet-amount",
  APPEND_STAKE: "append-stake",
  REMOVE_STAKE: "remove-stake",
  CLEAR_STAKE: "clear-stake",
  RESET: "reset",
} as const;
