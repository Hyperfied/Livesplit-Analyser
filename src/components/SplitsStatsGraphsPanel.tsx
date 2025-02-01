import { useState } from "react";
import Splits from "../classes/Splits";

import PersonalBestGraph from "./Graphs/PersonalBestGraph";
import SumOfBestGraph from "./Graphs/SumOfBestGraph";

import "./SplitStatsPage.css";
import PlaytimeGraph from "./Graphs/PlaytimeGraph";

interface SplitStatsGraphsPanelProps {
  splits: Splits;
  useGameTime: boolean;
}

function SplitStatsGraphPanel({
  splits,
  useGameTime,
}: SplitStatsGraphsPanelProps) {
  const [graphType, setGraphType] = useState("pb");

  const onSelect = (event: any) => {
    setGraphType(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div className="split-stats-graphs">
      <div className="split-stats-graphs-header">
        <form>
          <select id="graphSelect" onChange={onSelect}>
            <option value="pb">Personal Best over Time</option>
            <option value="sob">Sum of Best over Time</option>
            <option value="playtime">Playtime over Time</option>
          </select>
        </form>
        <h1>Graphs</h1>
      </div>
      {graphType === "pb" && (
        <PersonalBestGraph splits={splits} useGameTime={useGameTime} />
      )}
      {graphType === "sob" && (
        <SumOfBestGraph splits={splits} useGameTime={useGameTime} />
      )}
      {graphType === "playtime" && (
        <PlaytimeGraph splits={splits} useGameTime={useGameTime} />
      )}
    </div>
  );
}

export default SplitStatsGraphPanel;
