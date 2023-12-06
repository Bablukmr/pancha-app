import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../Components/loading";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import WordFramePage from "../Components/wordFramePage";
import NotificationBox from "../Components/notificationbox";

function WordPage() {
  const navigate = useNavigate();

  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState(null);
  const [notificationTitle, setNotificationTitle] = useState(null);
  const [notificationBody, setNotificationBody] = useState(null);

  const [loading, setLoading] = useState(true);

  const [wordData, setWordData] = useState(null);

  const { name, wordId } = useParams();
  const token = useSelector((state) => state.AuthReducer.token);

  const [splitINdex, setIndexSplit] = useState(null);

  function shownotification() {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  }

  // const splitIndex = wordData?.sign_desc?.indexOf("Memory tip:");

  useEffect(() => {
    if (token) {
      setLoading(true);
      axios
        .get(`https://api.pancha.kids/pancha/words-complete/${wordId}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((d) => {
          setWordData(d.data);
          setLoading(false);
          setIndexSplit(d.data?.sign_desc?.indexOf("Memory tip:"));
        })
        .catch((err) => {
          setLoading(false);
          setNotificationTitle("Error!");
          setNotificationBody(
            "Something went wrong fetching word detail, try again."
          );
          setNotificationType("error");
          shownotification();
        });
    }
  }, [token]);

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

      {loading ? (
        <Loading />
      ) : (
        <div className="w-full h-[calc(100vh-100px)] mt-4 mb-10 flex flex-col items-center">
          <div className=" text-center w-full">
            <h1 className="text-2xl font-semibold">{name}</h1>
          </div>

          <WordFramePage wordData={wordData} showVideoFirst={true} />

          <div className="w-full flex flex-col  pb-[15px] items-center justify-center ">
            <div className="border my-8 border-black px-8 py-3 w-[94%] md:w-[75%] lg:w-[65%] xl:w-[50%]  ">
              <p className="m-0 p-0">
                {wordData?.sign_desc.slice(0, splitINdex)}
              </p>
              <p className="m-0 p-0 mt-4">
                {wordData?.sign_desc.slice(splitINdex)}
              </p>
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
