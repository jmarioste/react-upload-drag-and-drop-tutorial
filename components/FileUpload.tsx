"use client";
import React, { useRef, useState } from "react";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import axios from "axios";
const FileUpload = () => {
  const [fileList, setFileList] = useState<File[] | null>(null);
  const [shouldHighlight, setShouldHighlight] = useState(false);

  const preventDefaultHandler = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleUpload = async () => {
    // const UPLOAD_URL = "YOUR URL HERE";
    const UPLOAD_URL = "/api/upload";
    const data = new FormData();
    for (let file of fileList!) {
      data.append(file.name, file);
    }
    await axios.post(UPLOAD_URL, data);
  };
  return (
    <div
      className={classNames({
        "w-full h-96": true,
        "p-4 grid place-content-center cursor-pointer": true,
        "text-violet-500 rounded-lg": true,
        "border-4 border-dashed ": true,
        "transition-colors": true,
        "border-violet-500 bg-violet-100": shouldHighlight,
        "border-violet-100 bg-violet-50": !shouldHighlight,
      })}
      onDragOver={(e) => {
        preventDefaultHandler(e);
        setShouldHighlight(true);
      }}
      onDragEnter={(e) => {
        preventDefaultHandler(e);
        setShouldHighlight(true);
      }}
      onDragLeave={(e) => {
        preventDefaultHandler(e);
        setShouldHighlight(false);
      }}
      onDrop={(e) => {
        preventDefaultHandler(e);
        const files = Array.from(e.dataTransfer.files);
        setFileList(files);
        setShouldHighlight(false);
      }}
    >
      <div className="flex flex-col items-center">
        {!fileList ? (
          <>
            <CloudArrowUpIcon className="w-10 h-10" />
            <span>
              <span>Choose a File</span> or drag it here
            </span>
          </>
        ) : (
          <>
            <p>Files to Upload</p>
            {fileList.map((file, i) => {
              return <span key={i}>{file.name}</span>;
            })}
            <div className="flex gap-2 mt-2">
              <button
                className="bg-violet-500 text-violet-50 px-2 py-1 rounded-md"
                onClick={() => {
                  handleUpload();
                }}
              >
                Upload
              </button>
              <button
                className="border border-violet-500 px-2 py-1 rounded-md"
                onClick={() => {
                  setFileList(null);
                }}
              >
                Clear
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
