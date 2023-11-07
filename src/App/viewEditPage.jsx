import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { useSelector } from "react-redux";
import NotificationBox from "../Components/notificationbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Button } from "@mui/material";

export default function ViewEditPage() {
  const navigate = useNavigate();
  const params = useParams();
  const FolderName = params?.name;
  const FolderId = params?.id;

  const token = useSelector((state) => state.AuthReducer.token);
  console.log("token", token);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [model, setModel] = useState(false);
  const [newWord, setNewWord] = useState("");
  const [words, setWords] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState(null);
  const [notificationTitle, setNotificationTitle] = useState(null);
  const [notificationBody, setNotificationBody] = useState(null);
  const [apiWords, setApiWords] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const [inputWord, setInputWord] = useState("");
  const [showRedirectButton, setShowRedirectButton] = useState(false);

  function shownotification() {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  }

  useEffect(() => {
    if (token) {
      getWordInFolder();
    }
  }, [token]);

  const getWordInFolder = () => {
    axios
      .get(
        `http://localhost:8000/pancha/word-in-each-folder?id=${FolderId}`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((d) => {
        setWords(d.data);
      })
      .catch(() => {
        setNotificationTitle("Error !!");
        setNotificationBody("Failed to get words for this folder.");
        setNotificationType("error");
        shownotification();
      });
  };

  const handleRemoveWord = () => {
    if (!selectedItemId) {
      setNotificationTitle("Error !!");
      setNotificationBody("Select a word to remove.");
      setNotificationType("error");
      shownotification();
      return;
    }
    axios
      .delete(
        `http://localhost:8000/pancha/words-in-folder/${selectedItemId}`,
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
        shownotification();
      })
      .catch((e) => {
        setNotificationTitle("Error !!");
        setNotificationBody("Failed to remove the word, please try again.");
        setNotificationType("error");
        shownotification();
      });
  };

  const handleRemoveFolder = () => {
    axios
      .delete(`http://localhost:8000/pancha/folder/${FolderId}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then(() => {
        navigate("/library");
      })
      .catch((e) => {
        setNotificationTitle("Error !!");
        setNotificationBody("Failed to delete this folder, please try again.");
        setNotificationType("error");
        shownotification();
      });
  };

  const handleAddWord = () => {
    if (newWord) {
      //
    }
  };

  const handleSearch = (e) => {
    const inputValue = e?.target?.value;
    setInputWord(inputValue);

    if (inputValue) {
      axios
        .get(
          `http://localhost:8000/pancha/search-word?word=${inputValue}`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        )
        .then((d) => {
          // console.log(apiWords);
          setApiWords(d.data);
          setShowRedirectButton(d.data.length === 0);
        })
        .catch((err) => {
          setNotificationTitle("Error !!");
          setNotificationBody("Something went wrong.");
          setNotificationType("error");
          shownotification();
        });
    } else {
      setApiWords([]);
      setShowRedirectButton(false);
    }
  };

  const handleChange = (event, newValue) => {
    setSelectedWord(newValue);
  };
  // console.log(selectedItemId);
  console.log(showRedirectButton);
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
          <div className="w-full z-10 fixed top-[50px] bottom-[50px] bg-[#18171741] flex items-center justify-center">
            <div className="w-[80%] md:w-[50%] lg:w-[35%] h-[300px] relative shadow-md rounded-md bg-white opacity-100 flex flex-col items-center justify-center">
              <div
                onClick={() => setModel(false)}
                className="absolute top-0 right-0 m-5 text-xl cursor-pointer"
              >
                <AiOutlineClose />
              </div>
              <form className="w-full flex flex-col items-center justify-center">
                <div className="w-[80%]">
                  <p className="text-sm my-3">New Word Name</p>
                  <Autocomplete
                    open={inputWord ? true : false}
                    loading={apiWords.length > 0 ? true : false}
                    value={selectedWord}
                    onChange={handleChange}
                    options={apiWords}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 250 }}
                    renderInput={(params) =>
                      showRedirectButton ? (
                        <div>
                          <p>This Words is Not Found</p>
                          <Button
                            onClick={() => navigate("/settings/feedback")}
                            className="w-full py-2 rounded-md bg-blue-400 text-white"
                          >
                            Feedback
                          </Button>
                        </div>
                      ) : (
                        <TextField {...params} label="Type a Word" />
                      )
                    }
                    onInputChange={(event, newInputValue) => {
                      handleSearch({ target: { value: newInputValue } });
                    }}
                  />
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
          {/* <button
            onClick={() => setModel(true)}
            className="bg-black w-[150px] text-white rounded-md py-2 px-4"
          >
            Add Word
          </button> */}
          <Button
            style={{
              width:"8rem",
              textTransform: "none",
              padding: "6px 16px",
            }}
            onClick={() => setModel(true)}
            variant="contained"
          >
            Add Word
          </Button>

          {/* <button
            onClick={handleRemoveWord}
            className="bg-black  w-[150px] text-white rounded-md py-2 px-4"
          >
            Remove Word
          </button> */}
          <Button
            style={{
              width:"8rem",
              textTransform: "none",
              padding: "6px 16px",
            }}
            onClick={handleRemoveWord}
            variant="contained"
          >
            Remove Word
          </Button>
          {/* <button
            onClick={handleRemoveFolder}
            className="bg-[#E2202C]  w-[150px] text-white rounded-md py-2 px-4"
          >
            Delete Folder
          </button> */}
          <Button
            style={{
              width:"8rem",
              textTransform: "none",
              padding: "6px 16px",
            }}
            onClick={handleRemoveFolder}
            variant="contained"
          >
            Delete Folder
          </Button>
        </div>
      </div>
    </>
  );
}
