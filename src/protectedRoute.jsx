import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function ProtectedRoute({ Component }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const search = location.search;
    const pathurl = path + search;
    localStorage.setItem("path", pathurl);
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth");
    }
  });

  return <Component />;
}

export default ProtectedRoute;
