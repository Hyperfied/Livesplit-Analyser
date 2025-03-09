import Splits from "../../classes/Splits";

import Stat from "../Stat";

interface SideStatsPanelProps {
  splits: Splits;
}

function SideStatsPanel({ splits }: SideStatsPanelProps) {
  return (
    <div className="flex flex-col w-4/10 h-9/10 items-center justify-evenly border-2 rounded-lg bg-white">
      <h1 className="text-4xl font-bold">Stats</h1>
      <Stat
        title="Total Type Played"
        value={splits.totalTimePlayed.toString(true, true)}
      />
      <Stat
        title="Runs Completed/Uncompleted"
        value={`${splits.runsCompleted}/${splits.runsNotCompleted}`}
      />
      <Stat
        title="Completion Ratio"
        value={`${(
          (splits.runsCompleted /
            (splits.runsCompleted + splits.runsNotCompleted)) *
          100
        ).toFixed(2)}%`}
      />
      <Stat
        title="First Run Date"
        value={splits.firstRunDate.toLocaleDateString()}
      />
      <Stat
        title="Latest Run Date"
        value={splits.latestRunDate.toLocaleDateString()}
      />
      <Stat title="PB Run Date" value={splits.pbRunDate.toLocaleDateString()} />
    </div>
  );
}

export default SideStatsPanel;
