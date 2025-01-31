import "./SplitStatsPage.css";
import React, { useState } from "react";
import Splits from "../classes/Splits";

import SplitStatsMainPanelStats from "./SplitsStatsMainStatsPanel";
import SplitStatsSidePanelStats from "./SplitStatsSideStatsPanel";
import SplitStatsGraphPanel from "./SplitsStatsGraphsPanel";

interface SplitStatsPageProps {
  splits: Splits;
  useGameTime: boolean;
}

function SplitStatsPage({ splits, useGameTime }: SplitStatsPageProps) {
  return (
    <div className={`split-stats-page`} id="statspage">
      <div className="split-stats-top">
        <SplitStatsMainPanelStats splits={splits} useGameTime={useGameTime} />
        <SplitStatsSidePanelStats splits={splits} />
      </div>
      <div className="split-stats-bottom">
        <SplitStatsGraphPanel splits={splits} useGameTime={useGameTime} />
      </div>
    </div>
  );
}

export default SplitStatsPage;
