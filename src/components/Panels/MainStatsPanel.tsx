import Splits from "../../classes/Splits";

import TimeWithLabel from "../TimeWithLabel";

interface MainStatsPanelProps {
  splits: Splits;
  useGameTime: boolean;
}

function MainStatsPanel({ splits, useGameTime }: MainStatsPanelProps) {
  return (
    <div className="split-stats-main">
      <h1>{splits.gameName}</h1>
      <h2>{splits.category}</h2>
      <div className="split-stats-times">
        {useGameTime && (
          <TimeWithLabel
            timeString={splits.personalBest.gameTime.toString(true, false)}
            label="Game Time"
          />
        )}
        <TimeWithLabel
          timeString={splits.personalBest.realTime.toString(true, false)}
          label="Real Time"
        />
      </div>
      <TimeWithLabel
        timeString={
          useGameTime
            ? splits.sumOfBest.gameTime.toString(true, false)
            : splits.sumOfBest.realTime.toString(true, false)
        }
        label="Sum of Best"
      />
    </div>
  );
}

export default MainStatsPanel;
