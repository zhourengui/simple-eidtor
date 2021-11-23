import { useState, MouseEvent } from "react";
import {
  EInput,
  EButton,
  Dropdown,
  ELabelItem,
} from "../components/toolbar/uikit";
import { createHTMLElement, isMobile } from "../utils";
import { ToolProps } from "../components/toolbar/tool/tool";

export const TableTool: React.FC<ToolProps> = (props) => {
  const { selection, editorContent } = props;
  const [tableRow, setTableRow] = useState(0);
  const [tableColumn, setTableColumn] = useState(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isCanBeOver, setIsCanBeOver] = useState<boolean>(true);

  const onLabelClick = () => {
    setIsOpen(true);
  };

  const onTableRowChange = (value: number) => setTableRow(value);
  const onTableColumnChange = (value: number) => setTableColumn(value);

  const onMouseOverTable = (ev: MouseEvent) => {
    // @ts-ignore
    const { row, column } = ev.target.dataset;
    if (row && column && isCanBeOver) {
      setTableRow(row);
      setTableColumn(column);
    }
  };
  const onTableClick = () => {
    setIsCanBeOver(false);
  };

  const onMouseLeaveTable = () => {
    setIsCanBeOver(true);
  };

  const onConfirm = () => {
    if (tableRow > 0 && tableColumn > 0) {
      const table = createHTMLElement({
        type: "table",
        attrs: {
          "textbus-editable": "off",
        },
        classes: ["editor-table"],
        children: [
          createHTMLElement({
            type: "tbody",
            classes: ["editor-table-body"],
            children: Array.from({ length: tableRow }).map(() =>
              createHTMLElement({
                type: "tr",
                classes: ["editor-table-tr"],
                children: Array.from({ length: tableColumn }).map(() =>
                  createHTMLElement({
                    type: "td",
                    attrs: {
                      "textbus-editable": "on",
                    },
                    classes: ["editor-table-td"],
                    children: [createHTMLElement({ type: "br" })],
                  })
                ),
              })
            ),
          }),
        ],
      });
      selection?.insertNode(table, editorContent);
      setIsOpen(false);
    }
  };

  return (
    <Dropdown
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      selection={selection}
      labelFactory={() => <span onClick={onLabelClick}>Table</span>}
      viewFactory={() => (
        <>
          {isMobile() ? null : (
            <div
              className="e-table-grid"
              onMouseOver={onMouseOverTable}
              onClick={onTableClick}
              onMouseLeave={onMouseLeaveTable}
            >
              {Array.from({ length: 100 }, (_, index) => index).map((index) => {
                const row = Math.ceil((index + 1) / 10);
                const column = (index % 10) + 1;
                return (
                  <div
                    className={`e-table-grid-item ${
                      row <= tableRow && column <= tableColumn
                        ? "e-table-grid-item--active"
                        : ""
                    }`}
                    key={`${row}-${column}`}
                    data-row={row}
                    data-column={column}
                  />
                );
              })}
            </div>
          )}
          <ELabelItem label="表格行数">
            <EInput
              placeholder="请输入表格行数"
              type="number"
              value={tableRow}
              onChange={onTableRowChange}
            />
          </ELabelItem>
          <ELabelItem label="表格列数">
            <EInput
              placeholder="请输入表格列数"
              type="number"
              value={tableColumn}
              onChange={onTableColumnChange}
            />
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
