import Splits from "../../../classes/Splits";

import SplitStatsMainPanelStats from "../../Panels/MainStatsPanel";
import SplitStatsSidePanelStats from "../../Panels/SideStatsPanel";
import GraphsPanel from "../../Panels/GraphsPanel";

interface SplitStatsPageProps {
  splits: Splits;
  useGameTime: boolean;
}

function SplitStatsPage({ splits, useGameTime }: SplitStatsPageProps) {
  return (
    <div
      id="statspage"
      className="h-full w-full flex flex-col items-center justify-evenly pt-[5%]"
    >
      <div className="flex flex-row w-full h-4/10 justify-evenly items-center">
        <SplitStatsMainPanelStats splits={splits} useGameTime={useGameTime} />
        <SplitStatsSidePanelStats splits={splits} />
      </div>
      <div className="flex flex-row w-full h-6/10 justify-evenly items-center">
        <GraphsPanel splits={splits} useGameTime={useGameTime} />
      </div>
    </div>
  );
}

export default SplitStatsPage;
