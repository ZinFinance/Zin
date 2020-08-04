import React from "react";
import { useSelector } from "react-redux";

function Profile(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="main-content col-lg-8">
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
                <li className="nav-item">
                  <a className="nav-link" data-toggle="tab" href="#settings">
                    Settings
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="tab" href="#password">
                    Password
                  </a>
                </li>
              </ul>
              {/* .nav-tabs-line */}
              <div className="tab-content" id="profile-details">
                <div className="tab-pane fade show active" id="personal-data">
                  <form action="#">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="input-item input-with-label">
                          <label
                            htmlFor="full-name"
                            className="input-item-label"
                          >
                            Full Name
                          </label>
                          <input
                            className="input-bordered"
                            type="text"
                            id="full-name"
                            name="full-name"
                            defaultValue="Stefan Harary"
                          />
                        </div>
                        {/* .input-item */}
                      </div>
                      <div className="col-md-6">
                        <div className="input-item input-with-label">
                          <label
                            htmlFor="email-address"
                            className="input-item-label"
                          >
                            Email Address
                          </label>
                          <input
                            className="input-bordered"
                            type="text"
                            id="email-address"
                            name="email-address"
                            defaultValue="info@softnio.com"
                            disabled
                          />
                        </div>
                        {/* .input-item */}
                      </div>
                      <div className="col-md-6">
                        <div className="input-item input-with-label">
                          <label
                            htmlFor="mobile-number"
                            className="input-item-label"
                          >
                            Mobile Number
                          </label>
                          <input
                            className="input-bordered"
                            type="text"
                            id="mobile-number"
                            name="mobile-number"
                          />
                        </div>
                        {/* .input-item */}
                      </div>
                      <div className="col-md-6">
                        <div className="input-item input-with-label">
                          <label
                            htmlFor="date-of-birth"
                            className="input-item-label"
                          >
                            Date of Birth
                          </label>
                          <input
                            className="input-bordered date-picker-dob"
                            type="text"
                            id="date-of-birth"
                            name="date-of-birth"
                          />
                        </div>
                        {/* .input-item */}
                      </div>
                      {/* .col */}
                      <div className="col-md-6">
                        <div className="input-item input-with-label">
                          <label
                            htmlFor="nationality"
                            className="input-item-label"
                          >
                            Nationality
                          </label>
                          <select
                            className="select-bordered select-block"
                            name="nationality"
                            id="nationality"
                          >
                            <option value="us">United State</option>
                            <option value="uk">United KingDom</option>
                            <option value="fr">France</option>
                            <option value="ch">China</option>
                            <option value="cr">Czech Republic</option>
                            <option value="cb">Colombia</option>
                          </select>
                        </div>
                        {/* .input-item */}
                      </div>
                      {/* .col */}
                    </div>
                    {/* .row */}
                    <div className="gaps-1x" />
                    {/* 10px gap */}
                    <div className="d-sm-flex justify-content-between align-items-center">
                      <button className="btn btn-primary">
                        Update Profile
                      </button>
                      <div className="gaps-2x d-sm-none" />
                      <span className="text-success">
                        <em className="ti ti-check-box" /> All Changes are saved
                      </span>
                    </div>
                  </form>
                  {/* form */}
                </div>
                {/* .tab-pane */}
                <div className="tab-pane fade" id="settings">
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
                </div>
                {/* .tab-pane */}
                <div className="tab-pane fade" id="password">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="input-item input-with-label">
                        <label htmlFor="old-pass" className="input-item-label">
                          Old Password
                        </label>
                        <input
                          className="input-bordered"
                          type="password"
                          id="old-pass"
                          name="old-pass"
                        />
                      </div>
                      {/* .input-item */}
                    </div>
                    {/* .col */}
                  </div>
                  {/* .row */}
                  <div className="row">
                    <div className="col-md-6">
                      <div className="input-item input-with-label">
                        <label htmlFor="new-pass" className="input-item-label">
                          New Password
                        </label>
                        <input
                          className="input-bordered"
                          type="password"
                          id="new-pass"
                          name="new-pass"
                        />
                      </div>
                      {/* .input-item */}
                    </div>
                    {/* .col */}
                    <div className="col-md-6">
                      <div className="input-item input-with-label">
                        <label
                          htmlFor="confirm-pass"
                          className="input-item-label"
                        >
                          Confirm New Password
                        </label>
                        <input
                          className="input-bordered"
                          type="password"
                          id="confirm-pass"
                          name="confirm-pass"
                        />
                      </div>
                      {/* .input-item */}
                    </div>
                    {/* .col */}
                  </div>
                  {/* .row */}
                  <div className="note note-plane note-info pdb-1x">
                    <em className="fas fa-info-circle" />
                    <p>
                      Password should be minmum 8 letter and include lower and
                      uppercase letter.
                    </p>
                  </div>
                  <div className="gaps-1x" />
                  {/* 10px gap */}
                  <div className="d-sm-flex justify-content-between align-items-center">
                    <button className="btn btn-primary">Update</button>
                    <div className="gaps-2x d-sm-none" />
                    <span className="text-success">
                      <em className="ti ti-check-box" /> Changed Password
                    </span>
                  </div>
                </div>
                {/* .tab-pane */}
              </div>
              {/* .tab-content */}
            </div>
            {/* .card-innr */}
          </div>
          {/* .card */}
          <div className="content-area card">
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
                <button className="order-sm-first btn btn-primary">
                  Enable 2FA
                </button>
              </div>
            </div>
            {/* .card-innr */}
          </div>
          {/* .card */}
        </div>
        {/* .col */}
        <div className="aside sidebar-right col-lg-4">
          <div className="account-info card">
            <div className="card-innr">
              <h6 className="card-title card-title-sm">Your Account Status</h6>
              <ul className="btn-grp">
                <li>
                  <a href="#" className="btn btn-auto btn-xs btn-success">
                    Email Verified
                  </a>
                </li>
                <li>
                  <a href="#" className="btn btn-auto btn-xs btn-warning">
                    KYC Pending
                  </a>
                </li>
              </ul>
              <div className="gaps-2-5x" />
              <h6 className="card-title card-title-sm">Receiving Wallet</h6>
              <div className="d-flex justify-content-between">
                <span>
                  <span>0x39deb3.....e2ac64rd</span>{" "}
                  <em
                    className="fas fa-info-circle text-exlight"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="1 ETH = 100 TWZ"
                  />
                </span>
                <a
                  href="#"
                  data-toggle="modal"
                  data-target="#edit-wallet"
                  className="link link-ucap"
                >
                  Edit
                </a>
              </div>
            </div>
          </div>
          <div className="referral-info card">
            <div className="card-innr">
              <h6 className="card-title card-title-sm">Earn with Referral</h6>
              <p className=" pdb-0-5x">
                Invite your friends &amp; family and receive a{" "}
                <strong>
                  <span className="text-primary">bonus - 15%</span> of the value
                  of contribution.
                </strong>
              </p>
              <div className="copy-wrap mgb-0-5x">
                <span className="copy-feedback" />
                <em className="fas fa-link" />
                <input
                  type="text"
                  className="copy-address"
                  defaultValue="https://demo.themenio.com/ico?ref=7d264f90653733592"
                  disabled
                />
                <button
                  className="copy-trigger copy-clipboard"
                  data-clipboard-text="https://demo.themenio.com/ico?ref=7d264f90653733592"
                >
                  <em className="ti ti-files" />
                </button>
              </div>
              {/* .copy-wrap */}
            </div>
          </div>
          <div className="kyc-info card">
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
              <a href="#" className="btn btn-primary btn-block">
                Click to Proceed
              </a>
              <h6 className="kyc-alert text-danger">
                * KYC verification required for purchase token
              </h6>
            </div>
          </div>
        </div>
        {/* .col */}
      </div>
      {/* .container */}
    </div>
  );
}

export default Profile;
