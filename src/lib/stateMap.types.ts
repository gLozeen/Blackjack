export enum GameState {
  Bet = "Bet",
  Setup = "Setup",
  Hit = "Hit",
  Stand = "Stand",
  PlayerTurn = "PlayerTurn",
  DealerTurn = "DealerTurn",
  EndGame = "EndGame",
}

export type GameStateTransition<T extends GameState> = (
  payload?: GameStatePayload<T>
) => GameState;

export type GameStateTransitions = {
  [T in GameState]: GameStateTransition<T>;
};

export type GameStateEffect = {
  from: GameState[];
  to: GameState[];
  effects: (() => void)[];
};

export type GameStateHandler<T extends GameState> = (
  payload?: GameStatePayload<T>
) => void;

export interface GameStatePossiblePayload
  extends Record<GameState, Record<string, any>> {
  [GameState.PlayerTurn]: { buttonType: ButtonType };
  [GameState.Bet]: { betAmount: number };
}

export type GameStatePayload<T extends GameState> = GameStatePossiblePayload[T];

export type GameStateHandlers = {
  [T in GameState]: GameStateHandler<T>;
};

export enum ButtonType {
  Hit,
  Stand,
  Bet,
  Surrender,
}
