import Lottie from "lottie-react";

import { Card } from "~/components/ui/card";
import { useGameContext } from "~/features/bet/context/GameContext";
import { GAME_PHASE } from "~/constant/bet";
import diceAnimation from "~/assets/lottie/dice.json";

const pipCoordinates = [
  { cx: 25, cy: 25 },
  { cx: 25, cy: 50 },
  { cx: 25, cy: 75 },
  { cx: 50, cy: 50 },
  { cx: 75, cy: 25 },
  { cx: 75, cy: 50 },
  { cx: 75, cy: 75 },
];

const pipLayout: Record<number, number[]> = {
  1: [3],
  2: [0, 6],
  3: [0, 3, 6],
  4: [0, 2, 4, 6],
  5: [0, 2, 3, 4, 6],
  6: [0, 1, 2, 4, 5, 6],
};

const DiceFace = ({ value }: { value: number }) => {
  const variant = pipLayout[value] ?? pipLayout[1];
  return (
    <svg
      viewBox="0 0 100 100"
      className="h-28 w-28 drop-shadow-[0_12px_16px_rgba(253,72,67,0.35)]"
    >
      <rect
        x={6}
        y={6}
        width={88}
        height={88}
        rx={18}
        ry={18}
        fill="#FD4843"
        stroke="#b91c1c"
        strokeWidth={4}
      />

      {variant.map((idx) => {
        const { cx, cy } = pipCoordinates[idx];
        return (
          <circle
            key={`${value}-${idx}`}
            cx={cx}
            cy={cy}
            r={9}
            fill="#ffffff"
          />
        );
      })}
    </svg>
  );
};

const RollingDice = () => (
  <Lottie
    animationData={diceAnimation}
    loop
    autoplay
    className="h-28 w-28"
    rendererSettings={{
      preserveAspectRatio: "xMidYMid slice",
    }}
  />
);

export const DiceRoller = () => {
  const { state } = useGameContext();
  const diceResult = state.result;
  const isRolling = state.gamePhase === GAME_PHASE.ROLLING;
  const total = diceResult.reduce((sum, value) => sum + value, 0);

  return (
    <Card className="border-white/20 bg-indigo-900/50 p-8 backdrop-blur-lg">
      <div className="mb-6 text-center">
        <h1 className="text-white text-5xl font-bold">{total}</h1>
        <h3 className="mb-2 text-white">Dice Results</h3>
        {isRolling && (
          <p className="text-sm text-purple-200">Rolling dice&hellip;</p>
        )}
      </div>

      <div className="mb-8 flex items-center justify-center gap-6">
        {diceResult.map((value, index) => (
          <div
            key={`dice-${index}`}
            className="flex h-28 w-28 items-center justify-center"
          >
            {isRolling ? <RollingDice /> : <DiceFace value={value} />}
          </div>
        ))}
      </div>
    </Card>
  );
};
