import React, { useEffect, useRef, useState } from "react";

const Dropdown = ({
  icon,
  error,
  value,
  placeholder,
  showLabel = false,
  options = [],
  onChange = () => {},
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useRef(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange(option);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    setSelectedOption(value);
  }, [value]);

  return (
    <div className="relative inline-block w-full" ref={dropdownRef}>
      {showLabel && (
        <div className="text-[#7a7a7a] text-2xl font-semibold mb-4">
          {placeholder}
        </div>
      )}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-[#f4f4f4] text-[#7A7A7A] w-full font-semibold rounded-xl text-3xl inline-flex items-center p-6 ${
          icon ? "px-20" : ""
        }`}
      >
        <span>{selectedOption || placeholder || "Select an option"}</span>

        {icon && (
          <img
            src={icon}
            alt="icon"
            className="fill-current h-8 w-8 ml-4 absolute left-0"
          />
        )}

        <svg
          className="fill-current h-8 w-8 ml-8 absolute right-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M9.293 13.707a1 1 0 0 0 1.414 0l5-5a1 1 0 1 0-1.414-1.414L10 11.586l-4.293-4.293a1 1 0 1 0-1.414 1.414l5 5z"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-2 bg-white shadow-md rounded-xl w-full max-h-60 overflow-auto scrollbar">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => handleOptionClick(option)}
              className="py-4 px-6 text-2xl cursor-pointer hover:bg-gray-100"
            >
              {option}
            </div>
          ))}
        </div>
      )}
      {error && (
        <div className="text-red-600 text-left text-xl py-4">{error}</div>
      )}
    </div>
  );
};

export default Dropdown;
