import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Notificationbox from "../Components/notificationbox";
import ListLoading from "../Components/listLoading";
import { useNavigate } from "react-router-dom";

function DictionaryPage() {
  const token = useSelector((state) => state.AuthReducer.token);
  const [words, setWords] = useState([]);
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState(null);
  const [notificationTitle, setNotificationTitle] = useState(null);
  const [notificationBody, setNotificationBody] = useState(null);
  const [loading, setLoading] = useState(true);
  const shownotiftion = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  const SortWord = (words, CapitalAplhabet) => {
    const filter = words.filter((d) =>
      d.english.toLowerCase().startsWith(CapitalAplhabet.toLowerCase())
    );

    const myData = filter.sort(function (a, b) {
      if (a?.english?.toLowerCase() < b.english.toLowerCase()) return -1;
      if (a?.english?.toLowerCase() > b.english.toLowerCase()) return 1;
      return 0;
    });

    return (
      <>
        <h1 className="font-bold mt-4 mb-1">{CapitalAplhabet}</h1>
        {myData?.length === 0 ? (
          <p className="text-[#bfbfbf] ml-2">
            No Words found starting with {CapitalAplhabet.toLowerCase()}{" "}
          </p>
        ) : (
          <ul className="ml-2">
            {myData.map((d) => (
              <li
                key={d.id}
                className="my-2 cursor-pointer"
                onClick={() => navigate(`/word/${d.english}/${d.id}`)}
              >
                <p> {d.english} </p>
                <div className="bg-[#bfbfbf] mt-1 w-full h-[1px]"></div>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  };

  const aplha = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  useEffect(() => {
    if (token) {
      axios
        .get("https://api.pancha.kids/pancha/words/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((res) => {
          // try {
          //   const myData = res.data?.sort(function (a, b) {
          //     if (a?.name?.toLowerCase() < b.name.toLowerCase()) return -1;
          //     if (a?.name?.toLowerCase() > b.name.toLowerCase()) return 1;
          //     return 0;
          //   });
          //   setWords(myData);
          // } catch {
          //   setWords([]);
          // }
          setWords(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setNotificationTitle("Error!");
          setNotificationBody("Something went wrong fetching words.");
          setNotificationType("error");
          shownotiftion();
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
        <Notificationbox
          title={notificationTitle}
          body={notificationBody}
          setShowNotification={setShowNotification}
          type={notificationType}
        />
      </div>
      <div className="w-full flex h-[calc(100vh-100px)] flex-col items-center ">
        <h2 className="w-full fixed h-[50px] bg-white z-10 top-[40px] flex items-center justify-center text-center text-xl">
          Dictionary
        </h2>

        {loading ? (
          <div className="w-[100%] md:w-[50%] lg:w-[35%] h-[calc(100vh-150px)] flex items-center ">
            <ListLoading />
          </div>
        ) : (
          <div className="w-[90%] mt-[50px] pb-10  md:w-[50%]  lg:w-[35%] ">
            {words.length !== 0 &&
              aplha.map((d, index) => (
                <div key={index}>{SortWord(words, d)}</div>
              ))}

            {/* <List className="   overflow-auto">
              {words.map((val) => (
                <ListItem
                  key={val.id}
                  component="div"
                  className="border-b-2 cursor-pointer my-1 py-0 "
                >
                  <ListItemText
                    primary={val.name}
                    className=""
                    onClick={() => navigate(`/word/${val.name}/${val.id}`)}
                  />
                </ListItem>
              ))}
            </List> */}
          </div>
        )}
      </div>
    </>
  );
}

export default DictionaryPage;
