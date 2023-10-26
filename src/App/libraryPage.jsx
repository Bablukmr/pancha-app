import ButtonComponent from "../Components/buttonComponent";

function LibraryPage() {
  const SearchItem = ["Alphabet", "List of Alphabet", "Item", "Test Text", "book", "pen","apple","arrow", "alligator", 
  "apartment"];
  return (
    <div className="w-full flex mt-[70px] flex-col items-center justify-center">
      <h1 className="text-2xl my-6">Library</h1>
<div className="w-[80%]  border-black border-b-2 ">
            <p className="text-md my-2">Curated Folder</p>
          <div className="p-2 w-full border border-[#725555] pb-2 bg-[#fafafa] rounded-md mb-6">
            <ul className="w-full max-h-[150px]  overflow-y-scroll flex flex-col items-start  ">
              {SearchItem.map((keyword, index) => (
                <li 
                  // onClick={() => { navigate(`/word/${keyword}`) }}
                  key={index}
                  className="h-[40px] font-medium px-4 py-2 w-full border-b-2 border-[#f2f2f2] cursor-pointer hover:bg-slate-100 "
                >
                  {keyword}
                </li>
              ))}
            </ul>
          </div>
      
</div>
<div className="w-[80%] mt-2 border-black border-b-2">
            <p className="text-md my-2"> My Folder</p>
          <div className="p-2 w-full border border-[#725555] pb-2 bg-[#fafafa] rounded-md mb-6">
            <ul className="w-full max-h-[150px]  overflow-y-scroll flex flex-col items-start ">
              {SearchItem.map((keyword, index) => (
                <li 
                  // onClick={() => { navigate(`/word/${keyword}`) }}
                  key={index}
                  className="h-[40px] font-medium px-4 py-2 w-full border-b-2 border-[#f2f2f2] cursor-pointer hover:bg-slate-100 "
                >
                  {keyword}
                </li>
              ))}
            </ul>
          </div>
      
</div>
<div className="w-[80%] mt-4 flex flex-col items-start justify-start gap-3 mb-[70px]">
<button className="bg-yellow-500 text-white rounded-md py-2 px-4">Add New Folder</button>
<button className="bg-red-500 text-white rounded-md py-2 px-4">View/Edit Folder</button>
  <ButtonComponent bg="white" text="white" btnName="View Folder in Flash Mode"/>
</div>
    </div>
  )
}

export default LibraryPage