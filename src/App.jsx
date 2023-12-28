import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./auth/authLayout";
import AppLayout from "./app/appLayout";
import ProtectedRoute from "./protectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<ProtectedRoute Componets={AppLayout} />} />
        <Route path="/auth" element={<AuthLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
