import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  HiArrowSmLeft,
  HiArrowSmRight,
  HiOutlineRefresh,
} from "react-icons/hi";
import { LiaRandomSolid } from "react-icons/lia";

function FlashcardMode() {
  const navigate = useNavigate();
  const params = useParams();
  const FolderName = params?.name;

  const PublicList = ["Fruits", "Games", "Books"];
  const UserList = ["Study", "Yoga", "States"];
  const allFolders = [...PublicList, ...UserList];
  const [selectedFolder, setSelectedFolder] = useState(FolderName);
  const handleFolderChange = (e) => {
    setSelectedFolder(e.target.value);
    navigate(`/library/${e.target.value}`);
  };
  const BookArr = [
    { id: 1, name: "one" },
    { id: 2, name: "two" },
    { id: 3, name: "three" },
    { id: 4, name: "four" },
    { id: 5, name: "five" },
    { id: 6, name: "six" },
  ];
  const [wordIndex, setWordIndex] = useState(0);
  const handlePrevious = () => {
    if (wordIndex === 0) {
      setWordIndex(BookArr.length - 1);
    } else {
      setWordIndex(wordIndex - 1);
    }
  };
  const handleSerial = () => {
    if (wordIndex === BookArr.length - 1) {
      setWordIndex(0);
    } else {
      setWordIndex(wordIndex + 1);
    }
  };
  const handleRandom = () => {
    const randomIndex = Math.floor(Math.random() * BookArr.length);
    setWordIndex(randomIndex);
  };
  const handleNext = () => {
    if (wordIndex === BookArr.length - 1) {
      setWordIndex(0);
    } else {
      setWordIndex(wordIndex + 1);
    }
  };

  return (
    <div className="w-full pb-4 md:pb-6 flex flex-col items-center justify-center">
      <h1 className="text-xl my-6">Flashcards for {selectedFolder}</h1>

      <div className="w-[80%]  md:w-[50%] lg:w-[45%] xl:w-[40%] ">
        <label className="">choose the different folder</label>
        <div className="border-[#7c7c7f] mt-2 rounded-md border border-solid flex items-center px-2">
          <select
            value={selectedFolder}
            onChange={handleFolderChange}
            placeholder="10-3-23"
            className="text-sm h-10 bg-white  border-none w-full outline-none px-2"
          >
            {/* <option value="">Select a folder</option> */}
            {allFolders.map((folder, index) => (
              <option key={index} value={folder}>
                {folder}
              </option>
            ))}
          </select>
        </div>
      </div>
      <p className="w-full mt-4 font-bold text-center ">
        {BookArr[wordIndex].name}
      </p>

      <div
        className="w-[96%] bg-[#fafafa] my-10 py-2 px-1 md:py-6 ms:px-4  md:w-[75%] lg:w-[65%] xl:w-[50%] flex flex-col 
      gap-y-5 md:gap-y-6 lg:gap-y-8 rounded-md items-center justify-center"
      >
        <div className="w-[200px] flex flex-col items-center justify-center">
          <p className="p-0 m-0">Word in English</p>
          <p className="">🔊</p>
        </div>
        <div className="w-full flex items-center justify-center gap-2 md:gap-x-8 lg:gap-x-12">
          <div className="w-[190px] flex flex-col items-center justify-center">
            <p className="p-0 m-0 text-center">Word in French </p>
            <p className="">🔊</p>
          </div>
          <div className="w-[200px] rounded-md h-[100px] border-2 flex flex-col items-center justify-center">
            <p className="p-0 m-0">LOGO</p>
            <p className="">image of word</p>
          </div>
          <div className="w-[200px] flex flex-col items-center justify-center">
            <p className="p-0 m-0 text-center">Word in Chinese</p>
            <p className="">🔊</p>
          </div>
        </div>

        <div className="w-[200px] flex flex-col items-center justify-center">
          <p className="p-0 m-0">Word in Spanish</p>
          <p className="">🔊</p>
        </div>
      </div>

      <div className="w-[96%]  md:w-[75%] lg:w-[65%] xl:w-[50%] flex items-center justify-around text-3xl md:text-4xl text-[#917d7d] ">
        <HiArrowSmLeft onClick={handlePrevious} className="cursor-pointer" />
        <HiOutlineRefresh onClick={handleSerial} className="cursor-pointer" />
        <LiaRandomSolid onClick={handleRandom} className="cursor-pointer" />
        <HiArrowSmRight onClick={handleNext} className="cursor-pointer" />
      </div>
    </div>
  );
}

export default FlashcardMode;