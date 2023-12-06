import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  HiArrowSmLeft,
  HiArrowSmRight,
  HiOutlineRefresh,
} from "react-icons/hi";
import { LiaRandomSolid } from "react-icons/lia";
import axios from "axios";
import { useSelector } from "react-redux";
import WordDetail from "../Components/wordDetail";
import WordFramePage from "../Components/wordFramePage";

import NotificationBox from "../Components/notificationbox";
import Loading from "../Components/loading";

function FlashcardMode() {
  const navigate = useNavigate();
  const params = useParams();
  const FolderName = params?.name;

  const { name, id } = useParams();

  const token = useSelector((state) => state.AuthReducer.token);
  const [allFolders, setAllFolder] = useState([]);
  const [wordIndex, setWordIndex] = useState(null);

  const [wordsInFolder, setWordsInFolder] = useState([]);
  const [currentWordId, setCurrentWordId] = useState(null);

  const [wordData, setWordData] = useState(null);

  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState(null);
  const [notificationTitle, setNotificationTitle] = useState(null);
  const [notificationBody, setNotificationBody] = useState(null);

  const [loading2, setLoading2] = useState(true);

  const [selectedFolder, setSelectedFolder] = useState(null);

  function shownotification() {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  }

  useEffect(() => {
    if (token) {
      axios
        .get("https://api.pancha.kids/pancha/folder/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((d) => {
          setAllFolder(d.data);
        });
    }
  }, [token]);

  useEffect(() => {
    if (token) getWordsInFolder(id);
  }, [token, id]);

  const handleFolderChange = (e) => {
    setSelectedFolder(e.target.value);
    // console.log("eeeee", e.target.value);

    let g = allFolders.filter((d) => d.name === e.target.value);
    if (Array.isArray(g)) {
      let ghj = g[0]?.id;

      getWordsInFolder(ghj);
    }
    // setSelectedFolder(e.target.value);
    // navigate(`/library/${e.target.value}`);
  };

  const getWordsInFolder = (idd) => {
    setWordIndex(null);
    axios
      .get(`https://api.pancha.kids/pancha/word-in-each-folder?id=${idd}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((d) => {
        setWordsInFolder(d.data);
        if (Array.isArray(d.data)) {
          if (d.data.length > 0) {
            setWordIndex("0");
            // setCurrentWordId(d.data[0]?.word);
          } else {
            setWordIndex(null);
            setCurrentWordId(null);
            setWordData(null);
          }
        } else {
          setWordIndex(null);
          setCurrentWordId(null);
          setWordData(null);
        }
      });
  };

  useEffect(() => {
    if (wordIndex) {
      setCurrentWordId(wordsInFolder[wordIndex]?.word);
    }
  }, [wordIndex]);

  useEffect(() => {
    if (currentWordId) {
      setLoading2(true);

      axios
        .get(
          `https://api.pancha.kids/pancha/words-complete/${currentWordId}/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        )
        .then((d) => {
          setLoading2(false);
          setWordData(d.data);
        })
        .catch((err) => {
          setLoading2(false);
          setNotificationTitle("Error!");
          setNotificationBody("Something went wrong.");
          setNotificationType("error");
          shownotification();
        });
    }
  }, [currentWordId]);

  const handlePrevious = () => {
    if (wordIndex === "0") {
      let gg = wordsInFolder.length - 1;
      setWordIndex(JSON.stringify(gg));
    } else {
      let ff = parseInt(wordIndex) - 1;
      setWordIndex(JSON.stringify(ff));
    }
  };
  const handleSerial = () => {
    if (wordIndex === wordsInFolder.length - 1) {
      setWordIndex(0);
    } else {
      setWordIndex(wordIndex + 1);
    }
  };
  const handleRandom = () => {
    const randomIndex = Math.floor(Math.random() * wordsInFolder.length);
    setWordIndex(JSON.stringify(randomIndex));
  };
  const handleNext = () => {
    let gh = wordsInFolder.length - 1;
    if (wordIndex === JSON.stringify(gh)) {
      setWordIndex("0");
    } else {
      let ff = parseInt(wordIndex) + 1;
      setWordIndex(JSON.stringify(ff));
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

      <>
        {loading2 ? (
          <Loading />
        ) : (
          <div className="w-full h-[calc(100vh-100px)] pb-4 md:pb-6 flex flex-col items-center tify-center">
            <div className=" text-center w-full">
              <h1 className="text-2xl font-semibold">{name}</h1>
            </div>

            <div className="w-[80%] mt-10  md:w-[50%] lg:w-[45%] xl:w-[40%] ">
              <label className="">choose the different folder</label>
              <div className="border-[#7c7c7f] mt-2 rounded-md border border-solid flex items-center px-2">
                <select
                  value={selectedFolder ? selectedFolder : name}
                  onChange={handleFolderChange}
                  placeholder="10-3-23"
                  className=" text-sm h-10 bg-white  border-none w-full outline-none px-2"
                >
                  {allFolders?.map((d) => (
                    <option key={d.id} className="w-[200px]">
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {!wordData ? (
              <p className="mt-10">No Data</p>
            ) : (
              <>
                <p className="mt-4">{wordData?.english}</p>

                <div className="w-full h-[calc(100vh-100px)]">
                  <WordFramePage wordData={wordData} showVideoFirst={false} />
                </div>
                {wordsInFolder.length > 1 && (
                  <div
                    className="w-[96%] mt-10 pb-10  md:w-[75%] lg:w-[65%] xl:w-[50%] flex 
                    items-center justify-around text-3xl md:text-4xl text-[#917d7d] "
                  >
                    <HiArrowSmLeft
                      onClick={handlePrevious}
                      className="cursor-pointer"
                    />
                    <HiOutlineRefresh
                      onClick={handleSerial}
                      className="cursor-pointer"
                    />
                    <LiaRandomSolid
                      onClick={handleRandom}
                      className="cursor-pointer"
                    />
                    <HiArrowSmRight
                      onClick={handleNext}
                      className="cursor-pointer"
                    />
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </>
    </>
  );
}

export default FlashcardMode;
