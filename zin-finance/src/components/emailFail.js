import React, { useEffect } from "react";

function EmailFail(props) {
  return (
    <div className="page-ath-text">
      <h2 className="page-ath-heading">
        <small className="text-danger">
          Your email address was unable to be verified.
        </small>{" "}
        <span className="text-danger">
          Please try again or contact support.
        </span>
      </h2>
    </div>
  );
}

export default EmailFail;
