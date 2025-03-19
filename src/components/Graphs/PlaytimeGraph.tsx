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

import DateTimeTooltip from "./DateTimeTooltip";
import TimeSpanTick from "./TimeSpanTick";

interface PlaytimeGraphProps {
  useGameTime: boolean;
}

function PlaytimeGraph({ useGameTime }: PlaytimeGraphProps) {
  const splits = useContext(SplitsContext);
  if (!splits) {
    return <div></div>;
  }

  return (
    <ResponsiveContainer width="90%" height="80%">
      <LineChart
        data={splits.getGraphData("playtime", useGameTime)}
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
        <YAxis tick={<TimeSpanTick />} />
        <Tooltip content={<DateTimeTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default PlaytimeGraph;
