import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";

import AppContent from "./components/appContent";
import NonAuthContent from "./components/nonAuthContent";
import AdminContent from "./components/adminContent";
import RestrictedPage from "./components/restrictedPage";

import AuthRoutes from "./routes/authRoutes";
import NonAuthRoutes from "./routes/nonAuthRoutes";
import AdminRoutes from "./routes/adminRoutes";

import Cookies from "js-cookie";

import { fetchUser, setETHtoUSDValue } from "./redux/actions/userActions";
import { fetchUsers, fetchBonuses } from "./redux/actions/adminActions";

import {
  getKYCAccessToken,
  getKYCApplicationStatus,
} from "./redux/actions/kycActions";
import {
  fetchTransactions,
  fetchBonusTransactions,
} from "./redux/actions/transactionActions";

import PageLoader from "./components/pageLoader";
import { useEthToUSDValue } from "./utility";

const blockedCountries = ["US", "KP", "IR", "IQ", "CD", "CU", "SO", "SD", "SY"];

function App() {
  const user = useSelector((state) => state.userReducer.user);
  const adminData = useSelector((state) => state.adminReducer);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [redirect, setRedirect] = useState("");
  const accessToken = Cookies.get("token");
  const shouldFetchTransactions = user && !user.isAdmin;
  const [userCountry, setUserCountry] = useState("");
  const ethToUSDValue = useEthToUSDValue();

  useEffect(() => {
    dispatch(setETHtoUSDValue(ethToUSDValue));
  }, [dispatch, ethToUSDValue]);

  useEffect(() => {
    const fetchUserCountry = async () => {
      let ipResponse = await axios.get("https://ipapi.co/json/");
      setUserCountry(ipResponse.data.country_code);
    };
    fetchUserCountry();
  }, []);

  useEffect(() => {
    if (shouldFetchTransactions) {
      dispatch(fetchTransactions());
      dispatch(fetchBonusTransactions());
    }
  }, [shouldFetchTransactions, dispatch]);

  useEffect(() => {
    if (!user && location.search && !redirect) {
      setRedirect(new URLSearchParams(location.search).get("continue"));
    } else if (user && !location.search && redirect) {
      history.push(redirect);
      setRedirect("");
    }
  }, [user, location.search, redirect, history]);

  const kycApplicant =
    user && user.isEmailVerified && !user.isAdmin && user.email;
  useEffect(() => {
    if (kycApplicant) {
      dispatch(getKYCAccessToken(kycApplicant));
      dispatch(getKYCApplicationStatus(kycApplicant));
    }
  }, [kycApplicant, dispatch]);

  const shouldFetchUser = !user && accessToken;
  useEffect(() => {
    if (shouldFetchUser) {
      dispatch(fetchUser());
    }
  }, [shouldFetchUser, dispatch]);

  const adminUsersLoaded = !!adminData.users;
  useEffect(() => {
    window.themeScript();
  }, [user, location.pathname, adminUsersLoaded]);

  const shouldFetchUsers =
    user && user.isAdmin && accessToken && !adminData.users;
  const shouldFetchBonuses =
    user && user.isAdmin && accessToken && !adminData.bonuses;
  useEffect(() => {
    if (shouldFetchUsers) {
      dispatch(fetchUsers());
    }
    if (shouldFetchBonuses) {
      dispatch(fetchBonuses());
    }
  }, [shouldFetchUsers, shouldFetchBonuses, dispatch]);

  if (shouldFetchUser || !userCountry) {
    return <PageLoader />;
  } else if (blockedCountries.includes(userCountry)) {
    return <RestrictedPage />;
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
