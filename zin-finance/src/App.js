import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import AppContent from "./components/appContent";
import NonAuthContent from "./components/nonAuthContent";

import AuthRoutes from "./routes/authRoutes";
import NonAuthRoutes from "./routes/nonAuthRoutes";

import Cookies from "js-cookie";

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

  useEffect(() => {
    if (user && user.userName && emailVerified) {
      dispatch(getKYCAccessToken(user.userName));
      dispatch(getKYCApplicationStatus(user.userName));
    }
  }, [user, dispatch, emailVerified]);

  useEffect(() => {
    console.log("user changed", user);
    if (!user && Cookies.get('userName')) {
      setTimeout(
        () =>
          dispatch(
            fetchUser({
              userName: Cookies.get('userName')
            })
          ),
        1000
      );
    }
  }, [user, dispatch]);


  useEffect(() => {
    const script = document.createElement("script");
    script.id = "_themeScript";
    script.src = "/assets/js/script.js?ver=104";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      console.log("removing script");
      document.body.removeChild(script);
    };
  }, [user, location]);

  if (Cookies.get('userName') && !user) {
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
