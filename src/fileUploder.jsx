import React, { useState } from "react";

function FileUploader() {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    // console.log("aaaaaaaa", e.target.value);
    // const file = e.target.files;
    // setFiles((prevFiles) => [...prevFiles, ...file]);

    const selectedFiles = Array.from(e.target.files);
    // console.log("selectedFiles", selectedFiles);
    const newFiles = selectedFiles.filter(
      (file) => !files.find((f) => f.name === file.name)
    );
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleFileDelete = (fileName) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  const openFilePreview = (file) => {
    window.open(URL.createObjectURL(file), "_blank");
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      {files.length < 5 && (
        <input
          type="file"
          multiple
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
        />
      )}
      {/* bg-slate-400 p-4 min-h-[200px] w-[80%] md:w-[30%] */}
      <ul className="mt-5  flex flex-col items-center justify-center gap-y-3">
        {files.map((file) => (
          <li key={file.name}>
            <span
              className="cursor-pointer underline"
              onClick={() => openFilePreview(file)}
            >
              {file.name.length > 15
                ? `${file.name.slice(0, 8)}...${file.name.slice(-5)}`
                : file.name}
            </span>
            <button
              className="cursor-pointer ml-5"
              onClick={() => handleFileDelete(file.name)}
            >
              ✖️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FileUploader;
