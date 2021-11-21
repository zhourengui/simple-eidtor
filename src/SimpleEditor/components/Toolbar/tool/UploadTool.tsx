import { useState } from "react";
import { EditorContent } from "../../../editor-content";
import { EditorSelection } from "../../../selection";
import { ToolbarItem, Upload } from "../uikit";
import { UploadFile } from "../uikit/Upload/Upload";
import { generateImage } from "../utils";

export interface UploadToolProps {
  selection?: EditorSelection;
  editorContent?: EditorContent;
}

export const UploadTool: React.FC<UploadToolProps> = (props) => {
  const { selection, editorContent } = props;

  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<UploadFile[]>([]);

  const onFileChange = (files: UploadFile[]) => {
    setUploading(true);
    setFiles([...files]);
  };

  const onCompelete = async (files: UploadFile[]) => {
    setUploading(false);
    const images = await Promise.all(
      files
        .filter((file) => file.status === "success")
        .map((file) => generateImage(file.response))
    );
    images.forEach((image) => {
      const width = image.width;
      const editorWidth = editorContent?.getEditorWidth() || 0;
      if (width > editorWidth) {
        image.style.width = "100%";
      }
      editorContent?.getEditorBody()?.appendChild(image);
    });
  };

  const onChange = (nextFile: UploadFile) => {
    setFiles((prevFiles) =>
      prevFiles.map((file) => {
        if (nextFile.uid === file.uid) {
          return nextFile;
        }
        return file;
      })
    );
  };

  return (
    <ToolbarItem>
      <>
        <Upload
          action="http://localhost:5555/upload-single-file"
          multiple
          accept="image/*"
          onFileChange={onFileChange}
          onCompelete={onCompelete}
          onChange={onChange}
        >
          <span>UpIMG</span>
        </Upload>
        {uploading ? (
          <div
            style={{
              position: "fixed",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "30%",
              background: "rgba(0, 0, 0, .3)",
              padding: "10px",
              color: "green",
            }}
          >
            <p>total: {files.length}</p>
            <p>
              success:
              {files.filter((file) => file.status === "success").length}
            </p>
            <p>
              error: {files.filter((file) => file.status === "error").length}
            </p>
          </div>
        ) : null}
      </>
    </ToolbarItem>
  );
};

UploadTool.displayName = "UploadTool";
