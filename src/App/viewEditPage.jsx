import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { useSelector } from "react-redux";
import NotificationBox from "../Components/notificationbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import ButtonComponent from "../Components/buttonComponent";
import { FiArrowLeft } from "react-icons/fi";

export default function ViewEditPage() {
  const navigate = useNavigate();
  const params = useParams();
  const FolderName = params?.name;
  const FolderId = params?.id;

  const { folderType } = useParams();

  const token = useSelector((state) => state.AuthReducer.token);
  const [model, setModel] = useState(false);
  const [words, setWords] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState(null);
  const [notificationTitle, setNotificationTitle] = useState(null);
  const [notificationBody, setNotificationBody] = useState(null);

  const [open, setOpen] = useState(false);

  const [apiWords, setApiWords] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const [inputWord, setInputWord] = useState("");
  const [loadingSearch, setLoadingSearch] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("");

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
      .get(`https://api.pancha.kids/pancha/word-in-each-folder?id=${FolderId}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((d) => {
        setWords(d.data);
      })
      .catch(() => {
        setNotificationTitle("Error!");
        setNotificationBody("Failed to get words for this folder.");
        setNotificationType("error");
        shownotification();
      });
  };

  const handleRemoveWord = () => {
    if (!selectedItemId) {
      setNotificationTitle("Error!");
      setNotificationBody("Select a word to remove.");
      setNotificationType("error");
      shownotification();
      return;
    }
    axios
      .delete(
        `https://api.pancha.kids/pancha/words-in-folder/${selectedItemId}`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((d) => {
        getWordInFolder();
        setNotificationTitle("Success!");
        setNotificationBody("Word removed from the folder.");
        setNotificationType("success");
        shownotification();
      })
      .catch((e) => {
        // if(e.response.data)
        // {
        //   if(e.response.data?.)
        // }
        setNotificationTitle("Error!");
        setNotificationBody("Failed to remove the word, please try again.");
        setNotificationType("error");
        shownotification();
      });
  };

  const handleRemoveFolder = () => {
    axios
      .delete(`https://api.pancha.kids/pancha/folder/${FolderId}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then(() => {
        setNotificationTitle("Success!");
        setNotificationBody("Folder deleted.");
        setNotificationType("success");
        shownotification();

        setTimeout(() => {
          navigate("/library");
        }, 400);
      })
      .catch((e) => {
        setNotificationTitle("Error!");
        setNotificationBody("Failed to delete this folder, please try again.");
        setNotificationType("error");
        shownotification();
      });
  };

  const handleAddWord = () => {
    if (!selectedWord) {
      setNotificationTitle("Error!");
      setNotificationBody("Select a word to add.");
      setNotificationType("error");
      shownotification();
    } else {
      axios
        .post(
          "https://api.pancha.kids/pancha/words-in-folder/",
          {
            folder: FolderId,
            word: selectedWord?.id,
          },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        )
        .then((d) => {
          closeModal();
          // setModel(false);
          // getWordInFolder();
          setNotificationTitle("Success!");
          setNotificationBody("Word added to selected folder.");
          setNotificationType("success");
          shownotification();
        })
        .catch((e) => {
          if (e.response.data) {
            if (e.response.data?.non_field_errors) {
              setNotificationTitle("Error!");
              setNotificationBody("Word already in the folder.");
              setNotificationType("error");
              shownotification();
            } else {
              setNotificationTitle("Error!");
              setNotificationBody("Something went wrong, try again.");
              setNotificationType("error");
              shownotification();
            }
          } else {
            setNotificationTitle("Error!");
            setNotificationBody("Something went wrong, try again.");
            setNotificationType("error");
            shownotification();
          }
        });
    }
  };

  const handleSearch = (e) => {
    const inputValue = e?.target?.value;
    setInputWord(inputValue);
    setOpen(true);

    if (inputValue) {
      setLoadingSearch(true);
      axios
        .get(`https://api.pancha.kids/pancha/search-word?word=${inputValue}`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
          .then((d) => {
          if (d.data.length === 0) {
            setShowPopup(true);
            setRedirectUrl(`/settings/feedback?word=${inputValue}`);
          } else {
            setShowPopup(false);
            setRedirectUrl("");
          }
          setApiWords(d.data);
          setLoadingSearch(false);
        })
        .catch((err) => {
          setLoadingSearch(false);
          setNotificationTitle("Error!");
          setNotificationBody("Something went wrong.");
          setNotificationType("error");
          shownotification();
        });
    } else {
      setApiWords([]);
      setInputWord("");
      setOpen(false);
    }
  };

  const handleChange = (event, newValue) => {
    setSelectedWord(newValue);
    setOpen(false);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    // setWordNotFound(false);
  };

  const closeModal = () => {
    setModel(false);
    getWordInFolder();
    // setWords([])
    setSelectedWord(null);
    setSelectedItemId(null);
    setApiWords([]);
    setOpen(false);
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
        {/* <div className="flex h-[40px] "> */}
        <div
          onClick={() => navigate("/library")}
          className="text-xl cursor-pointer absolute   top-[78px] left-[10%]"
        >
          <FiArrowLeft />
        </div>
        <h1 className="text-xl my-6">{FolderName}</h1>
        {/* </div> */}
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
                onClick={closeModal}
                className="absolute top-0 right-0 m-5 text-xl cursor-pointer"
              >
                <AiOutlineClose />
              </div>
              <form className="w-full flex flex-col gap-6 items-center justify-center">
                <div className="w-[80%]">
                  <p className="text-sm my-3">New Word Name</p>
                  <Autocomplete
                    open={open}
                    loading={loadingSearch}
                    value={selectedWord}
                    onChange={handleChange}
                    options={apiWords}
                    getOptionLabel={(option) => option.english}
                    style={{ width: "100%" }}
                    noOptionsText="No Words Found"
                    // noOptionsText={
                    //   <Link to={`/settings/feedback?word=${inputWord}`}>
                    //     {
                    //       <p>
                    //         No word found, suggest <b> {inputWord} </b> to add
                    //         to dictionary.
                    //       </p>
                    //     }
                    //   </Link>
                    // }
                    renderInput={(params) => (
                      <TextField {...params} label="Type a Word" />
                    )}
                    onInputChange={(event, newInputValue) => {
                      handleSearch({ target: { value: newInputValue } });
                    }}
                  />
                </div>

                <ButtonComponent
                  btnName="Add Word"
                  padding={"12px "}
                  width="80%"
                  text="white"
                  onClick={handleAddWord}
                />
              </form>
            </div>
          </div>
        ) : (
          ""
        )}

        {showPopup && (
          <div
            className="bg-[#1f1f1f] opacity-60 top-[50px] 
           absolute z-50 w-full h-[calc(100vh-100px)]"
          />
        )}

        <div
          className={`fixed top-6 right-0 shadow-lg z-50 w-full rounded-2xl transition-transform duration-300 transform ${
            showPopup ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="w-[80%] md:w-[50%] fixed top-0 right-[10px] lg:w-[35%] bg-white p-4 rounded-lg">
            <p className="w-full text-left">
              Word Not Found Would you like to request to add it to future
              updates?
            </p>
            <div className="mt-4 mb-2 flex w-full gap-3 ">
              <ButtonComponent
                btnName="Yes"
                buttonType="success"
                padding={"3px "}
                width="80px"
                text="white"
                onClick={() => {
                  navigate(redirectUrl);
                }}
              />

              <ButtonComponent
                btnName="No"
                buttonType="error"
                padding={"3px "}
                width="80px"
                text="white"
                onClick={handleClosePopup}
              />
            </div>
          </div>
        </div>

        <div className="w-[80%] md:w-[50%] lg:w-[35%]  mt-4 flex flex-col items-start justify-start gap-3 mb-[70px]">
          <ButtonComponent
            btnName="Add Word"
            buttonType="success"
            padding={"6px "}
            width="120px"
            text="white"
            onClick={() => setModel(true)}
          />

          <ButtonComponent
            btnName="Remove Word"
            buttonType="error"
            padding={"6px "}
            width="120px"
            text="white"
            onClick={handleRemoveWord}
          />

          <ButtonComponent
            btnName="Delete Folder"
            buttonType="error"
            padding={"6px "}
            width="120px"
            text="white"
            onClick={handleRemoveFolder}
          />
        </div>
      </div>
    </>
  );
}
