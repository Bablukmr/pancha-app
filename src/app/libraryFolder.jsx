import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoMdMore } from "react-icons/io";
import CustomDropdown from "../componets/dropdown";

function LibraryFolder() {
  const { name } = useParams();
  console.log(name);
  const [loading, setLoading] = useState(false);
  const [selectedDropdown, setSelectedDropdown] = useState("");
  const [folderName, setFolderName] = useState(name);
  const data = [
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
  const dropval = [
    { id: 1, name: "ihgi" },
    { id: 2, name: "qqew" },
    { id: 3, name: "ew" },
    { id: 4, name: "we" },
  ];
  const handleChangeDropdown = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedDropdown(value);
    setFolderName(value);

    // console.log(value, "ssss");
  };
  return (
    <div>
      <div className="w-full px-[5%] flex items-center justify-between fixed top-0 h-[80px] bg-white">
        <Link to="/library" className="flex items-center gap-x-2">
          <img src="/Back.png" alt="/" className="h-[30px]" />
          <h1 className="text-lg font-semibold">{folderName}</h1>
        </Link>

        <Link to="/setting" className="md:hidden">
          <img src="/setting.png" alt="/" className="h-[40px]" />
        </Link>
        <div className="md:w-[30%] lg:w-[25%] xl:w-[20%] hidden md:block ">
          <CustomDropdown
            data={dropval}
            loading={loading}
            handleChange={handleChangeDropdown}
            selected={selectedDropdown}
            placeholder="Choose different folder"
            toShow="name"
          />
        </div>
      </div>

      <div className="flex flex-col bg-[#E8F0FA] p-3 md:p-5 xl:p-7 rounded-md gap-y-3 my-4 mx-[5%]">
        <div className="flex items-center justify-between my-2">
          <h1 className="text-lg font-semibold">{folderName}</h1>
          <div className="flex items-center">
            <button className="px-4 py-2 bg-[#1961C5] rounded-md">
              <p className="p-0 m-0 text-base text-white">Flash Card Mode</p>
            </button>
            <div className="text-2xl font-semibold p-2 bg-grarounded-full">
              <IoMdMore />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 items-center justify-center w-full md:grid-cols-7 lg:grid-cols-10 gap-3">
          {data.map((a) => (
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
  );
}

export default LibraryFolder;
