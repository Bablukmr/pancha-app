import React, { useEffect, useState } from "react";
import { IoMdMore } from "react-icons/io";
import ModelComponets from "../componets/modelComponets";
import CreateNewFolderModel from "../componets/createNewFolderModel";
import Notificationbox from "../componets/notificationbox";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../componets/loading";

function LibraryPage() {
  const token = useSelector((state) => state.AuthReducer.token);
  const navigate = useNavigate();

  const [selectedFolderName, setSelectedFolderName] = useState("");
  const [publicLoadind, setPublicLoading] = useState(true);
  const [UserLoadind, setUserLoading] = useState(true);
  const [publicFolder, setPublicFolder] = useState([]);
  const [userFolder, setUserFolder] = useState([]);
  const [newFolder, setNewFolder] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState(null);
  const [notificationTitle, setNotificationTitle] = useState(null);
  const [notificationBody, setNotificationBody] = useState(null);

  const [selectedFolderId, setSelectedFolderId] = useState(null);

  const [folderType, setFolderType] = useState("");

  const userData = useSelector((state) => state.AuthReducer.userData);

  const userId = userData?.id;
  
  console.log(userId, "userId");

  const shownotiftion = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  useEffect(() => {
    if (token && userId) {
      axios
        .get(`https://testapi.nhustle.in/pancha/public-folder?id=${userId}`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((res) => {
          setPublicFolder(res.data);
          setPublicLoading(false);
        })
        .catch((err) => {
          setPublicLoading(false);
          setNotificationTitle("Error!");
          setNotificationBody("Something went wrong fetching public folders.");
          setNotificationType("error");
          shownotiftion();
        });
    }
  }, [token, userId]);

  useEffect(() => {
    if (token && userId) {
      getUserFolder();
    }
  }, [token, userId]);

  const getUserFolder = () => {
    setUserLoading(true);
    axios
      .get(`https://testapi.nhustle.in/pancha/user-folder?id=${userId}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })

      .then((res) => {
        const data = res.data;
        setUserFolder(data?.reverse());
        setUserLoading(false);
      })
      .catch((err) => {
        setUserLoading(false);
        setNotificationTitle("Error!");
        setNotificationBody("Something went wrong fetching user folders.");
        setNotificationType("error");
        shownotiftion();
      });
  };

  const [folder, setFolder] = useState(true);
  // console.log(newFolder);

  const handleAddFolder = (e) => {
    e.preventDefault();
    if (!newFolder) {
      setNotificationTitle("Error!");
      setNotificationBody("New folder name missing");
      setNotificationType("error");
      shownotiftion();
      return;
    }
    // setLoading(true);
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
        // setModel(true);
        // setLoading(false);
        setNotificationTitle("Sucess !!");
        setNotificationBody("Folder created.");
        setNotificationType("success");
        shownotiftion();
        handleClose();
      })
      .catch((err) => {
        // setLoading(false);
        setNotificationTitle("Error!");
        setNotificationBody("Something went wrong, try again.");
        setNotificationType("error");
        shownotiftion();
      });
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div
        className={`fixed top-6 right-0 shadow-lg z-50 w-80 rounded-2xl transition-transform duration-300 transform ${
          showNotification ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <Notificationbox
          title={notificationTitle}
          body={notificationBody}
          setShowNotification={setShowNotification}
          type={notificationType}
        />
      </div>
      <>
        {publicLoadind && UserLoadind ? (
          <Loading />
        ) : (
          <div>
            <div className="fixed top-[81px] w-full bg-white">
              <div className="w-[90%] ml-[5%] my-4 flex items-center justify-between ">
                <h1 className="text-lg font-bold">Library Folders</h1>

                <CreateNewFolderModel
                  handleAddFolder={handleAddFolder}
                  value={newFolder}
                  onChange={(e) => setNewFolder(e.target.value)}
                  handleClose={handleClose}
                  handleOpen={handleOpen}
                  open={open}
                />
              </div>
              <div className="w-[90%]  ml-[5%] md:w-[30%] md:items-start my-4 flex items-center justify-between ">
                <div
                  onClick={() => setFolder(true)}
                  className={`border-b-2 ${
                    folder
                      ? "border-[#1961C5] text-[#1961C5] "
                      : "border-none text-[#A8A8A8]"
                  } pb-4 w-[50%] flex items-center justify-center cursor-pointer`}
                >
                  <h1 className="text-base font-semibold">Created folders</h1>
                </div>
                <div
                  onClick={() => {
                    setFolder(false);
                  }}
                  className={`border-b-2  ${
                    folder
                      ? " border-none text-[#A8A8A8]"
                      : "border-[#1961C5] text-[#1961C5]"
                  } pb-4 w-[50%] flex items-center justify-center cursor-pointer`}
                >
                  <h1 className="text-base font-semibold">My folders</h1>
                </div>
              </div>
            </div>

            <div className="w-[90%] ml-[5%] mt-[140px] md:mt-[160px] mb-[20px] grid gap-5 grid-cols-1 md:grid-cols-4 overflow-y-auto">
              {folder
                ? publicFolder?.map((a) => (
                    <div
                      key={a.id}
                      className="w-[90%] ml-[5%] rounded-md h-[220px] md:h-[150px]  xl:h-[220px] bg-[#E8EFF9] flex flex-col items-center justify-center"
                    >
                      <div className="h-[80%] p-4">
                        <img
                          src={`${a.id % 2 ? "/Image1.png" : "/Image2.png"}`}
                          alt="/"
                          className="cursor-pointer"
                        />
                      </div>
                      <div className="w-full h-[20%] flex items-center justify-between px-4 pb-4 ">
                        <p className="text-base font-semibold">{a.name}</p>
                        <div className="text-xl">
                          <IoMdMore />
                        </div>
                      </div>
                    </div>
                  ))
                : userFolder?.map((a) => (
                    <div
                      key={a.id}
                      className="w-[90%] ml-[5%] rounded-md h-[220px] md:h-[150px]  xl:h-[220px] bg-[#E8EFF9] flex flex-col items-center justify-center"
                    >
                      <div className="h-[80%] p-4">
                        <img
                          src={`${a.id % 2 ? "/Image1.png" : "/Image2.png"}`}
                          alt="/"
                          className="cursor-pointer"
                        />
                      </div>
                      <div className="w-full h-[20%] flex items-center justify-between px-4 pb-4 ">
                        <p className="text-base font-semibold">{a.name}</p>
                        <div className="text-xl">
                          <IoMdMore />
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        )}
      </>
    </>
  );
}

export default LibraryPage;
