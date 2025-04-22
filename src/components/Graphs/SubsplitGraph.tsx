import {
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  Label,
  YAxis,
  Tooltip,
} from "recharts";
import TimeSpanTick from "./TimeSpanTick";
import DateTimeTooltip from "./DateTimeTooltip";
import Segment from "../../classes/Segment";
import { useContext } from "react";

import SplitsContext from "../../classes/SplitsContext";
import DateTick from "./DateTick";

interface SubsplitGraphProps {
  useGameTime: boolean;
  segment: Segment;
}

function SubsplitGraph({ useGameTime, segment }: SubsplitGraphProps) {
  const splits = useContext(SplitsContext);
  if (!splits) {
    return <div></div>;
  }

  return (
    <ResponsiveContainer width="95%" height="90%">
      <LineChart
        data={segment.getSegmentTimeGraphData(useGameTime, splits)}
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
              ? segment.bestSegmentGameTime.totalMilliseconds
              : segment.bestSegmentRealTime.totalMilliseconds,
            "auto",
          ]}
        />

        <Tooltip content={<DateTimeTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default SubsplitGraph;
