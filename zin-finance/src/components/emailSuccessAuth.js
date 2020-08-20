import React from "react";

function EmailSuccessAuth() {
  return (
    <div className="page-content">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-8">
            <div className="card content-area">
              <div className="card-innr">
                <div className="status status-thank px-md-5">
                  <div className="status-icon">
                    <em className="ti ti-check" />
                  </div>
                  <span className="status-text large text-dark">
                    Thank you for verifying your email
                  </span>
                  <p className="px-md-5">
                    You can now perform actions such as buying tokens.
                  </p>
                </div>
              </div>
            </div>
            {/* .card */}
            <div className="gaps-1x" />
            <div className="gaps-3x d-none d-sm-block" />
          </div>
        </div>
      </div>
      {/* .container */}
    </div>
  );
}

export default EmailSuccessAuth;
