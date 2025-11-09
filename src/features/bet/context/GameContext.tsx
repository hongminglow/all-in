import React, { useContext } from "react";

import { useImmerReducer } from "use-immer";
import type { TGameReducerAction } from "~/types/bet";
import {
  gameInitialState,
  gameReducer,
  type TGameInitialState,
} from "~/features/bet/reducer/GameReducer";

type TGameContext = {
  state: TGameInitialState;
  dispatch: React.ActionDispatch<[action: TGameReducerAction]>;
};

const GameContext = React.createContext<TGameContext | null>(null);

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useImmerReducer(gameReducer, gameInitialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};
