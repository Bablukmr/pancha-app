import React, { useState } from "react";
import NotificationBox from "../Components/notificationbox";

function Notification() {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState(null);
  const [notificationTitle, setNotificationTitle] = useState(null);
  const [notificationBody, setNotificationBody] = useState(null);

  const showNotificationBox = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 4000);
  };

  const handleSuccess = () => {
    setNotificationTitle("Success !!");
    setNotificationBody("Training completed");
    setNotificationType("success");
    showNotificationBox();
  };

  const handleError = () => {
    setNotificationTitle("Error!");
    setNotificationBody("Training is not completed");
    setNotificationType("error");
    showNotificationBox();
  };

  return (
    <>
      <div
        className={`fixed bottom-3 right-3 shadow-lg z-50 w-70  transition-transform duration-300 transform ${
          showNotification ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {showNotification && (
          <NotificationBox
            title={notificationTitle}
            body={notificationBody}
            setShowNotification={setShowNotification}
            type={notificationType}
          />
        )}
      </div>
      <div className="h-screen w-full flex gap-y-2 flex-col items-center justify-center">
        <h1>Notification</h1>
        <button
          onClick={handleSuccess}
          className="bg-blue-900 text-white px-4 py-1 rounded-md"
        >
          Success
        </button>
        <button
          onClick={handleError}
          className="bg-red-700 text-white px-4 py-1 rounded-md"
        >
          Error
        </button>
      </div>
    </>
  );
}

export default Notification;
