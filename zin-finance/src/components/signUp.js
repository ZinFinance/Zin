import React from "react";
import { useCheckAuth } from "../auth";

function SignUp(props) {
  useCheckAuth(true);

  return (
    <div className="page-ath-content">
      <div className="page-ath-header">
        <a href="./" className="page-ath-logo">
          <img src="images/logo.png" srcSet="images/logo2x.png 2x" alt="logo" />
        </a>
      </div>
      <div className="page-ath-form">
        <h2 className="page-ath-heading">
          Sign up <small>Create New TokenWiz Account</small>
        </h2>
        <form action="#">
          <div className="input-item">
            <input
              type="text"
              placeholder="Your Name"
              className="input-bordered"
            />
          </div>
          <div className="input-item">
            <input
              type="text"
              placeholder="Your Email"
              className="input-bordered"
            />
          </div>
          <div className="input-item">
            <input
              type="password"
              placeholder="Password"
              className="input-bordered"
            />
          </div>
          <div className="input-item">
            <input
              type="password"
              placeholder="Repeat Password"
              className="input-bordered"
            />
          </div>
          <div className="input-item text-left">
            <input
              className="input-checkbox input-checkbox-md"
              id="term-condition"
              type="checkbox"
            />
            <label htmlFor="term-condition">
              I agree to TokenWiz’s{" "}
              <a href="regular-page.html">Privacy Policy</a> &amp;{" "}
              <a href="regular-page.html"> Terms.</a>
            </label>
          </div>
          <button className="btn btn-primary btn-block">Create Account</button>
        </form>
        <div className="sap-text">
          <span>Or Sign Up With</span>
        </div>
        <ul className="row guttar-20px guttar-vr-20px">
          <li className="col">
            <a
              href="#"
              className="btn btn-outline btn-dark btn-facebook btn-block"
            >
              <em className="fab fa-facebook-f" />
              <span>Facebook</span>
            </a>
          </li>
          <li className="col">
            <a
              href="#"
              className="btn btn-outline btn-dark btn-google btn-block"
            >
              <em className="fab fa-google" />
              <span>Google</span>
            </a>
          </li>
        </ul>
        <div className="gaps-2x" />
        <div className="gaps-2x" />
        <div className="form-note">
          Already have an account ?{" "}
          <a href="sign-in.html">
            {" "}
            <strong>Sign in instead</strong>
          </a>
        </div>
      </div>
      <div className="page-ath-footer">
        <ul className="footer-links">
          <li>
            <a href="regular-page.html">Privacy Policy</a>
          </li>
          <li>
            <a href="regular-page.html">Terms</a>
          </li>
          <li>© 2018 TokenWiz.</li>
        </ul>
      </div>
    </div>
  );
}

export default SignUp;
