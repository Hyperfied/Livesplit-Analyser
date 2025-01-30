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
          <div className="split-stats-times">
            {splits.personalBest.gameTime.totalMilliseconds > 0 && (
              <div className="split-stats-time">
                <h1>{splits.personalBest.gameTime.toString(true, false)}</h1>
                <h2>Game Time</h2>
              </div>
            )}
            <div className="split-stats-time">
              <h1>{splits.personalBest.realTime.toString(true, false)}</h1>
              <h2>Real Time</h2>
            </div>
          </div>
          <div className="split-stats-time">
            <h1>
              {splits.personalBest.gameTime.totalMilliseconds > 0
                ? splits.sumOfBest.gameTime.toString(true, false)
                : splits.sumOfBest.realTime.toString(true, false)}
            </h1>
            <h2>Sum of Best</h2>
          </div>
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
