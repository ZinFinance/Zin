import React, { useReducer } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../redux/actions/userActions";
import { useHistory } from "react-router-dom";
import AsyncButton from "./AsyncButton";

const initialState = {
  // firstName: "",
  // lastName: "",
  // ethAddress: "",
  email: "",
  password: "",
  confirmPassword: "",
  loading: false,
  error: false,
};

function reducer(state, newState) {
  return {
    ...state,
    ...newState,
  };
}

function SignUp() {
  const [state, setState] = useReducer(reducer, initialState);
  const history = useHistory();

  const {
    // firstName,
    // lastName,
    // ethAddress,
    email,
    password,
    confirmPassword,
    loading,
    error,
  } = state;

  const onChange = (e) => {
    if (e.target.name === "confirmPassword") {
      if (e.target.value !== password) {
        e.target.setCustomValidity("Please enter the same password as above");
      } else {
        e.target.setCustomValidity("");
      }
    }
    setState({ [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setState({ loading: true });
    setTimeout(async () => {
      let error = await registerUser({
        userName: email,
        email,
        // firstName,
        // lastName,
        // ethAddress,
      });
      if (error) {
        setState({ error, loading: false });
      } else {
        history.push("/sign-up-success", { justRegistered: true });
      }
    }, 1000);
  };

  return (
    <div className="page-ath-form">
      <h2 className="page-ath-heading">
        Sign up <small>Create New Zin Account</small>
      </h2>
      <form onSubmit={onSubmit}>
        {/* <div className="input-item">
          <input
            required
            name="firstName"
            value={firstName}
            onChange={onChange}
            type="text"
            placeholder="Your First Name"
            className="input-bordered"
          />
        </div>
        <div className="input-item">
          <input
            required
            name="lastName"
            value={lastName}
            onChange={onChange}
            type="text"
            placeholder="Your Last Name"
            className="input-bordered"
          />
        </div> */}
        <div className="input-item">
          <input
            required
            name="email"
            value={email}
            onChange={onChange}
            type="text"
            placeholder="Your Email"
            className="input-bordered"
          />
        </div>
        <div className="input-item">
          <input
            required
            name="password"
            value={password}
            onChange={onChange}
            type="password"
            placeholder="Password"
            className="input-bordered"
          />
        </div>
        <div className="input-item">
          <input
            required
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChange}
            type="password"
            placeholder="Repeat Password"
            className="input-bordered"
          />
        </div>
        {/* <div className="input-item">
          <input
            required
            name="ethAddress"
            value={ethAddress}
            onChange={onChange}
            className="input-bordered"
            type="text"
            placeholder="Your Ethereum Address for tokens"
            pattern="^0x[a-fA-F0-9]{40}$"
            title="Address should be ERC20-compliant."
          />
          <span className="input-note">
            Note: Address should be ERC20-compliant.
          </span>
        </div> */}
        <div className="input-item text-left">
          <input
            required
            className="input-checkbox input-checkbox-md"
            id="term-condition"
            type="checkbox"
          />
          <label htmlFor="term-condition">
            I agree to Zin's <a href="regular-page.html">Privacy Policy</a>{" "}
            &amp; <a href="regular-page.html"> Terms.</a>
          </label>
        </div>
        <AsyncButton
          loading={loading}
          defaultText="Create Account"
          loadingText="Creating Account..."
          buttonClasses="btn-primary btn-block"
        />
        {error && (
          <div style={{ color: "red", marginTop: "10px" }}>{error}</div>
        )}
      </form>
      {/* <div className="sap-text">
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
          <a href="#" className="btn btn-outline btn-dark btn-google btn-block">
            <em className="fab fa-google" />
            <span>Google</span>
          </a>
        </li>
      </ul> */}
      <div className="gaps-2x" />
      <div className="gaps-2x" />
      <div className="form-note">
        Already have an account ?{" "}
        <Link to="/sign-in">
          {" "}
          <strong>Sign in instead</strong>
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
