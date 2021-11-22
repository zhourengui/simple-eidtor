import { FunctionComponent, useCallback, useEffect, useState } from "react";
import EditArea from "./components/edit-area";
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
        nextSelection.subscribe((selection: EditorSelection) => {
          // 富文本光标变化时触发
          console.log(selection.getRangeAt());
        });
        setEditorContent(new EditorContent(contentDocument));
        contentDocument.addEventListener("paste", (ev) => {
          // 粘贴时处理
          // let clipboardData = ev.clipboardData;
          // let content = clipboardData?.getData("text/html");
          // 解析HTML
          // const parser = new htmlparser2.Parser({
          //   onopentag(tagname, attribs) {
          //     if (tagname === "table") {
          //       attribs.style = "";
          //     }
          //   },
          // });
          // parser.write(content as string);
          // parser.end();
        });
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
