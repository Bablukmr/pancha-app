import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function ProtectedRoute({ Component }) {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      navigate("/auth");
    }
  }, []);

  return <Component />;
}

export default ProtectedRoute;
