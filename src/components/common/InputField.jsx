import { ErrorMessage } from "formik";
import React, { useState, useEffect } from "react";

const InputField = ({
  name,
  type,
  icon,
  error,
  value,
  touched,
  disabled = false,
  label = "",
  showPreviousDates = false,
  showNextDates = false,
  showLabel = false,
  placeholder = "Search...",
  onChange = () => {},
}) => {
  const [searchQuery, setSearchQuery] = useState(value ?? "");

  const getMaxDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getMinDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onChange(searchQuery);
    }, 500); // Adjust the debounce delay as needed (in milliseconds)

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    setSearchQuery(value);
  }, [value]);

  return (
    <>
      {showLabel && (
        <div className="text-[#7a7a7a] text-2xl font-semibold mb-4">
          {placeholder}
        </div>
      )}
      <div className="relative">
        {icon && (
          <img
            src={icon}
            alt="icon"
            className="absolute left-4 top-7 h-10 w-10 text-gray-400"
          />
        )}
        {/* top-1/2 transform -translate-y-1/2 */}
        {type === "textarea" ? (
          <textarea
            name={name}
            type={"text"}
            placeholder={placeholder}
            value={searchQuery}
            onChange={handleSearchChange}
            rows={5} // Number of visible text lines
            cols={30}
            className={`bg-[#f4f4f4] text-[#7A7A7A] text-3xl p-8 ${
              icon ? "pl-20" : "pl-8"
            } rounded-xl w-full focus:outline-none font-semibold placeholder-[#7A7A7A]`}
          />
        ) : (
          <input
            name={name}
            type={type}
            disabled={disabled}
            value={searchQuery}
            placeholder={placeholder}
            onChange={handleSearchChange}
            max={showPreviousDates ? getMaxDate() : undefined}
            min={showNextDates ? getMinDate() : undefined}
            className={`bg-[#f4f4f4] text-[#7A7A7A] text-3xl p-8 ${
              icon ? "pl-20" : "pl-8"
            } rounded-xl w-full focus:outline-none font-semibold placeholder-[#7A7A7A]`}
          />
        )}
        {touched && error && (
          <div className="text-red-600 text-left text-xl py-4">{error}</div>
        )}
      </div>
    </>
  );
};

export default InputField;
