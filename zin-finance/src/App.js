import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";

import AppContent from "./components/appContent";
import NonAuthContent from "./components/nonAuthContent";
import AdminContent from "./components/adminContent";

import AuthRoutes from "./routes/authRoutes";
import NonAuthRoutes from "./routes/nonAuthRoutes";
import AdminRoutes from "./routes/adminRoutes";

import Cookies from "js-cookie";

import { fetchUser } from "./redux/actions/userActions";
import {
  getKYCAccessToken,
  getKYCApplicationStatus,
} from "./redux/actions/kycActions";
import {
  fetchTransactions,
  fetchBonusTransactions,
} from "./redux/actions/transactionActions";

import PageLoader from "./components/pageLoader";

function App() {
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [redirect, setRedirect] = useState("");

  useEffect(() => {
    if (user) {
      dispatch(fetchTransactions());
      dispatch(fetchBonusTransactions());
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (!user && location.search && !redirect) {
      setRedirect(new URLSearchParams(location.search).get("continue"));
    } else if (user && !location.search && redirect) {
      history.push(redirect);
      setRedirect("");
    }
  }, [user, location.search, redirect, history]);

  const kycApplicant = user && user.isEmailVerified && user.email;
  useEffect(() => {
    if (kycApplicant) {
      dispatch(getKYCAccessToken(kycApplicant));
      dispatch(getKYCApplicationStatus(kycApplicant));
    }
  }, [kycApplicant, dispatch]);

  const shouldFetchUser = !user && Cookies.get("token");
  useEffect(() => {
    if (shouldFetchUser) {
      dispatch(fetchUser(Cookies.get("token")));
    }
  }, [shouldFetchUser, dispatch]);

  useEffect(() => {
    const script = document.createElement("script");
    script.id = "_themeScript";
    script.src = "/assets/js/script.js?ver=104";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [user, location.pathname]);

  if (shouldFetchUser) {
    return <PageLoader />;
  } else if (user && user.isAdmin) {
    return (
      <AdminContent>
        <AdminRoutes />
      </AdminContent>
    );
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
