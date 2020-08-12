import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function KYCApplication() {
  const emailVerified = useSelector((state) => state.userReducer.emailVerified);
  const kycApplicationStatus = useSelector(
    (state) => state.kycReducer.applicationStatus
  );
  const [kycStatus, setKYCStatus] = useState({
    description: `You have not submitted your application to verify your 
      identity. In order to purchase our tokens, please verify your identity.`,
    buttonText: "Click here to complete your KYC",
    disabled: false,
  });

  useEffect(() => {
    if (emailVerified) {
      if (kycApplicationStatus) {
        if (kycApplicationStatus.reviewStatus === "completed") {
          if ((kycApplicationStatus.reviewResult.reviewAnswer = "RED")) {
            setKYCStatus({
              buttonText: "Click here to view more details",
              description: "Your application has been rejected",
              disabled: false,
            });
          } else {
            setKYCStatus({
              buttonText: "Your application has been approved",
              description: "Your application has been approved",
              disabled: true,
            });
          }
        } else if (
          kycApplicationStatus.reviewStatus === "pending" ||
          kycApplicationStatus.reviewStatus === "queued" ||
          kycApplicationStatus.reviewStatus === "onHold"
        ) {
          setKYCStatus({
            buttonText: "Click here to view your status",
            description: "Your application has been received and is pending",
            disabled: false,
          });
        }
      }
    } else {
      setKYCStatus({
        buttonText: "Click here to complete your KYC",
        description:
          "Please verify your email in order to complete the KYC form",
        disabled: true,
      });
    }
  }, [emailVerified, kycApplicationStatus]);

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
                <span className="status-text text-dark">
                  {kycStatus.description}
                </span>
                {!kycStatus.disabled ? (
                  <Link to="/kyc-form">
                    <button className="btn btn-primary">
                      {kycStatus.buttonText}
                    </button>
                  </Link>
                ) : (
                  <button
                    disabled
                    style={{ cursor: "not-allowed" }}
                    className="btn btn-primary"
                  >
                    {kycStatus.buttonText}
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
