import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/actions/userActions";
import { Link } from "react-router-dom";
import { getPrettyValue } from "../utility";
import { useLocation } from "react-router-dom";

function AdminNavbar() {
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();
  const location = useLocation();

  function logout() {
    dispatch(logoutUser());
  }

  return (
    <div className="topbar-wrap">
      <div
        style={{ paddingLeft: 0, paddingRight: 0 }}
        className="topbar is-sticky"
      >
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <ul className="topbar-nav d-lg-none">
              <li className="topbar-nav-item relative">
                <span className="toggle-nav">
                  <div className="toggle-icon">
                    <span className="toggle-line"></span>
                    <span className="toggle-line"></span>
                    <span className="toggle-line"></span>
                    <span className="toggle-line"></span>
                  </div>
                </span>
              </li>
            </ul>
            <Link to="/tokensale">
              <span
                style={{ display: "flex", alignItems: "center" }}
                className="topbar-logo"
              >
                <img src="/images/logo-light-sm.png" alt="logo" />
                <span
                  style={{
                    fontFamily: "Libre Baskerville",
                    color: "lightgray",
                    marginLeft: "10px",
                    fontSize: "20px",
                  }}
                >
                  Zin
                </span>
              </span>
            </Link>
            <ul className="topbar-nav">
              <li className="topbar-nav-item relative">
                <span className="user-welcome d-none d-lg-inline-block">
                  Welcome {user.firstName}!
                </span>
                <span className="toggle-tigger user-thumb">
                  <em className="ti ti-user"></em>
                </span>

                <div className="toggle-class dropdown-content dropdown-content-right dropdown-arrow-right user-dropdown">
                  {/* <div className="user-status">
                    <h6 className="user-status-title">Token balance</h6>
                    <div className="user-status-balance">
                      {getPrettyValue(user.tokenBalance)} <small>ZIN</small>
                    </div>
                  </div> */}
                  <ul className="user-links">
                    <li>
                      <Link to="/profile">
                        <i className="ti ti-id-badge"></i>My Profile
                      </Link>
                    </li>
                    {/* <li>
                      <Link to="/referral">
                        <i className="ti ti-infinite"></i>Bonus
                      </Link>
                    </li> */}
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
              <li
                className={
                  location.pathname.replace(/\//g, "") === "admin-dashboard"
                    ? "active"
                    : ""
                }
              >
                <Link to="/">
                  <em className="ikon ikon-dashboard"></em> Dashboard
                </Link>
              </li>
              <li
                className={
                  location.pathname.replace(/\//g, "") === "profile"
                    ? "active"
                    : ""
                }
              >
                <Link to="/profile">
                  <em className="ikon ikon-user"></em> Profile
                </Link>
              </li>
              <li
                className={
                  location.pathname.replace(/\//g, "") === "user-list"
                    ? "active"
                    : ""
                }
              >
                <Link to="/user-list">
                  <em className="ikon ikon-distribution"></em> Users
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminNavbar;
