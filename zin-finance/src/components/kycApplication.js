import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function KYCApplication() {
  const user = useSelector((state) => state.userReducer.user);

  return (
    <div className="container">
      <div className="page-header page-header-kyc">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 className="page-title">KYC Verification</h2>
              <p className="large">
                To comply with regulation each participant will have to go
                through indentity verification (KYC/AML) to prevent fraud
                causes. Please, complete our fast and secure verification
                process to participate in our token sale.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-10 col-xl-9">
          <div className="kyc-status card mx-lg-4">
            <div className="card-innr">
              <div className="status status-empty">
                <div className="status-icon">
                  <em className="ti ti-files" />
                </div>
                {!user.emailVerified ? (
                  <span className="status-text text-dark">
                    Please verify your email in order to complete the KYC form
                  </span>
                ) : (
                  <span className="status-text text-dark">
                    You have not submitted your necessary documents to verify
                    your identity. In order to purchase our tokens, please
                    verify your identity.
                  </span>
                )}
                {user.emailVerified ? (
                  <Link to="/kyc-form">
                    <button className="btn btn-primary">
                      Click here to complete your KYC
                    </button>
                  </Link>
                ) : (
                  <button
                    disabled
                    style={{ cursor: "not-allowed" }}
                    className="btn btn-primary"
                  >
                    Click here to complete your KYC
                  </button>
                )}
              </div>
            </div>
          </div>
          {/* .card */}
          <p className="text-light text-center">
            If you have any question, please contact our support team{" "}
            <a href="#">info@tokenwiz.com</a>.
          </p>
          <div className="gaps-1x" />
          <div className="gaps-3x d-none d-sm-block" />
        </div>
      </div>
    </div>
  );
}

export default KYCApplication;
