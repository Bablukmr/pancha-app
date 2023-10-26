import ButtonComponent from "../Components/buttonComponent";

function WordPage() {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h1 className="text-2xl my-4 absolute top-[60px]">WORD</h1>
      <div className="w-[80%] md:w-[50%] lg:w-[35%] flex flex-col gap-2 items-center justify-center">
        <div className="w-[200px] flex flex-col items-center justify-center">
          <p>Word in English</p>
          <p className="">🔊</p>
        </div>
        <div className="w-full flex gap-2">
          <div className="w-[200px] flex flex-col items-center justify-center">
            <p>Word in French</p>
            <p className="">🔊</p>
          </div>
          <div className="w-[200px] h-[100px] border border-b-2 flex flex-col items-center justify-center">
            <p>Video Clip</p>
            <p className="">▶️</p>
          </div>
          <div className="w-[200px] flex flex-col items-center justify-center">
            <p>Word in Chinese</p>
            <p className="">🔊</p>
          </div>
        </div>

        <div className="w-[200px] flex flex-col items-center justify-center">
          <p>Word in Spanish</p>
          <p className="">🔊</p>
        </div>
      </div>
    <p className="border my-8 border-black px-8 py-3 ">Text description of ASL sign</p>

        <ButtonComponent text="white" btnName="Add to Folder" />
    </div>
  );
}

export default WordPage;
