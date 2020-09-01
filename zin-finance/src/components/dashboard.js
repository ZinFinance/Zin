import React from "react";
import { useSelector } from "react-redux";
import { getPrettyValue } from "../utility";
import BuyToken from "./buyToken";

const tokenRate = process.env.REACT_APP_API_TOKEN_RATE;

function Dashboard() {
  const user = useSelector((state) => state.userReducer.user);
  const ethToUSDValue = useSelector((state) => state.userReducer.ethToUSDValue);

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4">
          <div className="token-statistics card card-token card-full-height">
            <div className="card-innr">
              <div className="token-balance token-balance-with-icon">
                <div className="token-balance-icon">
                  <img src="/images/logo-light-sm.png" alt="logo" />
                </div>
                <div className="token-balance-text">
                  <h6 className="card-sub-title">
                    Tokens Balance{" "}
                    <em
                      style={{ color: "white" }}
                      className="fas fa-question-circle"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="If you see 0 balance, you need to add Zin as a custom token in your metamask wallet which contains Zin."
                    />
                  </h6>
                  <span className="lead">
                    {getPrettyValue(user.tokenBalance)} <span>ZIN</span>
                  </span>
                </div>
              </div>
              <div className="token-balance token-balance-s2">
                <h6 className="card-sub-title">
                  Your Bonus Tokens{" "}
                  <em
                    style={{ color: "white" }}
                    className="fas fa-question-circle"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Bonus tokens will be distributed one week after the token sale ends."
                  />
                </h6>
                <ul className="token-balance-list">
                  <li className="token-balance-sub">
                    <span className="lead">
                      {getPrettyValue(
                        user.referralZinTokens +
                          user.bonusZinTokens +
                          user.presaleZinTokens
                      )}
                    </span>
                    <span className="sub">ZIN</span>
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
        {/* .col */}
        <div className="col-lg-8">
          <div className="token-information card card-full-height">
            <div className="row no-gutters height-100">
              <div className="col-md-6 text-center">
                <div className="token-info">
                  <img
                    className="token-info-icon"
                    src="/images/logo-sm.png"
                    alt="logo-sm"
                  />
                  <div className="gaps-2x" />
                  <h1 className="token-info-head text-light">
                    1 ETH = {tokenRate} ZIN
                  </h1>
                  <h5 className="token-info-sub">
                    1 ETH = {ethToUSDValue} USD
                  </h5>
                  <div className="token-calc-note note note-plane">
                    <em className="fas fa-info-circle text-light" />
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://zin.finance/how-to-buy-ethereum/"
                      className="note-text text-light"
                    >
                      How to buy Ethereum (ETH)?
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="token-info bdr-tl">
                  <div>
                    <ul className="token-info-list">
                      <li>
                        <span>Token Name:</span>ZIN
                      </li>
                      <li>
                        <span>Ticket Symbol:</span>ZIN
                      </li>
                    </ul>
                    <a
                      href="https://www.zin.finance/white-paper/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
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
        <BuyToken />
      </div>
      {/* .row */}
    </div>
  );
}

export default Dashboard;
