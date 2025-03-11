import { createContext } from "react";
import Splits from "./Splits";

const SplitsContext = createContext<Splits | null>(null);

export default SplitsContext;