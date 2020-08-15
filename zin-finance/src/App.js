import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";

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
  const history = useHistory();
  const [redirect, setRedirect] = useState("");

  useEffect(() => {
    if (!user && location.search) {
      setRedirect(location.search.substring(1));
    } else if (user && redirect) {
      history.push(redirect);
      setRedirect("");
    }
  }, [location.search]); // eslint-disable-line react-hooks/exhaustive-deps

  const shouldFetchKYCInfo = user && user.email && emailVerified;
  useEffect(() => {
    if (shouldFetchKYCInfo) {
      dispatch(getKYCAccessToken(user.email));
      dispatch(getKYCApplicationStatus(user.email));
    }
  }, [shouldFetchKYCInfo]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!user && Cookies.get("token")) {
      setTimeout(() => dispatch(fetchUser(Cookies.get("token"))), 1000);
    }
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

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

  if (Cookies.get("token") && !user) {
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
