import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

function ViewEditPage() {
  const navigate = useNavigate();
  const params = useParams();
  const FolderName = params?.name;
  const [selectedItemId, setSelectedItemId] = useState(null);

  const BookArr = [
    { id: 1, name: "one" },
    { id: 2, name: "two" },
    { id: 3, name: "three" },
    { id: 4, name: "four" },
    { id: 5, name: "five" },
    { id: 6, name: "six" },
  ];
  const [filterNames, setFilterNames] = useState(BookArr);
  const handleRemove = () => {
if(!selectedItemId){
    alert("Select Word")
    return
}
    setFilterNames((prevNames) =>
      prevNames.filter((item) => item.id !== selectedItemId)
    );
    setSelectedItemId(null)
  };
  const [model, setModel] = useState(false);
  const [newWord, setNewWord] = useState("");
  const handleAddWord = () => {
    if (newWord) {
      const newId = filterNames.length + 1;
      const newWordObj = { id: newId, name: newWord };
      setFilterNames((prevNames) => [...prevNames, newWordObj]);
      setNewWord("");
      setModel(false);
    }
  };

  return (
    <div className="w-full pb-4 md:pb-6 flex flex-col items-center justify-center">
      <h1 className="text-xl my-6">Edit {FolderName}</h1>
      <div className="w-[80%]  md:w-[50%] lg:w-[35%] border border-[#725555] rounded-md mb-6 p-2 ">
        <ul className="w-full max-h-[150px] h-[200px] overflow-y-scroll flex flex-col items-start">
          {filterNames.map((keyword) => (
            <li
              onClick={() => setSelectedItemId(keyword.id)}
              key={keyword.id}
              className={`h-[40px] hover:bg-slate-600 hover:text-white focus:ring-violet-300 rounded-sm font-medium px-4 py-2 w-full border-b-2 border-[#f2f2f2] cursor-pointer ${
                keyword.id === selectedItemId ? "bg-slate-600 text-white" : ""
              }`}
            >
              {keyword.name}
            </li>
          ))}
        </ul>
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
              <label className="text-sm">New Word Name</label>
              <div className="border-[#A2A2A7] mt-2 rounded-md border border-solid flex items-center">
                <input
                  onChange={(e) => setNewWord(e.target.value)}
                  placeholder="Add New Word"
                  className="text-sm h-10 border-none w-full outline-[.5px] outline-blue-400 px-2 rounded-md"
                />
              </div>
            </div>
            <button
              onClick={handleAddWord}
              className="w-[80%]  mt-6 text-center py-2 rounded-md bg-blue-400 text-white"
            >
              Add New Word
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="w-[80%] md:w-[50%] lg:w-[35%]  mt-4 flex flex-col items-start justify-start gap-3 mb-[70px]">
        <button
          onClick={() => setModel(true)}
          className="bg-black w-[150px] text-white rounded-md py-2 px-4"
        >
          Add Word
        </button>
        <button
          onClick={handleRemove}
          className="bg-black  w-[150px] text-white rounded-md py-2 px-4"
        >
          Remove Word
        </button>
        <button
        onClick={()=>navigate("/library")}
        className="bg-[#E2202C]  w-[150px] text-white rounded-md py-2 px-4">
          Delete Folder
        </button>
      </div>
    </div>
  );
}

export default ViewEditPage;
