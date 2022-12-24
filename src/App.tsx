import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react";
import styled from "@emotion/styled";
import { Buttons } from "./components/buttons/button.styled";
import { BetButton } from "./components/buttons/bet";
import { HitButton } from "./components/buttons/hit";
import { StandButton } from "./components/buttons/stand";
import { SurrenderButton } from "./components/buttons/surrender";
import { countScore, GameStore } from "./lib/gameStore";
import { CardComponent, CardFliped } from "./components/card/cardComponent";
import { DealerScore } from "./components/dealerScore";

export const gameStore = new GameStore();
const App = observer(() => {
  React.useEffect(() => {
    gameStore.changeState();
  }, []);
  return (
    <div className="table-wrapper">
      <div className="table">
        <div className="inner-table">
          <div className="dealer-hand">
            {gameStore.dealerHand.map((card, cardIndex) =>
              cardIndex ? (
                <CardComponent card={card} key={`card${cardIndex}`} />
              ) : (
                <CardFliped key={`card${cardIndex}`} />
              )
            )}
          </div>
          <div className="hand">
            {gameStore.playerHand.map((card, cardIndex) => (
              <CardComponent card={card} key={`card${cardIndex}`} />
            ))}
          </div>
          <Buttons>
            <HitButton onClick={() => gameStore.onHit()} />
            <BetButton onClick={() => gameStore.onBet()} />
            <StandButton onClick={() => gameStore.onStand()} />
            <SurrenderButton onClick={() => gameStore.onSurrender()} />
          </Buttons>
          <DealerScore />
        </div>
      </div>
    </div>
  );
});
export default App;
