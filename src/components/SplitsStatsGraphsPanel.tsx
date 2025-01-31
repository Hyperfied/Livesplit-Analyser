import Splits from "../classes/Splits";
import PersonalBestGraph from "./PersonalBestGraph";
import "./SplitStatsPage.css";

interface SplitStatsGraphsPanelProps {
  splits: Splits;
  useGameTime: boolean;
}

function SplitStatsGraphPanel({
  splits,
  useGameTime,
}: SplitStatsGraphsPanelProps) {
  return (
    <div className="split-stats-graphs">
      <h1>Graphs</h1>
      <PersonalBestGraph splits={splits} useGameTime={useGameTime} />
    </div>
  );
}

export default SplitStatsGraphPanel;
