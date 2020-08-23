import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPrettyValue } from "../utility";
import { updateBonus } from "../redux/actions/adminActions";
import AsyncButton from "./AsyncButton";
import PageLoader from "./pageLoader";
import EthService from "../ethService";
const ethService = new EthService();

const tokenRate = process.env.REACT_APP_API_TOKEN_RATE;
const INVITER = 0;
const INVITEE = 1;
const PRESALE = 2;

function AdminDashboard() {
  const dispatch = useDispatch();
  const adminData = useSelector((state) => state.adminReducer);
  const [totalContribution, setTotalContribution] = useState(0);
  const [bonuses, setBonuses] = useState([]);

  useEffect(() => {
    if (bonuses.length === 0 && adminData.bonuses) {
      let bonusesData = [...adminData.bonuses];
      bonusesData = bonusesData.sort((a, b) => a.bonusType - b.bonusType);
      setBonuses(
        bonusesData.map((bonus) => {
          return {
            ...bonus,
            updating: false,
            success: false,
            error: false,
            name:
              (bonus.bonusType === INVITER && "Inviter") ||
              (bonus.bonusType === INVITEE && "Invitee") ||
              (bonus.bonusType === PRESALE && "Presale"),
          };
        })
      );
    }
  }, [adminData.bonuses, bonuses.length]);

  useEffect(() => {
    const getTotalContribution = async () => {
      const totalContribution = await ethService.getTotalContribution();
      setTotalContribution(totalContribution);
    };
    getTotalContribution();
  }, [adminData.users]);

  const submitUpdate = (e, bonusType) => {
    e.preventDefault();
    let bonusesCopy = [...bonuses];
    bonusesCopy[bonusType] = {
      ...bonusesCopy[bonusType],
      loading: true,
    };
    setBonuses(bonusesCopy);
    dispatch(
      updateBonus(
        bonusType,
        bonuses[bonusType].isActive,
        bonuses[bonusType].bonusPercentage,
        (err) => {
          if (err) {
            let bonusesCopy = [...bonuses];
            bonusesCopy[bonusType] = {
              ...bonusesCopy[bonusType],
              success: false,
              error: err,
              loading: false,
            };
            setBonuses(bonusesCopy);
          } else {
            let bonusesCopy = [...bonuses];
            bonusesCopy[bonusType] = {
              ...bonusesCopy[bonusType],
              success: true,
              error: false,
              loading: false,
            };
            setBonuses(bonusesCopy);
          }
        }
      )
    );
  };

  const handleChange = (e, bonusType) => {
    let bonusesCopy = [...bonuses];
    bonusesCopy[bonusType] = {
      ...bonusesCopy[bonusType],
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
      success: false,
      error: false,
    };
    setBonuses(bonusesCopy);
  };

  if (!adminData.users || !adminData.bonuses) {
    return <PageLoader containerHeight="50vh" />;
  } else {
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
                      {getPrettyValue(totalContribution * tokenRate)}{" "}
                      <span>ZIN</span>
                    </span>
                  </div>
                </div>
                <div className="token-balance token-balance-s2">
                  <h6 className="card-sub-title">Total Contribution </h6>
                  <ul className="token-balance-list">
                    <li className="token-balance-sub">
                      <span className="lead">
                        {getPrettyValue(totalContribution)}
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
                  {bonuses.map((bonus) => (
                    <form onSubmit={(e) => submitUpdate(e, bonus.bonusType)}>
                      <div style={{ display: "flex" }} className="input-item">
                        <input
                          type="checkbox"
                          name="isActive"
                          className="input-switch input-switch-sm"
                          id={`save-log-${bonus.bonusType}`}
                          checked={bonus.isActive}
                          onChange={(e) => {
                            handleChange(e, bonus.bonusType);
                          }}
                        />

                        <label
                          style={{ display: "contents" }}
                          className="input-item-label"
                          htmlFor={`save-log-${bonus.bonusType}`}
                        >
                          {bonus.name} Bonus
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
                              name="bonusPercentage"
                              className="input-bordered"
                              type="number"
                              min="0"
                              value={bonus.bonusPercentage}
                              onChange={(e) => handleChange(e, bonus.bonusType)}
                            />
                          </div>
                        </div>

                        <div className="d-flex align-items-center col-md-3">
                          <div className="flex-col">
                            <AsyncButton
                              loading={bonus.loading}
                              defaultText="Update"
                              loadingText="Updating..."
                              buttonClasses="btn-sm btn-auto btn-primary"
                            />
                          </div>
                        </div>

                        <div className="d-flex justify-content-between align-items-center">
                          {bonus.success && (
                            <span className="text-success">
                              <em
                                style={{ marginRight: "5px" }}
                                className="ti ti-check-box"
                              />
                              Updated
                            </span>
                          )}
                          {bonus.error && (
                            <span className="text-danger">{bonus.error}</span>
                          )}
                        </div>
                      </div>
                    </form>
                  ))}
                </div>
              </div>
              {/* .card-innr */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminDashboard;
