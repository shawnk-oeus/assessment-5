import { createContext } from "react";

const defaultValue = {
  puzzle: null,
  solution: null,
  squares: null,
};

const GameContext = createContext(defaultValue);

export default GameContext;