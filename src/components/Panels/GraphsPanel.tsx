import { useState, useContext } from "react";

import PersonalBestGraph from "../Graphs/PersonalBestGraph";
import SumOfBestGraph from "../Graphs/SumOfBestGraph";

import PlaytimeGraph from "../Graphs/PlaytimeGraph";

import SplitsContext from "../../classes/SplitsContext";

interface GraphsPanelProps {
  useGameTime: boolean;
}

function GraphsPanel({ useGameTime }: GraphsPanelProps) {
  const [graphType, setGraphType] = useState("pb");
  const splits = useContext(SplitsContext);

  const onSelect = (event: any) => {
    setGraphType(event.target.value);
    console.log(event.target.value);
  };

  if (!splits) {
    return <div></div>;
  }

  return (
    <div className="flex flex-col w-17/20 h-8/10 items-center justify-center g-5 border-2 rounded-lg bg-white gap-4">
      {graphType === "pb" && <PersonalBestGraph useGameTime={useGameTime} />}
      {graphType === "sob" && <SumOfBestGraph useGameTime={useGameTime} />}
      {graphType === "playtime" && <PlaytimeGraph useGameTime={useGameTime} />}
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
      </div>
    </div>
  );
}

export default GraphsPanel;
