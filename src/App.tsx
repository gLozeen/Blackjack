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
import { GameStore } from "./lib/gameStore";
import { CardComponent, CardFliped } from "./components/card/cardComponent";
import { DealerScore } from "./components/dealerScore";
import { GameState } from "./lib/stateMap.types";

export const gameStore = new GameStore();
const App = observer(() => {
  React.useEffect(() => {
    gameStore.changeState();
  }, []);
  return (
    <>
      <Buttons>
        <HitButton
          onClick={() => gameStore.onHit()}
          disabled={gameStore.state !== GameState.PlayerTurn}
        />
        <BetButton onClick={() => gameStore.onBet()} />
        <StandButton
          onClick={() => gameStore.onStand()}
          disabled={gameStore.state !== GameState.PlayerTurn}
        />
      </Buttons>
      <div className="table-wrapper">
        <div className="table">
          <div className="inner-table">
            <div className="dealer-hand">
              {gameStore.dealerHand.map((card, cardIndex) =>
                cardIndex ||
                gameStore.state === GameState.DealerTurn ||
                gameStore.state === GameState.Bet ? (
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
            <EndGameMenu id="egm" />
            <DealerScore />
          </div>
        </div>
      </div>
    </>
  );
});
const EndGameMenu = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: red;
  display: none;
`;
export default App;
