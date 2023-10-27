import { IoLibraryOutline } from "react-icons/io5";
import { AiOutlineSearch } from "react-icons/ai";
import { SlNotebook } from "react-icons/sl";
import { Link } from "react-router-dom";

export default function Footer(props) {
  const { setSetting } = props;
  return (
    <div
      onClick={() => setSetting(true)}
      className="bg-[#4C4C4C]  h-[50px] w-full fixed bottom-0 flex items-center justify-center "
    >
      <Link
        to="library"
        className="text-white w-[50%] p-2 h-full flex flex-col items-center justify-center"
      >
        <IoLibraryOutline className="text-3xl" />
        <p className="text-xs">Library</p>
      </Link>
      <p className="h-[80%] bg-[#06060687] w-[2px]"></p>
      <Link
        to="dictionary"
        className="text-white w-[50%] p-2 h-full flex flex-col items-center justify-center"
      >
        <SlNotebook className="text-3xl" />
        <p className="text-xs">Dictionary </p>
      </Link>
      <p className="h-[80%] bg-[#06060687] w-[2px]"></p>
      <Link
        to="/"
        className="text-white p-2 w-[50%] h-full flex flex-col items-center justify-center"
      >
        <AiOutlineSearch className="text-3xl " />
        <p className="text-xs">Search</p>
      </Link>
    </div>
  );
}
