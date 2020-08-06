import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function KYCForm() {
  const user = useSelector((state) => state.userReducer.user);
  const history = useHistory();

  useEffect(() => {
    if (!user.emailVerified) {
      history.push("/kyc-application");
    }
  }, [user, history]);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-10 col-xl-9">
          <div className="kyc-form-steps card mx-lg-4">
            <div className="form-step form-step1">
              <div className="form-step-head card-innr">
                <div className="step-head">
                  <div className="step-number">01</div>
                  <div className="step-head-text">
                    <h4>Personal Details</h4>
                    <p>
                      Your simple personal information required for
                      identification
                    </p>
                  </div>
                </div>
              </div>
              {/* .step-head */}
              <div className="form-step-fields card-innr">
                <div className="note note-plane note-light-alt note-md pdb-1x">
                  <em className="fas fa-info-circle" />
                  <p>
                    Please type carefully and fill out the form with your
                    personal details. Your can’t edit these details once you
                    submitted the form.
                  </p>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="input-item input-with-label">
                      <label className="input-item-label">
                        First Name <span className="text-danger">*</span>
                      </label>
                      <input className="input-bordered" type="text" />
                    </div>
                    {/* .input-item */}
                  </div>
                  {/* .col */}
                  <div className="col-md-6">
                    <div className="input-item input-with-label">
                      <label className="input-item-label">
                        Last Name <span className="text-danger">*</span>
                      </label>
                      <input className="input-bordered" type="text" />
                    </div>
                    {/* .input-item */}
                  </div>
                  {/* .col */}
                  <div className="col-md-6">
                    <div className="input-item input-with-label">
                      <label className="input-item-label">
                        Email Address <span className="text-danger">*</span>
                      </label>
                      <input className="input-bordered" type="text" />
                    </div>
                    {/* .input-item */}
                  </div>
                  {/* .col */}
                  <div className="col-md-6">
                    <div className="input-item input-with-label">
                      <label className="input-item-label">
                        Phone Number <span className="text-danger">*</span>
                      </label>
                      <input className="input-bordered" type="text" />
                    </div>
                    {/* .input-item */}
                  </div>
                  {/* .col */}
                  <div className="col-md-6">
                    <div className="input-item input-with-label">
                      <label className="input-item-label">
                        Date of Birth <span className="text-danger">*</span>
                      </label>
                      <input
                        className="input-bordered date-picker"
                        type="text"
                      />
                    </div>
                    {/* .input-item */}
                  </div>
                  {/* .col */}
                  <div className="col-md-6">
                    <div className="input-item input-with-label">
                      <label className="input-item-label">
                        Telegram Username
                      </label>
                      <input className="input-bordered" type="text" />
                    </div>
                    {/* .input-item */}
                  </div>
                  {/* .col */}
                </div>
                {/* .row */}
                <h4 className="text-secondary mgt-0-5x">Your Address</h4>
                <div className="row">
                  <div className="col-md-6">
                    <div className="input-item input-with-label">
                      <label className="input-item-label">
                        Address Line 1 <span className="text-danger">*</span>
                      </label>
                      <input className="input-bordered" type="text" />
                    </div>
                    {/* .input-item */}
                  </div>
                  {/* .col */}
                  <div className="col-md-6">
                    <div className="input-item input-with-label">
                      <label className="input-item-label">Address Line 2</label>
                      <input className="input-bordered" type="text" />
                    </div>
                    {/* .input-item */}
                  </div>
                  {/* .col */}
                  <div className="col-md-6">
                    <div className="input-item input-with-label">
                      <label className="input-item-label">
                        City <span className="text-danger">*</span>
                      </label>
                      <input className="input-bordered" type="text" />
                    </div>
                    {/* .input-item */}
                  </div>
                  {/* .col */}
                  <div className="col-md-6">
                    <div className="input-item input-with-label">
                      <label className="input-item-label">
                        State <span className="text-danger">*</span>
                      </label>
                      <input className="input-bordered" type="text" />
                    </div>
                    {/* .input-item */}
                  </div>
                  {/* .col */}
                  <div className="col-md-6">
                    <div className="input-item input-with-label">
                      <label htmlFor="nationality" className="input-item-label">
                        Nationality <span className="text-danger">*</span>
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
                  <div className="col-md-6">
                    <div className="input-item input-with-label">
                      <label className="input-item-label">
                        Zip Code <span className="text-danger">*</span>
                      </label>
                      <input className="input-bordered" type="text" />
                    </div>
                    {/* .input-item */}
                  </div>
                  {/* .col */}
                </div>
                {/* .row */}
              </div>
              {/* .step-fields */}
            </div>
            <div className="form-step form-step2">
              <div className="form-step-head card-innr">
                <div className="step-head">
                  <div className="step-number">02</div>
                  <div className="step-head-text">
                    <h4>Document Upload</h4>
                    <p>
                      To verify your identity, please upload any of your
                      document
                    </p>
                  </div>
                </div>
              </div>
              {/* .step-head */}
              <div className="form-step-fields card-innr">
                <div className="note note-plane note-light-alt note-md pdb-0-5x">
                  <em className="fas fa-info-circle" />
                  <p>
                    In order to complete, please upload any of the following
                    personal document.
                  </p>
                </div>
                <div className="gaps-2x" />
                <ul
                  className="nav nav-tabs nav-tabs-bordered row flex-wrap guttar-20px"
                  role="tablist"
                >
                  <li className="nav-item flex-grow-0">
                    <a
                      className="nav-link d-flex align-items-center active"
                      data-toggle="tab"
                      href="#passport"
                    >
                      <div className="nav-tabs-icon">
                        <img src="images/icon-passport.png" alt="icon" />
                        <img src="images/icon-passport-color.png" alt="icon" />
                      </div>
                      <span>Passport</span>
                    </a>
                  </li>
                  <li className="nav-item flex-grow-0">
                    <a
                      className="nav-link d-flex align-items-center"
                      data-toggle="tab"
                      href="#national-card"
                    >
                      <div className="nav-tabs-icon">
                        <img src="images/icon-national-id.png" alt="icon" />
                        <img
                          src="images/icon-national-id-color.png"
                          alt="icon"
                        />
                      </div>
                      <span>National Card</span>
                    </a>
                  </li>
                  <li className="nav-item flex-grow-0">
                    <a
                      className="nav-link d-flex align-items-center"
                      data-toggle="tab"
                      href="#driver-licence"
                    >
                      <div className="nav-tabs-icon">
                        <img src="images/icon-licence.png" alt="icon" />
                        <img src="images/icon-licence-color.png" alt="icon" />
                      </div>
                      <span>Driver’s License</span>
                    </a>
                  </li>
                </ul>
                {/* .nav-tabs-line */}
                <div className="tab-content" id="myTabContent">
                  <div className="tab-pane fade show active" id="passport">
                    <h5 className="text-secondary font-bold">
                      To avoid delays when verifying account, Please make sure
                      bellow:
                    </h5>
                    <ul className="list-check">
                      <li>Chosen credential must not be expaired.</li>
                      <li>
                        Document should be good condition and clearly visible.
                      </li>
                      <li>
                        Make sure that there is no light glare on the card.
                      </li>
                    </ul>
                    <div className="gaps-2x" />
                    <h5 className="font-mid">Upload Here Your Passport Copy</h5>
                    <div className="row align-items-center">
                      <div className="col-sm-8">
                        <div className="upload-box">
                          <div className="upload-zone">
                            <div className="dz-message" data-dz-message>
                              <span className="dz-message-text">
                                Drag and drop file
                              </span>
                              <span className="dz-message-or">or</span>
                              <button className="btn btn-primary">
                                SELECT
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-4 d-none d-sm-block">
                        <div className="mx-md-4">
                          <img src="images/vector-passport.png" alt="vector" />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* .tab-pane */}
                  <div className="tab-pane fade" id="national-card">
                    <h5 className="text-secondary font-bold">
                      To avoid delays when verifying account, Please make sure
                      bellow:
                    </h5>
                    <ul className="list-check">
                      <li>Chosen credential must not be expaired.</li>
                      <li>
                        Document should be good condition and clearly visible.
                      </li>
                      <li>
                        Make sure that there is no light glare on the card.
                      </li>
                    </ul>
                    <div className="gaps-2x" />
                    <h5 className="font-mid">
                      Upload Here Your National id Front Side
                    </h5>
                    <div className="row align-items-center">
                      <div className="col-sm-8">
                        <div className="upload-box">
                          <div className="upload-zone">
                            <div className="dz-message" data-dz-message>
                              <span className="dz-message-text">
                                Drag and drop file
                              </span>
                              <span className="dz-message-or">or</span>
                              <button className="btn btn-primary">
                                SELECT
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-4 d-none d-sm-block">
                        <div className="mx-md-4">
                          <img src="images/vector-id-front.png" alt="vector" />
                        </div>
                      </div>
                    </div>
                    <div className="gaps-3x" />
                    <h5 className="font-mid">
                      Upload Here Your National id Back Side
                    </h5>
                    <div className="row align-items-center">
                      <div className="col-sm-8">
                        <div className="upload-box">
                          <div className="upload-zone">
                            <div className="dz-message" data-dz-message>
                              <span className="dz-message-text">
                                Drag and drop file
                              </span>
                              <span className="dz-message-or">or</span>
                              <button className="btn btn-primary">
                                SELECT
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-4 d-none d-sm-block">
                        <div className="mx-md-4">
                          <img src="images/vector-id-back.png" alt="vector" />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* .tab-pane */}
                  <div className="tab-pane fade" id="driver-licence">
                    <h5 className="text-secondary font-bold">
                      To avoid delays when verifying account, Please make sure
                      bellow:
                    </h5>
                    <ul className="list-check">
                      <li>Chosen credential must not be expaired.</li>
                      <li>
                        Document should be good condition and clearly visible.
                      </li>
                      <li>
                        Make sure that there is no light glare on the card.
                      </li>
                    </ul>
                    <div className="gaps-2x" />
                    <h5 className="font-mid">
                      Upload Here Your Driving Licence Copy
                    </h5>
                    <div className="row align-items-center">
                      <div className="col-sm-8">
                        <div className="upload-box">
                          <div className="upload-zone">
                            <div className="dz-message" data-dz-message>
                              <span className="dz-message-text">
                                Drag and drop file
                              </span>
                              <span className="dz-message-or">or</span>
                              <button className="btn btn-primary">
                                SELECT
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-4 d-none d-sm-block">
                        <div className="mx-md-4">
                          <img src="images/vector-licence.png" alt="vector" />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* .tab-pane */}
                </div>
                {/* .tab-content */}
              </div>
              {/* .step-fields */}
            </div>
            <div className="form-step form-step3">
              <div className="form-step-head card-innr">
                <div className="step-head">
                  <div className="step-number">03</div>
                  <div className="step-head-text">
                    <h4>Your Paying Wallet</h4>
                    <p>
                      Submit your wallet address that you are going to send
                      funds
                    </p>
                  </div>
                </div>
              </div>
              {/* .step-head */}
              <div className="form-step-fields card-innr">
                <div className="row">
                  <div className="col-md-6">
                    <div className="input-item input-with-label">
                      <label htmlFor="swalllet" className="input-item-label">
                        Select Wallet{" "}
                      </label>
                      <select
                        className="select-bordered select-block"
                        name="swalllet"
                        id="swalllet"
                      >
                        <option value="eth">Ethereum</option>
                        <option value="dac">DashCoin</option>
                        <option value="bic">BitCoin</option>
                      </select>
                    </div>
                    {/* .input-item */}
                  </div>
                  {/* .col */}
                </div>
                {/* .row */}
                <div className="input-item input-with-label">
                  <label htmlFor="token-address" className="input-item-label">
                    Your Address for tokens:
                  </label>
                  <input
                    className="input-bordered"
                    type="text"
                    id="token-address"
                    name="token-address"
                    defaultValue="0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae"
                  />
                  <span className="input-note">
                    Note: Address should be ERC20-compliant.
                  </span>
                </div>
                {/* .input-item */}
              </div>
              {/* .step-fields */}
            </div>
            <div className="form-step form-step-final">
              <div className="form-step-fields card-innr">
                <div className="input-item">
                  <input
                    className="input-checkbox input-checkbox-md"
                    id="term-condition"
                    type="checkbox"
                  />
                  <label htmlFor="term-condition">
                    I have read the <a href="#">Terms of Condition</a> and{" "}
                    <a href="#">Privary Policy.</a>
                  </label>
                </div>
                <div className="input-item">
                  <input
                    className="input-checkbox input-checkbox-md"
                    id="info-currect"
                    type="checkbox"
                  />
                  <label htmlFor="info-currect">
                    All the personal information I have entered is correct.
                  </label>
                </div>
                <div className="gaps-1x" />
                <a href="kyc-thank-you.html" className="btn btn-primary">
                  Process for Verify
                </a>
              </div>
              {/* .step-fields */}
            </div>
          </div>
          {/* .card */}
        </div>
      </div>
    </div>
  );
}

export default KYCForm;
