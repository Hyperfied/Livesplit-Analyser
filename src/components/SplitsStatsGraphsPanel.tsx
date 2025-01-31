import Splits from "../classes/Splits";
import "./SplitStatsPage.css";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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
      <ResponsiveContainer width="90%" height="70%">
        <LineChart data={splits.getGraphData("pb", useGameTime)}>
          <Line type="monotone" dataKey={"time"} stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SplitStatsGraphPanel;
