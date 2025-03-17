import SubsplitItem from "../SubsplitItem";
import SubsplitsStats from "../SubsplitsStats";

import SplitsContext from "../../classes/SplitsContext";
import { useContext, useState } from "react";
import Segment from "../../classes/Segment";

interface SubsplitsPanelProps {
  useGameTime: boolean
}

function SubsplitsPanel({useGameTime} : SubsplitsPanelProps) {
  const splits = useContext(SplitsContext)

  const [currentSegment, setCurrentSegment] = useState<Segment | null | undefined>(splits?.segments[0]);

  if (!splits || splits == undefined) {
    return <div></div>
  }

    return (
    <div className="flex h-3/4 w-9/10 border-2 rounded-lg bg-white">
        <div className="h-full w-1/3 border-r-2 overflow-auto">
          {splits.segments.map(segment => <SubsplitItem segment={segment} name={segment.getName()} 
          time={(useGameTime ? segment.getSegmentTime(splits.personalBestId).gameTime : segment.getSegmentTime(splits.personalBestId).realTime).toString(true, false)} 
          setCurrentSegment={setCurrentSegment}/>)
          }
        </div>
        <SubsplitsStats currSeg={currentSegment} useGameTime={useGameTime}/>
      </div>
      );
}

export default SubsplitsPanel;