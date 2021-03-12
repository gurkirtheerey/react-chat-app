import React, { useEffect } from "react";
import { Home } from "./views/Home";
import { useDispatch } from "react-redux";
import { verifyUser } from "./features/auth/authSlice";
import { BrowserRouter, Route } from "react-router-dom";
import { Login } from "./views/Login";
import { Register } from "./views/Register";
import ProtectedRoute from "./ProtectedRoute";
import { ToastNotification } from "./components/ToastNotification";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(verifyUser(token));
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ToastNotification />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <ProtectedRoute exact path="/" component={Home} />
    </BrowserRouter>
  );
};

export default App;
