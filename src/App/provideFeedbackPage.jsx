import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import NotificationBox from "../Components/notificationbox";

function ProvideFeedbackPage() {
  const [newWord, setNewWord] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  const navigate = useNavigate();

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

  const token = useSelector((state) => state.AuthReducer.token);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ newWord, subject, message });
    if (!newWord) {
      // alert("plese enter newWord");
      setNotificationTitle("Error !!");
      setNotificationBody("New  Word Missing");
      setNotificationType("error");
      shownotiftion();

      return;
    }
    if (!subject) {
      // alert("plese enter subject");
      setNotificationTitle("Error !!");
      setNotificationBody("Subject Missing");
      setNotificationType("error");
      shownotiftion();

      return;
    }
    if (!message) {
      // alert("plese enter message");
      setNotificationTitle("Error !!");
      setNotificationBody("Message Missing");
      setNotificationType("error");
      shownotiftion();
      return;
    }
    setSubmitLoading(true);
    axios
      .post(
        "https://test.ranuvijay.me/pancha/feedback/",
        {
          word: newWord,
          subject: subject,
          message: message,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((d) => {
        console.log(d);
        setSubmitLoading(false);
        setNewWord("");
        setSubject("");
        setMessage("");
        setNotificationTitle("Success !!");
        setNotificationBody("FeedBack Submitted");
        setNotificationType("success");
        shownotiftion();
      })
      .catch((e) => {
        console.log("error", e);
        setNotificationTitle("Error !!");
        setNotificationBody("Something went wrong");
        setNotificationType("error");
        shownotiftion();
        setSubmitLoading(false);
      });

    // navigate("/settings")
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
      <div className="w-full flex flex-col items-center justify-center">
        <form className="w-[80%] md:w-[50%] lg:w-[35%] mt-[50px] flex gap-3 flex-col items-center justify-center">
          <div className="w-full">
            <label className="text-sm">
              Suggest new word for the dictionary
            </label>
            <div className="border-[#A2A2A7] mt-2 rounded-md border border-solid flex items-center">
              <input
                value={newWord}
                onChange={(e) => setNewWord(e.target.value)}
                placeholder="pre-populated with word from search"
                className="text-sm h-10 border-none w-full outline-blue-400 px-2 rounded-md"
              />
            </div>
          </div>
          <div className="w-full">
            <p>Comments? Questions? Testimonials? </p>
            <p>Please write subject and message below </p>
          </div>
          <div className="w-full">
            <label className="text-sm">Subject</label>
            <div className="border-[#A2A2A7] mt-2 rounded-md border border-solid flex items-center">
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="text-sm h-10 border-none w-full outline-blue-400 px-2 rounded-md"
              />
            </div>
          </div>
          <div className="w-full">
            <label className="text-sm">Message</label>
            <div className="border-[#A2A2A7] mt-2 rounded-md border border-solid flex items-center">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="text-sm h-[100px] border-none w-full outline-blue-400 p-2 rounded-md"
              />
            </div>
          </div>
          <div className="w-full my-2">
            <button
              disabled={submitLoading}
              onClick={handleSubmit}
              className="bg-black text-white rounded-md px-10 py-2 cursor-pointer"
            >
              {submitLoading ? "Submit..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ProvideFeedbackPage;
