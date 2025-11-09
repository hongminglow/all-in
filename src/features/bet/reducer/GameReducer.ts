import {
  GAME_PHASE,
  GAME_REDUCER_ACTIONS,
  GAME_ROUND_STATUS,
} from "~/constant/bet";
import type {
  TGamePhase,
  TGameReducerAction,
  TGameRoundStatus,
} from "~/types/bet";

export type TGameInitialState = {
  status: TGameRoundStatus;
  gamePhase: TGamePhase;
  result: [number, number, number];
};

export const gameInitialState: TGameInitialState = {
  status: GAME_ROUND_STATUS.OPEN,
  gamePhase: GAME_PHASE.IDLE,
  result: [0, 0, 0],
};

export const gameReducer = (
  draft: TGameInitialState,
  action: TGameReducerAction
) => {
  switch (action.type) {
    case GAME_REDUCER_ACTIONS.UPDATE_GAME_PHASE:
      draft.gamePhase = action.payload.gamePhase;
      break;
    case GAME_REDUCER_ACTIONS.UPDATE_GAME_ROUND_STATUS:
      draft.status = action.payload;
      break;
    case GAME_REDUCER_ACTIONS.SETTLE_RESULT:
      draft.gamePhase = GAME_PHASE.SETTLED;
      // Simulate dice roll results
      draft.result = [
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
      ];
      break;
    case GAME_REDUCER_ACTIONS.RESET:
      Object.assign(draft, gameInitialState);
      break;
    default:
      return draft;
  }
};
