import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import axios from 'axios';
import NotificationBox from '../Components/notificationbox';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';

export default function Search() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.AuthReducer.token);
  const [wordData, setWordData] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState(null);
  const [notificationTitle, setNotificationTitle] = useState(null);
  const [notificationBody, setNotificationBody] = useState(null);
  const [searchValue, setSearchValue] = useState(false);

  const shownotification = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  const handleSearch = (value) => {
    if (value) {
      setSearchValue(true);
    }
    if (value) {
      axios
        .get(`http://localhost:8000/pancha/search-word?word=${value}`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((response) => {
          const data = response.data;
          if (data.length === 0) {
            setWordData([{ name: 'Word not found', id: 0 }]);
          } else {
            setWordData(data);
          }
          setSearchValue(false);
        })
        .catch((err) => {
          setNotificationTitle('Error !!');
          setNotificationBody('Something went wrong.');
          setNotificationType('error');
          shownotification();
          setSearchValue(false);
        });
    } else {
      setWordData([]);
      setSearchValue(false);
    }
  };

  return (
    <>
      <div
        className={`fixed top-6 right-0 shadow-lg z-50 w-80 rounded-2xl transition-transform duration-300 transform ${
          showNotification ? 'translate-x-0' : 'translate-x-full'
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
          <Stack spacing={2} sx={{ width: '100%' }}>
            <Autocomplete
              loading={searchValue}
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              options={wordData.map((option) => option.name)}
              onInputChange={(event, value) => {
                handleSearch(value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Type here to search word"
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
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
                const selectedWord = wordData.find(
                  (word) => word.name === value
                );
                if (selectedWord) {
                  if (selectedWord.name === 'Word not found') {
                    return;
                  } else navigate(`/word/${selectedWord.name}/${selectedWord.id}`);
                }
              }}
              PaperProps={{
                style: {
                  maxHeight: 200,
                  overflowY: 'auto',
                },
              }}
              renderOption={(props, option) => (
                <li {...props}>
                  <SearchIcon color="disabled" fontSize="small" style={{marginRight: "20px"}} /> {option}
                </li>
              )}
            />
          </Stack>
        </div>
      </div>
    </>
  );
}
