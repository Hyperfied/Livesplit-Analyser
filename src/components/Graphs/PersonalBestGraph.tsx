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
import DateTick from "./DateTick";

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
        <XAxis
          dataKey="Date"
          type="number"
          tick={<DateTick />}
          tickCount={20}
          domain={[
            splits.firstCompletedRunDate.getTime(),
            splits.latestRunDate.getTime(),
          ]}
        >
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
        <Tooltip content={<DateTimeTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default PersonalBestGraph;
