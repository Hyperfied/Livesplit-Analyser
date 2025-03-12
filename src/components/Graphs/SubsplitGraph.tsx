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

interface SubsplitGraphProps {
  useGameTime: boolean;
}

function SubsplitGraph({ useGameTime }: SubsplitGraphProps) {
  return (
    <ResponsiveContainer width="90%" height="80%">
      <LineChart>
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
        <YAxis tick={<TimeSpanTick />} /> {/* TODO: Add domain */}
        <Tooltip content={<TimeSpanTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default SubsplitGraph;
