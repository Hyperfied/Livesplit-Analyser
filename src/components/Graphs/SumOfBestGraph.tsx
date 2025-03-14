import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  Label,
  YAxis,
  Tooltip,
} from "recharts";
import { useContext } from "react";
import SplitsContext from "../../classes/SplitsContext";

import TimeSpanTooltip from "./TimeSpanTooltip";
import TimeSpanTick from "./TimeSpanTick";

interface SumOfBestProps {
  useGameTime: boolean;
}

function SumOfBestGraph({ useGameTime }: SumOfBestProps) {
  const splits = useContext(SplitsContext);
  if (!splits) {
    return <div></div>;
  }

  return (
    <ResponsiveContainer width="90%" height="80%">
      <LineChart
        data={splits.getGraphData("sob", useGameTime)}
        {...{ overflow: "visible" }}
      >
        <Line
          connectNulls
          type="monotone"
          dataKey="Time"
          stroke="#8884d8"
          dot={{ r: 1 }}
        />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="Date">
          <Label value="Date" offset={-20} position="insideBottom" />
        </XAxis>
        <YAxis
          tick={<TimeSpanTick />}
          domain={[
            useGameTime
              ? Math.round(splits.sumOfBest.gameTime.totalMilliseconds)
              : Math.round(splits.sumOfBest.realTime.totalMilliseconds),
            "auto",
          ]}
        />
        <Tooltip content={<TimeSpanTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default SumOfBestGraph;
