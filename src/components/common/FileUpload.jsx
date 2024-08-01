import { isEmpty } from "lodash";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const FileUpload = ({ onChange, touched, error, value }) => {
  const [state, setState] = useState({
    file: null,
  });

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files

    onChange(acceptedFiles);

    setState((prev) => ({
      ...prev,
      file: acceptedFiles,
    }));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <>
      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #007bff",
          borderRadius: "10px",
          padding: "20px",
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>

      {state.file && (
        <p className="mt-5 text-xl font-semibold">
          {state?.file[0]?.name ?? ""}
        </p>
      )}
      {!isEmpty(value) && !state.file && (
        <p
          className="mt-5 text-xl font-semibold cursor-pointer"
          onClick={() => window.open(value)}
        >
          {value ? value : ""}
        </p>
      )}
      {error && (
        <div className="text-red-600 text-left text-xl py-4">{error}</div>
      )}
    </>
  );
};

export default FileUpload;
