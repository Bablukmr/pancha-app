import { useState } from "react";
import { Link } from "react-router-dom";
import SearchInput from "../componets/searchInput";

function SearchPage() {
  const initialData = [
    {
      id: 1,
      name: "Apple",
      category: "Fruits",
      image:
        "https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png?201609051049",
    },
    {
      id: 2,
      name: "Banana",
      category: "Fruits",
      image:
        "https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png?201609051049",
    },
    {
      id: 3,
      name: "Orange",
      category: "Fruits",
      image:
        "https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png?201609051049",
    },
    {
      id: 1,
      name: "Horse",
      category: "Animals",
      image:
        "https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png?201609051049",
    },
    {
      id: 2,
      name: "Lion",
      category: "Animals",
      image:
        "https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png?201609051049",
    },
    {
      id: 3,
      name: "Elephant",
      category: "Animals",
      image:
        "https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png?201609051049",
    },
    {
      id: 1,
      name: "Oak",
      category: "Trees",
      image:
        "https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png?201609051049",
    },
    {
      id: 2,
      name: "Pine",
      category: "Trees",
      image:
        "https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png?201609051049",
    },
    {
      id: 3,
      name: "Maple",
      category: "Trees",
      image:
        "https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png?201609051049",
    },
    {
      id: 1,
      name: "Carrot",
      category: "Vegetables",
      image:
        "https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png?201609051049",
    },
    {
      id: 2,
      name: "Broccoli",
      category: "Vegetables",
      image:
        "https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png?201609051049",
    },
    {
      id: 1,
      name: "Car",
      category: "Vehicles",
      image:
        "https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png?201609051049",
    },
    {
      id: 2,
      name: "Bicycle",
      category: "Vehicles",
      image:
        "https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png?201609051049",
    },
  ];

  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchValue(value);

    let filtered = [];

    initialData.forEach((item) => {
      if (item.name.toLowerCase().startsWith(value)) {
        filtered.push(item);
      }
    });

    setFilteredData(filtered);
  };

  return (
    <div className="w-[90%] ml-[5%] my-3 rounded-lg bg-[#E8F0FA] py-4 flex flex-col items-center gap-y-6">
      <h1 className="text-xl font-semibold">Search For Words Here</h1>
      <div className="w-[90%]">
        <SearchInput
          onChange={handleSearchChange}
          placeholder="Enter here...."
        />
        <div className="bg-white my-4 rounded-xl max-h-[350px] overflow-y-auto">
          {searchValue &&
            filteredData.length > 0 &&
            filteredData.map((item, index) => (
              <Link
                to={`${item.name}/${item.id}`}
                key={index}
                className="hover:bg-slate-100 mt-4 p-4 flex items-center justify-start gap-x-3"
              >
                <div className="h-[23px]">
                  <img src={item.image} alt="img" className="h-full" />
                </div>
                <h1 className="text-[16px] font-semibold text-[#333333]">
                  {item.name}
                </h1>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
