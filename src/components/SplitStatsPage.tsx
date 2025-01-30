import "./SplitStatsPage.css";
import React from "react";
import Splits from "../classes/Splits";

import SplitStatsMainStats from "./SplitsStatsMainStats";
import SplitsStatsSideStats from "./SplitStatsSideStats";

interface SplitStatsPageProps {
  splits: Splits;
}

function SplitStatsPage({ splits }: SplitStatsPageProps) {
  return (
    <div className={`split-stats-page`}>
      <div className="split-stats-top">
        <SplitStatsMainStats splits={splits} />
        <SplitsStatsSideStats splits={splits} />
      </div>
      <div className="split-stats-bottom">
        <div className="split-stats-graphs">
          <h1>Graphs</h1>
        </div>
      </div>
    </div>
  );
}

export default SplitStatsPage;
