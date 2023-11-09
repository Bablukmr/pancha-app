import React from "react";
import WordDetail from "./wordDetail";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Pagination } from "swiper/modules";

function WordFramePage({
  englishData,
  frenchData,
  videoData,
  imgUrl,
  imgName,
  chineseData,
  spanishData,
  showVideoFirst
//   descriptionData,
}) {
  return (
    <div className="w-full flex flex-col items-center">
      <div className=" text-center w-full">
        <h1 className="text-2xl font-semibold">{name}</h1>
      </div>
      <div
        className="mt-10 px-1 ms:px-4
            w-[96%] md:w-[75%] lg:w-[65%] xl:w-[50%] flex flex-col gap-y-5 md:gap-y-6 lg:gap-y-8 
            rounded-md items-center justify-center"
      >
        <WordDetail data={englishData} />

        <div className="w-full flex items-center justify-center gap-2 md:gap-x-8 lg:gap-x-12">
          <WordDetail data={frenchData} />

          <div className="w-[200px] md:w-[300px] xl:w-[350px] h-[100px] md:h-[150px] xl:h-[200px] ">
  <Swiper
    modules={[Pagination]}
    spaceBetween={50}
    slidesPerView={1}
    pagination={{
      clickable: true,
    }}
    onSwiper={(swiper) => console.log(swiper)}
    onSlideChange={() => console.log("slide change")}
  >
    {showVideoFirst ? (
      <>
        <SwiperSlide>
          <video
            src={videoData}
            muted
            controls
            autoPlay
            loop
            className="w-full h-full outline-none"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={imgUrl}
            alt={`${imgName}`}
            className="h-full w-full"
          />
        </SwiperSlide>
      </>
    ) : (
      <>
        <SwiperSlide>
          <img
            src={imgUrl}
            alt={`${imgName}`}
            className="h-full w-full"
          />
        </SwiperSlide>
        <SwiperSlide>
          <video
            src={videoData}
            muted
            controls
            autoPlay
            loop
            className="w-full h-full outline-none"
          />
        </SwiperSlide>
      </>
    )}
  </Swiper>
  <div className="swiper-pagination absolute bottom-4 left-0 right-0"></div>
</div>


          <WordDetail data={chineseData} />
        </div>

        <WordDetail data={spanishData} />
      </div>

      {/* <p className="border my-8 border-black px-8 py-3 w-[96%] md:w-[75%] lg:w-[65%] xl:w-[50%]  ">
        {descriptionData}
      </p> */}
    </div>
  );
}

export default WordFramePage;
