import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPrettyValue } from "../utility";
import { updateBonus } from "../redux/actions/adminActions";
import AsyncButton from "./AsyncButton";

const tokenRate = process.env.REACT_APP_API_TOKEN_RATE;

function AdminDashboard() {
  const dispatch = useDispatch();
  const adminData = useSelector((state) => state.adminReducer);
  const [totalTokensSold, setTotalTokensSold] = useState(0);

  const initialInviterBonus = adminData.bonuses.find(
    (bonus) => bonus.bonusType === 0
  );
  const initialInviteeBonus = adminData.bonuses.find(
    (bonus) => bonus.bonusType === 1
  );
  const initialPresaleBonus = adminData.bonuses.find(
    (bonus) => bonus.bonusType === 2
  );

  const [inviterBonus, setInviterBonus] = useState({
    updating: false,
    success: false,
    error: false,
    bonusType: initialInviterBonus.bonusType,
    bonusPercentage: initialInviterBonus.bonusPercentage,
    isActive: initialInviterBonus.isActive,
  });

  const [inviteeBonus, setInviteeBonus] = useState({
    updating: false,
    success: false,
    error: false,
    bonusType: initialInviteeBonus.bonusType,
    bonusPercentage: initialInviteeBonus.bonusPercentage,
    isActive: initialInviteeBonus.isActive,
  });

  const [presaleBonus, setPresaleBonus] = useState({
    updating: false,
    success: false,
    error: false,
    bonusType: initialPresaleBonus.bonusType,
    bonusPercentage: initialPresaleBonus.bonusPercentage,
    isActive: initialPresaleBonus.isActive,
  });

  useEffect(() => {
    let totalTokens = 0;
    for (let user of adminData.users) {
      totalTokens += user.zinTokens;
    }
    setTotalTokensSold(totalTokens);
  }, [adminData.users]);

  const updateInviterBonus = (e) => {
    e.preventDefault();
    setInviterBonus({
      ...inviterBonus,
      loading: true,
    });
    dispatch(
      updateBonus(
        inviterBonus.bonusType,
        inviterBonus.isActive,
        inviterBonus.bonusPercentage,
        (err) => {
          if (err) {
            setInviterBonus({
              ...inviterBonus,
              success: false,
              error: err,
              loading: false,
            });
          } else {
            setInviterBonus({
              ...inviterBonus,
              success: true,
              error: false,
              loading: false,
            });
          }
        }
      )
    );
  };

  const updateInviteeBonus = (e) => {
    e.preventDefault();
    setInviteeBonus({
      ...inviteeBonus,
      loading: true,
    });
    dispatch(
      updateBonus(
        inviteeBonus.bonusType,
        inviteeBonus.isActive,
        inviteeBonus.bonusPercentage,
        (err) => {
          if (err) {
            setInviteeBonus({
              ...inviteeBonus,
              success: false,
              error: err,
              loading: false,
            });
          } else {
            setInviteeBonus({
              ...inviteeBonus,
              success: true,
              error: false,
              loading: false,
            });
          }
        }
      )
    );
  };

  const updatePresaleBonus = (e) => {
    e.preventDefault();
    setPresaleBonus({
      ...presaleBonus,
      loading: true,
    });
    dispatch(
      updateBonus(
        presaleBonus.bonusType,
        presaleBonus.isActive,
        presaleBonus.bonusPercentage,
        (err) => {
          if (err) {
            setPresaleBonus({
              ...presaleBonus,
              success: false,
              error: err,
              loading: false,
            });
          } else {
            setPresaleBonus({
              ...presaleBonus,
              success: false,
              error: err,
              loading: false,
            });
          }
        }
      )
    );
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4">
          <div className="token-statistics card card-token">
            <div className="card-innr">
              <div className="token-balance token-balance-with-icon">
                <div className="token-balance-icon">
                  <img src="/images/logo-light-sm.png" alt="logo" />
                </div>
                <div className="token-balance-text">
                  <h6 className="card-sub-title">Total Tokens Sold</h6>
                  <span className="lead">
                    {getPrettyValue(totalTokensSold)} <span>ZIN</span>
                  </span>
                </div>
              </div>
              <div className="token-balance token-balance-s2">
                <h6 className="card-sub-title">Total Contribution </h6>
                <ul className="token-balance-list">
                  <li className="token-balance-sub">
                    <span className="lead">
                      {getPrettyValue(totalTokensSold / tokenRate)}
                    </span>
                    <span className="sub">ETH</span>
                  </li>
                  {/* <li className="token-balance-sub">
                    <span className="lead">1.265</span>
                    <span className="sub">BTC</span>
                  </li>
                  <li className="token-balance-sub">
                    <span className="lead">6.506</span>
                    <span className="sub">LTC</span>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="content-area card">
            <div className="card-innr">
              <div className="card-head">
                <h6 className="card-title">Configuration</h6>
              </div>
              <div
                className="pdt-1-5x tab-pane fade active show"
                id="admin-configuration"
              >
                <form onSubmit={updateInviterBonus}>
                  <div style={{ display: "flex" }} className="input-item">
                    <input
                      type="checkbox"
                      className="input-switch input-switch-sm"
                      id="save-log"
                      checked={inviterBonus.isActive}
                      onChange={(e) => {
                        setInviterBonus({
                          ...inviterBonus,
                          success: false,
                          error: false,
                          isActive: e.target.checked,
                        });
                      }}
                    />
                    <label
                      style={{ display: "contents" }}
                      className="input-item-label"
                      htmlFor="save-log"
                    >
                      Inviter Bonus
                    </label>

                    <div
                      style={{ paddingBottom: "5px", paddingLeft: "30px" }}
                      className="col-md-4"
                    >
                      <div className="input-item input-with-label">
                        <label className="input-item-label">
                          Bonus Percentage
                        </label>
                        <input
                          required
                          className="input-bordered"
                          type="number"
                          min="0"
                          value={inviterBonus.bonusPercentage}
                          onChange={(e) =>
                            setInviterBonus({
                              ...inviterBonus,
                              error: false,
                              success: false,
                              bonusPercentage: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="d-flex align-items-center col-md-3">
                      <div className="flex-col">
                        <AsyncButton
                          loading={inviterBonus.loading}
                          defaultText="Update"
                          loadingText="Updating..."
                          buttonClasses="btn-sm btn-auto btn-primary"
                        />
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      {inviterBonus.success && (
                        <span className="text-success">
                          <em
                            style={{ marginRight: "5px" }}
                            className="ti ti-check-box"
                          />
                          Updated
                        </span>
                      )}
                      {inviterBonus.error && (
                        <span className="text-danger">
                          {inviterBonus.error}
                        </span>
                      )}
                    </div>
                  </div>
                </form>

                <form onSubmit={updateInviteeBonus}>
                  <div style={{ display: "flex" }} className="input-item">
                    <input
                      type="checkbox"
                      className="input-switch input-switch-sm"
                      id="save-log"
                      checked={inviteeBonus.isActive}
                      onChange={(e) => {
                        setInviteeBonus({
                          ...inviteeBonus,
                          success: false,
                          error: false,
                          isActive: e.target.checked,
                        });
                      }}
                    />
                    <label
                      style={{ display: "contents" }}
                      className="input-item-label"
                      htmlFor="save-log"
                    >
                      Invitee Bonus
                    </label>

                    <div
                      style={{ paddingBottom: "5px", paddingLeft: "30px" }}
                      className="col-md-4"
                    >
                      <div className="input-item input-with-label">
                        <label className="input-item-label">
                          Bonus Percentage
                        </label>
                        <input
                          required
                          className="input-bordered"
                          type="number"
                          min="0"
                          value={inviteeBonus.bonusPercentage}
                          onChange={(e) =>
                            setInviteeBonus({
                              ...inviteeBonus,
                              error: false,
                              success: false,
                              bonusPercentage: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="d-flex align-items-center col-md-3">
                      <div className="flex-col">
                        <AsyncButton
                          loading={inviteeBonus.loading}
                          defaultText="Update"
                          loadingText="Updating..."
                          buttonClasses="btn-sm btn-auto btn-primary"
                        />
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      {inviteeBonus.success && (
                        <span className="text-success">
                          <em
                            style={{ marginRight: "5px" }}
                            className="ti ti-check-box"
                          />
                          Updated
                        </span>
                      )}
                      {inviteeBonus.error && (
                        <span className="text-danger">
                          {inviteeBonus.error}
                        </span>
                      )}
                    </div>
                  </div>
                </form>

                <form onSubmit={updatePresaleBonus}>
                  <div style={{ display: "flex" }} className="input-item">
                    <input
                      type="checkbox"
                      className="input-switch input-switch-sm"
                      id="save-log"
                      checked={presaleBonus.isActive}
                      onChange={(e) => {
                        setPresaleBonus({
                          ...presaleBonus,
                          success: false,
                          error: false,
                          isActive: e.target.checked,
                        });
                      }}
                    />
                    <label
                      style={{ display: "contents" }}
                      className="input-item-label"
                      htmlFor="save-log"
                    >
                      Presale Bonus
                    </label>

                    <div
                      style={{ paddingBottom: "5px", paddingLeft: "30px" }}
                      className="col-md-4"
                    >
                      <div className="input-item input-with-label">
                        <label className="input-item-label">
                          Bonus Percentage
                        </label>
                        <input
                          required
                          className="input-bordered"
                          type="number"
                          min="0"
                          value={presaleBonus.bonusPercentage}
                          onChange={(e) =>
                            setPresaleBonus({
                              ...presaleBonus,
                              error: false,
                              success: false,
                              bonusPercentage: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="d-flex align-items-center col-md-3">
                      <div className="flex-col">
                        <AsyncButton
                          loading={presaleBonus.loading}
                          defaultText="Update"
                          loadingText="Updating..."
                          buttonClasses="btn-sm btn-auto btn-primary"
                        />
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      {presaleBonus.success && (
                        <span className="text-success">
                          <em
                            style={{ marginRight: "5px" }}
                            className="ti ti-check-box"
                          />
                          Updated
                        </span>
                      )}
                      {presaleBonus.error && (
                        <span className="text-danger">
                          {presaleBonus.error}
                        </span>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
            {/* .card-innr */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
