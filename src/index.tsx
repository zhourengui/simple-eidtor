import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import SimpleEditor from "./simple-editor";
import {
  CaseTool,
  ClearTool,
  LinkTool,
  TableTool,
  UploadTool,
} from "./simple-editor/expands-tool";

ReactDOM.render(
  <div>
    <h1>Rich Text Editor</h1>
    <SimpleEditor
      content="默认文本"
      expands={[CaseTool, LinkTool, ClearTool, TableTool, UploadTool]}
    />
  </div>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
