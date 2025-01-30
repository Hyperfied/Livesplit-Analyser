import "./SplitStatsPage.css";

import Splits from "../classes/Splits";

import SplitStatsStat from "./SplitStatsStat";

interface SplitStatsSideStatsProps {
  splits: Splits;
}

function SplitStatsSideStats({ splits }: SplitStatsSideStatsProps) {
  return (
    <div className="split-stats-side">
      <h1>Stats</h1>
      <SplitStatsStat
        title="Total Type Played"
        value={splits.totalTimePlayed.toString(true, true)}
      />
      <SplitStatsStat
        title="Runs Completed/Uncompleted"
        value={`${splits.runsCompleted}/${splits.runsNotCompleted}`}
      />
      <SplitStatsStat
        title="Completion Ratio"
        value={`${(
          (splits.runsCompleted /
            (splits.runsCompleted + splits.runsNotCompleted)) *
          100
        ).toFixed(2)}%`}
      />
      <SplitStatsStat
        title="First Run Date"
        value={splits.firstRunDate.toLocaleDateString()}
      />
      <SplitStatsStat
        title="Latest Run Date"
        value={splits.latestRunDate.toLocaleDateString()}
      />
      <SplitStatsStat
        title="PB Run Date"
        value={splits.pbRunDate.toLocaleDateString()}
      />
    </div>
  );
}

export default SplitStatsSideStats;
