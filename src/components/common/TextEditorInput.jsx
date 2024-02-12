import { CONSTANTS } from "@/constants";
import styled from "@emotion/styled";
import { useCallback, useState } from "react";
import { useMemo, useRef } from "react";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { Loader } from ".";

const ReactQuillStyled = styled(ReactQuill)`
  display: flex;
  flex-direction: column-reverse;
  height: 100%;

  & > .ql-container.ql-snow {
    border: none;
    overflow: visible;
    min-height: 13.37rem;

    & > .ql-editor {
      padding: 0;
      overflow: visible;

      font-family: "Montserrat", "system-ui", "-apple-system",
        "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial",
        "Noto Sans", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji",
        "Segoe UI Symbol", "Noto Color Emoji";

      &.ql-blank::before {
        right: 0;
        left: 0;
      }

      & img {
        width: 80%;
        display: block;
        margin: auto;
      }
    }
  }

  & > .ql-toolbar.ql-snow {
    border: none;

    & .ql-picker {
      background-color: #495057;
      border-radius: 0.2rem;
      width: 105px;
      & .ql-picker-label {
        transition: opacity 0.3s;
        &:hover {
          opacity: 0.7;
        }
        &::before {
          color: #f5f5f5;
          font-family: "Poppins", "system-ui", "-apple-system",
            "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue",
            "Arial", "Noto Sans", "sans-serif", "Apple Color Emoji",
            "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
        }

        & .ql-stroke {
          stroke: #f5f5f5;
        }
      }

      & .ql-picker-options {
        border: none;
        z-index: 2;
        background: #495057;

        & > span {
          color: #f5f5f5;
          transition: opacity 0.3s;
          font-family: "Poppins", "system-ui", "-apple-system",
            "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue",
            "Arial", "Noto Sans", "sans-serif", "Apple Color Emoji",
            "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
          &:hover {
            opacity: 0.7;
          }
        }
      }
    }

    & button {
      transition: opacity 0.3s;
      border-radius: 0.2rem;
      &:hover {
        opacity: 0.7;
      }
      & .ql-stroke {
        stroke: #395556;
      }
      & .ql-fill {
        fill: #395556;
      }

      &.ql-active {
        background-color: #395556;
        & .ql-stroke {
          stroke: #f1f1f1;
        }
        & .ql-fill {
          fill: #f1f1f1;
        }
      }
    }
  }
`;

const TextEditorInput = ({
  value,
  error,
  onChange,
  label,
  id,
  name,
  placeholder,
  ...rest
}) => {
  const reactQuillRef = useRef(null);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const uploadImage = useCallback(
    async (file) =>
      new Promise((resolve) => {
        setIsLoading(true);
      }),
    [dispatch]
  );

  const onImageChange = useCallback(
    async (e) => {
      const file = e.target.files[0];
      if (file) {
        if (new Set(["image/png", "image/jpg", "image/jpeg"]).has(file.type)) {
          const url = await uploadImage(file);
          if (!url) {
            toast.error("Image not uploaded to server. Please try again!");
          }
          const quill = reactQuillRef.current.getEditor();
          const range = quill.getSelection();
          const cursorPosition = range.index;
          quill.insertEmbed(cursorPosition, "image", url);
          quill.setSelection(cursorPosition + 1);
        } else {
          toast.error("Invalid file type: " + file.type);
        }
      } else {
        toast.error("Something went wrong. Please try again!");
      }
    },
    [uploadImage]
  );

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [2, 3, 4, 5, 6, false] }],
          [{ size: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
        ],
        handlers: {
          image: () => {
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "png, jpeg, jpg");
            input.onchange = onImageChange;
            input.click();
          },
        },
      },
    };
  }, [onImageChange]);

  return (
    <>
      {isLoading && <Loader type="screen-bg" />}

      <div className="grid gap-[.5rem] items-start">
        {label && (
          <label
            htmlFor={id || name || label || "alsjf32jf2"}
            className="body-medium text-custom-dark-gren"
          >
            {label}
          </label>
        )}

        <div className="p-[1.8rem] relative bg-[#FAFAFA] border border-[#00000014] rounded-[1.54rem] shadow-sm">
          <ReactQuillStyled
            ref={reactQuillRef}
            value={value}
            onChange={onChange}
            modules={modules}
            id={id || name || label || "alsjf32jf2"}
            name={name}
            placeholder={placeholder || "type here..."}
            {...rest}
          />
        </div>

        {error && <p className="text-red-500 caption">{error}</p>}
      </div>
    </>
  );
};

export default TextEditorInput;
