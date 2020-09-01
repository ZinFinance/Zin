import React, { useReducer } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/userActions";
import { Link } from "react-router-dom";
import AsyncButton from "./AsyncButton";

function SignIn() {
  const dispatch = useDispatch();
  const [state, setState] = useReducer(reducer, {
    email: "",
    password: "",
    rememberMe: false,
    error: false,
    loading: false,
  });

  function reducer(state, newState) {
    return {
      ...state,
      ...newState,
    };
  }

  const { email, password, rememberMe, loading, error } = state;

  function signIn(e) {
    e.preventDefault();
    setState({ loading: true });
    dispatch(
      login(email, password, rememberMe, (error) => {
        if (error) {
          setState({ loading: false, error });
        }
      })
    );
  }

  return (
    <div className="page-ath-form">
      <h2 className="page-ath-heading">
        Sign in <small>with your Zin Account</small>
      </h2>
      <form onSubmit={signIn}>
        <div className="input-item">
          <input
            required
            value={email}
            onChange={(e) => setState({ email: e.target.value })}
            type="email"
            placeholder="Your Email"
            className="input-bordered"
          />
        </div>
        <div className="input-item">
          <input
            required
            value={password}
            onChange={(e) => setState({ password: e.target.value })}
            type="password"
            placeholder="Password"
            className="input-bordered"
          />
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div className="input-item text-left">
            <input
              onChange={(e) => setState({ rememberMe: e.target.checked })}
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
        <AsyncButton
          loading={loading}
          loadingText={"Signing In..."}
          defaultText={"Sign In"}
          buttonClasses="btn-primary btn-block"
        />
        {error && (
          <div style={{ marginTop: "10px" }} className="text-danger">
            {error}
          </div>
        )}
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
