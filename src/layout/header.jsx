import React from "react";
import { FiSettings, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSettings } from "../store/action";

export default function Header(props) {
  // const { setSetting, setting } = props;
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.AuthReducer.settings);

  const navigate = useNavigate();

  return (
    <div className="text-2xl h-[50px] w-full flex justify-end items-center">
      <div className="mr-4 cursor-pointer">
        {settings ? (
          <FiSettings
            onClick={() => {
              navigate("/settings");
              dispatch(setSettings(false));
            }}
          />
        ) : (
          <FiArrowLeft
            onClick={() => {
              dispatch(setSettings(true));
              // navigate("/");
              // setSetting(true);
              window.history.back();
            }}
          />
        )}
      </div>
    </div>
  );
}
