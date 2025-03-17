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
import TimeSpanTooltip from "./TimeSpanTooltip";
import Segment from "../../classes/Segment";

interface SubsplitGraphProps {
  useGameTime: boolean;
  segment: Segment;
}

function SubsplitGraph({ useGameTime, segment }: SubsplitGraphProps) {
  return (
    <ResponsiveContainer width="95%" height="90%">
      <LineChart
        data={segment.getSegmentTimeGraphData(useGameTime)}
        {...{ overflow: "visible" }}
      >
        <Line type="monotone" dataKey="Time" stroke="#8884d8" dot={{ r: 1 }} />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="RunId">
          <Label value="RunId" offset={-20} position="insideBottom" />
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

        <Tooltip content={<TimeSpanTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default SubsplitGraph;
