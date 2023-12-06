import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ButtonComponent from "../Components/buttonComponent";
import { useParams } from "react-router-dom";
import ListLoading from "../Components/listLoading";
import NotificationBox from "../Components/notificationbox";
import { Button, CircularProgress } from "@mui/material";
import { AiFillFolderOpen, AiOutlineClose } from "react-icons/ai";

export default function UserFolderPage() {
  const { wordId } = useParams();
  const token = useSelector((state) => state.AuthReducer.token);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [userFolder, setUserFolder] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState(null);
  const [notificationTitle, setNotificationTitle] = useState(null);
  const [notificationBody, setNotificationBody] = useState(null);
  const [model, setModel] = useState(false);
  const [newFolder, setNewFolder] = useState("");
  const [loading, setLoading] = useState(false);
  const userData = useSelector((state) => state.AuthReducer.userData);

  const userId = userData?.id;
  const shownotiftion = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  useEffect(() => {
    getUserFolder();
  }, [token]);

  useEffect(() => {
    if (token && userId) {
      getUserFolder();
    }
  }, [token, userId]);
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

  const handleAddWordToFolder = () => {
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
          setNotificationTitle("Success !!");
          setNotificationBody("Word Added");
          setNotificationType("success");
          shownotiftion();
          setTimeout(() => {
            window.history.back();
          }, 800);
        })
        .catch(() => {
          setNotificationTitle("Error !!");
          setNotificationBody("Something went wrong, try again.");
          setNotificationType("error");
          shownotiftion();
        });
    }
  };

  const handleAddFolder = (e) => {
    e.preventDefault();
    if (!newFolder) {
      setNotificationTitle("Error !!");
      setNotificationBody("New folder name missing");
      setNotificationType("error");
      shownotiftion();
      return;
    }
    setLoading(true);
    axios
      .post(
        "https://testapi.nhustle.in/pancha/folder/",
        {
          name: newFolder,
          pulic_folder: false,
          user: userId,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((res) => {
        getUserFolder();
        setNewFolder("");
        setModel(false);
        setLoading(false);
        setNotificationTitle("Sucess !!");
        setNotificationBody("Folder created.");
        setNotificationType("success");
        shownotiftion();
      })
      .catch((err) => {
        setLoading(false);
        setNotificationTitle("Error !!");
        setNotificationBody("Something went wrong, try again.");
        setNotificationType("error");
        shownotiftion();
      });
  };
  const closeModel = () => {
    setNewFolder("");
    setModel(false);
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
        {model ? (
          <div className="w-full fixed z-10 top-[50px] bottom-[50px] bg-[#18171741] flex items-center justify-center">
            <div className="w-[80%] md:w-[50%] lg:w-[35%] h-[300px] relative shadow-md rounded-md bg-white opacity-100 flex flex-col items-center justify-center">
              <div
                onClick={closeModel}
                className="absolute top-0 right-0 m-5 text-xl cursor-pointer"
              >
                <AiOutlineClose />
              </div>
              <form className="w-full flex flex-col items-center justify-center">
                <div className="w-[80%] flex flex-col gap-5">
                  <label className="text-sm">New Folder Name</label>
                  <div className="border-[#A2A2A7] mt-2 rounded-md border border-solid flex items-center">
                    <input
                      value={newFolder}
                      onChange={(e) => setNewFolder(e.target.value)}
                      placeholder="New Folder Name"
                      className="text-sm h-10 border-none w-full outline-[.5px] outline-blue-400 px-2 rounded-md"
                    />
                  </div>

                  <ButtonComponent
                    btnName="Add Folder"
                    disabled={loading}
                    padding={"8px "}
                    width="100%"
                    text="white"
                    startIcon={
                      loading ? (
                        <CircularProgress
                          style={{ color: "#A6A6A6" }}
                          size="1.5rem"
                        />
                      ) : (
                        ""
                      )
                    }
                    onClick={handleAddFolder}
                  />
                </div>
              </form>
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

     
        {userFolder.length !== 0 && (
          <div className="w-[80%] md:w-[50%] lg:w-[35%] flex gap-3 flex-col">
            <ButtonComponent
              btnName="Add To Folder"
              buttonType="success"
              padding="6px"
              width="120px"
              text="white"
              onClick={handleAddWordToFolder}
            />

            <ButtonComponent
              btnName="Create New Folder"
              buttonType="success"
              padding="6px"
              width="150px"
              text="white"
              onClick={() => setModel(true)}
            />
          </div>
        )}
      </div>
    </>
  );
}
