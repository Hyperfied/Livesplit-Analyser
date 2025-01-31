import Splits from "../classes/Splits";
import "./SplitStatsPage.css";

import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

interface SplitStatsGraphsPanelProps {
  splits: Splits;
  useGameTime: boolean;
}

function SplitStatsGraphPanel({
  splits,
  useGameTime,
}: SplitStatsGraphsPanelProps) {
  return (
    <div className="split-stats-graphs">
      <h1>Graphs</h1>
      <LineChart
        width={500}
        height={300}
        data={splits.getGraphData("pb", useGameTime)}
      ></LineChart>
    </div>
  );
}

export default SplitStatsGraphPanel;
