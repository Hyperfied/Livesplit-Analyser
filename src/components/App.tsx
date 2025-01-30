import React, { useState } from "react";
import "./App.css";
import Splits from "../classes/Splits";

import UploadSplitsPage from "./UploadSplitsPage";
import SplitStatsPage from "./SplitStatsPage";
import NavBar from "./NavBar";

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [splits, setSplits] = useState<Splits | null>(null);

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
      />
      {splits && <SplitStatsPage splits={splits} />}
    </>
  );
}

export default App;
