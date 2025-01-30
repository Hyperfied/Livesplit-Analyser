import "./SplitStatsPage.css";
import React from "react";
import Splits from "../classes/Splits";

import SplitStatsMainPanelStats from "./SplitsStatsMainStatsPanel";
import SplitStatsSidePanelStats from "./SplitStatsSideStatsPanel";
import SplitStatsGraphPanel from "./SplitsStatsGraphsPanel";

interface SplitStatsPageProps {
  splits: Splits;
}

function SplitStatsPage({ splits }: SplitStatsPageProps) {
  return (
    <div className={`split-stats-page`} id="statspage">
      <div className="split-stats-top">
        <SplitStatsMainPanelStats splits={splits} />
        <SplitStatsSidePanelStats splits={splits} />
      </div>
      <div className="split-stats-bottom">
        <SplitStatsGraphPanel splits={splits} />
      </div>
    </div>
  );
}

export default SplitStatsPage;
