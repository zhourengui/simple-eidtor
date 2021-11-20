import { useCallback, useState } from "react";
import EditArea from "./components/EditArea";
import Toolbar from "./components/Toolbar";
import { EditorSelection } from "./selection";
import "./styles/index.scss";

export interface SimpleEditorProps {
  content?: string;
  expands?: React.FC<any>[];
}

const SimpleEditor: React.FC<SimpleEditorProps> = (props) => {
  const { content, expands } = props;

  const [selection, setSelection] = useState<EditorSelection>();

  const onIframeMounted = useCallback(
    (contentDocument: Document) => {
      if (!selection) {
        setSelection(new EditorSelection(contentDocument));
      }
    },
    [selection]
  );

  return (
    <div className="simple-editor">
      <Toolbar selection={selection} expands={expands} />
      <EditArea content={content} onIframeMounted={onIframeMounted} />
    </div>
  );
};

export default SimpleEditor;
