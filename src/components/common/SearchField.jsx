import React, { useState, useEffect } from "react";

const SearchField = ({ onSearch }) => {
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 30 30"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 h-12 w-12 text-gray-400"
        >
          <path
            fill="currentColor"
            d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="bg-[#FAFAFA] text-[#7A7A7A] text-3xl p-8 pl-14 rounded-xl focus:outline-none font-bold"
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

export default SearchField;
