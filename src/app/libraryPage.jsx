import React, { useState } from "react";
import { IoMdMore } from "react-icons/io";
import ModelComponets from "../componets/modelComponets";
import CreateNewFolderModel from "../componets/createNewFolderModel";

function LibraryPage() {
  const [folder, setFolder] = useState(true);

  const data1 = [
    { id: "1", name: "animal", img: "/Image1.png" },
    { id: "2", name: "created 1", img: "/Image2.png" },
    { id: "3", name: "created 2", img: "/Image1.png" },
    { id: "4", name: "created 3", img: "/Image2.png" },
    { id: "5", name: "created 4", img: "/Image1.png" },
    { id: "6", name: "created 5", img: "/Image2.png" },
    { id: "7", name: "animal 2", img: "/Image1.png" },
    { id: "8", name: "created 6", img: "/Image8.png" },
    { id: "9", name: "created 7", img: "/Image9.png" },
    { id: "10", name: "created 8", img: "/Image10.png" },
    { id: "11", name: "created 9", img: "/Image11.png" },
    { id: "12", name: "created 10", img: "/Image12.png" },
    { id: "13", name: "animal 3", img: "/Image13.png" },
    { id: "14", name: "created 11", img: "/Image14.png" },
    { id: "15", name: "created 12", img: "/Image15.png" },
    { id: "16", name: "created 13", img: "/Image16.png" },
    { id: "17", name: "created 14", img: "/Image17.png" },
    { id: "18", name: "created 15", img: "/Image18.png" },
    { id: "19", name: "animal 4", img: "/Image19.png" },
    { id: "20", name: "created 16", img: "/Image20.png" },
    { id: "21", name: "created 17", img: "/Image21.png" },
    { id: "22", name: "created 18", img: "/Image22.png" },
    { id: "23", name: "created 19", img: "/Image23.png" },
    { id: "24", name: "created 20", img: "/Image24.png" },
  ];
  const data2 = [
    { id: "1", name: "My Folder", img: "/Image2.png" },
    { id: "2", name: "My Folder 1", img: "/Image1.png" },
    { id: "3", name: "My Folder 2", img: "/Image1.png" },
    { id: "4", name: "My Folder 3", img: "/Image2.png" },
  ];

  return (
    <div>
      <div className="fixed top-[81px] w-full bg-white">
        <div className="w-[90%] ml-[5%] my-4 flex items-center justify-between ">
          <h1 className="text-lg font-bold">Library Folders</h1>

          <CreateNewFolderModel />

        </div>
        <div className="w-[90%]  ml-[5%] md:w-[30%] md:items-start my-4 flex items-center justify-between ">
          <div
            onClick={() => setFolder(true)}
            className={`border-b-2 ${
              folder
                ? "border-[#1961C5] text-[#1961C5] "
                : "border-none text-[#A8A8A8]"
            } pb-4 w-[50%] flex items-center justify-center cursor-pointer`}
          >
            <h1 className="text-base font-semibold">Created folders</h1>
          </div>
          <div
            onClick={() => setFolder(false)}
            className={`border-b-2  ${
              folder
                ? " border-none text-[#A8A8A8]"
                : "border-[#1961C5] text-[#1961C5]"
            } pb-4 w-[50%] flex items-center justify-center cursor-pointer`}
          >
            <h1 className="text-base font-semibold">My folders</h1>
          </div>
        </div>
      </div>

      <div className="w-[90%] ml-[5%] mt-[140px] md:mt-[160px] mb-[20px] grid gap-5 grid-cols-1 md:grid-cols-4 overflow-y-auto">
        {folder
          ? data1?.map((a) => (
              <div
                key={a.id}
                className="w-[90%] ml-[5%] rounded-md h-[220px] md:h-[150px]  xl:h-[220px] bg-[#E8EFF9] flex flex-col items-center justify-center"
              >
                <div className="h-[80%] p-4">
                  <img src={a.img} alt="/" className="cursor-pointer" />
                </div>
                <div className="w-full h-[20%] flex items-center justify-between px-4 pb-4 ">
                  <p className="text-base font-semibold">{a.name}</p>
                  <div className="text-xl">
                    <IoMdMore />
                  </div>
                </div>
              </div>
            ))
          : data2?.map((a) => (
              <div
                key={a.id}
                className="w-[90%] ml-[5%] rounded-md h-[220px] md:h-[150px]  xl:h-[220px] bg-[#E8EFF9] flex flex-col items-center justify-center"
              >
                <div className="h-[80%] p-4">
                  <img src={a.img} alt="/" className="cursor-pointer" />
                </div>
                <div className="w-full h-[20%] flex items-center justify-between px-4 pb-4 ">
                  <p className="text-base font-semibold">{a.name}</p>
                  <div className="text-xl">
                    <IoMdMore />
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default LibraryPage;
