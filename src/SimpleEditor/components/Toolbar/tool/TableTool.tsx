import { useRef, useState } from "react";
import { EditorSelection } from "../../../selection";
import Dropdown from "../uikit/Dropdown/Dropdown";
import ELabelItem from "../uikit/ELabelItem/ELabelItem";
import { EInput, EButton } from "../uikit";
import { createHTMLElement } from "../utils";

export interface TableToolPorps {
  selection?: EditorSelection;
}

export const TableTool: React.FC<TableToolPorps> = (props) => {
  const { selection } = props;
  const linkRef = useRef<any>(null);
  const textRef = useRef<any>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSelectedContent, setIsSelectedContent] = useState<boolean>();
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
    if (content) {
      selection?.deleteContents();
      const linkDom = createHTMLElement({
        type: "a",
        attrs: {
          href: link,
          // 设置之后不能被编辑，但是可以点击跳转
          // contenteditable: false,
          target: "_blank",
        },
      });
      linkDom.appendChild(
        isSelectedContent ? content : document.createTextNode(text)
      );
      selection?.insertNode(linkDom);
    }
    setIsOpen(false);
  };
  const isValidLink = (str: string) => {
    return /^(?:(http|https|fcp):\/\/)?((?:[\w-]+\.)[a-z][\w-]+)(?:(\/[^/?#]*)+)?(\?[^#]+)?(#.+)?$/i.test(
      str
    );
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
      labelFactory={() => <span onClick={onLabelClick}>Table</span>}
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

TableTool.displayName = "TableTool";
