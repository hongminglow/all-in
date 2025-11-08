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

export const BETTING_ROOMS: Array<BetRoom> = [
  {
    id: "room-1",
    name: "Beginner's Luck",
    minBet: 10,
    maxBet: 100,
    players: 124,
    maxPlayers: 500,
    gameType: BET_ROOM_TYPES.BEGINNER_LUCK,
    permission: ROLES.REGULAR_PLAYER,
  },
  {
    id: "room-2",
    name: "High Roller Suite",
    minBet: 500,
    maxBet: 10000,
    players: 45,
    maxPlayers: 100,
    gameType: BET_ROOM_TYPES.HIGH_ROLLER,
    permission: ROLES.VVIP_PLAYER,
  },
  {
    id: "room-3",
    name: "Lightning Rounds",
    minBet: 50,
    maxBet: 500,
    players: 289,
    maxPlayers: 1000,
    gameType: BET_ROOM_TYPES.LIGHTNING_ROUND,
    permission: ROLES.VIP_PLAYER,
  },
  {
    id: "room-4",
    name: "Private Lounge",
    minBet: 1000,
    maxBet: 50000,
    players: 12,
    maxPlayers: 50,
    gameType: BET_ROOM_TYPES.PRIVATE_LOUNGE,
    permission: ROLES.VVIP_PLAYER,
  },
  {
    id: "room-5",
    name: "Fortune Hall",
    minBet: 25,
    maxBet: 250,
    players: 567,
    maxPlayers: 1000,
    gameType: BET_ROOM_TYPES.FORTUNE_HALL,
    permission: ROLES.REGULAR_PLAYER,
  },
  {
    id: "room-6",
    name: "Speed Dice Arena",
    minBet: 100,
    maxBet: 1000,
    players: 198,
    maxPlayers: 500,
    gameType: BET_ROOM_TYPES.SPEED_DICE,
    permission: ROLES.REGULAR_PLAYER,
  },
];
