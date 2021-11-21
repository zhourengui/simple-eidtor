import {
  CaseTool,
  ClearTool,
  LinkTool,
  TableTool,
  UploadTool,
} from "./simple-editor/expands-tool";
import SimpleEditor from "./simple-editor";

function App() {
  return (
    <div>
      <h1>Rich Text Editor</h1>
      <SimpleEditor
        content=""
        expands={[CaseTool, LinkTool, ClearTool, TableTool, UploadTool]}
      />
    </div>
  );
}

export default App;
