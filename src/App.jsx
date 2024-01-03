import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./auth/authLayout";
import AppLayout from "./app/appLayout";
import ProtectedRoute from "./protectedRoute";
import { Provider } from "react-redux";
import { useStore } from "./store/store";

function App(props) {
  const store = useStore(props.initialReduxState);
  return (
    <Provider store={useStore(store)}>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<ProtectedRoute Componets={AppLayout} />} />
        <Route path="/auth" element={<AuthLayout />} />
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
