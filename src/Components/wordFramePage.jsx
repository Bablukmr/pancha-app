import { useEffect, useState, useRef } from "react";
import WordDetail from "./wordDetail";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Pagination } from "swiper/modules";
import { useSelector } from "react-redux";
import Loading from "./loading";
function WordFramePage({ wordData, showVideoFirst }) {
  const language = useSelector((state) => state.AuthReducer.language);

  const [videoLoad, setVideoLoad] = useState(true);
  const [chinese, setChinese] = useState(false);
  const [french, setFrench] = useState(false);
  const [spanish, setSpanish] = useState(false);

  const videoRef = useRef();

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;

    video.addEventListener("canplay", function () {
      setInterval(function () {
        video.play();
      }, video.duration * 1000 + 1000);
    });
  };

  useEffect(() => {
    if (language) {
      setSpanish(language.filter((d) => d.name === "Spanish")[0]?.active);
      setFrench(language.filter((d) => d.name === "French")[0]?.active);
      setChinese(language.filter((d) => d.name === "Chinese")[0]?.active);
    }
  }, [language]);

  useEffect(() => {});

  return (
    <div className="w-full flex flex-col items-center">
      <div
        className="w-[96%] md:w-[90%] lg:w-[90%] xl:w-[65%] flex flex-col
             gap-y-5 md:gap-y-6 
            rounded-md items-center justify-center"
      >
        <WordDetail audio={wordData?.eng_audio} show={true} />

        <div
          //
          className="w-full h-[160px] md:h-[340px] lg:h-[480px] xl:h-[420px]
          flex items-center justify-center"
        >
          <div className="w-[15%]">
            <WordDetail
              name={wordData?.french}
              audio={wordData?.french_audio}
              phenotic={wordData?.french_phenotic}
              show={french}
              lang="French"
            />
          </div>

          {videoLoad && (
            <div
              role="status"
              className="w-[70%] bg-[#fafafa] h-[75%] flex items-center justify-center"
            >
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          )}

          <Swiper
            modules={[Pagination]}
            spaceBetween={50}
            slidesPerView={1}
            pagination={{
              clickable: true,
            }}
            // onSwiper={(swiper) => console.log(swiper)}
            // onSlideChange={() => console.log("slide change")}
            className={` ${
              !videoLoad ? "w-[70%]" : "w-0"
            } flex h-full items-center`}
          >
            <SwiperSlide className="flex w-full h-full  items-center justify-center aspect-square">
              {showVideoFirst ? (
                <video
                  ref={videoRef}
                  src={wordData?.video}
                  muted
                  autoPlay
                  onLoadedMetadata={handleLoadedMetadata}
                  onLoadedData={() => {
                    setVideoLoad(false);
                  }}
                />
              ) : (
                <div className="h-full">
                  <img
                    src={wordData?.img}
                    alt={wordData?.img}
                    className="h-full w-full"
                  />
                </div>
              )}
            </SwiperSlide>
            <SwiperSlide className="flex h-full items-center justify-center">
              {showVideoFirst ? (
                <div className="h-full">
                  <img
                    src={wordData?.img}
                    alt={wordData?.img}
                    className="h-full w-full"
                  />
                </div>
              ) : (
                <video
                  ref={videoRef}
                  src={wordData?.video}
                  muted
                  autoPlay
                  onLoadedMetadata={handleLoadedMetadata}
                  onLoadedData={() => {
                    setVideoLoad(false);
                  }}
                />
              )}
            </SwiperSlide>
          </Swiper>
          <div className=" w-[15%]">
            <WordDetail
              name={wordData?.chinese}
              audio={wordData?.chinese_audio}
              phenotic={wordData?.chinese_phenotic}
              show={chinese}
              lang="Chinese"
            />
          </div>
        </div>

        <WordDetail
          name={wordData?.spanish}
          audio={wordData?.spanish_audio}
          phenotic={wordData?.spanish_phenotic}
          show={spanish}
          lang="Spanish"
        />
      </div>
    </div>
  );
}

export default WordFramePage;
