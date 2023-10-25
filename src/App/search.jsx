import { AiOutlineSearch } from "react-icons/ai";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Search() {
  const navigate = useNavigate();
  const SearchItem = ["cat", "cricket", "car", "dog", "book", "pen"];
  const [searchTerm, setSearchTerm] = useState('');
  const [matchingKeywords, setMatchingKeywords] = useState([]);

  const handleSearch = (e) => {
    const inputValue = e.target.value;
    setSearchTerm(inputValue);
    if (inputValue === '') {
      setMatchingKeywords([]);
    } else {
      const matching = SearchItem.filter(keyword => keyword.toLowerCase().startsWith(inputValue.toLowerCase()));
      setMatchingKeywords(matching);
    }
  }

  return (
    <div className='w-full absolute top-[100px] flex flex-col items-center justify-center'>
      <div className="w-[80%] md:w-[50%] lg:w-[35%] flex flex-col items-center justify-center">
        <div className="w-full relative rounded-md border border-solid flex items-center">
          <div className="p-2">
            <AiOutlineSearch />
          </div>
          <input
            type="search"
            placeholder="Search"
            className="text-sm h-10 border-none w-full outline-none pr-2 rounded-md"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        {matchingKeywords.length > 0 && (
          <div className="mt-2 w-full shadow-md">
            <ul className="w-full flex flex-col items-start">
              {matchingKeywords.map((keyword, index) => (
                <li 
                  onClick={() => { navigate("word") }}
                  key={index} 
                  className="h-[40px] px-4 py-2 w-full border-b-2 cursor-pointer hover:bg-slate-100 "
                >
                  {keyword}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
