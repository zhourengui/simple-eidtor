import { EditorContent } from "../../../editor-content";
import { EditorSelection } from "../../../selection";

export interface ToolProps {
  selection?: EditorSelection;
  editorContent?: EditorContent;
}
