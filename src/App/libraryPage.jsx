import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import ListLoading from "../Components/listLoading";
import NotificationBox from "../Components/notificationbox";
import { useSelector } from "react-redux";
import { Button, CircularProgress } from "@mui/material";
import { AiFillFolderOpen, AiFillFolderAdd } from "react-icons/ai";
import ButtonComponent from "../Components/buttonComponent";
import { Login } from "@mui/icons-material";

function LibraryPage() {
  const token = useSelector((state) => state.AuthReducer.token);
  const navigate = useNavigate();

  const [selectedFolderName, setSelectedFolderName] = useState("");
  const [publicLoadind, setPublicLoading] = useState(true);
  const [UserLoadind, setUserLoading] = useState(true);
  const [publicFolder, setPublicFolder] = useState([]);
  const [userFolder, setUserFolder] = useState([]);

  const [model, setModel] = useState(false);
  const [newFolder, setNewFolder] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState(null);
  const [notificationTitle, setNotificationTitle] = useState(null);
  const [notificationBody, setNotificationBody] = useState(null);

  const [selectedFolderId, setSelectedFolderId] = useState(null);

  const [folderType, setFolderType] = useState("");

  const userData = useSelector((state) => state.AuthReducer.userData);

  const userId = userData?.id;


  useEffect(() => {
    if (token) {
      axios
        .get("https://testapi.nhustle.in/pancha/public-folder", {
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
          setNotificationTitle("Error !!");
          setNotificationBody("Something went wrong fetching public folders.");
          setNotificationType("error");
          shownotiftion();
        });
    }
  }, [token]);

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
        setNotificationTitle("Error !!");
        setNotificationBody("Something went wrong fetching user folders.");
        setNotificationType("error");
        shownotiftion();
      });
  };

  const handleViewEdit = () => {
    if (!selectedFolderId) {
      setNotificationTitle("Error !!");
      setNotificationBody("Please select folder.");
      setNotificationType("error");
      shownotiftion();
      return;
    }
    navigate(
      `/library/view-edit/${selectedFolderId}/${selectedFolderName}/${folderType}`
    );
  };

  const shownotiftion = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };
  const [loading, setLoading] = useState(false);
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
      <div className="w-full pb-4 md:pb-6 flex flex-col items-center justify-center">
        <h1 className="text-xl my-6">Library</h1>
        <div className="w-[80%] md:w-[50%] lg:w-[35%] border-black border-b-2 ">
          <p className="text-md my-2">Curated Folder</p>
          <div
            className={`p-2 w-full ${
              publicLoadind ? "" : "border-[#725555] border"
            }  pb-2 bg-[#fafafa] rounded-md mb-6`}
          >
            {publicLoadind ? (
              <div className="h-[150px] w-full flex items-center justify-center">
                <ListLoading />
              </div>
            ) : (
              <ul className="w-full min-h-[120px] max-h-[160px] text-base overflow-y-scroll flex flex-col items-start">
                {publicFolder.map((d) => (
                  <div
                    onClick={() => {
                      setSelectedFolderName(d.name);
                      setSelectedFolderId(d.id);
                      setFolderType("curated");
                    }}
                    key={d.id}
                    className={`h-[40px] w-full flex items-center justify-start gap-5 hover:bg-slate-600 hover:text-white focus:ring-violet-300 rounded-sm font-medium px-4 py-2 border-b-2 border-[#f2f2f2] cursor-pointer ${
                      d.id === selectedFolderId ? "bg-slate-600 text-white" : ""
                    }`}
                  >
                    <AiFillFolderOpen className="text-xl font-extrabold" />
                    <li className={`w-full h-full`}>{d.name}</li>
                  </div>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="w-[80%] md:w-[50%] lg:w-[35%]  mt-2 border-black border-b-2">
          <p className="text-md my-2"> My Folder</p>

          <div
            className={`p-2 w-full ${
              UserLoadind ? "" : "border-[#725555] border"
            }  pb-2 bg-[#fafafa] rounded-md mb-6`}
          >
            {UserLoadind ? (
              <div className="h-[150px] w-full flex items-center justify-center">
                <ListLoading />
              </div>
            ) : (
              <ul className="w-full min-h-[120px] max-h-[160px] text-base overflow-y-scroll flex flex-col items-start">
                {userFolder.map((d) => (
                  <div
                    onClick={() => {
                      setSelectedFolderName(d.name);
                      setSelectedFolderId(d.id);
                      setFolderType("users");
                    }}
                    key={d.id}
                    className={`h-[40px] w-full flex items-center justify-start gap-5 hover:bg-slate-600 hover:text-white focus:ring-violet-300 rounded-sm font-medium px-4 py-2 border-b-2 border-[#f2f2f2] cursor-pointer ${
                      d.id === selectedFolderId ? "bg-slate-600 text-white" : ""
                    }`}
                  >
                    <AiFillFolderOpen className="text-xl font-extrabold" />
                    <li className={`w-full h-full`}>{d.name}</li>
                  </div>
                ))}
              </ul>
            )}
          </div>
        </div>
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
        <div className="w-[80%] md:w-[50%] lg:w-[35%]  mt-4 flex flex-col items-start justify-start gap-3 mb-[70px]">
          <ButtonComponent
            btnName="Add New Folder"
            buttonType="success"
            padding={"6px "}
            width="135px"
            text="white"
            onClick={() => setModel(true)}
          />

          <ButtonComponent
            btnName="View/Edit Folder"
            buttonType="success"
            padding="6px"
            width="135px"
            text="white"
            onClick={handleViewEdit}
          />

          <ButtonComponent
            btnName="View Folder in Flashcard Mode"
            padding={"6px "}
            loading={true}
            width="230px"
            text="white"
            onClick={() => {
              if (!selectedFolderId) {
                setNotificationTitle("Error !!");
                setNotificationBody("Please select folder.");
                setNotificationType("error");
                shownotiftion();
              } else {
                navigate(
                  `/flashcard/${selectedFolderName}/${selectedFolderId}`
                );
              }
            }}
          />
        </div>
      </div>
    </>
  );
}

export default LibraryPage;
