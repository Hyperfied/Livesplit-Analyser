import "./SplitStatsPage.css";
import React from "react";
import Splits from "./classes/Splits";

interface SplitStatsPageProps {
  splits: Splits;
}

function SplitStatsPage({ splits }: SplitStatsPageProps) {
  return (
    <div className={`split-stats-page`}>
      <h1>Split Stats</h1>
    </div>
  );
}

export default SplitStatsPage;
