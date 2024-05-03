import React, { useState, useEffect } from "react";

const InputField = ({ type, icon, placeholder = "Search...", onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(searchQuery);
    }, 300); // Adjust the debounce delay as needed (in milliseconds)

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, onSearch]);

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

        <input
          type={type}
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleSearchChange}
          className="bg-[#FAFAFA] text-[#7A7A7A] text-3xl p-8 pl-20 rounded-xl w-full focus:outline-none font-semibold placeholder-[#7A7A7A]"
        />
      </div>
      {/* <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="px-4 py-2 bg-[#FAFAFA] text-[#7A7A7A] text-xl rounded-xl focus:outline-none focus:ring focus:ring-blue-500"
      /> */}
    </>
  );
};

export default InputField;
