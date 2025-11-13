import { Clock } from "lucide-react";
import { Card } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { GAME_ROUND_CONFIG } from "~/constant/misc";
import { useEffect, useState } from "react";
import { cn } from "~/utils/general";
import { useGameContext } from "~/features/bet/context/GameContext";
import {
  GAME_PHASE,
  GAME_REDUCER_ACTIONS,
  GAME_ROUND_STATUS,
} from "~/constant/bet";
import type { TGamePhase } from "~/types/bet";
import { formatDuration } from "~/utils/timer";

const getGamePhaseLabel = (phase: TGamePhase) => {
  switch (phase) {
    case GAME_PHASE.START:
      return "Place Your Bets";
    case GAME_PHASE.ROLLING:
      return "Rolling...";
    case GAME_PHASE.PENDING_RESULT:
      return "Waiting Result...";
    default:
      return null;
  }
};

export const CountDownBanner = () => {
  const { state, dispatch } = useGameContext();
  const [timeLeft, setTimeLeft] = useState(GAME_ROUND_CONFIG.countdown);

  useEffect(() => {
    if (state.gamePhase !== GAME_PHASE.START) return;
    setTimeLeft(GAME_ROUND_CONFIG.countdown);
  }, [state.gamePhase]);

  useEffect(() => {
    if (state.gamePhase === GAME_PHASE.START && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            dispatch({
              type: GAME_REDUCER_ACTIONS.UPDATE_GAME_PHASE,
              payload: { gamePhase: GAME_PHASE.ROLLING },
            });
            return 0;
          }

          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [state.gamePhase, timeLeft]);

  return (
    <Card className="border-white/20 bg-linear-to-r from-purple-900/80 to-indigo-900/80 p-6 backdrop-blur-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Clock
            className={cn("h-8 w-8", {
              "text-green-400": timeLeft > 30,
              "text-yellow-400": timeLeft <= 30 && timeLeft > 10,
              "text-red-400": timeLeft <= 10,
            })}
          />
          <div>
            <div
              className={cn("text-4xl", {
                "text-green-400": timeLeft > 30,
                "text-yellow-400": timeLeft <= 30 && timeLeft > 10,
                "text-red-400": timeLeft <= 10,
              })}
            >
              {formatDuration(timeLeft)}
            </div>
            <div className="text-purple-300">
              {getGamePhaseLabel(state.gamePhase)}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-purple-300">Round Status</div>
          <Badge
            className={cn({
              "bg-green-500 text-white":
                state.status === GAME_ROUND_STATUS.OPEN,
              "bg-red-500 text-white":
                state.status === GAME_ROUND_STATUS.CLOSED,
            })}
          >
            {state.status === GAME_ROUND_STATUS.OPEN ? "OPEN" : "CLOSED"}
          </Badge>
        </div>
      </div>
    </Card>
  );
};
