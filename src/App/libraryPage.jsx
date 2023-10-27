import { useNavigate } from "react-router-dom";
import ButtonComponent from "../Components/buttonComponent";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

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

  const handleViewEdit = () => {
    if (folder === "") {
      navigate("");
    } else {
      navigate(`/library/view-edit/${folder}`);
    }
  };
  const [model, setModel] = useState(false);
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
      {model ? (
        <div className="w-full absolute top-[50px] bottom-[50px] bg-[#18171741] flex items-center justify-center">
          <div className="w-[80%] md:w-[50%] lg:w-[35%] h-[300px] relative shadow-md rounded-md bg-white opacity-100 flex flex-col items-center justify-center">
            <div
              onClick={() => setModel(false)}
              className="absolute top-0 right-0 m-5 text-xl cursor-pointer"
            >
              <AiOutlineClose />
            </div>
            <div className="w-[80%]">
              <label className="text-sm">New Folder Name</label>
              <div className="border-[#A2A2A7] mt-2 rounded-md border border-solid flex items-center">
                <input
                  placeholder="New Folder Name"
                  className="text-sm h-10 border-none w-full outline-[.5px] outline-blue-400 px-2 rounded-md"
                />
              </div>
            </div>
            <button className="w-[80%]  mt-6 text-center py-2 rounded-md bg-blue-400 text-white">
              Add New Folder
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="w-[80%] md:w-[50%] lg:w-[35%]  mt-4 flex flex-col items-start justify-start gap-3 mb-[70px]">
        <button
          onClick={() => setModel(true)}
          className="bg-[#A0E200] text-white rounded-md py-2 px-4"
        >
          Add New Folder
        </button>
        <button
          onClick={handleViewEdit}
          className="bg-[#E2202C] text-white rounded-md py-2 px-4"
        >
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
