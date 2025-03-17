import SubsplitItem from "../SubsplitItem";
import SubsplitsStats from "../SubsplitsStats";

import SplitsContext from "../../classes/SplitsContext";
import { useContext } from "react";

function SubsplitsPanel() {
  const splits = useContext(SplitsContext)
  if (!splits) {
    return <div></div>
  }

    return (
    <div className="flex h-3/4 w-9/10 border-2 rounded-lg bg-white">
        <div className="h-full w-1/3 border-r-2 overflow-auto">
          {splits.segments.map(segment => <SubsplitItem name={segment.name} time={segment.bestSegmentGameTime.toString(true, false)}/>)}
        </div>
        <SubsplitsStats/>
      </div>
      );
}

export default SubsplitsPanel;