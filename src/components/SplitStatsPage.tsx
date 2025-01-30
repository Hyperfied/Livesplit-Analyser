import "./SplitStatsPage.css";
import React from "react";
import Splits from "../classes/Splits";
import SplitStatsStat from "./SplitStatsStat";

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
              {splits.personalBest.gameTime.totalMilliseconds > 0
                ? splits.sumOfBest.gameTime.toString(true, false)
                : splits.sumOfBest.realTime.toString(true, false)}
            </h1>
            <h3>Sum of Best</h3>
          </div>
        </div>
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
