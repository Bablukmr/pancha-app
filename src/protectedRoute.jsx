import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ Component }) {
  const navigate = useNavigate();

  const token = useSelector((state) => state.AuthReducer.token);
  console.log(token);
  useEffect(() => {
    let token=localStorage.getItem("token")
    if (!token) {
      navigate("/auth");
    }
  });

  return <Component />;
}

export default ProtectedRoute;
