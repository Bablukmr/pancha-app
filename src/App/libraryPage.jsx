import { useNavigate } from "react-router-dom";
import ButtonComponent from "../Components/buttonComponent";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import ListLoading from "../Components/listLoading";
import NotificationBox from "../Components/notificationbox";
import { useSelector } from "react-redux";

function LibraryPage() {
  const token = useSelector((state) => state.AuthReducer.token);
  const [folder, setFolder] = useState("");
  const navigate = useNavigate();

  const [selectedItemId, setSelectedItemId] = useState(null);
  const [publicLoadind, setPublicLoading] = useState(true);
  const [UserLoadind, setUserLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://testapi.nhustle.in/pancha/public-folder", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        const data = res.data;
        // console.log(data);
        setPublicFolder(data);
        setPublicLoading(false);
      })
      .catch((err) => console.log("Server Error", err));
    // setPublicLoading(false);
  }, []);
  const [publicFolder, setPublicFolder] = useState([]);

  useEffect(() => {
    getUserFolder();
  }, []);

  const getUserFolder = () => {
    setUserLoading(true);
    axios
      .get("https://testapi.nhustle.in/pancha/user-folder", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })

      .then((res) => {
        const data = res.data;
        // console.log(data);
        setUserFolder(data?.reverse());
        setUserLoading(false);
      })
      .catch((err) => {
        setUserLoading(false);
        setNotificationTitle("Error !!");
        setNotificationBody("Something Went to wrong");
        setNotificationType("error");
        shownotiftion();
        console.log("Server Error", err);
      });
  };

  const [userFolder, setUserFolder] = useState([]);

  const handleViewEdit = () => {
    if (!selectedItemId) {
      alert("Please Select Folder");
      return;
    }
    navigate(`/library/view-edit/${folder}`);
  };
  // console.log("publicLoadind", publicLoadind);
  const [model, setModel] = useState(false);
  const [newFolder, setNewFolder] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState(null);
  const [notificationTitle, setNotificationTitle] = useState(null);
  const [notificationBody, setNotificationBody] = useState(null);
  const shownotiftion = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };
  const [loading, setLoading] = useState(false);
  const handleAddFolder = (e) => {
    e.preventDefault();
    if (!newFolder) {
      setNotificationTitle("Error !!");
      setNotificationBody("New Folder Name Missing");
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
          user: 2,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((res) => {
        getUserFolder();
        const data = res.data;
        console.log("data", data);
        setNewFolder("");
        setModel(false);
        setLoading(false);
        setNotificationTitle("Sucess !!");
        setNotificationBody("Folder Added Sucessfully");
        setNotificationType("success");
        shownotiftion();
      })
      .catch((err) => {
        console.log("Server Error", err);
        setNotificationTitle("Error !!");
        setNotificationBody("Something Went to wrong");
        setNotificationType("error");
        shownotiftion();
      });
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
              <ul className="w-full max-h-[150px]  overflow-y-scroll flex flex-col items-start  ">
                {publicFolder.map((keyword) => (
                  <li
                    onClick={() => {
                      setFolder(keyword.name);
                      setSelectedItemId(keyword.id);
                    }}
                    key={keyword.id}
                    className={`h-[40px] hover:bg-slate-600 hover:text-white focus:ring-violet-300 rounded-sm font-medium px-4 py-2 w-full border-b-2 border-[#f2f2f2] cursor-pointer ${
                      keyword.id === selectedItemId
                        ? "bg-slate-600 text-white"
                        : ""
                    } `}
                  >
                    {keyword.name}
                  </li>
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
              <ul className="w-full max-h-[150px]  overflow-y-scroll flex flex-col items-start ">
                {userFolder.map((keyword) => (
                  <li
                    onClick={() => {
                      setFolder(keyword.name);
                      setSelectedItemId(keyword.id);
                    }}
                    key={keyword.id}
                    className={`h-[40px] hover:bg-slate-600 hover:text-white focus:ring-violet-300 rounded-sm font-medium px-4 py-2 w-full border-b-2 border-[#f2f2f2] cursor-pointer ${
                      keyword.id === selectedItemId
                        ? "bg-slate-600 text-white"
                        : ""
                    } `}
                  >
                    {keyword.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        {model ? (
          <div className="w-full fixed top-[50px] bottom-[50px] bg-[#18171741] flex items-center justify-center">
            <div className="w-[80%] md:w-[50%] lg:w-[35%] h-[300px] relative shadow-md rounded-md bg-white opacity-100 flex flex-col items-center justify-center">
              <div
                onClick={() => setModel(false)}
                className="absolute top-0 right-0 m-5 text-xl cursor-pointer"
              >
                <AiOutlineClose />
              </div>
              <form className="w-full flex flex-col items-center justify-center">
                <div className="w-[80%]">
                  <label className="text-sm">New Folder Name</label>
                  <div className="border-[#A2A2A7] mt-2 rounded-md border border-solid flex items-center">
                    <input
                      value={newFolder}
                      onChange={(e) => setNewFolder(e.target.value)}
                      placeholder="New Folder Name"
                      className="text-sm h-10 border-none w-full outline-[.5px] outline-blue-400 px-2 rounded-md"
                    />
                  </div>
                </div>
                <button
                  disabled={loading}
                  onClick={handleAddFolder}
                  className="w-[80%]  mt-6 text-center py-2 rounded-md bg-blue-400 text-white"
                >
                  {loading ? "Added.." : "Add New Folder"}
                </button>
              </form>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="w-[80%] md:w-[50%] lg:w-[35%]  mt-4 flex flex-col items-start justify-start gap-3 mb-[70px]">
          <button
            onClick={() => setModel(true)}
            className="bg-[#A0E200] text-white rounded-md py-2 px-4"
          >
            Add New Folder
          </button>
          <button
            onClick={handleViewEdit}
            className="bg-[#E2202C] text-white rounded-md py-2 px-4"
          >
            View/Edit Folder
          </button>
          <ButtonComponent
            onClick={() => {
              if (!selectedItemId) {
                alert("Please Select Folder");
              }
              navigate(`/library/${folder}`);
            }}
            bg="white"
            text="white"
            btnName="View Folder in Flashcard Mode"
          />
        </div>
      </div>
    </>
  );
}

export default LibraryPage;
