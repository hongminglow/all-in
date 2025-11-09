import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { History, TrendingUp, Clock } from "lucide-react";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Input } from "~/components/ui/input";
import { useNavigate } from "react-router";
import { GameProvider } from "../features/bet/context/GameContext";

interface Bet {
  type: string;
  amount: number;
  label: string;
}

interface GameResult {
  dice: [number, number, number];
  total: number;
  timestamp: number;
  result: "win" | "lose";
  payout: number;
}

type GamePhase = "betting" | "rolling" | "result";

export const BetPage = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(10000);
  const [dice, setDice] = useState<[number, number, number]>([1, 2, 3]);
  const [gamePhase, setGamePhase] = useState<GamePhase>("betting");
  const [timeLeft, setTimeLeft] = useState(60);
  const [bets, setBets] = useState<Bet[]>([]);
  const [betAmount, setBetAmount] = useState(10);
  const [history, setHistory] = useState<GameResult[]>([]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleAutoRoll = () => {
    if (bets.length === 0) {
      toast.info("No bets placed. Starting new round...");
      setTimeout(() => {
        setTimeLeft(60);
        setGamePhase("betting");
      }, 2000);
      return;
    }

    const totalBetAmount = bets.reduce((sum, bet) => sum + bet.amount, 0);
    setBalance((prev) => prev - totalBetAmount);
    setGamePhase("rolling");

    const rollInterval = setInterval(() => {
      setDice([
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
      ] as [number, number, number]);
    }, 100);

    setTimeout(() => {
      clearInterval(rollInterval);

      const finalDice: [number, number, number] = [
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
      ];
      setDice(finalDice);

      const total = finalDice.reduce((sum, die) => sum + die, 0);
      let totalWinnings = 0;

      bets.forEach((bet) => {
        const payout = calculatePayout(bet, finalDice, total);
        totalWinnings += payout;
      });

      if (totalWinnings > 0) {
        setBalance((prev) => prev + totalWinnings);
        toast.success(`You won $${totalWinnings}!`);
      } else {
        toast.error("Better luck next time!");
      }

      setHistory((prev) => [
        {
          dice: finalDice,
          total,
          timestamp: Date.now(),
          result: totalWinnings > 0 ? "win" : "lose",
          payout: totalWinnings - totalBetAmount,
        },
        ...prev.slice(0, 9),
      ]);

      setGamePhase("result");

      setTimeout(() => {
        setBets([]);
        setTimeLeft(60);
        setGamePhase("betting");
      }, 3000);
    }, 2000);
  };

  const calculatePayout = (
    bet: Bet,
    currentDice: [number, number, number],
    total: number
  ): number => {
    if (bet.type.startsWith("total-")) {
      const targetTotal = parseInt(bet.type.split("-")[1], 10);

      if (total === targetTotal) {
        const multiplier =
          targetTotal === 3 || targetTotal === 18
            ? 50
            : targetTotal <= 5 || targetTotal >= 16
            ? 20
            : 10;
        return bet.amount * multiplier;
      }
    }

    if (bet.type === "small" && total >= 4 && total <= 10) {
      return bet.amount * 2;
    }

    if (bet.type === "big" && total >= 11 && total <= 17) {
      return bet.amount * 2;
    }

    if (bet.type === "odd" && total % 2 === 1) {
      return bet.amount * 2;
    }

    if (bet.type === "even" && total % 2 === 0) {
      return bet.amount * 2;
    }

    if (bet.type.startsWith("single-")) {
      const num = parseInt(bet.type.split("-")[1], 10);
      const count = currentDice.filter((value) => value === num).length;
      if (count > 0) {
        return bet.amount * (count + 1);
      }
    }

    if (
      bet.type === "triple" &&
      currentDice[0] === currentDice[1] &&
      currentDice[1] === currentDice[2]
    ) {
      return bet.amount * 30;
    }

    return 0;
  };

  const placeBet = (type: string, label: string) => {
    if (gamePhase !== "betting") {
      toast.error("Betting is closed!");
      return;
    }

    if (betAmount <= 0) {
      toast.error("Invalid bet amount!");
      return;
    }

    setBets((prev) => {
      const existing = prev.find((bet) => bet.type === type);

      if (existing) {
        return prev.map((bet) =>
          bet.type === type
            ? {
                ...bet,
                amount: bet.amount + betAmount,
              }
            : bet
        );
      }

      return [
        ...prev,
        {
          type,
          amount: betAmount,
          label,
        },
      ];
    });

    toast.success(`Bet placed: $${betAmount} on ${label}`);
  };

  const clearBets = () => {
    if (gamePhase !== "betting") {
      toast.error("Cannot clear bets now!");
      return;
    }

    setBets([]);
    toast.info("All bets cleared");
  };

  const getDiceColor = (value: number) => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
    ];

    return colors[value - 1];
  };

  const getTimerColor = () => {
    if (timeLeft > 30) {
      return "text-green-400";
    }

    if (timeLeft > 10) {
      return "text-yellow-400";
    }

    return "text-red-400";
  };

  useEffect(() => {
    if (gamePhase === "betting" && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleAutoRoll();
            return 0;
          }

          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gamePhase, timeLeft]);

  return (
    <GameProvider>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="border-white/20 bg-linear-to-r from-purple-900/80 to-indigo-900/80 p-6 backdrop-blur-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className={`h-8 w-8 ${getTimerColor()}`} />
                <div>
                  <div className={`text-4xl ${getTimerColor()}`}>
                    {timeLeft}s
                  </div>
                  <div className="text-purple-300">
                    {gamePhase === "betting"
                      ? "Place Your Bets"
                      : gamePhase === "rolling"
                      ? "Rolling..."
                      : "Results!"}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-purple-300">Round Status</div>
                <Badge
                  className={
                    gamePhase === "betting"
                      ? "bg-green-500 text-white"
                      : gamePhase === "rolling"
                      ? "bg-yellow-500 text-black"
                      : "bg-blue-500 text-white"
                  }
                >
                  {gamePhase === "betting"
                    ? "OPEN"
                    : gamePhase === "rolling"
                    ? "ROLLING"
                    : "CLOSED"}
                </Badge>
              </div>
            </div>
          </Card>

          <Card className="border-white/20 bg-gradient-to-br from-purple-900/50 to-indigo-900/50 p-8 backdrop-blur-lg">
            <div className="mb-6 text-center">
              <h3 className="mb-2 text-white">Dice Results</h3>
              <Badge className="bg-yellow-500 text-black">
                Total: {dice[0] + dice[1] + dice[2]}
              </Badge>
            </div>

            <div className="mb-8 flex items-center justify-center gap-6">
              {dice.map((value, index) => (
                <motion.div
                  key={index}
                  animate={
                    gamePhase === "rolling"
                      ? {
                          rotateX: 360,
                          rotateY: 360,
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.5,
                    repeat: gamePhase === "rolling" ? Infinity : 0,
                  }}
                  className={`flex h-24 w-24 items-center justify-center rounded-2xl shadow-2xl ${getDiceColor(
                    value
                  )}`}
                >
                  <span className="text-5xl text-white">{value}</span>
                </motion.div>
              ))}
            </div>

            {bets.length > 0 ? (
              <div className="rounded-lg bg-white/5 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-purple-200">Your Bets:</p>
                  <Button
                    onClick={clearBets}
                    disabled={gamePhase !== "betting"}
                    className="h-8 text-xs text-white hover:bg-red-700"
                  >
                    Clear All
                  </Button>
                </div>
                <div className="space-y-2">
                  {bets.map((bet) => (
                    <div
                      key={bet.type}
                      className="flex justify-between text-white"
                    >
                      <span>{bet.label}</span>
                      <span className="text-yellow-400">${bet.amount}</span>
                    </div>
                  ))}
                  <div className="border-t border-white/20 pt-2 text-white">
                    <div className="flex justify-between">
                      <span>Total:</span>
                      <span className="text-yellow-400">
                        ${bets.reduce((sum, bet) => sum + bet.amount, 0)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </Card>

          <Card className="border-white/10 bg-white/5 p-6 backdrop-blur-lg">
            <h3 className="mb-4 text-white">Quick Bets</h3>
            <div className="mb-4 grid grid-cols-5 gap-2">
              <Button
                onClick={() => placeBet("small", "Small (4-10)")}
                disabled={gamePhase !== "betting"}
                className="flex h-16 flex-col items-center justify-center bg-blue-600 p-2 text-white hover:bg-blue-700"
              >
                <div>SMALL</div>
                <div className="text-xs opacity-80">4-10</div>
              </Button>
              <Button
                onClick={() => placeBet("big", "Big (11-17)")}
                disabled={gamePhase !== "betting"}
                className="flex h-16 flex-col items-center justify-center bg-red-600 p-2 text-white hover:bg-red-700"
              >
                <div>BIG</div>
                <div className="text-xs opacity-80">11-17</div>
              </Button>
              <Button
                onClick={() => placeBet("odd", "Odd")}
                disabled={gamePhase !== "betting"}
                className="flex h-16 flex-col items-center justify-center bg-purple-600 p-2 text-white hover:bg-purple-700"
              >
                <div>ODD</div>
                <div className="text-xs opacity-80">2x</div>
              </Button>
              <Button
                onClick={() => placeBet("even", "Even")}
                disabled={gamePhase !== "betting"}
                className="flex h-16 flex-col items-center justify-center bg-green-600 p-2 text-white hover:bg-green-700"
              >
                <div>EVEN</div>
                <div className="text-xs opacity-80">2x</div>
              </Button>
              <Button
                onClick={() => placeBet("triple", "Triple")}
                disabled={gamePhase !== "betting"}
                className="flex h-16 flex-col items-center justify-center bg-yellow-600 p-2 text-white hover:bg-yellow-700"
              >
                <div>TRIPLE</div>
                <div className="text-xs opacity-80">30x</div>
              </Button>
            </div>

            <div className="mb-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
              {[3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map(
                (total) => (
                  <Button
                    key={total}
                    onClick={() => placeBet(`total-${total}`, `Total ${total}`)}
                    disabled={gamePhase !== "betting"}
                    className="flex h-14 flex-col items-center justify-center bg-white/10 p-2 text-white hover:bg-white/20"
                  >
                    <div>Total {total}</div>
                    <div className="text-xs opacity-80">
                      {total === 3 || total === 18
                        ? "50x"
                        : total <= 5 || total >= 16
                        ? "20x"
                        : "10x"}
                    </div>
                  </Button>
                )
              )}
            </div>

            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <Button
                  key={num}
                  onClick={() => placeBet(`single-${num}`, `Number ${num}`)}
                  disabled={gamePhase !== "betting"}
                  className="flex h-12 flex-col items-center justify-center bg-white/10 p-2 text-white hover:bg-white/20"
                >
                  <div>Number {num}</div>
                  <div className="text-xs opacity-80">Up to 4x</div>
                </Button>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-white/20 bg-white/10 p-6 backdrop-blur-lg">
            <h3 className="mb-4 text-white">Bet Controls</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-purple-200">Bet Amount</label>
                <Input
                  type="number"
                  value={betAmount}
                  onChange={(event) => setBetAmount(Number(event.target.value))}
                  className="mt-2 border-white/20 bg-white/10 text-white"
                  min={1}
                />
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[10, 25, 50, 100].map((amount) => (
                  <Button
                    key={`preset-${amount}`}
                    onClick={() => setBetAmount(amount)}
                    className="bg-purple-600/30 text-white hover:bg-purple-600/50"
                  >
                    ${amount}
                  </Button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={() => setBetAmount((prev) => prev + 10)}
                  className="bg-green-600/60 text-white hover:bg-green-600"
                >
                  +10
                </Button>
                <Button
                  onClick={() =>
                    setBetAmount((prev) => Math.max(10, prev - 10))
                  }
                  className="bg-red-600/60 text-white hover:bg-red-600"
                >
                  -10
                </Button>
              </div>

              <Button
                onClick={handleAutoRoll}
                disabled={gamePhase !== "betting"}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700"
              >
                Roll Now
              </Button>
            </div>
          </Card>

          <Card className="border-white/20 bg-white/10 p-6 backdrop-blur-lg">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-white">Recent Results</h3>
                <p className="text-sm text-purple-200">
                  Track your performance
                </p>
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
                    key={game.timestamp}
                    className="rounded-lg border border-white/10 bg-white/5 p-4"
                  >
                    <div className="flex items-center justify-between text-white">
                      <span>Round {history.length - index}</span>
                      <span
                        className={
                          game.result === "win"
                            ? "text-green-400"
                            : "text-red-400"
                        }
                      >
                        {game.result === "win" ? "+" : ""}${game.payout}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-sm text-purple-200">
                      <span>Dice: {game.dice.join("-")}</span>
                      <span>Total: {game.total}</span>
                    </div>
                    <div className="mt-2 text-xs text-purple-300">
                      {new Date(game.timestamp).toLocaleTimeString()}
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
                <p className="text-sm text-purple-200">
                  Keep track of your game
                </p>
              </div>
              <TrendingUp className="h-5 w-5 text-purple-200" />
            </div>

            <div className="space-y-3 text-sm text-purple-200">
              <div className="flex justify-between">
                <span>Total Rounds Played</span>
                <span>{history.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Win Rate</span>
                <span>
                  {history.length === 0
                    ? "0%"
                    : `${Math.round(
                        (history.filter((game) => game.result === "win")
                          .length /
                          history.length) *
                          100
                      )}%`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Best Payout</span>
                <span>
                  {history.length === 0
                    ? "$0"
                    : `$${Math.max(...history.map((game) => game.payout))}`}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </GameProvider>
  );
};
