import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/userActions";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";

function SignIn() {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const loginError = useSelector((state) => state.userReducer.loginError);

  useEffect(() => {
    if (loginError) {
      setLoading(false)
    }
  }, [loginError])

  function signIn(e) {
    e.preventDefault();
    setLoading(true)
    dispatch(
      login(userName, password, rememberMe)
    );
  }

  return (
    <div className="page-ath-form">
      <h2 className="page-ath-heading">
        Sign in <small>with your TokenWiz Account</small>
      </h2>
      <form onSubmit={signIn}>
        <div className="input-item">
          <input
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            placeholder="Your Username"
            className="input-bordered"
          />
        </div>
        <div className="input-item">
          <input
            required
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
              onChange={(e) => setRememberMe(e.target.checked)}
              className="input-checkbox input-checkbox-md"
              id="remember-me"
              type="checkbox"
            />
            <label htmlFor="remember-me">Remember Me</label>
          </div>
          <div>
            <Link to="/forgot-password">Forgot password?</Link>
            <div className="gaps-2x" />
          </div>
        </div>
        {
          loading ?
            <button disabled className="btn btn-primary btn-block">
              <Loader
                style={{
                  display: 'inline-block',
                  marginRight: '10px'
                }}
                type="TailSpin"
                color="white"
                height={25}
                width={25}
              />
              <span>Signing In...</span>
            </button> :
            <button disabled={loading} className="btn btn-primary btn-block">Sign In</button>
        }
        {
          loginError &&
          <div style={{ color: 'red', marginTop: '10px' }}>{loginError}</div>
        }
      </form>
      {/* <div className="sap-text">
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
          <a href="#" className="btn btn-outline btn-dark btn-google btn-block">
            <em className="fab fa-google" />
            <span>Google</span>
          </a>
        </li>
      </ul> */}
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
  );
}

export default SignIn;
