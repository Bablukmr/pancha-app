import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Notificationbox from "../Components/notificationbox";
import ListLoading from "../Components/listLoading";

function DictionaryPage() {
  const token = useSelector((state) => state.AuthReducer.token);
  const [words, setWords] = useState([]);

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
    axios
      .get("http://localhost:8000/pancha/words/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setWords(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setNotificationTitle("Error !!");
        setNotificationBody("Something went wrong fetching words.");
        setNotificationType("error");
        shownotiftion();
      });
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
        <h2 className="w-full mt-4 mb-6 text-center text-xl">Words</h2>

        {loading ? (
          <div className="w-[80%] md:w-[50%] lg:w-[35%] h-[65vh] flex items-center ">
            <ListLoading />
          </div>
        ) : (
          <List className="w-[80%] md:w-[50%] lg:w-[35%] h-[65vh] overflow-auto">
            {words.map((val) => (
              <ListItem key={val.id} component="div">
                <ListItemText primary={val.name} />
              </ListItem>
            ))}
          </List>
        )}
      </div>
    </>
  );
}

export default DictionaryPage;
