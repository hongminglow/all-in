import { BET_REDUCER_ACTIONS, GAME_PREFIX_QUICK_BET } from "~/constant/bet";
import type {
  TBetReducerAction,
  TBetStakeOptions,
  TGamePrefixQuickBet,
} from "~/types/bet";

export type TBetInitialState = {
  betAmount: TGamePrefixQuickBet;
  accumulatedBet: Array<TBetStakeOptions>;
  accumulatedTotal: number;
};

export const betInitialState: TBetInitialState = {
  betAmount: GAME_PREFIX_QUICK_BET[0],
  accumulatedBet: [],
  accumulatedTotal: 0,
};

export const betReducer = (
  draft: TBetInitialState,
  action: TBetReducerAction
) => {
  switch (action.type) {
    case BET_REDUCER_ACTIONS.CHANGE_BET_AMOUNT:
      draft.betAmount = action.payload;
      break;
    case BET_REDUCER_ACTIONS.INCREMENT_BET_AMOUNT:
      draft.betAmount += 10;
      break;
    case BET_REDUCER_ACTIONS.DECREMENT_BET_AMOUNT:
      if (draft.betAmount <= 10) return;
      draft.betAmount -= 10;
      break;
    case BET_REDUCER_ACTIONS.APPEND_STAKE:
      draft.accumulatedBet.push(action.payload.stake);
      draft.accumulatedTotal += action.payload.stake.subtotal;
      break;
    case BET_REDUCER_ACTIONS.REMOVE_STAKE: {
      const idx = draft.accumulatedBet.findIndex(
        (stake) => stake.id === action.payload.id
      );

      if (idx !== -1) {
        const stakeToRemove = draft.accumulatedBet[idx];
        draft.accumulatedBet.splice(idx, 1);
        draft.accumulatedTotal -= stakeToRemove?.subtotal || 0;
      }
      break;
    }
    case BET_REDUCER_ACTIONS.CLEAR_STAKE:
      draft.accumulatedBet = [];
      draft.accumulatedTotal = 0;
      break;
    case BET_REDUCER_ACTIONS.RESET:
      Object.assign(draft, betInitialState);
      break;
    default:
      return draft;
  }
};
