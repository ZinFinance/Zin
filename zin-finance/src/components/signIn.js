import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../redux/actions/userActions";
import { Link } from "react-router-dom";

function SignIn(props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function signIn() {
    dispatch(
      fetchUser({
        email,
      })
    );
  }

  return (
    <div className="page-ath-content">
      <div className="page-ath-header">
        <a href="./" className="page-ath-logo">
          <img src="images/logo.png" srcSet="images/logo2x.png 2x" alt="logo" />
        </a>
      </div>
      <div className="page-ath-form">
        <h2 className="page-ath-heading">
          Sign in <small>with your TokenWiz Account</small>
        </h2>
        <form action="index.html">
          <div className="input-item">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Your Email"
              className="input-bordered"
            />
          </div>
          <div className="input-item">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="input-bordered"
            />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="input-item text-left">
              <input
                className="input-checkbox input-checkbox-md"
                id="remember-me"
                type="checkbox"
              />
              <label htmlFor="remember-me">Remember Me</label>
            </div>
            <div>
              <a href="forgot.html">Forgot password?</a>
              <div className="gaps-2x" />
            </div>
          </div>
          <button onClick={signIn} className="btn btn-primary btn-block">
            Sign In
          </button>
        </form>
        <div className="sap-text">
          <span>Or Sign In With</span>
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
          Don’t have an account?{" "}
          <Link to="/sign-up">
            {" "}
            <strong>Sign up here</strong>
          </Link>
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

export default SignIn;
