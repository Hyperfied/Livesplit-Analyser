import "./UploadSplitsPage.css";
import React, { useState } from "react";
import Splits from "../classes/Splits";

interface UploadSplitsProps {
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  setSplits: React.Dispatch<React.SetStateAction<Splits | null>>;
  file: File | null;
  scrollToStats: Function;
  setUseGameTime: React.Dispatch<React.SetStateAction<boolean>>;
}

function UploadSplitsPage({
  setFile,
  setSplits,
  file,
  scrollToStats,
  setUseGameTime,
}: UploadSplitsProps) {
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
          const splits = Splits.fromXML(
            new DOMParser().parseFromString(
              e.target.result as string,
              "text/xml"
            )
          );
          setSplits(splits);
          setUseGameTime(splits.personalBest.gameTime.totalMilliseconds > 0);
        }
      };
      reader.readAsText(file);
      scrollToStats();
    }
  };

  return (
    <div className={`upload-splits-page`}>
      <div className={`upload-splits`}>
        <h1>Select your Splits</h1>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Analyse</button>
        </form>
      </div>
    </div>
  );
}

export default UploadSplitsPage;
