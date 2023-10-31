import { useParams } from "react-router-dom";
import ButtonComponent from "../Components/buttonComponent";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

function WordPage() {
  const params = useParams();
  const english = new Audio("/tree_English.m4a");
  const spanish = new Audio("/tree_spanish.m4a");
  const chinese = new Audio("/tree_chinese.mp3");
  const [videoBox, setVideoBox] = useState(false);

  return (
    <div className="w-full pt-4 pb-6 relative min-h-[calc(100vh-100px)] flex flex-col items-center justify-center">
      <div className="text-center mb-4">
        <h1 className="text-2xl ">WORD</h1>
        <p className="text-base font-bold">{params?.name}</p>
      </div>
      <div
        className="mt-4 w-[96%] select-none bg-[#fafafa] py-2 px-1 md:py-6 ms:px-4  
        md:w-[75%] lg:w-[65%] xl:w-[50%] flex flex-col 
      gap-y-5 md:gap-y-6 lg:gap-y-8 rounded-md items-center justify-center"
      >
        <div className="w-[200px] flex flex-col items-center justify-center">
          <p className="p-0 m-0">Word in English</p>
          <button onClick={() => english.play()} className="cursor-pointer ">
            🔊
          </button>
        </div>
        <div className="w-full flex items-center justify-center gap-2 md:gap-x-8 lg:gap-x-12">
          <div className="w-[190px] flex flex-col items-center justify-center">
            <p className="p-0 m-0 text-center">Word in French </p>
            <button onClick={() => english.play()} className="cursor-pointer ">
              🔊
            </button>
          </div>
          <div className="w-[200px] rounded-md h-[100px] border-2 flex flex-col items-center justify-center">
            <p className="p-0 m-0">Video Clip</p>
            <button
              onClick={() => setVideoBox(true)}
              className="cursor-pointer "
            >
              ▶️
            </button>
          </div>

          <div className="w-[200px] flex flex-col items-center justify-center">
            <p className="p-0 m-0 text-center">Word in Chinese</p>
            <button onClick={() => chinese.play()} className="cursor-pointer ">
              🔊
            </button>
          </div>
        </div>

        {videoBox ? (
          <div className="w-[96%] rounded-t-md md:w-[75%] lg:w-[65%] xl:w-[50%] fixed flex flex-col items-center justify-center">
            <div className="h-[30px] rounded-t-md pr-4 w-full bg-[#bfbfbf] flex justify-end items-center">
              <AiOutlineClose
                onClick={() => setVideoBox(false)}
                className="cursor-pointer"
              />
            </div>
            <video
              src="/play_video.mp4"
              controls
              autoPlay
              className="w-full h-full"
            />
          </div>
        ) : (
          ""
        )}

        <div className="w-[200px] flex flex-col items-center justify-center">
          <p className="p-0 m-0">Word in Spanish</p>
          <p onClick={() => spanish.play()} className="cursor-pointer">
            🔊
          </p>
        </div>
      </div>
      <p className="border my-8 border-black px-8 py-3 ">
        Text description of ASL sign
      </p>

      <ButtonComponent text="white" btnName="Add to Folder" />
    </div>
  );
}

export default WordPage;
