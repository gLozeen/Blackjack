import { toJS } from "mobx";
import { gameStore } from "../App";

let callBackIds = [];
export enum GameState {
  Bet = "bet",
  Setup = "setup",
  PlayTime = "playTime",
  EndGame = "endGame",
}

type GameStateTransition = Record<GameState, (payload?: any) => GameState>;

export const stateTransitions: GameStateTransition = {
  [GameState.Bet]: () => GameState.Setup,
  [GameState.Setup]: () => GameState.PlayTime,
  [GameState.PlayTime]: (payload: { buttonType: string }) => {
    if (payload.buttonType === "Hit") {
      return GameState.PlayTime;
    } else {
      return GameState.EndGame;
    }
  },
  [GameState.EndGame]: function (): GameState {
    throw new Error("Function not implemented.");
  },
};

type GameStateEffect = {
  from: GameState[];
  to: GameState[];
  effects: (() => void)[];
};

export const effectsMap: GameStateEffect[] = [];

type GameStateHandler = Record<GameState, (payload?: any) => void>;

export const stateHandlers: GameStateHandler = {
  [GameState.Bet]: () => {
    gameStore.changeState();
  },
  [GameState.Setup]: () => {
    gameStore.fillDeck();
    gameStore.dealToDealer();
    gameStore.dealToDealer();
    gameStore.dealToPlayer();
    gameStore.dealToPlayer();
  },
  [GameState.PlayTime]: () => {
    gameStore.dealToPlayer();
  },
  [GameState.EndGame]: () => {
    throw new Error("Function not implemented.");
  },
};
