import React from "react";
import SearchInput from "../componets/searchInput";
import { Link } from "react-router-dom";

function DictionaryPage() {
  const data1 = [
    { id: 1, name: "Apple", url: "/Apple.png" },
    { id: 2, name: "Apricot", url: "/Apple.png" },
    { id: 3, name: "Avocado", url: "/Apple.png" },
    { id: 4, name: "Almond", url: "/Apple.png" },
    { id: 5, name: "Artichoke", url: "/Apple.png" },
    { id: 6, name: "Asparagus", url: "/Apple.png" },
    { id: 7, name: "Aubergine", url: "/Apple.png" },
    { id: 8, name: "Apron", url: "/Apple.png" },
    { id: 9, name: "Arrowroot", url: "/Apple.png" },
    { id: 10, name: "Alfalfa", url: "/Apple.png" },
    { id: 11, name: "Anise", url: "/Apple.png" },
    { id: 12, name: "Acai", url: "/Apple.png" },
    { id: 13, name: "Albacore", url: "/Apple.png" },
    { id: 14, name: "Anchovy", url: "/Apple.png" },
    { id: 15, name: "Angelica", url: "/Apple.png" },
    { id: 16, name: "Amaranth", url: "/Apple.png" },
    { id: 17, name: "Albacore", url: "/Apple.png" },
    { id: 18, name: "Anchovy", url: "/Apple.png" },
    { id: 19, name: "Angelica", url: "/Apple.png" },
    { id: 20, name: "Amaranth", url: "/Apple.png" },
  ];

  const data2 = [
    { id: 21, name: "Banana", url: "/Apple.png" },
    { id: 22, name: "Blueberry", url: "/Apple.png" },
    { id: 23, name: "Blackberry", url: "/Apple.png" },
    { id: 24, name: "Broccoli", url: "/Apple.png" },
    { id: 25, name: "Beetroot", url: "/Apple.png" },
    { id: 26, name: "Bell Pepper", url: "/Apple.png" },
    { id: 27, name: "Butternut Squash", url: "/Apple.png" },
    { id: 28, name: "Bok Choy", url: "/Apple.png" },
    { id: 29, name: "Barley", url: "/Apple.png" },
    { id: 30, name: "Basil", url: "/Apple.png" },
    { id: 31, name: "Blue Cheese", url: "/Apple.png" },
    { id: 32, name: "Beef", url: "/Apple.png" },
    { id: 33, name: "Bison", url: "/Apple.png" },
    { id: 34, name: "Brie", url: "/Apple.png" },
    { id: 35, name: "Brussels Sprouts", url: "/Apple.png" },
    { id: 36, name: "Banana", url: "/Apple.png" },
    { id: 37, name: "Blueberry", url: "/Apple.png" },
    { id: 38, name: "Blackberry", url: "/Apple.png" },
    { id: 39, name: "Broccoli", url: "/Apple.png" },
    { id: 40, name: "Beetroot", url: "/Apple.png" },
  ];

  return (
    <div>
      <div className="w-[90%] ml-[5%] my-3 rounded-lg bg-[#E8F0FA] py-4 flex flex-col items-center gap-y-6">
        <div className="w-[90%]">
          <SearchInput placeholder="Search by word" />
        </div>
        <div className="flex gap-4 flex-col items-center justify-center">
          <div className="flex gap-x-2 text-lg font-semibold text-[#1961C5]">
            <p className="px-1  rounded-full cursor-pointer ">A</p>
            <p className="px-1  rounded-full cursor-pointer ">B</p>
            <p className="px-1  rounded-full cursor-pointer ">C</p>
            <p className="px-1  rounded-full cursor-pointer ">D</p>
            <p className="px-1  rounded-full cursor-pointer ">E</p>
            <p className="px-1  rounded-full cursor-pointer ">F</p>
            <p className="px-1  rounded-full cursor-pointer ">G</p>
            <p className="px-1  rounded-full cursor-pointer ">H</p>
            <p className="px-1  rounded-full cursor-pointer ">I</p>
            <p className="px-1  rounded-full cursor-pointer ">J</p>
          </div>
          <div className="flex gap-x-2 text-lg font-semibold text-[#1961C5]">
            <p className="px-1  rounded-full cursor-pointer ">K</p>
            <p className="px-1  rounded-full cursor-pointer ">L</p>
            <p className="px-1  rounded-full cursor-pointer ">M</p>
            <p className="px-1  rounded-full cursor-pointer ">N</p>
            <p className="px-1  rounded-full cursor-pointer ">O</p>
            <p className="px-1  rounded-full cursor-pointer ">P</p>
            <p className="px-1  rounded-full cursor-pointer ">Q</p>
            <p className="px-1  rounded-full cursor-pointer ">R</p>
            <p className="px-1  rounded-full cursor-pointer ">S</p>
          </div>
          <div className="flex gap-x-2 text-lg font-semibold text-[#1961C5]">
            <p className="px-1  rounded-full cursor-pointer ">T</p>
            <p className="px-1  rounded-full cursor-pointer ">U</p>
            <p className="px-1  rounded-full cursor-pointer ">V</p>
            <p className="px-1  rounded-full cursor-pointer ">W</p>
            <p className="px-1  rounded-full cursor-pointer ">X</p>
            <p className="px-1  rounded-full cursor-pointer ">Y</p>
            <p className="px-1  rounded-full cursor-pointer ">Z</p>
          </div>
        </div>
      </div>

      <div className="w-[90%] ml-[5%] flex flex-col gap-y-3 mb-[20px]">
        <div className="flex flex-col bg-[#E8F0FA] p-3 rounded-md gap-y-3">
          <p className="text-lg font-semibold text-[#1961C5]">A</p>
          <div className="grid grid-cols-4 items-center justify-center w-full md:grid-cols-7 lg:grid-cols-10 gap-3">
            {data1.map((a) => (
              <Link
              to={`/${a.name}/${a.id}`}
                key={a.id}
                className="flex flex-col items-center justify-center rounded-md bg-white gap-2 p-2"
              >
                <img src={a.url} alt="/" className="rounded-xl h-[20px]" />
                <p className="text-xs font-medium">{a.name}</p>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col bg-[#E8F0FA] p-3 rounded-md gap-y-3">
          <p className="text-lg font-semibold text-[#1961C5]">B</p>
          <div className="grid grid-cols-4 items-center justify-center w-full md:grid-cols-7 lg:grid-cols-10 gap-3">
            {data2.map((a) => (
              <Link
              to={`/${a.name}/${a.id}`}
                key={a.id}
                className="flex flex-col items-center justify-center rounded-md bg-white gap-2 p-2"
              >
                <img src={a.url} alt="/" className="rounded-xl h-[20px]" />
                <p className="text-xs font-medium">{a.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DictionaryPage;
