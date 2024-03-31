import {
  Calendar as CalendarIcon,
  DownArrow,
  Minus,
  Plus,
  SearchOutline,
} from "@/assets/Icons";
import { MdClose } from "react-icons/md";
import { Switch } from "@mui/material";
import { useCallback, useMemo, useRef, useState } from "react";
import { formatPhoneNumberIntl } from "react-phone-number-input";
import { default as PhoneInputLib } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import MyMenu from "./MyMenu";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Calendar } from "react-date-range";
import toast from "react-hot-toast";
import { CiEdit, CiTrash } from "react-icons/ci";
import TextEditorInput from "./TextEditorInput";

const SimpleInput = ({
  label = "",
  type = "text",
  error = "",
  className = "",
  inputClassName = "",
  children,
  ...rest
}) => {
  return (
    <label className={`w-full grid gap-[.5rem] ${className}`}>
      {label && (
        <span className="body-medium text-custom-dark-gren">{label}</span>
      )}

      <div className="w-full grid gap-[.5rem]">
        {type === "select" ? (
          <div className="relative">
            <select
              className={`bg-transparent w-full outline-none pl-[1.8rem] pr-[6rem] py-[1.8rem] text-custom-dark-gren text-[1.3rem] leading-[120%] font-medium border border-custom-golden rounded-[.8rem] focus:ring-1 appearance-none disabled:bg-black/10 disabled:cursor-not-allowed ${inputClassName}`}
              {...rest}
            >
              {children}
            </select>
            <span className="absolute z-[-1] top-[50%] translate-y-[-50%] right-[1.8rem] text-[2.4rem] text-custom-dark-gren/50">
              <DownArrow />
            </span>
          </div>
        ) : type === "textarea" ? (
          <textarea
            className={`outline-none px-[1.8rem] py-[1.8rem] text-custom-dark-gren text-[1.3rem] leading-[120%] font-medium border border-custom-golden rounded-[.8rem] focus:ring-1 disabled:bg-black/10 disabled:cursor-not-allowed h-[17rem] resize-none ${inputClassName}`}
            {...rest}
          >
            {children}
          </textarea>
        ) : (
          <input
            className={`outline-none w-full px-[1.8rem] py-[1.8rem] text-custom-dark-gren text-[1.3rem] leading-[120%] font-medium border border-custom-golden rounded-[.8rem] focus:ring-1 disabled:bg-black/10 disabled:cursor-not-allowed ${inputClassName}`}
            type={type}
            {...rest}
          />
        )}
        {error && <p className="text-red-500 caption">{error}</p>}
      </div>
    </label>
  );
};

const NumberOnlyInput = ({ onChange, ...rest }) => {
  const handleChange = useCallback(
    (e) => {
      for (const char of e.target.value) {
        if (char.charCodeAt(0) < 48 || char.charCodeAt(0) > 57) {
          return;
        }
      }
      onChange && onChange(e);
    },
    [onChange]
  );

  return <SimpleInput onChange={handleChange} {...rest} />;
};

const PhoneInput = ({
  label = "",
  error = "",
  className = "",
  inputClassName = "",
  value,
  disabled = false,
  ...rest
}) => {
  return (
    <>
      <label className={`w-full grid gap-[.5rem] ${className}`}>
        {label && (
          <span className="body-medium text-custom-dark-gren">{label}</span>
        )}

        <div className="w-full grid gap-[.5rem]">
          <PhoneInputLib
            {...rest}
            disabled={disabled}
            className={`${
              disabled ? `bg-black/10 cursor-not-allowed ` : ""
            } ${inputClassName}`}
            country="PK"
            international
            value={formatPhoneNumberIntl(value)}
          />
          {error && <p className="text-red-500 caption">{error}</p>}
        </div>
      </label>
    </>
  );
};

const RadioInput = ({
  label = "",
  className = "",
  inputClassName = "",
  disabled,
  ...rest
}) => {
  return (
    <label
      className={`inline-flex gap-[1.2rem] items-center justify-start ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      } ${className}`}
    >
      <input
        type="radio"
        className={`w-[1.3rem] h-[1.3rem] ${inputClassName}`}
        disabled={disabled}
        {...rest}
      />
      {label && <span className="body-regular text-black">{label}</span>}
    </label>
  );
};

const SwitchInput = ({
  label = "",
  className = "",
  inputClassName = "",
  disabled = false,
  ...rest
}) => {
  return (
    <label
      className={`inline-flex gap-[1.2rem] items-center justify-start ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      } ${className}`}
    >
      <Switch className={`${inputClassName}`} disabled={disabled} {...rest} />
      <span className="body-regular text-black">{label}</span>
    </label>
  );
};

