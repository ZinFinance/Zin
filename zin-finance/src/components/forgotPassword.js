import React, { useReducer } from "react";
import { Link } from "react-router-dom";
import { resetPassword } from "../redux/actions/userActions";
import AsyncButton from "./AsyncButton";

function ForgotPassword() {
  const [state, setState] = useReducer(reducer, {
    email: "",
    loading: false,
    error: false,
    success: false,
  });

  const { email, loading, error, success } = state;

  function reducer(state, newState) {
    return {
      ...state,
      ...newState,
    };
  }

  const onChange = (e) => {
    setState({
      email: e.target.value,
      error: false,
      success: false,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setState({ loading: true });
    let error = await resetPassword(email);
    if (error) {
      setState({ success: false, loading: false, error });
    } else {
      setState({ success: true, loading: false, error: false });
    }
  };

  return (
    <div className="page-ath-form">
      <h2 className="page-ath-heading">
        Reset password{" "}
        <span>
          If you forgot your password, well, then we’ll email you instructions
          to reset your password.
        </span>
      </h2>
      <form onSubmit={submitForm}>
        <div className="input-item">
          <input
            required
            value={email}
            type="text"
            placeholder="Your Email"
            className="input-bordered"
            onChange={onChange}
          />
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <AsyncButton
              loading={loading}
              buttonClasses="btn-primary"
              defaultText="Send Reset Link"
              loadingText="Sending Link..."
            />
            <div className="gaps-2x d-sm-none" />
          </div>
          <div>
            <Link to="/sign-in">Return to login</Link>
          </div>
        </div>
        <div className="gaps-2x" />
        {error && <span className="text-danger">{error}</span>}
        {success && (
          <span className="text-success">
            <em className="ti ti-check-box" /> Reset Link Sent. Please check
            your email.
          </span>
        )}
      </form>
    </div>
  );
}

export default ForgotPassword;
