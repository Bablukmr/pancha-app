import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layout/appLayout";
import ProtectedRoute from "./protectedRoute";
import AuthLayout from "./Auth/authLayout";
import { Provider } from "react-redux";
import { useStore } from "./store/store";
import ForgetPasswordReset from "./Auth/forgetPasswordReset";

function App(props) {
  const store = useStore(props.initialReduxState);
  return (
    <Provider store={useStore(store)}>
      <BrowserRouter>
        <Routes>
          <Route path="auth/*" element={<AuthLayout />} />
          <Route path="/reset/:uid/:token" element={<ForgetPasswordReset />} />
          <Route path="/*" element={<ProtectedRoute Component={AppLayout} />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
