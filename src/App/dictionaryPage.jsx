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

  useEffect(() => {
    // console.log("WWEEWE",token);
    if (token) {
      axios
        .get("http://localhost:8000/pancha/words/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((res) => {
          try {
            const myData = res.data?.sort(function (a, b) {
              if (a?.name?.toLowerCase() < b.name.toLowerCase()) return -1;
              if (a?.name?.toLowerCase() > b.name.toLowerCase()) return 1;
              return 0;
            });
            setWords(myData);
          } catch {
            setWords([]);
          }

          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setNotificationTitle("Error !!");
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
      <div className="w-full flex flex-col items-center justify-center">
        <h2 className="w-full h-[50px] bg-white fixed z-10 top-[40px] flex items-center justify-center text-center text-xl">
          Words
        </h2>

        {loading ? (
          <div className="w-[100%] md:w-[50%] lg:w-[35%] h-[calc(100vh-100px)] flex items-center ">
            <ListLoading />
          </div>
        ) : (
          <div className="w-[100%]  md:w-[50%]  lg:w-[35%] mt-8">
            <List className="   overflow-auto">
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
            </List>
          </div>
        )}
      </div>
    </>
  );
}

export default DictionaryPage;
