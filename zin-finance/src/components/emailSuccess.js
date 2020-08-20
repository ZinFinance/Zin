import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function EmailSuccess(props) {
  return (
    <div className="page-ath-text">
      <h2 className="page-ath-heading">
        Thank you! <small>Your email is now verified.</small>{" "}
        <Link to="/sign-in">
          <span className="text-success">Sign in to access your account</span>
        </Link>
      </h2>
    </div>
  );
}

export default EmailSuccess;
