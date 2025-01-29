import "./SplitStatsPage.css";
import React from "react";
import Splits from "../classes/Splits";

interface SplitStatsPageProps {
  splits: Splits;
}

function SplitStatsPage({ splits }: SplitStatsPageProps) {
  return (
    <div className={`split-stats-page`}>
      <div className="split-stats-top">
        <div className="split-stats-main">
          <h1>{splits.gameName}</h1>
          <h2>{splits.category}</h2>
        </div>
        <div className="split-stats-side">
          <h1>Stats</h1>
        </div>
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
