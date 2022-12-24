import { makeAutoObservable } from "mobx";

const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
const suits = ["spades", "clubs", "diamonds", "hearts"];
export interface Card {
  rank: Rank;
  suit: Suit;
}

export type Rank = typeof ranks[number];

export type Suit = typeof suits[number];

export class GameState {
  playerHand: Card[] = [];
  dealerHand: Card[] = [];
  deck: Card[] = [];

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

  constructor() {
    makeAutoObservable(this);
  }

}

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