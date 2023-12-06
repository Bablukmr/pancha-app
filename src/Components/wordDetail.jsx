export default function WordDetail({ name, audio, phenotic, show, lang }) {
  return (
    <div
      className={`${
        lang === "French"
          ? "text-[#4285F4]"
          : lang === "Chinese"
          ? "text-[#DB4437]"
          : "text-[#0F9D58]"
      }  flex flex-col items-center justify-center text-center`}
    >
      {show && (
        <>
          <p className="font-bold text-lg xl:text-2xl">{lang}</p>
          {/* <p>{name}</p> */}
          <div dangerouslySetInnerHTML={{ __html: name }} />
          <div dangerouslySetInnerHTML={{ __html: phenotic }} />

          <button
            onClick={() => new Audio(audio).play()}
            className="cursor-pointer"
          >
            🔊
          </button>
        </>
      )}
    </div>
  );
}
