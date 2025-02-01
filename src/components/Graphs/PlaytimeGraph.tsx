import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  Label,
  YAxis,
  Tooltip,
  TooltipProps,
} from "recharts";
import Splits from "../../classes/Splits";
import { FunctionComponent } from "react";
import TimeSpan from "../../classes/TimeSpan";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

import "./SplitGraphs.css";

interface PlaytimeGraphProps {
  splits: Splits;
  useGameTime: boolean;
}

function PlaytimeGraph({ splits, useGameTime }: PlaytimeGraphProps) {
  return (
    <ResponsiveContainer width="90%" height="70%">
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
        <YAxis
          tick={<TimeSpanTick />}
          domain={[0, Math.round(splits.firstTime.totalMilliseconds * 1.2)]}
        />
        <Tooltip content={<TimeSpanTooltip />} />
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

const TimeSpanTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="timespan-tooltip">
        <p className="label">{label}</p>
        <p className="value">
          {payload[0] && typeof payload[0].value === "number"
            ? new TimeSpan(payload[0].value).toString(true, false)
            : "N/A"}
        </p>
      </div>
    );
  }

  return null;
};

export default PlaytimeGraph;
