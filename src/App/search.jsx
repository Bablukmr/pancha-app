import { AiOutlineSearch } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import NotificationBox from "../Components/notificationbox";

export default function Search() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.AuthReducer.token);
  const [wordData, setWOrdData] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState(null);
  const [notificationTitle, setNotificationTitle] = useState(null);
  const [notificationBody, setNotificationBody] = useState(null);

  const shownotiftion = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  const handleSearch = (e) => {
    const inputValue = e?.target?.value;
    console.log(inputValue);
    if (inputValue) {
      axios
        .get(`https://test.ranuvijay.me/pancha/search-word?word=${inputValue}`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((d) => {
          console.log(d.data);
          setWOrdData(d.data);
        })
        .catch((err) => {
          setNotificationTitle("Error !!");
          setNotificationBody("Something went wrong to .");
          setNotificationType("error");
          shownotiftion();
        });
    } else {
      setWOrdData([]);
    }
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
        <div className="w-[80%] md:w-[50%] lg:w-[35%] flex flex-col items-center justify-center">
          <div className="w-full relative rounded-md border border-solid flex items-center">
            <div className="p-2">
              <AiOutlineSearch />
            </div>
            <input
              type="search"
              placeholder="Type here to search"
              className="text-sm h-10 border-none w-full outline-none pr-2 rounded-md"
              onChange={handleSearch}
            />
          </div>
          {wordData?.length > 0 && (
            <div className="mt-2 w-full  shadow-md pb-2 rounded-b-md bg-[#fafafa] ">
              <ul className="w-full max-h-[250px]  overflow-y-scroll flex flex-col items-start ">
                {wordData?.map((d) => (
                  <li
                    onClick={() => {
                      navigate(`/word/${d.name}/${d.id}`);
                    }}
                    key={d.id}
                    className="h-[40px] px-4 py-2 w-full border-b-2 border-[#f2f2f2] cursor-pointer hover:bg-slate-100 "
                  >
                    {d.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
