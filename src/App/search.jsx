import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import NotificationBox from "../Components/notificationbox";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import ButtonComponent from "../Components/buttonComponent";

export default function Search() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.AuthReducer.token);
  const [wordData, setWordData] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState(null);
  const [notificationTitle, setNotificationTitle] = useState(null);
  const [notificationBody, setNotificationBody] = useState(null);
  const [searchValue, setSearchValue] = useState(null);

  const [loadingSearch, setLoadingSearch] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("");
  const [open, setOpen] = useState(false);

  const shownotification = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  const handleSearch = (value) => {
    setOpen(true);

    if (value) {
      setLoadingSearch(true);
      setSearchValue(value);
      axios
        .get(`https://api.pancha.kids/pancha/search-word?word=${value}`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((d) => {
          if (d?.data?.length === 0) {
            setShowPopup(true);
            setRedirectUrl(`/settings/feedback?word=${value}`);
          } else {
            setShowPopup(false);
            setRedirectUrl("");
          }

          if (d.data.length === 0) {
            console.log("jkjk", d.data.length);
          } else {
            console.log("ttttty");
          }

          // const data = d.data;
          // // if (data.length === 0) {
          // // setWordData([{ name: "Word not found", id: 0 }]);
          // // } else {
          setWordData(d.data);
          // // }
          setLoadingSearch(false);
        })
        .catch((err) => {
          setLoadingSearch(true);
          setNotificationTitle("Error!");
          setNotificationBody("Something went wrong.");
          setNotificationType("error");
          shownotification();
          setSearchValue(null);
        });
    } else {
      setOpen(false);
      setWordData([]);
      setSearchValue(null);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    // setWordNotFound(false);
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

      <div className="w-full absolute top-[100px] flex flex-col items-center justify-center">
        <h1 className="mb-10 text-xl">Search</h1>
        <div className="w-[80%] z-10 md:w-[50%] lg:w-[35%] flex flex-col items-center justify-center">
          <Stack spacing={2} sx={{ width: "100%" }}>
            <Autocomplete
              loading={loadingSearch}
              open={searchValue ? true : false}
              id="free-solo-2-demo"
              disableClearable
              options={wordData}
              getOptionLabel={(option) => option.english}
              onInputChange={(event, value) => {
                handleSearch(value);
              }}
              noOptionsText="No matching words found."
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Type here to search word"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                    sx: {
                      height: 52,
                    },
                    startAdornment: (
                      <SearchIcon color="disabled" fontSize="small" />
                    ),
                  }}
                />
              )}
              onChange={(event, value) => {
                // alert(JSON.stringify(value));
                navigate(`/word/${value.english}/${value.id}`);
              }}
              PaperProps={{
                style: {
                  maxHeight: 200,
                  overflowY: "auto",
                },
              }}
              // // renderOption={(props, option) => (
              //   // <li {...props}>
              //     // {/* <SearchIcon color="disabled" fontSize="small" style={{marginRight: "20px"}} /> {option} */}
              //   // </li>
              // )}
            />
          </Stack>
        </div>
      </div>

      {showPopup && (
        <div
          className="bg-[#1f1f1f] opacity-60 top-[50px] 
           absolute z-50 w-full h-[calc(100vh-100px)]"
        />
      )}

      <div
        className={`fixed top-16 right-0 shadow-lg z-50 w-full rounded-2xl transition-transform duration-300 transform ${
          showPopup ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="w-[80%] md:w-[50%] fixed top-0 right-[10px] lg:w-[35%] bg-white p-4 rounded-lg">
          <p className="w-full text-left">
            Word Not Found Would you like to request to add it to future
            updates?
          </p>
          <div className="mt-4 mb-2 flex w-full gap-3 ">
            <ButtonComponent
              btnName="Yes"
              buttonType="success"
              padding={"3px "}
              width="80px"
              text="white"
              onClick={() => {
                navigate(redirectUrl);
              }}
            />

            <ButtonComponent
              btnName="No"
              buttonType="error"
              padding={"3px "}
              width="80px"
              text="white"
              onClick={handleClosePopup}
            />
          </div>
        </div>
      </div>
    </>
  );
}
