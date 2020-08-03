import React from "react";
import { useCheckAuth } from "../auth";
import { Link } from "react-router-dom";

function KYCApplication() {
  useCheckAuth();

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-10 col-xl-9">
          <div className="kyc-status card mx-lg-4">
            <div className="card-innr">
              <div className="status status-empty">
                <div className="status-icon">
                  <em className="ti ti-files" />
                </div>
                <span className="status-text text-dark">
                  You have not submitted your necessary documents to verify your
                  identity. In order to purchase our tokens, please verify your
                  identity.
                </span>
                <Link to="/kyc-form">
                  <button className="btn btn-primary">
                    Click here to complete your KYC
                  </button>
                </Link>
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
