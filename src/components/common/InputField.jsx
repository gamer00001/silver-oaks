import { ErrorMessage } from "formik";
import React, { useState, useEffect } from "react";

const InputField = ({
  name,
  type,
  icon,
  error,
  placeholder = "Search...",
  onChange,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onChange(searchQuery);
    }, 300); // Adjust the debounce delay as needed (in milliseconds)

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, onChange]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <div className="relative">
        {icon && (
          <img
            src={icon}
            alt="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 h-10 w-10 text-gray-400"
          />
        )}

        {type === "textarea" ? (
          <textarea
            name={name}
            type={"text"}
            placeholder={placeholder}
            value={searchQuery}
            onChange={handleSearchChange}
            rows={5} // Number of visible text lines
            cols={30}
            className={`bg-[#FAFAFA] text-[#7A7A7A] text-3xl p-8 ${
              icon ? "pl-20" : "pl-8"
            } rounded-xl w-full focus:outline-none font-semibold placeholder-[#7A7A7A]`}
          />
        ) : (
          <input
            name={name}
            type={type}
            placeholder={placeholder}
            value={searchQuery}
            onChange={handleSearchChange}
            className={`bg-[#FAFAFA] text-[#7A7A7A] text-3xl p-8 ${
              icon ? "pl-20" : "pl-8"
            } rounded-xl w-full focus:outline-none font-semibold placeholder-[#7A7A7A]`}
          />
        )}
        {error && <div className="text-red-600 text-left text-xl">{error}</div>}
      </div>
    </>
  );
};

export default InputField;
