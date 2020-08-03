import React, { useEffect } from "react";
import { useCheckAuth } from "../auth";

function Dashboard(props) {
  useCheckAuth();

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4">
          <div className="token-statistics card card-token height-auto">
            <div className="card-innr">
              <div className="token-balance token-balance-with-icon">
                <div className="token-balance-icon">
                  <img src="images/logo-light-sm.png" alt="logo" />
                </div>
                <div className="token-balance-text">
                  <h6 className="card-sub-title">Tokens Balance</h6>
                  <span className="lead">
                    120,000,000 <span>TWZ</span>
                  </span>
                </div>
              </div>
              <div className="token-balance token-balance-s2">
                <h6 className="card-sub-title">Your Contribution</h6>
                <ul className="token-balance-list">
                  <li className="token-balance-sub">
                    <span className="lead">2.646</span>
                    <span className="sub">ETH</span>
                  </li>
                  <li className="token-balance-sub">
                    <span className="lead">1.265</span>
                    <span className="sub">BTC</span>
                  </li>
                  <li className="token-balance-sub">
                    <span className="lead">6.506</span>
                    <span className="sub">LTC</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* .col */}
        <div className="col-lg-8">
          <div className="token-information card card-full-height">
            <div className="row no-gutters height-100">
              <div className="col-md-6 text-center">
                <div className="token-info">
                  <img
                    className="token-info-icon"
                    src="images/logo-sm.png"
                    alt="logo-sm"
                  />
                  <div className="gaps-2x" />
                  <h1 className="token-info-head text-light">
                    1 ETH = 1000 TWZ
                  </h1>
                  <h5 className="token-info-sub">1 ETH = 254.05 USD</h5>
                </div>
              </div>
              <div className="col-md-6">
                <div className="token-info bdr-tl">
                  <div>
                    <ul className="token-info-list">
                      <li>
                        <span>Token Name:</span>TokenWiz
                      </li>
                      <li>
                        <span>Ticket Symbol:</span>TWZ
                      </li>
                    </ul>
                    <a href="#" className="btn btn-primary">
                      <em className="fas fa-download mr-3" />
                      Download Whitepaper
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* .card */}
        </div>
        {/* .col */}
        <div className="col-xl-8 col-lg-7">
          <div className="token-transaction card card-full-height">
            <div className="card-innr">
              <div className="card-head has-aside">
                <h4 className="card-title">Transaction</h4>
                <div className="card-opt">
                  <a href="transactions.html" className="link ucap">
                    View ALL <em className="fas fa-angle-right ml-2" />
                  </a>
                </div>
              </div>
              <table className="table tnx-table">
                <thead>
                  <tr>
                    <th>TWZ Tokens</th>
                    <th>Amount</th>
                    <th className="d-none d-sm-table-cell tnx-date">Date</th>
                    <th className="tnx-type">
                      <div className="tnx-type-text" />
                    </th>
                  </tr>
                  {/* tr */}
                </thead>
                {/* thead */}
                <tbody>
                  <tr>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="data-state data-state-pending"></div>
                        <span className="lead">18,750</span>
                      </div>
                    </td>
                    <td>
                      <span>
                        <span className="lead">3.543</span>
                        <span className="sub">
                          ETH{" "}
                          <em
                            className="fas fa-info-circle"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            data-original-title="1 ETH = 590.54 USD"
                          />
                        </span>
                      </span>
                    </td>
                    <td className="d-none d-sm-table-cell tnx-date">
                      <span className="sub sub-s2">2018-08-24 10:20 PM</span>
                    </td>
                    <td className="tnx-type">
                      <span className="tnx-type-md badge badge-outline badge-success badge-md">
                        Purchase
                      </span>
                      <span className="tnx-type-sm badge badge-sq badge-outline badge-success badge-md">
                        P
                      </span>
                    </td>
                  </tr>
                  {/* tr */}
                  <tr>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="data-state data-state-progress"></div>
                        <span className="lead">8,052</span>
                      </div>
                    </td>
                    <td>
                      <span>
                        <span className="lead">0.165</span>
                        <span className="sub">
                          BTC{" "}
                          <em
                            className="fas fa-info-circle"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            data-original-title="1 BTC = 5450.54 USD"
                          />
                        </span>
                      </span>
                    </td>
                    <td className="d-none d-sm-table-cell tnx-date">
                      <span className="sub sub-s2">2018-08-24 10:20 PM</span>
                    </td>
                    <td className="tnx-type">
                      <span className="tnx-type-md badge badge-outline badge-warning badge-md">
                        Bonus
                      </span>
                      <span className="tnx-type-sm badge badge-sq badge-outline badge-warning badge-md">
                        B
                      </span>
                    </td>
                  </tr>
                  {/* tr */}
                  <tr>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="data-state data-state-approved"></div>
                        <span className="lead">19,000</span>
                      </div>
                    </td>
                    <td>
                      <span>
                        <span className="lead">3.141</span>
                        <span className="sub">
                          LTC{" "}
                          <em
                            className="fas fa-info-circle"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            data-original-title="1 LTC = 180.54 USD"
                          />
                        </span>
                      </span>
                    </td>
                    <td className="d-none d-sm-table-cell tnx-date">
                      <span className="sub sub-s2">2018-08-24 10:20 PM</span>
                    </td>
                    <td className="tnx-type">
                      <span className="tnx-type-md badge badge-outline badge-warning badge-md">
                        Bonus
                      </span>
                      <span className="tnx-type-sm badge badge-sq badge-outline badge-warning badge-md">
                        B
                      </span>
                    </td>
                  </tr>
                  {/* tr */}
                </tbody>
                {/* tbody */}
              </table>
              {/* .table */}
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-5">
          <div className="token-calculator card card-full-height">
            <div className="card-innr">
              <div className="card-head">
                <h4 className="card-title">Token Calculation</h4>
                <p className="card-title-text">
                  Enter amount to calculate token.
                </p>
              </div>
              <div className="token-calc">
                <div className="token-pay-amount">
                  <input
                    id="token-base-amount"
                    className="input-bordered input-with-hint"
                    type="text"
                    defaultValue={1}
                  />
                  <div className="token-pay-currency">
                    <a
                      href="#"
                      className="link ucap link-light toggle-tigger toggle-caret"
                    >
                      ETH
                    </a>
                    <div className="toggle-class dropdown-content">
                      <ul className="dropdown-list">
                        <li>
                          <a href="#">BTC</a>
                        </li>
                        <li>
                          <a href="#">LTC</a>
                        </li>
                        <li>
                          <a href="#">USD</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="token-received">
                  <div className="token-eq-sign">=</div>
                  <div className="token-received-amount">
                    <h5 className="token-amount">123,500.84</h5>
                    <div className="token-symbol">TWZ</div>
                  </div>
                </div>
              </div>
              <div className="token-calc-note note note-plane">
                <em className="fas fa-info-circle text-light" />
                <span className="note-text text-light">
                  Amount calculated based current tokens price
                </span>
              </div>
              <div className="token-buy">
                <a href="#" className="btn btn-primary">
                  Buy Tokens
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* .row */}
      <div className="row">
        <div className="col-xl-8 col-lg-7">
          <div className="token-sale-graph card card-full-height">
            <div className="card-innr">
              <div className="card-head has-aside">
                <h4 className="card-title">Tokens Sale Graph</h4>
                <div className="card-opt">
                  <a
                    href="#"
                    className="link ucap link-light toggle-tigger toggle-caret"
                  >
                    7 Days
                  </a>
                  <div className="toggle-class dropdown-content">
                    <ul className="dropdown-list">
                      <li>
                        <a href="#">30 days</a>
                      </li>
                      <li>
                        <a href="#">1 years</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="chart-tokensale">
                <canvas id="tknSale" />
              </div>
            </div>
          </div>
          {/* .card */}
        </div>
        {/* .col */}
        <div className="col-xl-4 col-lg-5">
          <div className="token-sales card card-full-height">
            <div className="card-innr">
              <div className="card-head">
                <h4 className="card-title">Token Sales Progress</h4>
              </div>
              <ul className="progress-info">
                <li>
                  <span>Raised</span> 2,758 TWZ
                </li>
                <li className="text-right">
                  <span>TOTAL</span> 1,500,000 TWZ
                </li>
              </ul>
              <div className="progress-bar">
                <div
                  className="progress-hcap"
                  data-percent={83}
                  style={{ width: "83%" }}
                >
                  <div>
                    Hard cap <span>1,400,000</span>
                  </div>
                </div>
                <div
                  className="progress-scap"
                  data-percent={24}
                  style={{ width: "24%" }}
                >
                  <div>
                    Soft cap <span>40,000</span>
                  </div>
                </div>
                <div
                  className="progress-percent"
                  data-percent={28}
                  style={{ width: "28%" }}
                />
              </div>
              <span className="card-sub-title mgb-0-5x">Sales END IN</span>
              <div className="countdown-clock" data-date="2019/04/05">
                <div>
                  <span className="countdown-time countdown-time-first">
                    78
                  </span>
                  <span className="countdown-text">Day</span>
                </div>
                <div>
                  <span className="countdown-time">08</span>
                  <span className="countdown-text">Hour</span>
                </div>
                <div>
                  <span className="countdown-time">30</span>
                  <span className="countdown-text">Min</span>
                </div>
                <div>
                  <span className="countdown-time countdown-time-last">38</span>
                  <span className="countdown-text">Sec</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
