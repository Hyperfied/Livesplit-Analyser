import Segment from "../classes/Segment";
import TimeWithLabel from "./TimeWithLabel";

interface SubsplitStatsProps {
  currSeg: Segment | null,
  useGameTime: boolean
}

function SubsplitsStats({currSeg, useGameTime} : SubsplitStatsProps) {
  if (!currSeg)
  {
    return <div></div>
  }

  return (
    <div className="flex flex-col items-center justify-evenly w-full">
      <div className="h-3/5 w-9/10 bg-[#f3f3f3] border-2">
      </div>
      <div className="h-1/5 w-9/10 bg-[#f3f3f3] border-2 flex flex-row">
        <TimeWithLabel label="Best Split" timeString={(useGameTime ? currSeg.bestSegmentGameTime : currSeg.bestSegmentRealTime).toString(true, false)} />
        <TimeWithLabel label="Possible Time Save" timeString="" />
        <TimeWithLabel label="Average Split" timeString="" />
      </div>
    </div>
  );
}

export default SubsplitsStats;
