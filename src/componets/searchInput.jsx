import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";

function SearchInput({ onChange, placeholder }) {
  const [isInputFocused, setIsInputFocused] = useState(false);


  
  
  return (
    <div className={`w-full flex flex-col gap-y-2`}>
      <div
        className={`border bg-white rounded-md border-solid flex items-center px-4 py-1 ${
          isInputFocused ? "border-blue-500" : "border-gray-300"
        }`}
      >
        <div className="text-xl font-extrabold text-blue-700">
          <IoSearch />
        </div>

        <input
          onChange={onChange}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          type="text"
          className="text-lg font-medium h-[45px] border-none placeholder-black w-full bg-white py-4 px-2 focus:outline-none"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

export default SearchInput;
