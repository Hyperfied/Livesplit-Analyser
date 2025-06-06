import Segment from "../classes/Segment";
import TimeWithLabel from "./TimeWithLabel";

import SplitsContext from "../classes/SplitsContext";
import { useContext } from "react";
import SubsplitGraph from "./Graphs/SubsplitGraph";

interface SubsplitStatsProps {
  currSeg: Segment | null | undefined;
  useGameTime: boolean;
}

function SubsplitsStats({ currSeg, useGameTime }: SubsplitStatsProps) {
  const splits = useContext(SplitsContext);

  if (!currSeg || !splits) {
    return <div></div>;
  }

  return (
    <div className="flex flex-col items-center justify-evenly w-full">
      <h1 className="text-4xl font-bold">{currSeg.formattedName}</h1>
      <div className="h-3/5 w-9/10 bg-[#f3f3f3] border-2 flex flex-row items-center justify-center">
        <SubsplitGraph segment={currSeg} useGameTime={useGameTime} />
      </div>
      <div className="h-1/5 w-9/10 bg-[#f3f3f3] border-2 flex flex-row">
        <TimeWithLabel
          label="Best Split"
          timeString={(useGameTime
            ? currSeg.bestSegmentGameTime
            : currSeg.bestSegmentRealTime
          ).toString(true, false)}
        />
        <TimeWithLabel
          label="Possible Time Save"
          timeString={(useGameTime
            ? currSeg
                .getSegmentTime(splits.personalBestId)
                .gameTime.subtract(currSeg.bestSegmentGameTime)
            : currSeg
                .getSegmentTime(splits.personalBestId)
                .realTime.subtract(currSeg.bestSegmentRealTime)
          ).toString(true, false)}
        />
        <TimeWithLabel
          label="Average Split"
          timeString={(useGameTime
            ? currSeg.getAverageSegmentTime().gameTime
            : currSeg.getAverageSegmentTime().realTime
          ).toString(true, false)}
        />
      </div>
    </div>
  );
}

export default SubsplitsStats;
