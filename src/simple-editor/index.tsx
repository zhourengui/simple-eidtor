import { FunctionComponent, useCallback, useEffect, useState } from "react";
import EditArea from "./components/edit-area";
import Toolbar from "./components/toolbar";
import { EditorContent } from "./editor-content";
import { EditorSelection } from "./selection";
import "./styles/index.scss";

export interface SimpleEditorProps {
  content?: string;
  expands?: FunctionComponent<Object>[];
  onChange?: (content: string | undefined) => void;
}

const SimpleEditor: React.FC<SimpleEditorProps> = (props) => {
  const { content, expands, onChange } = props;

  const [selection, setSelection] = useState<EditorSelection>();
  const [editorContent, setEditorContent] = useState<EditorContent>();

  const onIframeMounted = useCallback((contentDocument: Document) => {
    if (!selection) {
      const nextSelection = new EditorSelection(contentDocument);
      const nextEditorContent = new EditorContent(contentDocument);
      setSelection(nextSelection);
      setEditorContent(nextEditorContent);
      nextSelection.subscribe((selection: EditorSelection) => {
        // 富文本光标变化时触发
      });
      nextEditorContent.subscribe(() => {
        // 编辑器内容变化触发
        onChange?.(contentDocument?.body?.innerHTML);
      });
      // contentDocument.addEventListener("paste", (ev) => {
      //   // 粘贴时处理
      //   let clipboardData = ev.clipboardData;
      //   let content = clipboardData?.getData("text/html");
      //   // 解析HTML
      //   const parser = new htmlparser2.Parser({
      //     onopentag(tagname, attribs) {
      //       if (tagname === "table") {
      //         attribs.style = "";
      //       }
      //     },
      //   });
      //   parser.write(content as string);
      //   parser.end();
      // });
    }
  }, []);

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
