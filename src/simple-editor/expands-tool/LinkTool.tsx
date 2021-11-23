import { useRef, useState } from "react";
import {
  EInput,
  EButton,
  Dropdown,
  ELabelItem,
} from "../components/toolbar/uikit";
import { createHTMLElement, createTextNode, isValidLink } from "../utils";
import { ToolProps } from "../components/toolbar/tool/tool";

export const LinkTool: React.FC<ToolProps> = (props) => {
  const { selection, editorContent } = props;
  const linkRef = useRef<any>(null);
  const textRef = useRef<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSelectedContent, setIsSelectedContent] = useState(false);
  const onConfirm = () => {
    const link = linkRef?.current?.getValue();
    const text = textRef?.current?.getValue();
    const content = selection?.getContent();

    if (!isValidLink(link)) {
      return alert("请输入有效的链接");
    }
    if (!isSelectedContent && !text) {
      return alert("请输入文字");
    }
    const linkDom = createHTMLElement({
      type: "a",
      attrs: {
        href: link,
        target: "_blank",
      },
    });
    selection?.deleteContents();
    linkDom.appendChild(
      isSelectedContent ? (content as Node) : createTextNode(text)
    );
    selection?.insertNode(linkDom, editorContent);
    setIsOpen(false);
  };
 
  const onLabelClick = () => {
    setIsSelectedContent(!!selection?.getContent()?.firstChild);
    setIsOpen(true);
  };
  return (
    <Dropdown
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      selection={selection}
      labelFactory={() => <span onClick={onLabelClick}>Link</span>}
      viewFactory={() => (
        <>
          {isSelectedContent ? null : (
            <ELabelItem label="文字">
              <EInput placeholder="请输入文字" ref={textRef} />
            </ELabelItem>
          )}
          <ELabelItem label="跳转链接地址">
            <EInput placeholder="请输入有效的链接" ref={linkRef} />
          </ELabelItem>
          <div style={{ marginTop: 10 }}>
            <EButton onClick={onConfirm}>确定</EButton>
          </div>
        </>
      )}
    />
  );
};

LinkTool.displayName = "LinkTool";
