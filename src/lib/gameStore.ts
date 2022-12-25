import { computed, makeAutoObservable } from "mobx";
import toast from "react-hot-toast";
import { DealerScore } from "../components/dealerScore";
import { effectsMap, stateHandlers, stateTransitions } from "./stateMap";
import { ButtonType, GameState, GameStatePayload } from "./stateMap.types";

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
  A: 1,
};

export class GameStore {
  playerHand: Card[] = [];
  dealerHand: Card[] = [];
  deck: Card[] = [];
  state: GameState = GameState.Bet;
  changeState<T extends GameState>(payload?: GameStatePayload<T>): void {
    //@ts-ignore
    const newState = stateTransitions[this.state](payload);

    effectsMap
      .filter(
        (effect) =>
          effect.from.includes(this.state) && effect.to.includes(newState)
      )
      .forEach((map) => map.effects.forEach((effect) => effect()));
    this.state = newState;

    stateHandlers[newState]();
  }
  clearHands() {
    this.playerHand = [];
    this.dealerHand = [];
  }
  fillDeck() {
    if (this.deck.length) return;
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
    if (this.deck.length === 0) this.fillDeck();
    this.playerHand.push(this.deck.pop()!);
  }

  dealToDealer() {
    if (this.deck.length === 0) this.fillDeck();
    this.dealerHand.push(this.deck.pop()!);
  }

  onHit() {
    if (this.state !== GameState.PlayerTurn) return;
    this.changeState<GameState.PlayerTurn>({ buttonType: ButtonType.Hit });
  }

  onBet() {
    if (this.state !== GameState.Bet) return;
    this.changeState<GameState.Bet>({ betAmount: 1 });
  }

  onStand() {
    if (this.state !== GameState.PlayerTurn) return;
    this.changeState<GameState.PlayerTurn>({ buttonType: ButtonType.Stand });
  }

  onSurrender() {
    this.changeState<GameState.PlayerTurn>({
      buttonType: ButtonType.Surrender,
    });
  }

  gameEnd(dealerCards: Card[], playerCards: Card[]) {
    if (this.countScore(this.playerHand) > 21) {
      toast("You lose!", {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }
    const difference =
      this.countScore(dealerCards) - this.countScore(playerCards);
    if (difference > 0) {
      toast("You lose!", {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } else if (difference < 0) {
      toast("You won!", {
        icon: "💲",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } else {
      toast("DRAW!", {
        icon: "💞",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  }

  countScore = (cards: Card[]) => {
    let count = cards.reduce<number>((sum, current) => {
      sum += cardCosts[current.rank];
      return sum;
    }, 0);
    if (count < 12 && cards.find((current) => current.rank === "A")) {
      count += 10;
    }
    return count;
  };

  shouldTakeCard = () => this.countScore(this.dealerHand) < 17;
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
