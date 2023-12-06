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
import { Button } from "@mui/material";
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
  const [videoBox, setVideoBox] = useState(false);
  const [wordIndex, setWordIndex] = useState(null);

  // const [selectedFolder, setSelectedFolder] = useState("");
  // const [selectedFolderId, setSelectedFolderId] = useState("");

  const [wordsInFolder, setWordsInFolder] = useState([]);
  const [currentWordId, setCurrentWordId] = useState(null);

  const [wordData, setWordData] = useState(null);
  const [wordDaetail, setWordDetail] = useState(null);

  const [spanishData, setSpanishData] = useState(null);
  const [frenchData, setFrenchData] = useState(null);
  const [chineseData, setChineseData] = useState(null);
  const [englishData, setEnglishData] = useState(null);
  const [video, setVideo] = useState(true);

  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState(null);
  const [notificationTitle, setNotificationTitle] = useState(null);
  const [notificationBody, setNotificationBody] = useState(null);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);

  // useEffect(() => {
  //   if (name) setSelectedFolder(name);
  //   if (id) setSelectedFolderId(id);
  // }, [name, id]);
  function shownotification() {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  }
  useEffect(() => {
    if (token) {
      axios
        .get("https://testapi.nhustle.in/pancha/folder/", {
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
      .get(`https://testapi.nhustle.in/pancha/word-in-each-folder?id=${idd}`, {
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
            setWordDetail(null);

            setSpanishData(null);
            setFrenchData(null);
            setChineseData(null);
            setEnglishData(null);
          }
        } else {
          setWordIndex(null);
          setCurrentWordId(null);
          setWordData(null);
          setWordDetail(null);

          setSpanishData(null);
          setFrenchData(null);
          setChineseData(null);
          setEnglishData(null);
        }
      })
      .catch((err) => {
        setLoading1(false);
        setNotificationTitle("Error !!");
        setNotificationBody("Something went wrong.");
        setNotificationType("error");
        shownotification();
      });
  };

  useEffect(() => {
    if (wordIndex) {
      setCurrentWordId(wordsInFolder[wordIndex]?.word);
    }
  }, [wordIndex]);

  useEffect(() => {
    // if (currentWordId) console.log("currentWordId", currentWordId);

    if (currentWordId) {
      setLoading1(true);
      axios
        .get(
          `https://testapi.nhustle.in/pancha/word-detail?id=${currentWordId}`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        )
        .then((d) => {
          setWordDetail(d.data);
          setLoading1(false);
        })
        .catch((err) => {
          setLoading1(false);
          setNotificationTitle("Error !!");
          setNotificationBody("Something went wrong.");
          setNotificationType("error");
          shownotification();
        });

      setLoading2(true);
      axios
        .get(
          `https://testapi.nhustle.in/pancha/words-complete/${currentWordId}/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        )
        .then((d) => {
          setWordData(d.data);
          setLoading2(false);
        })
        .catch((err) => {
          setLoading2(false);
          setNotificationTitle("Error !!");
          setNotificationBody("Something went wrong.");
          setNotificationType("error");
          shownotification();
        });
    }
  }, [currentWordId]);

  useEffect(() => {
    if (wordDaetail) {
      let spanish = wordDaetail?.filter((d) => d.language_name === "Spanish");
      setSpanishData(Array.isArray(spanish) ? spanish[0] : {});

      let french = wordDaetail?.filter((d) => d.language_name === "French");
      setFrenchData(Array.isArray(french) ? french[0] : {});

      let english = wordDaetail?.filter((d) => d.language_name === "English");
      setEnglishData(Array.isArray(english) ? english[0] : {});

      let chinese = wordDaetail?.filter((d) => d.language_name === "Chinese");
      setChineseData(Array.isArray(chinese) ? chinese[0] : {});
    }
  }, [wordDaetail]);

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
        {loading1 && loading2 ? (
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
                  // value={selectedFolder}
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
                <div className="w-full h-[calc(100vh-100px)]">
                  <WordFramePage
                    englishData={englishData}
                    frenchData={frenchData}
                    videoData={wordData?.video}
                    imgUrl={wordData?.img}
                    imgName={wordData?.name}
                    chineseData={chineseData}
                    spanishData={spanishData}
                    showVideoFirst={false}
                  />
                </div>
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
              </>

              // <>
              //   <div
              //     className="mt-14 px-1 ms:px-4
              //     w-[96%] md:w-[75%] lg:w-[65%] xl:w-[50%] flex flex-col gap-y-5 md:gap-y-6 lg:gap-y-8
              //        rounded-md items-center justify-center"
              //   >
              //     <WordDetail data={englishData} />

              //     <div className="w-full flex items-center justify-center gap-2 md:gap-x-8 lg:gap-x-12">
              //       <WordDetail data={frenchData} />

              //       <div className="w-[200px] flex flex-col gap-y-2 items-center justify-center">
              //         {video ? (
              //           <div className="w-[200px] rounded-md h-[100px] flex flex-col items-center justify-center">
              //             <div className="w-[80%]  border-2 ">
              //               <video
              //                 src={wordData?.video}
              //                 muted
              //                 controls
              //                 autoPlay
              //                 loop
              //                 className="w-full h-full outline-none"
              //               />
              //             </div>
              //           </div>
              //         ) : (
              //           <div className="w-[200px]  h-[100px] flex flex-col items-center justify-center">
              //             <img
              //               src={wordData?.img}
              //               alt={`${wordData?.img}`}
              //               className="h-full w-full"
              //             />
              //           </div>
              //         )}
              //         <div className="flex gap-2">
              //           <p
              //             onClick={() => setVideo(true)}
              //             className={`w-3 h-3 border-black border rounded-full cursor-pointer ${
              //               video ? "bg-black" : ""
              //             }`}
              //           ></p>
              //           <p
              //             onClick={() => setVideo(false)}
              //             className={`w-3 h-3 border-black border rounded-full cursor-pointer ${
              //               video ? "" : "bg-black"
              //             }`}
              //           ></p>
              //         </div>
              //       </div>

              //       <WordDetail data={chineseData} />
              //     </div>

              //     {videoBox ? (
              //       <div className="w-[96%] rounded-t-md md:w-[75%] lg:w-[65%] xl:w-[50%] fixed flex flex-col items-center justify-center">
              //         <div className="h-[30px] md:h-[40px] rounded-t-md pr-4 w-full bg-[#bfbfbf] flex justify-end items-center">
              //           <AiOutlineClose
              //             // onClick={() => setVideoBox(false)}
              //             className="cursor-pointer"
              //           />
              //         </div>
              //         <video
              //           src="/play_video.mp4"
              //           controls
              //           autoPlay
              //           className="w-full h-full"
              //         />
              //       </div>
              //     ) : (
              //       ""
              //     )}

              //     <WordDetail data={spanishData} />
              //   </div>

              //   <div
              //     className="w-[96%] mt-10 pb-10  md:w-[75%] lg:w-[65%] xl:w-[50%] flex
              //  items-center justify-around text-3xl md:text-4xl text-[#917d7d] "
              //   >
              //     <HiArrowSmLeft
              //       onClick={handlePrevious}
              //       className="cursor-pointer"
              //     />
              //     <HiOutlineRefresh
              //       onClick={handleSerial}
              //       className="cursor-pointer"
              //     />
              //     <LiaRandomSolid onClick={handleRandom} className="cursor-pointer" />
              //     <HiArrowSmRight onClick={handleNext} className="cursor-pointer" />
              //   </div>
              // </>
            )}
          </div>
        )}
      </>
    </>
  );
}

export default FlashcardMode;