const NumberWithPriceInput = ({
  className = "",
  inputClassName = "",
  onChange,
  price = "",
  label = "",
  id = "",
  onPlus,
  onMinus,
  error,
  disabled,
  ...rest
}) => {
  const handleChange = useCallback(
    (e) => {
      for (const char of e.target.value) {
        if (char.charCodeAt(0) < 48 || char.charCodeAt(0) > 57) {
          return;
        }
      }
      onChange && onChange(e);
    },
    [onChange]
  );

  return (
    <label
      className={`grid w-full grid-cols-[1fr_1fr_1fr] xs:grid-cols-[12rem_2fr_auto_2fr] items-center gap-[1.6rem] ${className}`}
      htmlFor={id}
    >
      <span className="col-span-3 xs:col-span-1 body-medium text-custom-dark-gren">
        {label}
      </span>
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-[.8rem] px-[2.4rem] py-[1.2rem] border border-custom-golden rounded-[.8rem]">
        <button
          className="text-[2.4rem] text-custom-dark-gren enabled:hover:opacity-70 transition-opacity duration-300 disabled:cursor-not-allowed"
          type="button"
          onClick={onMinus}
          disabled={disabled}
        >
          <Minus />
        </button>
        <input
          className={`button text-custom-dark-gren w-full outline-none border-none bg-transparent text-center disabled:cursor-not-allowed ${inputClassName}`}
          type="text"
          id={id}
          {...rest}
          onChange={handleChange}
          disabled={disabled}
        />
        <button
          className="text-[1.6rem] text-custom-dark-gren enabled:hover:opacity-70 transition-opacity duration-300 disabled:cursor-not-allowed"
          type="button"
          onClick={onPlus}
          disabled={disabled}
        >
          <Plus />
        </button>
      </div>
      <span className="body-medium text-custom-dark-gren">Charges</span>
      <span className="border border-custom-golden rounded-[.8rem] py-[1.7rem] px-[2.4rem] text-custom-dark-gren text-[1.2rem] leading-[120%]">
        {price}
      </span>
      {error && (
        <p className="text-red-500 caption col-span-3 xs:col-span-4">{error}</p>
      )}
    </label>
  );
};

const CheckboxInput = ({ type = "checkbox", className = "", ...rest }) => (
  <RadioInput className={`${className}`} type={type} {...rest} />
);

const SearchInput = ({ className = "", inputClassName = "", ...rest }) => {
  return (
    <label
      className={`grid grid-cols-1 w-full relative focus-within:ring-1 ${className}`}
    >
      <span className="absolute top-[50%] translate-y-[-50%] left-[1.6rem] text-[2.4rem] text-custom-dark-gren">
        <SearchOutline />
      </span>
      <input
        type="text"
        {...rest}
        className={`pl-[5.6rem] pr-[1.6rem] w-full py-[1.2rem] bg-white outline-none body-regular text-black rounded-[1.4rem] border-2 border-custom-red border-solid ${inputClassName}`}
      />
    </label>
  );
};

const DateRange = ({ className = "" }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  return (
    <>
      <label
        className={`grid grid-cols-[auto_auto_auto] gap-[1.6rem] items-center w-full bg-white px-[1.6rem] py-[.95rem] rounded-[.4rem] cursor-pointer ${className}`}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <span className="grid items-center justify-center text-custom-dark-gren text-[2rem]">
          <CalendarIcon />
        </span>
        <span className="caption text-custom-dark-gren">
          24/04/2023 to 28/04/2023
        </span>
        <span className="grid items-center justify-center text-custom-dark-gren text-[2.4rem]">
          <DownArrow />
        </span>
      </label>

      <MyMenu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        className=""
      >
        <li>
          <Calendar date={new Date()} />
        </li>
      </MyMenu>
    </>
  );
};

const TagInput = ({
  label = "",
  type = "text",
  error = "",
  className = "",
  inputClassName = "",
  value = [],
  onChange,
  disabled = false,
  id = "",
  ...rest
}) => {
  const [inputValue, setInputValue] = useState("");
  const onKeyDown = useCallback(
    (e) => {
      if (e.code === "Enter" && e.target.value) {
        e?.preventDefault();
        onChange &&
          onChange(
            typeof value === "string"
              ? [value, e.target.value]
              : [...value, e.target.value]
          );
        setInputValue("");
      }
    },
    [onChange, value]
  );

  const handleRemove = useCallback(
    (index) => {
      onChange && onChange(value.filter((_, i) => i !== index));
    },
    [onChange, value]
  );
  return (
    <label
      htmlFor={id || `tag-unique-${label}`}
      className={`w-full grid gap-[.5rem] ${className}`}
    >
      {label && (
        <span className="body-medium text-custom-dark-gren">{label}</span>
      )}

      <div className="w-full grid gap-[.5rem]">
        <div
          className={`overflow-auto hide-scrollbar flex gap-[1rem] items-center justify-start border px-[1.8rem] border-custom-golden rounded-[.8rem] focus-within:ring-1 ${
            disabled ? "bg-black/10 cursor-not-allowed" : ""
          }`}
        >
          {value.map((v, i) => (
            <div
              key={i}
              className="flex gap-[1.5rem] items-center p-[1rem] bg-custom-dark-gren rounded-[.4rem]"
            >
              <span className="text-white text-[1.3rem] leading-[120%] font-medium capitalize whitespace-nowrap">
                {v}
              </span>
              <button
                type="button"
                className="text-custom-offwhite text-[1.6rem]"
                onClick={() => handleRemove(i)}
              >
                <MdClose />
              </button>
            </div>
          ))}
          <input
            {...rest}
            disabled={disabled}
            type={type}
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            className={`flex-1 outline-none bg-transparent border-none py-[1.8rem]  text-custom-dark-gren text-[1.3rem] leading-[120%] font-medium ${inputClassName}`}
            id={id || `tag-unique-${label}`}
            onKeyDown={onKeyDown}
          />
        </div>
        {error && <p className="text-red-500 caption">{error}</p>}
      </div>
    </label>
  );
};

