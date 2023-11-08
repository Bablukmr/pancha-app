import React from "react";
import { FiSettings, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Header(props) {
  const { setSetting, setting } = props;

  const navigate = useNavigate();

  return (
    <div className="text-2xl h-[50px] w-full flex justify-end items-center">
      <div className="mr-4 cursor-pointer">
        {setting ? (
          <FiSettings
            onClick={() => {
              navigate("/settings");
              setSetting(false);
            }}
          />
        ) : (
          <FiArrowLeft
            onClick={() => {
              // navigate("/");
              setSetting(true);
              window.history.back();
            }}
          />
        )}
      </div>
    </div>
  );
}
