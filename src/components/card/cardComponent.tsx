import styled from "@emotion/styled";
import { Card, getDisplaySuit } from "../../lib/gameStore";

interface CardComponentProps {
  card: Card;
  key: string;
}
export const CardFliped = styled.div`
  position: relative;
  width: 27px;
  height: 38px;
  background: #22294d;
  border-radius: 5px;
`;
export const CardComponent: React.FC<CardComponentProps> = (
  props: CardComponentProps
) => (
  <div className="card">
    <div className="rank">{props.card.rank}</div>
    <div className="suit">{getDisplaySuit(props.card.suit)}</div>
  </div>
);