const FileInput = ({
  label = "",
  className = "",
  inputClassName = "",
  value,
  onChange,
  id = "",
  error,
  accept = "",
  selectButtonText = "Select Image",
  disabled,
  ...rest
}) => {
  const inputRef = useRef(null);
  const handleChange = (e) => {
    const file = e.target.files[0];
    const allowedExtensions = accept.replace(/\s/g, "").split(",");
    if (!file) {
      return;
    } else if (allowedExtensions.find((v) => file?.name?.endsWith(v))) {
      onChange && onChange(file);
    } else {
      toast.error("This file format is not supported!");
      onChange && onChange(null);
    }
  };
  return (
    <div className={`grid gap-[.5rem] ${className}`}>
      {label && (
        <span className="body-medium text-custom-dark-gren">{label}</span>
      )}

      <div className="grid gap-y-[.5rem] w-full grid-cols-1">
        <div className="w-full py-[3rem] px-[1.8rem] border border-dashed border-[#AEAEAE] rounded-[.4rem] grid-center">
          <input
            onChange={handleChange}
            type="file"
            id={id || "ksldjvl32"}
            className={`hidden ${inputClassName}`}
            accept={accept}
            {...rest}
            ref={inputRef}
            disabled={disabled}
          />

          {!value && (
            <label
              htmlFor={id || "ksldjvl32"}
              role="button"
              className="bg-[#BFD7EA] rounded-[.4rem] py-[1rem] px-[2.5rem] text-black text-[1.7rem] opacity"
            >
              {selectButtonText}
            </label>
          )}

          {value && (
            <div className="relative max-w-[50rem] w-full">
              <img
                src={
                  typeof value === "string" ? value : URL.createObjectURL(value)
                }
                alt={label}
                className="rounded-[.4rem] max-w-[50rem] w-full max-h-[50rem] object-cover"
              />

              {!disabled && (
                <div className="absolute top-[1.3rem] right-[1.5rem] grid grid-cols-[auto_auto] items-center justify-end gap-[.5rem]">
                  <label
                    className="bg-white/50 text-black text-[2rem] p-[.4rem] grid-center rounded-[.4rem] opacity cursor-pointer"
                    htmlFor={id || "ksldjvl32"}
                  >
                    <CiEdit />
                  </label>
                  <button
                    className="bg-white/50 text-black text-[2rem] p-[.4rem] grid-center rounded-[.4rem] opacity"
                    type="button"
                    onClick={() => {
                      inputRef.current.value = null;
                      onChange(null);
                    }}
                  >
                    <CiTrash />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {error && <p className="text-red-500 caption">{error}</p>}
      </div>
    </div>
  );
};

const CheckBoxesGroup = ({
  label,
  options,
  onChange,
  name,
  value,
  className = "",
  disabled,
}) => {
  const handleChange = (e, option) => {
    e.target.name = name;
    e.target.value = option;
    onChange(e);
  };
  return (
    <div className={`grid gap-[3.2rem] ${className}`}>
      <label htmlFor={label} className="h5-bold text-custom-dark-gren">
        {label}
      </label>
      <div className="border border-custom-golden outline-none px-[3.2rem] py-[1.8rem] rounded-[.8rem] grid gap-[1.6rem] items-start">
        {options?.map((option, index) => (
          <CheckboxInput
            label={option}
            key={index}
            onChange={(e) => handleChange(e, option)}
            checked={value.includes(option)}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
};

const MyInput = ({ type = "text", ...rest }) => {
  const Component = useMemo(() => {
    switch (type) {
      case "file":
        return FileInput;
      case "radio":
        return RadioInput;
      case "text-editor":
        return TextEditorInput;
      case "checkbox":
        return CheckboxInput;
      case "checkbox-group":
        return CheckBoxesGroup;
      case "number-only":
        return NumberOnlyInput;
      case "phone":
        return PhoneInput;
      case "switch":
        return SwitchInput;
      case "numberWithPrice":
        return NumberWithPriceInput;
      case "search-input":
        return SearchInput;
      case "date-range":
        return DateRange;
      case "tag":
        return TagInput;
      default:
        return SimpleInput;
    }
  }, [type]);
  return <Component type={type} {...rest} />;
};
export default MyInput;
