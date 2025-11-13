import { motion } from "motion/react";

import { Card } from "~/components/ui/card";
import { useGameContext } from "~/features/bet/context/GameContext";
import { GAME_PHASE } from "~/constant/bet";

export const DiceRoller = () => {
  const { state } = useGameContext();
  const diceResult = state.result;

  return (
    <Card className="border-white/20 bg-indigo-900/50 p-8 backdrop-blur-lg">
      <div className="mb-6 text-center">
        <h1 className="text-white text-5xl font-bold">
          {diceResult[0] + diceResult[1] + diceResult[2]}
        </h1>
        <h3 className="mb-2 text-white">Dice Results</h3>
      </div>

      <div className="mb-8 flex items-center justify-center gap-6">
        {diceResult.map((value, index) => (
          <motion.div
            key={index}
            animate={
              state.gamePhase === GAME_PHASE.ROLLING
                ? {
                    rotateX: 360,
                    rotateY: 360,
                  }
                : {}
            }
            transition={{
              duration: 0.5,
              repeat: state.gamePhase === GAME_PHASE.ROLLING ? Infinity : 0,
            }}
            className="flex h-24 w-24 items-center justify-center rounded-2xl shadow-2xl bg-red-500"
          >
            <span className="text-5xl text-white">{value}</span>
          </motion.div>
        ))}
      </div>
    </Card>
  );
};
