import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./App/appLayout";
import ProtectedRoute from "./protectedRoute";
import AuthLayout from "./Auth/authLayout";
import { Provider } from "react-redux";
import { useStore } from "./store/store";

function App(props) {
const store = useStore(props.initialReduxState);

  return (
    <Provider store={useStore(store)}>
      <BrowserRouter>
        <Routes>
          <Route path="auth/*" element={<AuthLayout />} />
          <Route path="/*" element={<ProtectedRoute Component={AppLayout} />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
