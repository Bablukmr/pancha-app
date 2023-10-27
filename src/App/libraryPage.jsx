import { useNavigate } from "react-router-dom";
import ButtonComponent from "../Components/buttonComponent";
import { useState } from "react";

function LibraryPage() {
  const [folder, setFolder] = useState("");
  const navigate = useNavigate();

  const [selectedItemId, setSelectedItemId] = useState(null);
  const FolderList = [
    {
      PublicList: [
        { id: 1, name: "Fruits" },
        { id: 2, name: "Games" },
        { id: 3, name: "Books" },
      ],
      UserList: [
        { id: 4, name: "Study" },
        { id: 5, name: "Yoga" },
        { id: 6, name: "States" },
      ],
    },
  ];

  return (
    <div className="w-full pb-4 md:pb-6 flex flex-col items-center justify-center">
      <h1 className="text-xl my-6">Library</h1>
      <div className="w-[80%] md:w-[50%] lg:w-[35%] border-black border-b-2 ">
        <p className="text-md my-2">Curated Folder</p>
        <div className="p-2 w-full border border-[#725555] pb-2 bg-[#fafafa] rounded-md mb-6">
          <ul className="w-full max-h-[150px]  overflow-y-scroll flex flex-col items-start  ">
            {FolderList[0].PublicList.map((keyword) => (
              <li
                onClick={() => {
                  setFolder(keyword.name);
                  setSelectedItemId(keyword.id);
                }}
                key={keyword.id}
                className={`h-[40px] hover:bg-slate-600 hover:text-white focus:ring-violet-300 rounded-sm font-medium px-4 py-2 w-full border-b-2 border-[#f2f2f2] cursor-pointer ${
                  keyword.id === selectedItemId ? "bg-slate-600 text-white" : ""
                } `}
              >
                {keyword.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-[80%] md:w-[50%] lg:w-[35%]  mt-2 border-black border-b-2">
        <p className="text-md my-2"> My Folder</p>
        <div className="p-2 w-full border border-[#725555] pb-2 bg-[#fafafa] rounded-md mb-6">
          <ul className="w-full max-h-[150px]  overflow-y-scroll flex flex-col items-start ">
            {FolderList[0].UserList.map((keyword) => (
              <li
                onClick={() => {
                  setFolder(keyword.name);
                  setSelectedItemId(keyword.id);
                }}
                key={keyword.id}
                className={`h-[40px] hover:bg-slate-600 hover:text-white focus:ring-violet-300 rounded-sm font-medium px-4 py-2 w-full border-b-2 border-[#f2f2f2] cursor-pointer ${
                  keyword.id === selectedItemId ? "bg-slate-600 text-white" : ""
                } `}
              >
                {keyword.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-[80%] md:w-[50%] lg:w-[35%]  mt-4 flex flex-col items-start justify-start gap-3 mb-[70px]">
        <button className="bg-[#A0E200] text-white rounded-md py-2 px-4">
          Add New Folder
        </button>

        <button className="bg-[#E2202C] text-white rounded-md py-2 px-4">
          View/Edit Folder
        </button>
        <ButtonComponent
          onClick={() => navigate(`/library/${folder}`)}
          bg="white"
          text="white"
          btnName="View Folder in Flashcard Mode"
        />
      </div>
    </div>
  );
}

export default LibraryPage;
