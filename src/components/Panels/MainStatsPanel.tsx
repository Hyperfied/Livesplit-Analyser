import Splits from "../../classes/Splits";

import TimeWithLabel from "../TimeWithLabel";

interface MainStatsPanelProps {
  splits: Splits;
  useGameTime: boolean;
}

function MainStatsPanel({ splits, useGameTime }: MainStatsPanelProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 text-center border-2 rounded-lg w-4/10 h-9/10 bg-white">
      <h1 className="text-4xl font-bold">{splits.gameName}</h1>
      <h2 className="text-2xl font-semibold">{splits.category}</h2>
      <div className="flex flex-row justify-evenly items-center w-full">
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
