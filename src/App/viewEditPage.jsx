import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { useSelector } from "react-redux";
import NotificationBox from "../Components/notificationbox";

export default function ViewEditPage() {
  const navigate = useNavigate();
  const params = useParams();
  const FolderName = params?.name;
  const FolderId = params?.id;

  const token = useSelector((state) => state.AuthReducer.token);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [model, setModel] = useState(false);
  const [newWord, setNewWord] = useState("");
  const [words, setWords] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState(null);
  const [notificationTitle, setNotificationTitle] = useState(null);
  const [notificationBody, setNotificationBody] = useState(null);

  function shownotiftion() {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  }

  useEffect(() => {
    getWordInFolder();
  }, []);

  const getWordInFolder = () => {
    axios
      .get(`https://test.ranuvijay.me/pancha/word-in-each-folder?id=${FolderId}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((d) => {
        setWords(d.data);
      })
      .catch(() => {
        setNotificationTitle("Error !!");
        setNotificationBody("Failded to get words for this folder.");
        setNotificationType("error");
        shownotiftion();
      });
  };

  const handleRemoveWord = () => {
    if (!selectedItemId) {
      setNotificationTitle("Error !!");
      setNotificationBody("Select word to remove.");
      setNotificationType("error");
      shownotiftion();
      return;
    }
    axios
      .delete(
        `https://test.ranuvijay.me/pancha/words-in-folder/${selectedItemId}`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((d) => {
        getWordInFolder();
        setNotificationTitle("Success !!");
        setNotificationBody("Word removed from the folder.");
        setNotificationType("success");
        shownotiftion();
      })
      .catch((e) => {
        setNotificationTitle("Error !!");
        setNotificationBody("Failded to remove the word, try again.");
        setNotificationType("error");
        shownotiftion();
      });
  };

  const handleRemoveFolder = () => {
    axios
      .delete(`https://test.ranuvijay.me/pancha/folder/${FolderId}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then(() => {
        navigate("/library");
      })
      .catch((e) => {
        setNotificationTitle("Error !!");
        setNotificationBody("Failded to delete this folder, try again.");
        setNotificationType("error");
        shownotiftion();
      });
  };

  const handleAddWord = () => {
    if (newWord) {
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
      <div className="w-full pb-4 md:pb-6 flex flex-col items-center justify-center">
        <h1 className="text-xl my-6">{FolderName}</h1>
        <div className="w-[80%]  md:w-[50%] lg:w-[35%] border border-[#725555] rounded-md mb-6 p-2 ">
          <ul className="w-full max-h-[150px] h-[200px] overflow-y-scroll flex flex-col items-start">
            {words.map((d) => (
              <li
                onClick={() => setSelectedItemId(d.id)}
                key={d.id}
                className={`h-[40px] hover:bg-slate-600 hover:text-white focus:ring-violet-300 rounded-sm font-medium px-4 py-2 w-full border-b-2 border-[#f2f2f2] cursor-pointer ${
                  d.id === selectedItemId ? "bg-slate-600 text-white" : ""
                }`}
              >
                {d.word_name}
              </li>
            ))}
          </ul>
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
                  <label className="text-sm">New Word Name</label>
                  <div className="border-[#A2A2A7] mt-2 rounded-md border border-solid flex items-center">
                    <input
                      onChange={(e) => setNewWord(e.target.value)}
                      placeholder="Add New Word"
                      className="text-sm h-10 border-none w-full outline-[.5px] outline-blue-400 px-2 rounded-md"
                    />
                  </div>
                </div>
                <button
                  onClick={handleAddWord}
                  className="w-[80%]  mt-6 text-center py-2 rounded-md bg-blue-400 text-white"
                >
                  Add New Word
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
            className="bg-black w-[150px] text-white rounded-md py-2 px-4"
          >
            Add Word
          </button>
          <button
            onClick={handleRemoveWord}
            className="bg-black  w-[150px] text-white rounded-md py-2 px-4"
          >
            Remove Word
          </button>
          <button
            onClick={handleRemoveFolder}
            className="bg-[#E2202C]  w-[150px] text-white rounded-md py-2 px-4"
          >
            Delete Folder
          </button>
        </div>
      </div>
    </>
  );
}
