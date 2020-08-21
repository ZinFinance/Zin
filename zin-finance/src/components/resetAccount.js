import React, { useReducer } from "react";
import { Link } from "react-router-dom";
import { resetAccount } from "../redux/actions/userActions";
import AsyncButton from "./AsyncButton";
import { useLocation } from "react-router-dom";

function ResetAccount() {
  const location = useLocation();
  const [state, setState] = useReducer(reducer, {
    newPassword: "",
    confirmNewPassword: "",
    loading: false,
    error: false,
    success: false,
  });

  const { newPassword, confirmNewPassword, loading, error, success } = state;

  function reducer(state, newState) {
    return {
      ...state,
      ...newState,
    };
  }

  const onChange = (e) => {
    setState({
      [e.target.name]: e.target.value,
      error: false,
      success: false,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setState({ loading: true });
    let tempToken = new URLSearchParams(location.search).get("tempToken");
    let userId = new URLSearchParams(location.search).get("userId");
    let error = await resetAccount({
      tempToken,
      userId,
      newPassword,
      confirmNewPassword,
    });
    if (error) {
      setState({ success: false, loading: false, error });
    } else {
      setState({ success: true, loading: false, error: false });
    }
  };

  return (
    <div className="page-ath-form">
      <h2 className="page-ath-heading">
        Change Password <span>Enter a new password</span>
      </h2>
      <form onSubmit={submitForm}>
        <div className="input-item">
          <input
            required
            name="newPassword"
            value={newPassword}
            onChange={onChange}
            type="password"
            placeholder="Password"
            className="input-bordered"
          />
        </div>
        <div className="input-item">
          <input
            required
            name="confirmNewPassword"
            value={confirmNewPassword}
            onChange={onChange}
            type="password"
            placeholder="Repeat Password"
            className="input-bordered"
          />
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <AsyncButton
              loading={loading}
              buttonClasses="btn-primary"
              defaultText="Update Password"
              loadingText="Updating Password..."
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
            <em className="ti ti-check-box" /> Password Succesfully Updated.
            Please return to login and sign in with your new password.
          </span>
        )}
      </form>
    </div>
  );
}

export default ResetAccount;
