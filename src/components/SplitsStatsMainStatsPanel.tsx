import "./SplitStatsPage.css";
import Splits from "../classes/Splits";

interface SplitStatsMainStatsPanelProps {
  splits: Splits;
  useGameTime: boolean;
}

function SplitStatsMainStatsPanel({
  splits,
  useGameTime,
}: SplitStatsMainStatsPanelProps) {
  return (
    <div className="split-stats-main">
      <h1>{splits.gameName}</h1>
      <h2>{splits.category}</h2>
      <div className="split-stats-times">
        {useGameTime && (
          <div className="split-stats-time">
            <h1>{splits.personalBest.gameTime.toString(true, false)}</h1>
            <h3>Game Time</h3>
          </div>
        )}
        <div className="split-stats-time">
          <h1>{splits.personalBest.realTime.toString(true, false)}</h1>
          <h3>Real Time</h3>
        </div>
      </div>
      <div className="split-stats-time">
        <h1>
          {useGameTime
            ? splits.sumOfBest.gameTime.toString(true, false)
            : splits.sumOfBest.realTime.toString(true, false)}
        </h1>
        <h3>Sum of Best</h3>
      </div>
    </div>
  );
}

export default SplitStatsMainStatsPanel;
