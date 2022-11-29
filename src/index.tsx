import ReactDOM from "react-dom/client";
import "./index.css";
import GithubExplorer from "./github-explorer";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<GithubExplorer />);
