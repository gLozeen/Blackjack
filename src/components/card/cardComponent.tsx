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
  animation: append-animate 0.3s linear;
`;
export const CardComponent: React.FC<CardComponentProps> = (
  props: CardComponentProps
) => (
  <div className="card">
    <div className="rank">{props.card.rank}</div>
    <div
      className="suit"
      style={{
        color:
          props.card.suit === "spades" || props.card.suit === "clubs"
            ? "rgb(96, 137, 255)"
            : "rgb(250, 103, 120)",
      }}
    >
      {getDisplaySuit(props.card.suit)}
    </div>
  </div>
);
