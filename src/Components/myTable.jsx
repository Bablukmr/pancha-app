import { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

function MyTablePage({ data, columnData }) {
  const displayPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  // console.log("currentPage",currentPage);
  const totalPages = Math.ceil(data.length / displayPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const getPageNumbers = () =>
    Array.from({ length: totalPages }, (_, index) => index + 1);

  const startIndex = (currentPage - 1) * displayPage;
  const endIndex = startIndex + displayPage;
  const currentData = data.slice(startIndex, endIndex);
  // console.log("currentData",currentData);

  return (
    <div className="container mx-auto mt-8">
      <table className="w-[90%] ml-[5%]  border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            {columnData?.map((a) => (
              <th key={a.id} className="py-2 px-4  border-b text-left">
                {a.title}
              </th>
            ))}
            {/* <th className="py-2 px-4  border-b text-left">Action</th> */}
          </tr>
        </thead>
        <tbody>
          {currentData.map((rowData, index) => (
            <tr key={index} className={`hover:bg-slate-100 bg-white`}>
              {columnData.map((column) => (
                <td key={column.id} className="py-2  px-4  border-b text-left">
                  {rowData[column.dataToShow]}
                </td>
              ))}

              {/* <td className="py-2  px-4 border-b text-left">
                <button
                  onClick={() => alert(rowData.name + " " + rowData.rollno)}
                  className="bg-[#2B3087] px-3 py-[2px] rounded-md text-white"
                >
                  edit
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="w-[90%] ml-[5%] flex items-center justify-end gap-x-2 md:gap-x-3 mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-3 py-2 rounded-md bg-[#2B3087] text-white disabled:opacity-50"
        >
          <AiOutlineArrowLeft />
        </button>

        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`px-3 py-1 rounded-md ${
              currentPage === page
                ? "bg-[#2B3087] text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-3 py-2 rounded-md bg-[#2B3087] text-white disabled:opacity-50"
        >
          <AiOutlineArrowRight />
        </button>
      </div>
    </div>
  );
}

export default MyTablePage;
