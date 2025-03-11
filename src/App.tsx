import React, { useState } from "react";
import "./App.css";
import Splits from "./classes/Splits";

import UploadSplitsPage from "./components/Pages/UploadSplitsPage";
import SplitStatsPage from "./components/Pages/SplitStatsPage";
import NavBar from "./components/NavBar/NavBar";

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [splits, setSplits] = useState<Splits | null>(null);
  const [useGameTime, setUseGameTime] = useState<boolean>(false);

  const scrollToStats = () => {
    setTimeout(function () {
      window.scrollBy({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }, 50);
  };

  return (
    <>
      <NavBar />
      <UploadSplitsPage
        setFile={setFile}
        setSplits={setSplits}
        file={file}
        scrollToStats={scrollToStats}
        setUseGameTime={setUseGameTime}
      />
      {splits && <SplitStatsPage splits={splits} useGameTime={useGameTime} />}
    </>
  );
}

export default App;
