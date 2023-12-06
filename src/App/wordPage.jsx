import { useNavigate, useParams } from "react-router-dom";
import ButtonComponent from "../Components/buttonComponent";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Loading from "../Components/loading";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import WordDetail from "../Components/wordDetail";
import NotificationBox from "../Components/notificationbox";
import WordFramePage from "../Components/wordFramePage";

function WordPage() {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState(null);
  const [notificationTitle, setNotificationTitle] = useState(null);
  const [notificationBody, setNotificationBody] = useState(null);

  const [videoBox, setVideoBox] = useState(false);
  const [video, setVideo] = useState(true);
  const [apiData, setApiData] = useState(null);
  const [spanishData, setSpanishData] = useState(null);
  const [frenchData, setFrenchData] = useState(null);
  const [chineseData, setChineseData] = useState(null);
  const [englishData, setEnglishData] = useState(null);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);

  const [wordData, setWordData] = useState(null);

  const { name, wordId } = useParams();
  const token = useSelector((state) => state.AuthReducer.token);
  function shownotification() {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  }
  useEffect(() => {
    if (token) {
      setLoading1(true);
      axios
        .get(`https://testapi.nhustle.in/pancha/word-detail?id=${wordId}`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((d) => {
          setApiData(d.data);
          setLoading1(false);
        })
        .catch((err) => {
          setLoading1(false);
          setNotificationTitle("Error !!");
          setNotificationBody("Something went wrong.");
          setNotificationType("error");
          shownotification();
        });
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      setLoading2(true);
      axios
        .get(`https://testapi.nhustle.in/pancha/words-complete/${wordId}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
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
  }, [token]);

  useEffect(() => {
    if (apiData) {
      let spanish = apiData?.filter((d) => d.language_name === "Spanish");
      setSpanishData(Array.isArray(spanish) ? spanish[0] : {});

      let french = apiData?.filter((d) => d.language_name === "French");
      setFrenchData(Array.isArray(french) ? french[0] : {});

      let english = apiData?.filter((d) => d.language_name === "English");
      setEnglishData(Array.isArray(english) ? english[0] : {});

      let chinese = apiData?.filter((d) => d.language_name === "Chinese");
      setChineseData(Array.isArray(chinese) ? chinese[0] : {});
    }
  }, [apiData]);

  const splitIndex = wordData?.sign_desc?.indexOf("Memory tip:");
  console.log(splitIndex);
  console.log("11111111", wordData?.sign_desc.slice(0, splitIndex));
  console.log("222222", wordData?.sign_desc.slice(splitIndex));

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

      {loading1 && loading2 ? (
        <Loading />
      ) : (
        <div className="w-full h-[calc(100vh-100px)]">
          <div className=" text-center w-full">
            <h1 className="text-2xl font-semibold">{name}</h1>
          </div>
          <WordFramePage
            englishData={englishData}
            frenchData={frenchData}
            videoData={wordData?.video}
            imgUrl={wordData?.img}
            imgName={wordData?.name}
            chineseData={chineseData}
            spanishData={spanishData}
            showVideoFirst={true}
            // descriptionData={wordData?.sign_desc}
          />
          <div className="w-full flex flex-col  pb-[15px] items-center justify-center ">
            <div className="border my-8 border-black px-8 py-3 w-[96%] md:w-[75%] lg:w-[65%] xl:w-[50%]  ">
              {/* {wordData?.sign_desc} */}
              <p>{wordData?.sign_desc.slice(0, splitIndex)}</p>
              <p className="mt-4">{wordData?.sign_desc.slice(splitIndex)}</p>
            </div>
            <Button
              style={{
                textTransform: "none",
                padding: "6px 16px",
              }}
              onClick={() => navigate(`/add-to-folder/${wordId}`)}
              variant="contained"
            >
              Add to Folder
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default WordPage;
