import React from "react";

function EmailFailAuth() {
  return (
    <div className="page-content">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-8">
            <div className="card content-area">
              <div className="card-innr">
                <div className="status status-canceled px-md-5">
                  <div className="status-icon">
                    <em className="ti ti-close" />
                  </div>
                  <span className="status-text large text-danger">
                    Your email address was unable to be verified.
                  </span>
                  <p className="px-md-5 text-danger">
                    Please try again or contact support.
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

export default EmailFailAuth;
