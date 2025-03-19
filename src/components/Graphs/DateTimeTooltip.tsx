import { TooltipProps } from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

import TimeSpan from "../../classes/TimeSpan";

const DateTimeTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="px-10 py-2 bg-[#f5f5f5] text-center">
        <p className="label font-bold text-xl">
          {new Date(label).toLocaleDateString()}
        </p>
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

export default DateTimeTooltip;
