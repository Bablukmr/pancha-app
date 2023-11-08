import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ButtonComponent from "../Components/buttonComponent";
import { useParams } from "react-router-dom";
import ListLoading from "../Components/listLoading";
import NotificationBox from "../Components/notificationbox";
import { Button } from "@mui/material";
import { AiFillFolderOpen } from "react-icons/ai";


export default function UserFolderPage() {
  const { wordId } = useParams();
  const token = useSelector((state) => state.AuthReducer.token);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [userFolder, setUserFolder] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState(null);
  const [notificationTitle, setNotificationTitle] = useState(null);
  const [notificationBody, setNotificationBody] = useState(null);

  const shownotiftion = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  useEffect(() => {
    getUserFolder();
  }, [token]);

  const getUserFolder = () => {
    if (token) {
      axios
        .get("https://testapi.nhustle.in/pancha/user-folder", {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((d) => {
          setUserFolder(d?.data?.reverse());
        })
        .catch((err) => {
          setNotificationTitle("Error !!");
          setNotificationBody("Failed to get user folders, try again.");
          setNotificationType("error");
          shownotiftion();
        });
    }
  };

  const handleClick = () => {
    if (!selectedItemId) {
      setNotificationTitle("Error !!");
      setNotificationBody("Select a folder to add.");
      setNotificationType("error");
      shownotiftion();
    } else {
      axios
        .post(
          "https://testapi.nhustle.in/pancha/words-in-folder/",
          {
            folder: selectedItemId,
            word: wordId,
          },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        )
        .then((d) => {
          setNotificationTitle("Error !!");
          setNotificationBody("Word added to selected folder.");
          setNotificationType("success");
          shownotiftion();
          window.history.back();
        })
        .catch(() => {
          setNotificationTitle("Error !!");
          setNotificationBody("Something went wrong, try again.");
          setNotificationType("error");
          shownotiftion();
        });
    }
  };

  return (
    <>
      <div
        className={`fixed top-6 right-0 shadow-lg z-50 w-80 rounded-2xl transition-transform duration-300 transform ${
          showNotification ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <NotificationBox
          title={notificationTitle}
          body={notificationBody}
          setShowNotification={setShowNotification}
          type={notificationType}
        />
      </div>

      <div className="w-full  flex flex-col items-center justify-center">
        <p className="my-3 ">Select Folder</p>

        {userFolder.length === 0 ? (
          <div className="w-[80%] h-[200px]">
            <ListLoading />
            <div className="text-center mt-4 font-bold">
              <p>No Folder found !!</p>
            </div>
          </div>
        ) : (
          ""
        )}

        {userFolder.length !== 0 && (
          <div className="min-h-[120px] w-[80%] md:w-[50%] lg:w-[35%]  mb-6 border border-black rounded-md">
            <ul className="w-full  my-2 max-h-[160px] overflow-auto flex flex-col  rounded-md p-1 items-start ">
              {userFolder.map((keyword) => (
                <div
                  key={keyword.id}
                  onClick={() => {
                    setSelectedItemId(keyword.id);
                  }}
                  className={`h-[40px] w-full flex items-center justify-start gap-5 hover:bg-slate-600 hover:text-white focus:ring-violet-300 rounded-sm font-medium px-4 py-2  border-b-2 border-[#f2f2f2] cursor-pointer ${
                    keyword.id === selectedItemId
                      ? "bg-slate-600 text-white"
                      : ""
                  } `}
                >
                  <AiFillFolderOpen className="text-xl font-extrabold" />
                  <li
                    key={keyword.id}
                    className="w-full h-full"
                    // className={`h-[40px] hover:bg-slate-600 hover:text-white focus:ring-violet-300 rounded-sm font-medium px-4 py-2 w-full border-b-2 border-[#f2f2f2] cursor-pointer ${
                    //   keyword.id === selectedItemId ? "bg-slate-600 text-white" : ""
                    // } `}
                  >
                    {keyword.name}
                  </li>
                </div>
              ))}
            </ul>
          </div>
        )}

        {/* <div className="min-h-[200px] w-[80%] mb-6 border border-[#f0f0f0] rounded-md">
          <ul className="w-full  my-2 max-h-[250px] overflow-auto flex flex-col items-start ">
            {userFolder.map((keyword) => (
              <li
                onClick={() => {
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
        </div> */}
        {userFolder.length !== 0 && (
          <Button
            style={{
              width: "110px",
              textTransform: "none",
              padding: "6px 16px",
            }}
            onClick={handleClick}
            variant="contained"
          >
            Add
          </Button>
        )}
      </div>
    </>
  );
}
