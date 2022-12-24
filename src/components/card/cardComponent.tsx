import { Card, getDisplaySuit } from "../../lib/gameState";

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
