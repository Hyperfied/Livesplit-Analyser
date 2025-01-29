import React, { useState } from "react";
import "./App.css";
import Splits from "./classes/Splits";

import UploadSplitsPage from "./UploadSplitsPage";
import SplitStatsPage from "./SplitStatsPage";

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [splits, setSplits] = useState<Splits | null>(null);

  return (
    <>
      <UploadSplitsPage setFile={setFile} setSplits={setSplits} file={file} />
      {splits && <SplitStatsPage splits={splits} />}
    </>
  );
}

export default App;
