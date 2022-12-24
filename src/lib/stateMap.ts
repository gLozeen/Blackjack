import { toJS } from "mobx";
import { gameStore } from "../App";

let callBackIds = [];
export enum GameState {
  Bet = "bet",
  Setup = "setup",
}

type GameStateTransition = Record<GameState, () => GameState>;

export const stateTransitions: GameStateTransition = {
  [GameState.Bet]: () => GameState.Setup,
  [GameState.Setup]: () => GameState.Setup,
};

type GameStateEffect = {
  from: GameState[];
  to: GameState[];
  effects: (() => void)[];
};

export const effectsMap: GameStateEffect[] = [];

type GameStateHandler = Record<GameState, () => void>;

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
};
