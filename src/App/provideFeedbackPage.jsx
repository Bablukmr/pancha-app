import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import NotificationBox from "../Components/notificationbox";
import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
import ButtonComponent from "../Components/buttonComponent";

function ProvideFeedbackPage() {
  const [newWord, setNewWord] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  const [searchParams] = useSearchParams();

  const word = searchParams.get("word"); // "testCode"

  useEffect(() => {
    if (word) {
      setNewWord(word);
      setSubject("Suggestion to add this word to dictionary");
    }
  }, [word]);

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
    if (!newWord) {
      setNotificationTitle("Error !!");
      setNotificationBody("New  Word Missing");
      setNotificationType("error");
      shownotiftion();

      return;
    }
    if (!subject) {
      setNotificationTitle("Error !!");
      setNotificationBody("Subject Missing");
      setNotificationType("error");
      shownotiftion();

      return;
    }
    if (!message) {
      setNotificationTitle("Error !!");
      setNotificationBody("Message Missing");
      setNotificationType("error");
      shownotiftion();
      return;
    }
    setSubmitLoading(true);
    axios
      .post(
        "https://testapi.nhustle.in/pancha/feedback/",
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
        setNotificationTitle("Error !!");
        setNotificationBody("Something went wrong");
        setNotificationType("error");
        shownotiftion();
        setSubmitLoading(false);
      });
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
        <Typography
          variant="h6"
          component="h6"
          className="text-center text-blue-600"
        >
          Feedback
        </Typography>
        <form className="w-[80%] md:w-[50%] lg:w-[35%] mt-[50px] flex gap-3 flex-col items-center justify-center">
          <TextField
            value={newWord}
            onChange={(e) => setNewWord(e.target.value)}
            id="outlined-basic"
            label="Suggest new word for the dictionary"
            variant="outlined"
            style={{ width: "100%" }}
          />

          <div className="w-full text-sm mb-3">
            <p>Comments? Questions? Testimonials? </p>
            <p>Please write subject and message below </p>
          </div>

          <TextField
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            id="outlined-basic"
            label="Subject"
            variant="outlined"
            style={{ width: "100%" }}
          />

          <TextField
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            id="outlined-basic"
            label="Message"
            multiline
            minRows={4}
            style={{ width: "100%", marginTop: "15px" }}
          />
          <div className="w-full my-2">
            <ButtonComponent
              disabled={submitLoading}
              btnName=" Send"
              padding={"6px 26px"}
              startIcon={
                submitLoading ? (
                  <CircularProgress
                    style={{ color: "#A6A6A6" }}
                    size="1.5rem"
                  />
                ) : (
                  <SendIcon />
                )
              }
              loading={true}
              width="100px"
              text="white"
              onClick={handleSubmit}
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default ProvideFeedbackPage;
