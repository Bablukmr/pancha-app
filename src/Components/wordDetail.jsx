export default function WordDetail({ data }) {
  // console.log("oooooooo", data);
  return (
    <div className="w-[200px] flex flex-col items-center justify-center">
      <p>{data?.word_in_lang}</p>
      <p className="p-0 m-0">{data?.phonetic}</p>
      <button
        onClick={() => new Audio(data?.audio).play()}
        className="cursor-pointer"
      >
        🔊
      </button>
    </div>
  );
}
