import { useState } from "react";
import Splits from "../../classes/Splits";

import PersonalBestGraph from "../Graphs/PersonalBestGraph";
import SumOfBestGraph from "../Graphs/SumOfBestGraph";

import PlaytimeGraph from "../Graphs/PlaytimeGraph";

interface GraphsPanelProps {
  splits: Splits;
  useGameTime: boolean;
}

function GraphsPanel({ splits, useGameTime }: GraphsPanelProps) {
  const [graphType, setGraphType] = useState("pb");

  const onSelect = (event: any) => {
    setGraphType(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div className="flex flex-col w-17/20 h-8/10 items-center justify-center g-5 border-2 rounded-lg bg-white gap-4">
      <div className="flex items-center justify-between w-9/10">
        <form>
          <select
            id="graphSelect"
            onChange={onSelect}
            className="text-lg border-0 rounded-full px-2 py-1 text-lg cursor-pointer bg-stone-200 font-bold hover:bg-stone-300"
          >
            <option value="pb">Personal Best over Time</option>
            <option value="sob">Sum of Best over Time</option>
            <option value="playtime">Playtime over Time</option>
          </select>
        </form>
        <h1 className="text-4xl font-bold">Graphs</h1>
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

export default GraphsPanel;
