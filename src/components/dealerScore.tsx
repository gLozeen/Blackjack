import { observer } from "mobx-react";
import { gameStore } from "../App";

export const DealerScore = observer(() => (
  <div className="player-bet">
    <div className="bet">{gameStore.countScore(gameStore.playerHand)}</div>
  </div>
));
