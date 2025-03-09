import "./SplitStatsPage.css";
import React, { useState } from "react";
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
    <div className={`split-stats-page`} id="statspage">
      <div className="split-stats-top">
        <SplitStatsMainPanelStats splits={splits} useGameTime={useGameTime} />
        <SplitStatsSidePanelStats splits={splits} />
      </div>
      <div className="split-stats-bottom">
        <GraphsPanel splits={splits} useGameTime={useGameTime} />
      </div>
    </div>
  );
}

export default SplitStatsPage;
