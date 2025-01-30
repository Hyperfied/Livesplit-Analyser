import "./SplitStatsPage.css";
import React from "react";
import Splits from "../classes/Splits";

import SplitStatsMainStats from "./SplitsStatsMainStats";
import SplitStatsSideStats from "./SplitStatsSideStats";
import SplitStatsGraphPanel from "./SplitsStatsGraphsPanel";

interface SplitStatsPageProps {
  splits: Splits;
}

function SplitStatsPage({ splits }: SplitStatsPageProps) {
  return (
    <div className={`split-stats-page`}>
      <div className="split-stats-top">
        <SplitStatsMainStats splits={splits} />
        <SplitStatsSideStats splits={splits} />
      </div>
      <div className="split-stats-bottom">
        <SplitStatsGraphPanel splits={splits} />
      </div>
    </div>
  );
}

export default SplitStatsPage;
