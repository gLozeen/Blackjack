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
import { GameState } from "./lib/gameState";
import { CardComponent } from "./components/card/cardComponent";

const gameState = new GameState();
const App = observer(() => {
  React.useEffect(() => {
    gameState.fillDeck();
    gameState.dealToDealer();
    gameState.dealToDealer();
    gameState.dealToDealer();
    gameState.dealToDealer();
    gameState.dealToDealer();
    gameState.dealToPlayer();
    gameState.dealToPlayer();
  }, []);
  return (
    <div className="table-wrapper">
      <div className="table">
        <div className="inner-table">
          <div className="dealer-hand">
            {gameState.dealerHand.map((card, cardIndex) => (
              <CardComponent card={card} key={`card${cardIndex}`} />
            ))}
          </div>
          <div className="hand">
            {gameState.playerHand.map((card, cardIndex) => (
              <CardComponent card={card} key={`card${cardIndex}`} />
            ))}
          </div>
          <Buttons>
            <HitButton />
            <BetButton />
            <StandButton />
            <SurrenderButton />
          </Buttons>
          <div className="player-bet">
            <div className="bet"></div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default App;
