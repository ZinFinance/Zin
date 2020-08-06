import React from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  return (
    <div className="page-ath-form">
      <h2 className="page-ath-heading">
        Reset password{" "}
        <span>
          If you forgot your password, well, then we’ll email you instructions
          to reset your password.
        </span>
      </h2>
      <form action="#">
        <div className="input-item">
          <input
            type="text"
            placeholder="Your Email"
            className="input-bordered"
          />
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <button className="btn btn-primary btn-block">
              Send Reset Link
            </button>
          </div>
          <div>
            <Link to="/sign-in">Return to login</Link>
          </div>
        </div>
        <div className="gaps-2x" />
      </form>
    </div>
  );
}

export default ForgotPassword;
