import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "./app/appLayout";

function ProtectedRoute({ Componets }) {
  const Navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token, "aa");
    if (!token) {
      Navigate("/auth");
    }
  });

  return <Componets />;
}

export default ProtectedRoute;
