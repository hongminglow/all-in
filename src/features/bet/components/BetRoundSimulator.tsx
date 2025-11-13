import { useEffect, useRef } from "react";
import { useGameContext } from "~/features/bet/context/GameContext";
import { useBetContext } from "~/features/bet/context/BetContext";
import {
  BET_OPTIONS,
  BET_REDUCER_ACTIONS,
  BET_RESULT,
  GAME_PHASE,
  GAME_REDUCER_ACTIONS,
} from "~/constant/bet";
import { GAME_ROUND_CONFIG } from "~/constant/misc";
import { rollThreeDice } from "~/utils/dice";
import type { TBetStakeOptions } from "~/types/bet";

const SMALL_TOTALS = new Set(GAME_ROUND_CONFIG[BET_OPTIONS.SMALL]);
const BIG_TOTALS = new Set(GAME_ROUND_CONFIG[BET_OPTIONS.BIG]);
const ODD_TOTALS = new Set(GAME_ROUND_CONFIG[BET_OPTIONS.ODD]);
const EVEN_TOTALS = new Set(GAME_ROUND_CONFIG[BET_OPTIONS.EVEN]);
const TRIPLE_TOTALS = new Set(GAME_ROUND_CONFIG[BET_OPTIONS.TRIPLE]);

const isTriple = (dice: [number, number, number]) =>
  dice[0] === dice[1] && dice[1] === dice[2];

const isWinningStake = (
  stake: TBetStakeOptions,
  total: number,
  dice: [number, number, number]
) => {
  switch (stake.type) {
    case BET_OPTIONS.SMALL:
      return SMALL_TOTALS.has(total);
    case BET_OPTIONS.BIG:
      return BIG_TOTALS.has(total);
    case BET_OPTIONS.ODD:
      return ODD_TOTALS.has(total);
    case BET_OPTIONS.EVEN:
      return EVEN_TOTALS.has(total);
    case BET_OPTIONS.TRIPLE:
      return isTriple(dice) && TRIPLE_TOTALS.has(total);
    case BET_OPTIONS.SINGLE:
      return stake.target != null && stake.target === total;
    default:
      return false;
  }
};

export const BetRoundSimulator = () => {
  const { state: gameState, dispatch: gameDispatch } = useGameContext();
  const { state: betState, dispatch: betDispatch } = useBetContext();
  const accumulatedBetRef = useRef(betState.accumulatedBet);
  const idleTimerRef = useRef<number | null>(null);
  useEffect(() => {
    accumulatedBetRef.current = betState.accumulatedBet;
  }, [betState.accumulatedBet]);

  useEffect(() => {
    if (gameState.gamePhase !== GAME_PHASE.IDLE) return;

    const timer = window.setTimeout(() => {
      gameDispatch({
        type: GAME_REDUCER_ACTIONS.UPDATE_GAME_PHASE,
        payload: { gamePhase: GAME_PHASE.START },
      });
    }, 1500);

    return () => window.clearTimeout(timer);
  }, [gameState.gamePhase]);

  useEffect(() => {
    if (gameState.gamePhase !== GAME_PHASE.ROLLING) return;

    const timer = window.setTimeout(() => {
      gameDispatch({
        type: GAME_REDUCER_ACTIONS.UPDATE_GAME_PHASE,
        payload: { gamePhase: GAME_PHASE.PENDING_RESULT },
      });
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [gameDispatch, gameState.gamePhase]);

  useEffect(() => {
    if (gameState.gamePhase !== GAME_PHASE.PENDING_RESULT) return;

    const { dice, total } = rollThreeDice();
    const stakes = accumulatedBetRef.current;

    // Evaluate all stakes
    stakes.forEach((stake) => {
      const didWin = isWinningStake(stake, total, dice);
      const payout = didWin
        ? Number((stake.subtotal * stake.odds).toFixed(2))
        : -stake.subtotal;

      betDispatch({
        type: BET_REDUCER_ACTIONS.UPDATE_BET_HISTORY,
        payload: {
          ...stake,
          createdDate: Date.now(),
          result: total,
          winLoss: didWin ? BET_RESULT.WIN : BET_RESULT.LOSE,
          payout,
          dice,
        },
      });
    });

    if (stakes.length) {
      betDispatch({ type: BET_REDUCER_ACTIONS.CLEAR_STAKE });
    }

    gameDispatch({
      type: GAME_REDUCER_ACTIONS.SETTLE_RESULT,
      payload: { result: dice },
    });

    if (idleTimerRef.current) {
      window.clearTimeout(idleTimerRef.current);
    }

    idleTimerRef.current = window.setTimeout(() => {
      gameDispatch({
        type: GAME_REDUCER_ACTIONS.RESET,
      });
    }, 10000);
  }, [betDispatch, gameDispatch, gameState.gamePhase]);

  useEffect(() => {
    return () => {
      if (idleTimerRef.current) {
        window.clearTimeout(idleTimerRef.current);
      }
    };
  }, []);

  return null;
};
