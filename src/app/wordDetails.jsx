import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ModelComponets from "../componets/modelComponets";

function WordDetails() {
  const { name, id } = useParams();

  const [toggal, setToggle] = useState(true);

  return (
    <div className="p-5 bg-white">
      <div className="p-3 bg-slate-100 rounded-2xl">
        <div className="md:flex md:w-[75%] lg:w-[65%] md:ml-[20%] xl:w-[60%] xl:ml-[30%] justify-between  items-center ">
          <div className="flex md:w-[60%] xl:w-[45%] gap-x-4 items-center justify-between p-2 rounded-full bg-white">
            <div
              onClick={() => setToggle(true)}
              className={`${
                toggal ? "bg-[#B170B5] text-white " : "bg-slate-100 text-black"
              } w-[140px] h-[45px] flex items-center justify-center cursor-pointer rounded-full`}
            >
              <img src="/Stop.png" alt="/" className="h-[25px] rounded-full" />{" "}
              <p className="font-semibold text-sm ml-[1px]">Sign Language</p>
            </div>
            <div
              onClick={() => setToggle(false)}
              className={`${
                toggal ? " bg-slate-100 text-black" : "bg-[#B170B5] text-white"
              } w-[140px] h-[45px] flex items-center justify-center cursor-pointer rounded-full`}
            >
              <img
                src="/Picture.png"
                alt="/"
                className="h-[25px] rounded-full"
              />{" "}
              <p className="font-semibold text-sm ml-[1px]">Picture</p>
            </div>
          </div>
          <div className="flex items-center justify-center my-4">
            <ModelComponets />
          </div>
        </div>
        <div className="rounded-xl mt-5">
          {toggal ? (
            <div className="flex items-center justify-center w-full p-4 bg-white rounded-md">
              <video
                controls
                autoPlay
                loop
                muted
                className="rounded-xl aspect-video  md:w-[40%]"
              >
                <source src={"/v.mp4"} />
              </video>
            </div>
          ) : (
            <div className="flex items-center justify-center p-4 bg-white rounded-md">
              <img src="/Apple.png" alt="/" className="rounded-xl w-[30%] md:w-[20%]" />
            </div>
          )}
        </div>
        <div className="flex gap-x-3 items-center justify-center my-6">
          <h1 className="text-xl font-bold">{name}</h1>
          <div className="text-blue-900 text-xl font-bold p-2 bg-white rounded-full">
            <img src="/Sound.png" alt="/" className="h-[25px] rounded-full" />
          </div>
        </div>
        <p className="">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
          expedita esse atque modi placeat mollitia, repellat provident fugiat
          aliquid.
        </p>
        <div className="flex flex-col md:px-8 md:gap-5 lg:flex-row lg:justify-center lg:items-center w-full gap-3 my-3">
          <div className="bg-white p-4 lg:w-[30%] rounded-xl mt-5 flex flex-col items-center justify-center">
            <div className="flex items-center justify-between gap3 w-full  ">
              <div>
                <h1 className="text-xl font-bold leading-[30px]">
                  alligator m.
                </h1>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="/France.png"
                  alt="/"
                  className="h-[25px] rounded-full"
                />
                <p className="ml-1 text-base">Franch</p>
              </div>
              <div>
                <img
                  src="/Sound.png"
                  alt="/"
                  className="h-[25px] rounded-full"
                />
              </div>
            </div>
            <div className="flex items-center justify-center bg-[#E8F1FF] w-full rounded-lg p-3 mt-3">
              <h1 className="text-lg font-semibold text-[#1961C5]">
                ah-lee-gah-tohr
              </h1>
            </div>
          </div>
          <div className="bg-white p-4 lg:w-[30%] rounded-xl  flex flex-col items-center justify-center">
            <div className="flex items-center justify-between gap3 w-full  ">
              <div>
                <h1 className="text-xl font-bold leading-[30px]">
                  alligator m.
                </h1>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="/France.png"
                  alt="/"
                  className="h-[25px] rounded-full"
                />
                <p className="ml-1 text-base">Franch</p>
              </div>
              <div>
                <img
                  src="/Sound.png"
                  alt="/"
                  className="h-[25px] rounded-full"
                />
              </div>
            </div>
            <div className="flex items-center justify-center bg-[#E8F1FF] w-full rounded-lg p-3 mt-3">
              <h1 className="text-lg font-semibold text-[#1961C5]">
                ah-lee-gah-tohr
              </h1>
            </div>
          </div>
          <div className="bg-white p-4 lg:w-[30%] rounded-xl  flex flex-col items-center justify-center">
            <div className="flex items-center justify-between gap3 w-full  ">
              <div>
                <h1 className="text-xl font-bold leading-[30px]">
                  alligator m.
                </h1>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="/France.png"
                  alt="/"
                  className="h-[25px] rounded-full"
                />
                <p className="ml-1 text-base">Franch</p>
              </div>
              <div>
                <img
                  src="/Sound.png"
                  alt="/"
                  className="h-[25px] rounded-full"
                />
              </div>
            </div>
            <div className="flex items-center justify-center bg-[#E8F1FF] w-full rounded-md p-3 mt-3">
              <h1 className="text-lg font-semibold text-[#1961C5]">
                ah-lee-gah-tohr
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WordDetails;
