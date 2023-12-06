import { memo } from "react";
const SuccessIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="#1cbe59"
    style={{
      width: "35px",
      height: "35px",
      marginTop: "6px",
    }}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
    />
  </svg>
);
const ErrorIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="#f75023"
    style={{
      width: "35px",
      height: "35px",
      marginTop: "6px",
    }}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
    />
  </svg>
);

function NotificationBox(props) {
  const { title, body, setShowNotification, type } = props;
  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "start",
        padding: " 10px 10px",
      }}
    >
      <div style={{ width: "15%" }}>
        {type === "success" ? (
          <SuccessIcon />
        ) : (
          type === "error" && <ErrorIcon />
        )}
      </div>
      <div
        style={{
          width: "84%",
          display: "flex",
          flexDirection: "column",
          margin: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h3 style={{ fontSize: "22px" }}>{title}</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="w-4 h-4 cursor-pointer"
            style={{
              width: "20px",
              height: "20px",
              cursor: "pointer",
            }}
            onClick={() => {
              setShowNotification(false);
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <p style={{ paddingTop: "6px" }}>{body}</p>
      </div>
    </div>
  );
}

export default memo(NotificationBox);