import React, { useReducer } from "react";
import { useCheckEmailVerified } from "../utility";
import { updatePassword } from "../redux/actions/userActions";
import AsyncButton from "./AsyncButton";

function UpdatePassword() {
  const [state, setState] = useReducer(reducer, {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    success: false,
    error: false,
    loading: false,
  });
  const disabled = useCheckEmailVerified();

  function reducer(state, newState) {
    return {
      ...state,
      ...newState,
    };
  }

  const {
    currentPassword,
    newPassword,
    confirmNewPassword,
    error,
    success,
    loading,
  } = state;

  const onChange = (e) => {
    if (e.target.name === "confirmNewPassword") {
      if (e.target.value !== newPassword) {
        e.target.setCustomValidity(
          "Please enter the same password as on the left"
        );
      } else {
        e.target.setCustomValidity("");
      }
    }
    setState({ [e.target.name]: e.target.value, success: false, error: false });
  };

  const changePassword = async (e) => {
    e.preventDefault();
    setState({ loading: true });
    setTimeout(async () => {
      let error = await updatePassword({
        currentPassword,
        newPassword,
        confirmNewPassword,
      });
      if (error) {
        setState({ error, loading: false });
      } else {
        setState({ success: true, loading: false });
      }
    }, 1000);
  };

  return (
    <div className="tab-pane fade" id="password">
      <form onSubmit={changePassword}>
        <div className="row">
          <div className="col-md-6">
            <div className="input-item input-with-label">
              <label htmlFor="currentPassword" className="input-item-label">
                Current Password
              </label>
              <input
                required
                className="input-bordered"
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={currentPassword}
                onChange={onChange}
              />
            </div>
            {/* .input-item */}
          </div>
          {/* .col */}
        </div>
        {/* .row */}
        <div className="row">
          <div className="col-md-6">
            <div className="input-item input-with-label">
              <label htmlFor="newPassword" className="input-item-label">
                New Password
              </label>
              <input
                required
                className="input-bordered"
                type="password"
                id="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={onChange}
              />
            </div>
            {/* .input-item */}
          </div>
          {/* .col */}
          <div className="col-md-6">
            <div className="input-item input-with-label">
              <label htmlFor="confirmNewPassword" className="input-item-label">
                Confirm New Password
              </label>
              <input
                required
                className="input-bordered"
                type="password"
                id="confirmNewPassword"
                name="confirmNewPassword"
                value={confirmNewPassword}
                onChange={onChange}
              />
            </div>
            {/* .input-item */}
          </div>
          {/* .col */}
        </div>
        {/* .row */}
        <div className="note note-plane note-info pdb-1x">
          <em className="fas fa-info-circle" />
          <p>
            Password should be minmum 8 letter and include lower and uppercase
            letter.
          </p>
        </div>
        <div className="gaps-1x" />
        {/* 10px gap */}
        <div className="d-sm-flex justify-content-between align-items-center">
          <AsyncButton
            loading={loading}
            buttonProps={disabled}
            buttonClasses="btn-primary"
            defaultText="Update Password"
            loadingText="Updating Password..."
          />
          <div className="gaps-2x d-sm-none" />
          {error && <span className="text-danger">{error}</span>}
          {success && (
            <span className="text-success">
              <em className="ti ti-check-box" /> Changed Password
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

export default UpdatePassword;
