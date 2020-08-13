import React, { useReducer, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'
import Loader from "react-loader-spinner";

const initialState = {
  userName: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  ethAddress: "",
}

function reducer(state, { field, value }) {
  return {
    ...state,
    [field]: value,
  };
}

function SignUp(props) {
  const [form, updateForm] = useReducer(reducer, initialState);
  const justRegistered = useSelector((state) => state.userReducer.justRegistered);
  const registerError = useSelector((state) => state.userReducer.registerError);
  const dispatch = useDispatch();
  const history = useHistory()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (justRegistered) {
      history.push('/sign-up-success')
    }
  }, [justRegistered])

  useEffect(() => {
    if (registerError) {
      setLoading(false)
    }
  }, [registerError])

  const {
    userName,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    ethAddress,
  } = form;

  const onChange = (e) => {
    if (e.target.name === "confirmPassword") {
      if (e.target.value !== password) {
        e.target.setCustomValidity("Please enter the same password as above");
      } else {
        e.target.setCustomValidity("");
      }
    }
    updateForm({ field: e.target.name, value: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    setTimeout(() => {
      dispatch(registerUser(form));
    }, 5000)
  };

  return (
    <div className="page-ath-form">
      <h2 className="page-ath-heading">
        Sign up <small>Create New Zin Account</small>
      </h2>
      <form onSubmit={onSubmit}>
        <div className="input-item">
          <input
            required
            name="userName"
            value={userName}
            onChange={onChange}
            type="text"
            placeholder="Username"
            className="input-bordered"
          />
        </div>
        <div className="input-item">
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
        </div>
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
        <div className="input-item">
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
        </div>
        <div className="input-item text-left">
          <input
            required
            className="input-checkbox input-checkbox-md"
            id="term-condition"
            type="checkbox"
          />
          <label htmlFor="term-condition">
            I agree to TokenWiz’s <a href="regular-page.html">Privacy Policy</a>{" "}
            &amp; <a href="regular-page.html"> Terms.</a>
          </label>
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
              <span>Creating Account...</span>
            </button> :
            <button disabled={loading} className="btn btn-primary btn-block">Create Account</button>
        }
        {
          registerError &&
          <div style={{ color: 'red', marginTop: '10px' }}>{registerError}</div>
        }
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
