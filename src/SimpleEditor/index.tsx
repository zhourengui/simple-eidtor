import { useCallback, useEffect, useState } from "react";
import EditArea from "./components/EditArea";
import Toolbar from "./components/Toolbar";
import { EditorContent } from "./editor-content";
import { EditorSelection } from "./selection";
import "./styles/index.scss";

export interface SimpleEditorProps {
  content?: string;
  expands?: React.FC<any>[];
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
          console.log(selecion.getRangeAt());
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
