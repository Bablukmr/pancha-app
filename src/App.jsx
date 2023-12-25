import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./auth/authLayout";
import AppLayout from "./app/appLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<AppLayout />} />
        <Route path="/auth" element={<AuthLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
