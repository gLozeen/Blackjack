import { gameStore } from "../App";

import {
  ButtonType,
  GameState,
  GameStateEffect,
  GameStateHandlers,
  GameStateTransitions,
} from "./stateMap.types";

export const stateTransitions: GameStateTransitions = {
  [GameState.Bet]: () => GameState.Setup,
  [GameState.Setup]: () => GameState.PlayerTurn,
  [GameState.PlayerTurn]: (payload) => {
    if (payload?.buttonType === ButtonType.Hit) {
      return GameState.Hit;
    } else {
      return GameState.Stand;
    }
  },
  [GameState.EndGame]: () => GameState.Bet,
  [GameState.Hit]: () =>
    gameStore.countScore(gameStore.playerHand) < 21
      ? GameState.PlayerTurn
      : GameState.EndGame,
  [GameState.Stand]: () => GameState.DealerTurn,
  [GameState.DealerTurn]: () => GameState.EndGame,
};

export const effectsMap: GameStateEffect[] = [];

export const stateHandlers: GameStateHandlers = {
  [GameState.Bet]: () => {},
  [GameState.Setup]: () => {
    gameStore.clearHands();
    gameStore.fillDeck();
    gameStore.dealToDealer();
    gameStore.dealToDealer();
    gameStore.dealToPlayer();
    gameStore.dealToPlayer();
    gameStore.changeState();
  },
  [GameState.PlayerTurn]: () => {},
  [GameState.EndGame]: () => {
    gameStore.gameEnd(gameStore.dealerHand, gameStore.playerHand);
    gameStore.changeState();
  },
  [GameState.Hit]: () => {
    gameStore.dealToPlayer();
    gameStore.changeState();
  },

  [GameState.Stand]: () => {
    gameStore.changeState();
  },

  [GameState.DealerTurn]: () => {
    if (gameStore.shouldTakeCard()) {
      setTimeout(() => {
        gameStore.dealToDealer();
      }, 500);
      setTimeout(() => {
        gameStore.changeState();
      }, 1000);
    } else {
      setTimeout(() => {
        gameStore.changeState();
      }, 1000);
    }
  },
};
export { GameState };
