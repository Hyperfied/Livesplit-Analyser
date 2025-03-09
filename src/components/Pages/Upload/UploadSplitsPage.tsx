import React, { useState } from "react";
import Splits from "../../../classes/Splits";

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
    <div className="flex h-full w-full justify-center items-center">
      <div
        className={
          "flex flex-col items-center justify-center h-1/2 w-3/10 border-2 border-black rounded-lg p-20 text-center bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-10"
        }
      >
        <h1 className="text-4xl font-bold">Select your Splits</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="file"
            onChange={handleFileChange}
            className="text-lg file:bg-stone-200 file:border-0 file:rounded-full file:px-2 file:py-1 file:font-semibold file:text-lg cursor-pointer hover:file:bg-stone-300"
          />
          <button
            type="submit"
            className="text-lg bg-stone-200 border-0 rounded-full px-2 py-1 font-semibold cursor-pointer hover:bg-stone-300"
          >
            Analyse
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadSplitsPage;
