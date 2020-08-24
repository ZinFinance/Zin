import React, { useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useCheckEmailVerified } from "../utility";
import { updateUser } from "../redux/actions/userActions";

import WalletModal from "./walletModal";
import UpdatePassword from "./updatePassword";
import AsyncButton from "./AsyncButton";
import ReferralCard from "./referralCard";

function Profile() {
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();
  const [state, setState] = useReducer(reducer, {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    ethAddress: user.ethAddress,
    success: false,
    error: false,
    loading: false,
  });
  const disabled = useCheckEmailVerified();
  const kycApplicationStatus = useSelector(
    (state) => state.kycReducer.applicationStatus
  );

  function reducer(state, newState) {
    return {
      ...state,
      ...newState,
    };
  }

  const {
    firstName,
    lastName,
    email,
    ethAddress,
    error,
    success,
    loading,
  } = state;

  const onChange = (e) => {
    setState({ [e.target.name]: e.target.value, success: false, error: false });
  };

  const updateProfile = (e) => {
    e.preventDefault();
    setState({ loading: true });
    dispatch(
      updateUser(
        {
          userName: email,
          firstName,
          lastName,
          email,
          ethAddress,
        },
        (error) => {
          if (error) {
            setState({ error, loading: false });
          } else {
            setState({ success: true, loading: false });
          }
        }
      )
    );
  };

  return (
    <div className="container">
      <WalletModal />
      <div className="row">
        <div
          className={
            user.isAdmin ? "main-content col-lg-12" : "main-content col-lg-8"
          }
        >
          <div className="content-area card">
            <div className="card-innr">
              <div className="card-head">
                <h4 className="card-title">Profile Details</h4>
              </div>
              <ul className="nav nav-tabs nav-tabs-line" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    data-toggle="tab"
                    href="#personal-data"
                  >
                    Personal Data
                  </a>
                </li>
                {/* <li className="nav-item">
                  <a className="nav-link" data-toggle="tab" href="#settings">
                    Settings
                  </a>
                </li> */}
                <li className="nav-item">
                  <a className="nav-link" data-toggle="tab" href="#password">
                    Password
                  </a>
                </li>
              </ul>
              {/* .nav-tabs-line */}
              <div className="tab-content" id="profile-details">
                <div className="tab-pane fade show active" id="personal-data">
                  <form onSubmit={updateProfile}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="input-item input-with-label">
                          <label
                            htmlFor="firstName"
                            className="input-item-label"
                          >
                            First Name
                          </label>
                          <input
                            className="input-bordered"
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={firstName}
                            onChange={onChange}
                          />
                        </div>
                        {/* .input-item */}
                      </div>
                      <div className="col-md-6">
                        <div className="input-item input-with-label">
                          <label
                            htmlFor="lastName"
                            className="input-item-label"
                          >
                            Last Name
                          </label>
                          <input
                            className="input-bordered"
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={lastName}
                            onChange={onChange}
                          />
                        </div>
                        {/* .input-item */}
                      </div>
                      <div className="col-md-6">
                        <div className="input-item input-with-label">
                          <label htmlFor="email" className="input-item-label">
                            Email Address
                          </label>
                          <input
                            className="input-bordered"
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            disabled
                            style={{ cursor: "not-allowed" }}
                          />
                        </div>
                        {/* .input-item */}
                      </div>
                    </div>
                    {/* .row */}
                    <div className="gaps-1x" />
                    {/* 10px gap */}
                    <div className="d-sm-flex justify-content-between align-items-center">
                      <AsyncButton
                        loading={loading}
                        buttonProps={disabled}
                        buttonClasses="btn-primary"
                        defaultText="Update Profile"
                        loadingText="Updating Profile..."
                      />
                      <div className="gaps-2x d-sm-none" />
                      {error && <span className="text-danger">{error}</span>}
                      {success && (
                        <span className="text-success">
                          <em className="ti ti-check-box" /> Profile
                          Successfully Updated
                        </span>
                      )}
                    </div>
                  </form>
                  {/* form */}
                </div>
                {/* .tab-pane */}
                {/* <div className="tab-pane fade" id="settings">
                  <div className="pdb-1-5x">
                    <h5 className="card-title card-title-sm text-dark">
                      Security Settings
                    </h5>
                  </div>
                  <div className="input-item">
                    <input
                      type="checkbox"
                      className="input-switch input-switch-sm"
                      id="save-log"
                      defaultChecked
                    />
                    <label htmlFor="save-log">Save my Activities Log</label>
                  </div>
                  <div className="input-item">
                    <input
                      {...disabled}
                      type="checkbox"
                      className="input-switch input-switch-sm"
                      id="pass-change-confirm"
                    />
                    <label htmlFor="pass-change-confirm">
                      Confirm me through email before password change
                    </label>
                  </div>
                  <div className="pdb-1-5x">
                    <h5 className="card-title card-title-sm text-dark">
                      Manage Notification
                    </h5>
                  </div>
                  <div className="input-item">
                    <input
                      {...disabled}
                      type="checkbox"
                      className="input-switch input-switch-sm"
                      id="latest-news"
                      defaultChecked
                    />
                    <label htmlFor="latest-news">
                      Notify me by email about sales and latest news
                    </label>
                  </div>
                  <div className="input-item">
                    <input
                      {...disabled}
                      type="checkbox"
                      className="input-switch input-switch-sm"
                      id="activity-alert"
                      defaultChecked
                    />
                    <label htmlFor="activity-alert">
                      Alert me by email for unusual activity.
                    </label>
                  </div>
                  <div className="gaps-1x" />
                  <div className="d-flex justify-content-between align-items-center">
                    <span />
                    <span className="text-success">
                      <em className="ti ti-check-box" /> Setting has been
                      updated
                    </span>
                  </div>
                </div> */}
                {/* .tab-pane */}
                <UpdatePassword />
                {/* .tab-pane */}
              </div>
              {/* .tab-content */}
            </div>
            {/* .card-innr */}
          </div>
          {/* .card */}
          {/* <div className="content-area card">
            <div className="card-innr">
              <div className="card-head">
                <h4 className="card-title">Two-Factor Verification</h4>
              </div>
              <p>
                Two-factor authentication is a method for protection your web
                account. When it is activated you need to enter not only your
                password, but also a special code. You can receive this code by
                in mobile app. Even if third person will find your password,
                then can't access with that code.
              </p>
              <div className="d-sm-flex justify-content-between align-items-center pdt-1-5x">
                <span className="text-light ucap d-inline-flex align-items-center">
                  <span className="mb-0">
                    <small>Current Status:</small>
                  </span>
                  <span className="badge badge-disabled ml-2">Disabled</span>
                </span>
                <div className="gaps-2x d-sm-none" />
                <button
                  {...disabled}
                  className="order-sm-first btn btn-primary"
                >
                  Enable 2FA
                </button>
              </div>
            </div>
          </div> */}
          {/* .card */}
        </div>
        {/* .col */}
        {!user.isAdmin && (
          <div className="aside sidebar-right col-lg-4">
            <div className="account-info card">
              <div className="card-innr">
                <h6 className="card-title card-title-sm">
                  Your Account Status
                </h6>
                <ul className="btn-grp">
                  <li>
                    {user.isEmailVerified ? (
                      <span
                        style={{ cursor: "initial" }}
                        className="btn btn-auto btn-xs btn-success"
                      >
                        Email Verified
                      </span>
                    ) : (
                      <span
                        style={{ cursor: "initial" }}
                        className="btn btn-auto btn-xs btn-danger"
                      >
                        Email Not Verified
                      </span>
                    )}
                  </li>
                  <li>
                    {kycApplicationStatus &&
                    kycApplicationStatus.reviewStatus === "completed" ? (
                      kycApplicationStatus.reviewResult.reviewAnswer ===
                      "RED" ? (
                        <span
                          style={{ cursor: "initial" }}
                          className="btn btn-auto btn-xs btn-danger"
                        >
                          KYC Rejected
                        </span>
                      ) : (
                        <span
                          style={{ cursor: "initial" }}
                          className="btn btn-auto btn-xs btn-success"
                        >
                          KYC Complete
                        </span>
                      )
                    ) : (
                      <span
                        style={{ cursor: "initial" }}
                        className="btn btn-auto btn-xs btn-warning"
                      >
                        KYC Pending
                      </span>
                    )}
                  </li>
                </ul>
                <div className="gaps-2-5x" />
                <h6 className="card-title card-title-sm">Receiving Wallet</h6>
                <div className="d-flex justify-content-between">
                  <span>
                    <span>
                      {ethAddress
                        ? ethAddress.substr(0, 8) +
                          "....." +
                          ethAddress.substr(ethAddress.length - 8)
                        : "No Wallet Added"}
                    </span>{" "}
                    {/* <em
                    className="fas fa-info-circle text-exlight"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title={'"1 ETH = 100 ZIN"'}
                  /> */}
                  </span>
                  {user.isEmailVerified ? (
                    <a
                      href="#edit-wallet"
                      data-toggle="modal"
                      data-target="#edit-wallet"
                      className="link link-ucap"
                    >
                      {ethAddress ? "Edit" : "Add"}
                    </a>
                  ) : (
                    <span
                      style={{ cursor: "not-allowed" }}
                      className="link link-ucap"
                    >
                      Add
                    </span>
                  )}
                </div>
              </div>
            </div>
            <ReferralCard />
            {/* <div className="kyc-info card">
            <div className="card-innr">
              <h6 className="card-title card-title-sm">
                Identity Verification - KYC
              </h6>
              <p>
                To comply with regulation, participant will have to go through
                indentity verification.
              </p>
              <p className="lead text-light pdb-0-5x">
                You have not submitted your KYC application to verify your
                indentity.
              </p>

              <Link to="/kyc-application">
                <button className="btn btn-primary btn-block">
                  Click to Proceed
                </button>
              </Link>
              <h6 className="kyc-alert text-danger">
                * KYC verification required for purchase token
              </h6>
            </div>
          </div> */}
          </div>
        )}
        {/* .col */}
      </div>
      {/* .container */}
    </div>
  );
}

export default Profile;
