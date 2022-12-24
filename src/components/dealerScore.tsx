import { observer } from "mobx-react";
import { gameStore } from "../App";

export const DealerScore = observer(() => (
  <div className="player-bet">
    <div className="bet">{gameStore.state}</div>
  </div>
));
