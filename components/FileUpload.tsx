import React, { useRef, useState } from "react";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
const FileUpload = () => {
  const [fileList, setFileList] = useState<FileList | null>(null);
  const [shouldHighlight, setShouldHighlight] = useState(false);

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
        e.preventDefault();
        e.stopPropagation();
        setShouldHighlight(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setShouldHighlight(false);
      }}
      onDragEnter={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setShouldHighlight(true);
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const files = e.dataTransfer.files;
        console.log(files);
        setFileList(files);
        setShouldHighlight(false);
      }}
    >
      <div className="flex flex-col items-center">
        <CloudArrowUpIcon className="w-10 h-10" />
        <span>
          <span>Choose a File</span> or drag it here
        </span>
      </div>
    </div>
  );
};

export default FileUpload;
