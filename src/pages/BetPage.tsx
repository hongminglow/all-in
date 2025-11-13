import { History, TrendingUp } from "lucide-react";

import { Card } from "~/components/ui/card";
import { GameProvider } from "~/features/bet/context/GameContext";
import { CountDownBanner } from "~/features/bet/components/CountDownBanner";
import { DiceRoller } from "~/features/bet/components/DiceRoller";
import { BetController } from "~/features/bet/components/BetController";
import { BetProvider, useBetContext } from "~/features/bet/context/BetContext";
import { CurrentAccumulatedBets } from "~/features/bet/components/CurrentAccumulatedBets";
import { BetRoundSimulator } from "~/features/bet/components/BetRoundSimulator";
import { BET_RESULT } from "~/constant/bet";
import { BetTypeLabel } from "../features/bet/components/BetTypeLabel";

export const BetPage = () => {
  return (
    <GameProvider>
      <BetProvider>
        <BetPageContent />
      </BetProvider>
    </GameProvider>
  );
};

const BetPageContent = () => {
  const { state: betState } = useBetContext();
  const history = [...betState.betHistory].reverse();

  const winCount = history.filter(
    (item) => item.winLoss === BET_RESULT.WIN
  ).length;
  const bestPayout = history.reduce(
    (max, item) => Math.max(max, item.payout),
    0
  );

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-8 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <CountDownBanner />

        <DiceRoller />

        <BetController />
      </div>

      <div className="space-y-6">
        <CurrentAccumulatedBets />

        <Card className="border-white/20 bg-white/10 p-6 backdrop-blur-lg">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-white">Recent Results</h3>
              <p className="text-sm text-purple-200">Track your performance</p>
            </div>
            <History className="h-5 w-5 text-purple-200" />
          </div>

          <div className="space-y-4">
            {history.length === 0 ? (
              <p className="text-sm text-purple-200">
                No game history yet. Place a bet to get started!
              </p>
            ) : (
              history.map((game, index) => (
                <div
                  key={`${game.id ?? game.createdDate}-${index}`}
                  className="rounded-lg border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex items-center justify-between text-white">
                    <span>Stake {history.length - index}</span>
                    <span
                      className={
                        game.winLoss === BET_RESULT.WIN
                          ? "text-green-400"
                          : "text-red-400"
                      }
                    >
                      {game.winLoss === BET_RESULT.WIN ? "+" : ""}${game.payout}
                    </span>
                  </div>

                  <BetTypeLabel type={game.type} target={game.target} />

                  <div className="mt-2 flex items-center justify-between text-sm text-purple-200">
                    <span>Dice: {game.dice.join(" - ")}</span>
                    <p>
                      Result: &nbsp;
                      <span className="font-bold text-base/4">
                        {game.result}
                      </span>
                    </p>
                  </div>
                  <div className="mt-2 text-xs text-purple-300">
                    {new Date(game.createdDate).toLocaleString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        <Card className="border-white/20 bg-white/10 p-6 backdrop-blur-lg">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-white">Performance Stats</h3>
              <p className="text-sm text-purple-200">Keep track of your game</p>
            </div>
            <TrendingUp className="h-5 w-5 text-purple-200" />
          </div>

          <div className="space-y-3 text-sm text-purple-200">
            <div className="flex justify-between">
              <span>Total Stakes Logged</span>
              <span>{history.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Win Rate</span>
              <span>
                {history.length === 0
                  ? "0%"
                  : `${Math.round((winCount / history.length) * 100)}%`}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Best Payout</span>
              <span>{history.length === 0 ? "$0" : `$${bestPayout}`}</span>
            </div>
          </div>
        </Card>
      </div>

      <BetRoundSimulator />
    </div>
  );
};
