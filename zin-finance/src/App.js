import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import AppContent from "./components/appContent";
import NonAuthContent from "./components/nonAuthContent";

import AuthRoutes from "./routes/authRoutes";
import NonAuthRoutes from "./routes/nonAuthRoutes";

import { useCookies } from "react-cookie";

import { fetchUser } from "./redux/actions/userActions";
import {
  getKYCAccessToken,
  getKYCApplicationStatus,
} from "./redux/actions/kycActions";

import PageLoader from "./components/pageLoader";

function App() {
  const user = useSelector((state) => state.userReducer.user);
  const emailVerified = useSelector((state) => state.userReducer.emailVerified);
  const dispatch = useDispatch();
  const location = useLocation();
  const [cookies, setCookie] = useCookies(["email"]);

  useEffect(() => {
    if (user && user.id && emailVerified) {
      dispatch(getKYCAccessToken(user.id));
      dispatch(getKYCApplicationStatus(user.id));
    }
  }, [user, dispatch, emailVerified]);

  useEffect(() => {
    console.log("user changed", user);
    if (user && !cookies.email) {
      setCookie("email", user.email, { path: "/" });
    } else if (!user && cookies.email) {
      setTimeout(
        () =>
          dispatch(
            fetchUser({
              email: cookies.email,
              id: "testing123",
            })
          ),
        1000
      );
    }
  }, [user, cookies.email, dispatch, setCookie]);

  useEffect(() => {
    console.log("location changed", location);
    const script = document.createElement("script");
    script.id = "_themeScript";
    script.src = "/assets/js/script.js?ver=104";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      console.log("removing script");
      document.body.removeChild(script);
    };
  }, [location]);

  if (cookies.email && !user) {
    return <PageLoader />;
  } else if (user) {
    return (
      <AppContent>
        <AuthRoutes />
      </AppContent>
    );
  } else {
    return (
      <NonAuthContent>
        <NonAuthRoutes />
      </NonAuthContent>
    );
  }
}

export default App;
