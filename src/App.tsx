import React, { useState } from "react";
import "./App.css";
import Splits from "./classes/Splits";

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [splits, setSplits] = useState<Splits | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          setSplits(
            Splits.fromXML(
              new DOMParser().parseFromString(
                e.target.result as string,
                "text/xml"
              )
            )
          );
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <>
      <h2>Select your Splits</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Analyse</button>
      </form>
      {splits && (
        <div>
          <h3>{splits.gameName}</h3>
          <h4>{splits.category}</h4>
          <h4>{splits.platform}</h4>
          <h4>{splits.region}</h4>
          <h4>{splits.usesEmulator ? "Emulator" : "Console"}</h4>
          <h4>{splits.offset.toString()}</h4>
          <h4>Attempts</h4>
          <ul>
            {splits.attempts.map((attempt) => (
              <li key={attempt.id}>
                <h5>Attempt {attempt.id}</h5>
                <p>Started: {attempt.started.toString()}</p>
                <p>Ended: {attempt.ended.toString()}</p>
                <p>Real Time: {attempt.realTime.toString()}</p>
                <p>Game Time: {attempt.gameTime.toString()}</p>
                <p>Pause Time: {attempt.pauseTime.toString()}</p>
              </li>
            ))}
          </ul>
          <h4>Segments</h4>
          <ul>
            {splits.segments.map((segment) => (
              <li key={segment.name}>
                <h5>{segment.name}</h5>
                <p>
                  Best Segment Real Time:{" "}
                  {segment.bestSegmentRealTime.toString()}
                </p>
                <p>
                  Best Segment Game Time:{" "}
                  {segment.bestSegmentGameTime.toString()}
                </p>
                <p>Real Time on PB: {segment.realTimeOnPB.toString()}</p>
                <p>Game Time on PB: {segment.gameTimeOnPB.toString()}</p>
                <h6>Segment Times</h6>
                <ul>
                  {segment.segmentTimes.map((segmentTime) => (
                    <li key={segmentTime.runID}>
                      <h6>Run ID: {segmentTime.runID}</h6>
                      <p>Real Time: {segmentTime.realTime.toString()}</p>
                      <p>Game Time: {segmentTime.gameTime.toString()}</p>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default App;
