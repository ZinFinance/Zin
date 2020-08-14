import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/actions/userActions";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { resendEmail } from "../redux/actions/userActions";
import AsyncButton from "./AsyncButton";

function Navbar() {
  const user = useSelector((state) => state.userReducer.user);
  const emailVerified = useSelector((state) => state.userReducer.emailVerified);
  const dispatch = useDispatch();
  const location = useLocation();
  const [resendEmailData, setResendEmailData] = useState({
    text: "Resend Email",
    disabled: false,
    loading: false,
    error: false,
  });

  function logout() {
    dispatch(logoutUser());
  }

  async function resendConfirmationEmail() {
    setResendEmailData({
      text: "Sending Email...",
      disabled: true,
      loading: true,
    });
    setTimeout(async () => {
      let error = await resendEmail(user.email);
      if (error) {
        setResendEmailData({
          text: "Resend Email",
          disabled: false,
          loading: false,
          error,
        });
      } else {
        setResendEmailData({
          text: "Email sent",
          disabled: true,
          loading: false,
          error: false,
        });
      }
    }, 1000);
  }

  return (
    <div className="topbar-wrap">
      <div
        style={{ paddingLeft: 0, paddingRight: 0 }}
        className="topbar is-sticky"
      >
        {!emailVerified && (
          <div
            style={{ borderRadius: 0, marginBottom: 0, textAlign: "center" }}
            className="alert alert-danger"
          >
            Please verify your email address and refresh in order to perform any
            actions
            <AsyncButton
              loading={resendEmailData.loading}
              buttonProps={{
                disabled: resendEmailData.disabled,
                onClick: resendConfirmationEmail,
                style: {
                  marginLeft: "25px",
                  cursor: resendEmailData.disabled ? "not-allowed" : "pointer",
                },
              }}
              defaultText={resendEmailData.text}
              loadingText={resendEmailData.text}
              buttonClasses="btn-warning btn-sm"
            />
            {resendEmailData.error && (
              <div style={{ marginTop: "10px" }} className="text-danger">
                {resendEmailData.error}
              </div>
            )}
            {/* <button
              disabled={resendEmailData.disabled}
              onClick={resendEmail}
              style={{
                marginLeft: "25px",
                cursor: resendEmailData.disabled ? "not-allowed" : "cursor",
              }}
              className="btn btn-warning btn-sm"
            >
              {resendEmailData.text}
            </button> */}
          </div>
        )}
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <ul className="topbar-nav d-lg-none">
              <li className="topbar-nav-item relative">
                <a className="toggle-nav" href="#">
                  <div className="toggle-icon">
                    <span className="toggle-line"></span>
                    <span className="toggle-line"></span>
                    <span className="toggle-line"></span>
                    <span className="toggle-line"></span>
                  </div>
                </a>
              </li>
            </ul>
            <a className="topbar-logo" href="./">
              <img
                src="images/logo-light.png"
                srcSet="images/logo-light2x.png 2x"
                alt="logo"
              />
            </a>
            <ul className="topbar-nav">
              <li className="topbar-nav-item relative">
                <span className="user-welcome d-none d-lg-inline-block">
                  Welcome {user.firstName}!
                </span>
                <a className="toggle-tigger user-thumb" href="#">
                  <em className="ti ti-user"></em>
                </a>
                <div className="toggle-class dropdown-content dropdown-content-right dropdown-arrow-right user-dropdown">
                  <div className="user-status">
                    <h6 className="user-status-title">Token balance</h6>
                    <div className="user-status-balance">
                      12,000,000 <small>TWZ</small>
                    </div>
                  </div>
                  <ul className="user-links">
                    <li>
                      <Link to="/profile">
                        <i className="ti ti-id-badge"></i>My Profile
                      </Link>
                    </li>
                    <li>
                      <a href="#">
                        <i className="ti ti-infinite"></i>Referral
                      </a>
                    </li>
                  </ul>
                  <ul className="user-links bg-light">
                    <li>
                      <Link to="/sign-in" onClick={logout}>
                        <i className="ti ti-power-off"></i>Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="navbar">
        <div className="container">
          <div className="navbar-innr">
            <ul className="navbar-menu">
              <li className={location.pathname === "/" ? "active" : ""}>
                <Link to="/">
                  <em className="ikon ikon-dashboard"></em> Dashboard
                </Link>
              </li>
              <li className={location.pathname === "/profile" ? "active" : ""}>
                <Link to="/profile">
                  <em className="ikon ikon-user"></em> Profile
                </Link>
              </li>
              <li
                className={
                  location.pathname === "/transactions" ? "active" : ""
                }
              >
                <Link to="/transactions">
                  <em className="ikon ikon-transactions"></em> Transactions
                </Link>
              </li>
              <li
                className={location.pathname === "/buy-token" ? "active" : ""}
              >
                <Link to="/buy-token">
                  <em className="ikon ikon-coins"></em> Buy Tokens
                </Link>
              </li>
              <li>
                <a href="ico-distribution.html">
                  <em className="ikon ikon-exchange"></em> Refferal
                </a>
              </li>
            </ul>
            <ul className="navbar-btns">
              <li>
                <Link to="/kyc-application">
                  <button className="btn btn-sm btn-outline btn-light">
                    <em className="text-primary ti ti-files"></em>
                    <span>KYC Application</span>
                  </button>
                </Link>
              </li>
              <li className="d-none">
                <span className="badge badge-outline badge-success badge-lg">
                  <em className="text-success ti ti-files mgr-1x"></em>
                  <span className="text-success">KYC Approved</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
