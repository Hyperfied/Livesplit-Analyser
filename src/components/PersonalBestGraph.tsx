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
import Splits from "../classes/Splits";
import { FunctionComponent } from "react";
import TimeSpan from "../classes/TimeSpan";

interface PersonalBestGraphProps {
  splits: Splits;
  useGameTime: boolean;
}

function PersonalBestGraph({ splits, useGameTime }: PersonalBestGraphProps) {
  return (
    <ResponsiveContainer width="90%" height="70%">
      <LineChart
        data={splits.getGraphData("pb", useGameTime)}
        {...{ overflow: "visible" }}
      >
        <Line connectNulls type="monotone" dataKey="Time" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="Date">
          <Label value="Date" offset={0} position="insideBottom" />
        </XAxis>
        <YAxis tick={<TimeSpanTick />} />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
}

const TimeSpanTick: FunctionComponent<any> = (props: any) => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="end" fill="#666">
        {new TimeSpan(payload.value).toString(true, false)}
      </text>
    </g>
  );
};

export default PersonalBestGraph;
