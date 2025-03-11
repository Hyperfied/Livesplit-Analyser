import SplitStatsMainPanelStats from "../Panels/MainStatsPanel";
import SplitStatsSidePanelStats from "../Panels/SideStatsPanel";
import GraphsPanel from "../Panels/GraphsPanel";

interface SplitStatsPageProps {
  useGameTime: boolean;
}

function SplitStatsPage({ useGameTime }: SplitStatsPageProps) {
  return (
    <div
      id="statspage"
      className="h-full w-full flex flex-col items-center justify-evenly pt-[5%]"
    >
      <div className="flex flex-row w-full h-4/10 justify-evenly items-center">
        <SplitStatsMainPanelStats useGameTime={useGameTime} />
        <SplitStatsSidePanelStats />
      </div>
      <div className="flex flex-row w-full h-6/10 justify-evenly items-center">
        <GraphsPanel useGameTime={useGameTime} />
      </div>
    </div>
  );
}

export default SplitStatsPage;
