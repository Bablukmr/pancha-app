import { useNavigate, useParams } from "react-router-dom";
import ButtonComponent from "../Components/buttonComponent";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Loading from "../Components/loading";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import WordDetail from "../Components/wordDetail";

function WordPage() {
  const navigate = useNavigate();

  const [videoBox, setVideoBox] = useState(false);
  const [video, setVideo] = useState(true);
  const [loading, setLoading] = useState(false);

  const [apiData, setApiData] = useState(null);

  const [spanishData, setSpanishData] = useState(null);
  const [frenchData, setFrenchData] = useState(null);
  const [chineseData, setChineseData] = useState(null);
  const [englishData, setEnglishData] = useState(null);

  const [wordData, setWordData] = useState(null);

  const { name, wordId } = useParams();
  const token = useSelector((state) => state.AuthReducer.token);

  useEffect(() => {
    if (token) {
      axios
        .get(`http://localhost:8000/pancha/word-detail?id=${wordId}`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((d) => {
          setApiData(d.data);
          console.log("tyttttttt", d.data);
        });
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      axios
        .get(`http://localhost:8000/pancha/words-complete/${wordId}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((d) => {
          setWordData(d.data);
          console.log("tyttttttt", d.data);
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

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full bg-[green] h-[calc(100vh-100px)] my-10 flex flex-col items-center">
          <div className=" text-center w-full">
            <h1 className="text-2xl font-semibold">{name}</h1>
          </div>
          <div
            className="mt-10 px-1 ms:px-4
            w-[96%] md:w-[75%] lg:w-[65%] xl:w-[50%] flex flex-col gap-y-5 md:gap-y-6 lg:gap-y-8 
               bg-[red]   rounded-md items-center justify-center"
          >
            <WordDetail data={englishData} />

            <div className="w-full flex items-center justify-center gap-2 md:gap-x-8 lg:gap-x-12">
              <WordDetail data={frenchData} />

              <div className="w-[200px] flex flex-col gap-y-2 items-center justify-center">
                {video ? (
                  <div className="w-[200px] h-[100px] flex flex-col items-center justify-center">
                    <div className="w-[80%]  border-2 ">
                      <video
                        src={wordData?.video}
                        muted
                        controls
                        autoPlay
                        loop
                        className="w-full h-full outline-none"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="w-[200px] h-[100px] flex flex-col items-center justify-center">
                    <img
                      src={wordData?.img}
                      alt={`${wordData?.img}`}
                      className="h-full w-full"
                    />
                  </div>
                )}
                <div className="flex gap-2">
                  <p
                    onClick={() => setVideo(true)}
                    className={`w-3 h-3 border-black border rounded-full cursor-pointer ${
                      video ? "bg-black" : ""
                    }`}
                  ></p>
                  <p
                    onClick={() => setVideo(false)}
                    className={`w-3 h-3 border-black border rounded-full cursor-pointer ${
                      video ? "" : "bg-black"
                    }`}
                  ></p>
                </div>
              </div>

              <WordDetail data={chineseData} />
            </div>

            {videoBox ? (
              <div className="w-[96%] rounded-t-md md:w-[75%] lg:w-[65%] xl:w-[50%] fixed flex flex-col items-center justify-center">
                <div className="h-[30px] md:h-[40px] rounded-t-md pr-4 w-full bg-[#bfbfbf] flex justify-end items-center">
                  <AiOutlineClose
                    onClick={() => setVideoBox(false)}
                    className="cursor-pointer"
                  />
                </div>
                <video
                  src="/play_video.mp4"
                  controls
                  autoPlay
                  className="w-full h-full"
                />
              </div>
            ) : (
              ""
            )}

            <WordDetail data={spanishData} />
          </div>

          <p className="border my-8 border-black px-8 py-3 w-[96%] md:w-[75%] lg:w-[65%] xl:w-[50%]  ">
            {wordData?.sign_desc}
          </p>
          <div className="pb-10">
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
