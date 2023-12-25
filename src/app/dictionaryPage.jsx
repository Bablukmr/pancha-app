import React from "react";
import SearchInput from "../componets/searchInput";

function DictionaryPage() {
  return (
    <div>
      <div className="w-[90%] ml-[5%] my-3 rounded-lg bg-[#E8F0FA] py-4 flex flex-col items-center gap-y-6">
        <div className="w-[90%]">
          <SearchInput placeholder="Search by word" />
        </div>
        <div className="flex gap-4 flex-col items-center justify-center">
          <div className="flex gap-x-2 text-lg font-semibold text-[#1961C5]">
            <p className="px-2 text-white rounded-full cursor-pointer bg-[#1961C5]">A</p>
            <p className="px-2 text-white rounded-full cursor-pointer bg-[#1961C5]">B</p>
            <p className="px-2 text-white rounded-full cursor-pointer bg-[#1961C5]">C</p>
            <p className="px-2 text-white rounded-full cursor-pointer bg-[#1961C5]">D</p>
            <p className="px-2 text-white rounded-full cursor-pointer bg-[#1961C5]">E</p>
            <p className="px-2 text-white rounded-full cursor-pointer bg-[#1961C5]">F</p>
            <p className="px-2 text-white rounded-full cursor-pointer bg-[#1961C5]">G</p>
            <p className="px-2 text-white rounded-full cursor-pointer bg-[#1961C5]">H</p>
            <p className="px-2 text-white rounded-full cursor-pointer bg-[#1961C5]">I</p>
            <p className="px-2 text-white rounded-full cursor-pointer bg-[#1961C5]">J</p>
          </div>
          <div className="flex gap-x-2 text-lg font-semibold text-[#1961C5]">
            <p className="px-2 text-white rounded-full cursor-pointer bg-[#1961C5]">K</p>
            <p className="px-2 text-white rounded-full cursor-pointer bg-[#1961C5]">L</p>
            <p className="px-2 text-white rounded-full cursor-pointer bg-[#1961C5]">M</p>
            <p className="px-2 text-white rounded-full cursor-pointer bg-[#1961C5]">N</p>
            <p className="px-2 text-white rounded-full cursor-pointer bg-[#1961C5]">O</p>
            <p className="px-2 text-white rounded-full cursor-pointer bg-[#1961C5]">P</p>
            <p className="px-2 text-white rounded-full cursor-pointer bg-[#1961C5]">Q</p>
            <p className="px-2 text-white rounded-full cursor-pointer bg-[#1961C5]">R</p>
            <p className="px-2 text-white rounded-full cursor-pointer bg-[#1961C5]">S</p>
          </div>
          <div className="flex gap-x-2 text-lg font-semibold text-[#1961C5]">
            <p className="px-2 text-white rounded-full cursor-pointer bg-[#1961C5]">T</p>
            <p className="px-2 text-white rounded-full cursor-pointer bg-[#1961C5]">U</p>
            <p className="px-2 text-white rounded-full cursor-pointer bg-[#1961C5]">V</p>
            <p className="px-2 text-white rounded-full cursor-pointer bg-[#1961C5]">W</p>
            <p className="px-2 text-white rounded-full cursor-pointer bg-[#1961C5]">X</p>
            <p className="px-2 text-white rounded-full cursor-pointer bg-[#1961C5]">Y</p>
            <p className="px-2 text-white rounded-full cursor-pointer bg-[#1961C5]">Z</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DictionaryPage;
