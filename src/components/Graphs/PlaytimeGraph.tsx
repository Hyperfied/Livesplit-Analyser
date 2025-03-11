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
import { FunctionComponent, useContext } from "react";
import TimeSpan from "../../classes/TimeSpan";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import SplitsContext from "../../classes/SplitsContext";

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
      <div className="px-10 py-2 bg-[#f5f5f5] text-center">
        <p className="label font-bold text-xl">{label}</p>
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
