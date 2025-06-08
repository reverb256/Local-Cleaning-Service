import { createRoot } from "react-dom/client";
import SimpleApp from "./components/simple-app";
import "./index.css";

createRoot(document.getElementById("root")!).render(<SimpleApp />);
