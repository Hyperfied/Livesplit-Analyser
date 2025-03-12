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

interface PersonalBestGraphProps {
  useGameTime: boolean;
}

function PersonalBestGraph({ useGameTime }: PersonalBestGraphProps) {
  const splits = useContext(SplitsContext);
  if (!splits) {
    return <div></div>;
  }

  return (
    <ResponsiveContainer width="90%" height="80%">
      <LineChart
        data={splits.getGraphData("pb", useGameTime)}
        {...{ overflow: "visible" }}
      >
        <Line
          connectNulls
          type="monotone"
          dataKey="Time"
          stroke="#8884d8"
          dot={{ r: 5 }}
        />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="Date">
          <Label value="Date" offset={-20} position="insideBottom" />
        </XAxis>
        <YAxis
          tick={<TimeSpanTick />}
          domain={[
            useGameTime
              ? Math.round(
                  splits.personalBest.gameTime.totalMilliseconds * 0.95
                )
              : Math.round(
                  splits.personalBest.realTime.totalMilliseconds * 0.95
                ),
            "auto",
          ]}
        />
        <Tooltip content={<TimeSpanTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default PersonalBestGraph;
