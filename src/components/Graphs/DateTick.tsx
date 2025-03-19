import { FunctionComponent } from "react";

const DateTick: FunctionComponent<any> = (props: any) => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="start" fill="#666">
        {new Date(payload.value).toLocaleDateString()}
      </text>
    </g>
  );
};

export default DateTick;
