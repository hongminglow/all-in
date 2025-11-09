import type {
  BET_OPTIONS,
  BET_ROOM_TYPES,
  GAME_PHASE,
  GAME_PREFIX_QUICK_BET,
  GAME_ROUND_STATUS,
} from "~/constant/bet";
import type { TRoles } from "./auth";

export interface BetRoom {
  id: string;
  name: string;
  minBet: number;
  maxBet: number;
  players: number;
  maxPlayers: number;
  gameType: TBetRoomTypes;
  permission: TRoles;
}

export type TBetRoomTypes =
  (typeof BET_ROOM_TYPES)[keyof typeof BET_ROOM_TYPES];

export type TBetOptions = (typeof BET_OPTIONS)[keyof typeof BET_OPTIONS];

export type TBetStakeOptions = {
  id: string;
  type: TBetOptions;
  target: number;
  odds: number;
  subtotal: number;
};

export type TGamePhase = (typeof GAME_PHASE)[keyof typeof GAME_PHASE];

export type TGameRoundStatus =
  (typeof GAME_ROUND_STATUS)[keyof typeof GAME_ROUND_STATUS];

export type TGamePrefixQuickBet = (typeof GAME_PREFIX_QUICK_BET)[number];

export type TGameReducerAction =
  | {
      type: "update-game-phase";
      payload: {
        gamePhase: TGamePhase;
      };
    }
  | {
      type: "update-game-round-status";
      payload: TGameRoundStatus;
    }
  | {
      type: "settle-result";
      payload: {
        result: [number, number, number];
      };
    }
  | { type: "reset" };

export type TBetReducerAction =
  | {
      type: "change-bet-amount";
      payload: TGamePrefixQuickBet;
    }
  | {
      type: "increment-bet-amount";
    }
  | {
      type: "decrement-bet-amount";
    }
  | {
      type: "append-stake";
      payload: {
        stake: TBetStakeOptions;
      };
    }
  | {
      type: "remove-stake";
      payload: {
        id: string;
      };
    }
  | {
      type: "clear-stake";
    }
  | {
      type: "reset";
    };
