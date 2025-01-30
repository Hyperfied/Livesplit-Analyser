import Splits from "../classes/Splits";
import "./SplitStatsPage.css";

interface SplitStatsGraphsPanelProps {
  splits: Splits;
}

function SplitStatsGraphPanel({ splits }: SplitStatsGraphsPanelProps) {
  return (
    <div className="split-stats-graphs">
      <h1>Graphs</h1>
    </div>
  );
}

export default SplitStatsGraphPanel;
