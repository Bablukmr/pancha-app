import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ButtonComponent from "../Components/buttonComponent";
import { useParams } from "react-router-dom";

function UserFolderPage() {
    const params = useParams();
  const token = useSelector((state) => state.AuthReducer.token);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [folder, setFolder] = useState("");
console.log("wordId",params?.wordId);
console.log("folderName",folder);
  useEffect(() => {
    getUserFolder();
  }, []);
  const getUserFolder = () => {
    // setUserLoading(true);
    axios
      .get("https://testapi.nhustle.in/pancha/user-folder", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })

      .then((res) => {
        const data = res.data;
        console.log(data);
        setUserFolder(data?.reverse());
        // setUserLoading(false);
      })
      .catch((err) => {
        // setUserLoading(false);
        // setNotificationTitle("Error !!");
        // setNotificationBody("Something Went to wrong");
        // setNotificationType("error");
        // shownotiftion();
        console.log("Server Error", err);
      });
  };

  const handleClick = () => {
    axios.post(
      "https://testapi.nhustle.in/pancha/words-in-folder/",
      {
        folder: selectedItemId,

      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  };

  const [userFolder, setUserFolder] = useState([]);
  return (
    <div className="w-full h-[50vh]  flex flex-col items-center justify-center">
      <p className="my-3 ">Select Folder</p>
      <ul className="w-[80%] my-4 max-h-[250px] overflow-auto flex flex-col items-start ">
        {userFolder.map((keyword) => (
          <li
            onClick={() => {
              setFolder(keyword.id);
              setSelectedItemId(keyword.id);
            }}
            key={keyword.id}
            className={`h-[40px] hover:bg-slate-600 hover:text-white focus:ring-violet-300 rounded-sm font-medium px-4 py-2 w-full border-b-2 border-[#f2f2f2] cursor-pointer ${
              keyword.id === selectedItemId ? "bg-slate-600 text-white" : ""
            } `}
          >
            {keyword.name}
          </li>
        ))}
      </ul>
      {/* <button className="bg-black text-white px-6 py-2">Add </button> */}
      <ButtonComponent onClick={handleClick} btnName="Add" text="white" />
    </div>
  );
}

export default UserFolderPage;
