import { computed, makeAutoObservable } from "mobx";
import { DealerScore } from "../components/dealerScore";
import {
  effectsMap,
  GameState,
  stateHandlers,
  stateTransitions,
} from "./stateMap";

const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
const suits = ["spades", "clubs", "diamonds", "hearts"];
export interface Card {
  rank: Rank;
  suit: Suit;
}

export type Rank = typeof ranks[number];

export type Suit = typeof suits[number];

const cardCosts: Record<Rank, number> = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 10,
  Q: 10,
  K: 10,
  A: 11,
};

export class GameStore {
  playerHand: Card[] = [];
  dealerHand: Card[] = [];
  deck: Card[] = [];
  state: GameState = GameState.Bet;
  changeState(): void {
    const newState = stateTransitions[this.state]();

    effectsMap
      .filter(
        (effect) =>
          effect.from.includes(this.state) && effect.to.includes(newState)
      )
      .forEach((map) => map.effects.forEach((effect) => effect()));
    this.state = newState;

    stateHandlers[newState]();
  }

  fillDeck() {
    const deck: Card[] = [];
    suits.forEach((suit) => {
      ranks.forEach((rank) => {
        deck.push({ rank, suit });
      });
    });

    for (let i = 0; i < deck.length; i++) {
      let j = Math.floor(Math.random() * (deck.length - 1));
      const tmp = deck[i];
      deck[i] = deck[j];
      deck[j] = tmp;
    }

    console.groupCollapsed(`Generated deck:`);
    console.log(deck);
    console.groupEnd();
    this.deck = deck;
  }

  dealToPlayer() {
    if (this.deck.length === 0) throw new Error();
    this.playerHand.push(this.deck.pop()!);
  }

  dealToDealer() {
    if (this.deck.length === 0) throw new Error();
    this.dealerHand.push(this.deck.pop()!);
  }

  onHit() {
    this.changeState();
  }

  onBet() {}

  onStand() {}

  onSurrender() {}
  constructor() {
    makeAutoObservable(this);
  }
}
export const countScore = (cards: Card[]) => {
  return cards.reduce<number>((sum, current) => {
    sum += cardCosts[current.rank];
    return sum;
  }, 0);
};

export const getDisplaySuit = (suit: Suit): string => {
  switch (suit) {
    case "spades":
      return "♠";
    case "clubs":
      return "♣";
    case "diamonds":
      return "♦";
    case "hearts":
      return "♥";
    default:
      return "";
  }
};
