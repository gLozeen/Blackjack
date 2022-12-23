import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react";
const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
const suits = ["spades", "clubs", "diamonds", "hearts"];
interface Card {
  rank: Rank;
  suit: Suit;
}
type Rank = typeof ranks[number];
type Suit = typeof suits[number];
class GameState {
  playerHand: Card[] = [];
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
  constructor() {
    makeAutoObservable(this);
  }
}
const getDisplaySuit = (suit: Suit): string => {
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
const gameState = new GameState();
const App = observer(() => {
  React.useEffect(() => {
    gameState.fillDeck();
    gameState.dealToPlayer();
    gameState.dealToPlayer();
  }, []);
  return (
    <div className="table-wrapper">
      <div className="table">
        <div className="inner-table">
          <div className="hand">
            {gameState.playerHand.map((card, cardIndex) => (
              <CardComponent card={card} key={`card${cardIndex}`} />
            ))}
          </div>
          <div className="player-bet">
            <div className="bet"></div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default App;
interface CardComponentProps {
  card: Card;
  key: string;
}
export const CardComponent: React.FC<CardComponentProps> = (
  props: CardComponentProps
) => (
  <div className="card">
    <div className="rank">{props.card.rank}</div>
    <div className="suit">{getDisplaySuit(props.card.suit)}</div>
  </div>
);
