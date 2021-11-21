import axios from "axios";
import React, { ChangeEvent, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export type UploadStatus = "ready" | "uploading" | "success" | "error";

export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status: UploadStatus;
  percent?: number;
  raw?: File;
  response?: any;
  error?: any;
}

export interface UploadProps {
  action: string;
  defaultFileList?: UploadFile[];
  headers?: { [key: string]: any };
  name?: string;
  data?: { [key: string]: any };
  withCredentials?: boolean;
  accept?: string;
  multiple?: boolean;
  drag?: boolean;
  beforeUpload?: (file: File) => Promise<File> | boolean;
  onFileChange?: (files: UploadFile[]) => void;
  onChange?: (nextFile: UploadFile) => void;
  onProgress?: (percentage: number, file: UploadFile) => void;
  onSuccess?: (data: any, file: UploadFile) => void;
  onCompelete?: (files: UploadFile[]) => void;
  onError?: (data: any, file: UploadFile) => void;
  onRemove?: (file: UploadFile) => void;
}

const Upload: React.FC<UploadProps> = (props) => {
  const {
    action,
    defaultFileList,
    name,
    withCredentials,
    headers,
    data,
    accept,
    multiple,
    children,
    beforeUpload,
    onFileChange,
    onChange,
    onProgress,
    onSuccess,
    onCompelete,
    onError,
  } = props;

  const fileInput = useRef<HTMLInputElement>(null);

  const [, setFiles] = useState<UploadFile[]>(defaultFileList || []);
  const uploadCountRef = useRef(0);

  const updateFiles = (
    updateFile: UploadFile,
    updateObj: Partial<UploadFile>,
    callback?: (file: UploadFile) => void
  ) => {
    setFiles((prevFiles) => {
      const nextFiles = prevFiles.map((file) => {
        if (updateFile.uid === file.uid) {
          const nextUploadFile = { ...file, ...updateObj };
          callback?.(nextUploadFile);
          return nextUploadFile;
        }
        return file;
      });
      if (
        uploadCountRef.current === nextFiles.length &&
        nextFiles.every((file) => ["success", "error"].includes(file.status))
      ) {
        onCompelete?.(nextFiles);
        return [];
      }
      return nextFiles;
    });
  };

  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    uploadCountRef.current = files.length;
    uploadFile(files);
    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };

  const uploadFile = (files: FileList) => {
    const postFiles = Array.from(files);
    for (const file of postFiles) {
      if (!beforeUpload) {
        post(file);
      } else {
        const result = beforeUpload(file);
        if (result instanceof Promise) {
          result.then((processedFile) => {
            post(processedFile);
          });
        } else {
          if (result) {
            post(file);
          }
        }
      }
    }
  };

  const post = (file: File) => {
    const _file: UploadFile = {
      uid: uuidv4(),
      status: "ready",
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    };
    setFiles((prevFiles) => {
      const nextFiles = [...prevFiles, _file];
      if (uploadCountRef.current === nextFiles.length) {
        onFileChange?.(nextFiles);
      }
      return nextFiles;
    });
    const formData = new FormData();
    formData.append(name as string, file);

    for (const [key, val] of Object.entries(data || {})) {
      formData.append(key, val);
    }

    axios
      .post(action, formData, {
        headers: {
          ...headers,
          "Content-Type": "mutipart/form-data",
        },
        onUploadProgress: (e) => {
          let percentage = Math.round((e.loaded / e.total) * 100) || 0;
          updateFiles(
            _file,
            {
              percent: percentage,
              status: "uploading",
            },
            (nextFile) => {
              if (percentage < 100) {
                onProgress?.(percentage, nextFile);
              }
            }
          );
        },
        withCredentials,
      })
      .then((res) => {
        updateFiles(
          _file,
          {
            status: "success",
            response: res.data,
          },
          (nextFile) => {
            onSuccess?.(res.data, nextFile);
            onChange?.(nextFile);
          }
        );
      })
      .catch((err) => {
        updateFiles(
          _file,
          {
            status: "error",
            error: err,
          },
          (nextFile) => {
            onError?.(err, nextFile);
            onChange?.(nextFile);
          }
        );
      });
  };

  return (
    <div>
      <div onClick={handleClick}>
        {children}
        <input
          style={{ display: "none" }}
          type="file"
          ref={fileInput}
          onChange={handleFileChange}
          accept={accept}
          multiple={multiple}
        />
      </div>
    </div>
  );
};

Upload.defaultProps = {
  withCredentials: false,
  name: "file",
};

export default Upload;
