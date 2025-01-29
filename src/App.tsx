import React, { useState } from "react";
import "./App.css";
import Splits from "./classes/Splits";

import UploadSplitsPage from "./UploadSplitsPage";

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [splits, setSplits] = useState<Splits | null>(null);

  return (
    <>
      <UploadSplitsPage setFile={setFile} setSplits={setSplits} file={file} />
    </>
  );
}

export default App;
