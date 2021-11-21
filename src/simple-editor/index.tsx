import { useCallback, useEffect, useState } from "react";
import EditArea from "./components/editarea";
import Toolbar from "./components/toolbar";
import { EditorContent } from "./editor-content";
import { EditorSelection } from "./selection";
import "./styles/index.scss";

export interface SimpleEditorProps {
  content?: string;
  expands?: FunctionComponent<Object>[];
}

const SimpleEditor: React.FC<SimpleEditorProps> = (props) => {
  const { content, expands } = props;

  const [selection, setSelection] = useState<EditorSelection>();
  const [editorContent, setEditorContent] = useState<EditorContent>();

  const onIframeMounted = useCallback(
    (contentDocument: Document) => {
      if (!selection) {
        const nextSelection = new EditorSelection(contentDocument);
        setSelection(nextSelection);
        nextSelection.subscribe((selecion) => {
          // 富文本光标变化时触发
        });
        setEditorContent(new EditorContent(contentDocument));
      }
    },
    [selection]
  );

  useEffect(() => {
    return () => {
      editorContent?.dispose();
      selection?.dispose();
    };
  }, [editorContent, selection]);

  return (
    <div className="simple-editor">
      <Toolbar
        selection={selection}
        editorContent={editorContent}
        expands={expands}
      />
      <EditArea content={content} onIframeMounted={onIframeMounted} />
    </div>
  );
};

export default SimpleEditor;
