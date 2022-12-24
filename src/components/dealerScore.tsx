import { observer } from "mobx-react";
import { gameStore } from "../App";
import { countScore } from "../lib/gameStore";

export const DealerScore = observer(() => (
  <div className="player-bet">
    <div className="bet">{countScore(gameStore.dealerHand)}</div>
  </div>
));
