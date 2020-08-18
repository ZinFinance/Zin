import React, { useState } from "react";
import WalletModal from "./walletModal";
import GetPaymentAddressModal from "./getPaymentAddressModal";
import PayOnlineModal from "./payOnlineModal";
import { useCheckEmailVerified, getPrettyValue } from "../utility";
import { useSelector } from "react-redux";
import bigDecimal from "js-big-decimal";

function BuyToken() {
  const disabled = useCheckEmailVerified();
  const tokenInfo = useSelector((state) => state.tokenReducer);
  const [ethCalculation, setEthCalculation] = useState(1);

  return (
    <div className="container">
      <WalletModal />
      <GetPaymentAddressModal />
      <PayOnlineModal />
      <div className="row">
        <div className="main-content col-lg-8">
          <div className="d-lg-none">
            <button
              {...disabled}
              data-toggle="modal"
              data-target="#edit-wallet"
              className="btn btn-danger btn-xl btn-between w-100 mgb-1-5x"
            >
              Add your wallet address before buying{" "}
              <em className="ti ti-arrow-right" />
            </button>
            <div className="gaps-1x mgb-0-5x d-lg-none d-none d-sm-block" />
          </div>
          <div className="content-area card">
            <div className="card-innr">
              {/* <div className="card-head">
                <span className="card-sub-title text-primary font-mid">
                  Step 1
                </span>
                <h4 className="card-title">
                  Choose currency and calculate ZIN tokens price
                </h4>
              </div>
              <div className="card-text">
                <p>
                  You can buy our ZIN tokens using ETH, BTC, LTC or USD to
                  become part of Our project.
                </p>
              </div> */}
              {/* <div className="token-currency-choose">
                <div className="row guttar-15px">
                  <div className="col-6">
                    <div className="pay-option">
                      <input
                        className="pay-option-check"
                        type="radio"
                        id="payeth"
                        name="payOption"
                        defaultChecked
                      />
                      <label className="pay-option-label" htmlFor="payeth">
                        <span className="pay-title">
                          <em className="pay-icon cf cf-eth" />
                          <span className="pay-cur">ETH</span>
                        </span>
                        <span className="pay-amount">0.000800</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="pay-option">
                      <input
                        className="pay-option-check"
                        type="radio"
                        id="paylte"
                        name="payOption"
                      />
                      <label className="pay-option-label" htmlFor="paylte">
                        <span className="pay-title">
                          <em className="pay-icon cf cf-ltc" />
                          <span className="pay-cur">LTC</span>
                        </span>
                        <span className="pay-amount">0.001201</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="pay-option">
                      <input
                        className="pay-option-check"
                        type="radio"
                        id="paybtc"
                        name="payOption"
                      />
                      <label className="pay-option-label" htmlFor="paybtc">
                        <span className="pay-title">
                          <em className="pay-icon cf cf-btc" />
                          <span className="pay-cur">BTC</span>
                        </span>
                        <span className="pay-amount">0.000015</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="pay-option">
                      <input
                        className="pay-option-check"
                        type="radio"
                        id="payusd"
                        name="payOption"
                      />
                      <label className="pay-option-label" htmlFor="payusd">
                        <span className="pay-title">
                          <em className="pay-icon fas fa-dollar-sign" />
                          <span className="pay-cur">USD</span>
                        </span>
                        <span className="pay-amount">0.25</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="card-head">
                <span className="card-sub-title text-primary font-mid">
                  Step 1
                </span>
                <h4 className="card-title">Amount to contribute</h4>
              </div>
              <div className="card-text">
                <p>
                  Enter the amount you would like to contribute and calculate
                  the amount of tokens you will receieve.
                </p>
              </div>
              <div className="token-contribute">
                <div className="token-calc">
                  <div className="token-pay-amount">
                    <input
                      id="token-base-amount"
                      className="input-bordered input-with-hint"
                      type="number"
                      value={ethCalculation}
                      onChange={(e) => setEthCalculation(e.target.value)}
                    />
                    <div className="token-pay-currency">
                      <span className="input-hint input-hint-sap">ETH</span>
                    </div>
                  </div>
                  <div className="token-received">
                    <div className="token-eq-sign">=</div>
                    <div className="token-received-amount">
                      <h5 className="token-amount">
                        {ethCalculation * tokenInfo.tokenRate}
                      </h5>
                      <div className="token-symbol">ZIN</div>
                    </div>
                  </div>
                </div>
                <div className="token-calc-note note note-plane">
                  <em className="fas fa-times-circle text-danger" />
                  <span className="note-text text-light">
                    0.35 ETH minimum contribution require.
                  </span>
                </div>
              </div>
              <div className="token-bonus-ui">
                <div className="bonus-bar">
                  <div className="bonus-base">
                    <span className="bonus-base-title">Bonus</span>
                    <span className="bonus-base-amount">On Sale</span>
                    <span className="bonus-base-percent">20%</span>
                  </div>
                  <div className="bonus-extra">
                    <div className="bonus-extra-item active" data-percent={10}>
                      <span className="bonus-extra-amount">0.5 ETH</span>
                      <span className="bonus-extra-percent">10%</span>
                    </div>
                    <div className="bonus-extra-item active" data-percent={20}>
                      <span className="bonus-extra-amount">1 ETH</span>
                      <span className="bonus-extra-percent">30%</span>
                    </div>
                    <div className="bonus-extra-item active" data-percent={20}>
                      <span className="bonus-extra-amount">5 ETH</span>
                      <span className="bonus-extra-percent">50%</span>
                    </div>
                    <div className="bonus-extra-item" data-percent={20}>
                      <span className="bonus-extra-amount">10 ETH</span>
                      <span className="bonus-extra-percent">70%</span>
                    </div>
                    <div className="bonus-extra-item" data-percent={30}>
                      <span className="bonus-extra-amount">20 ETH</span>
                      <span className="bonus-extra-percent">100%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="token-overview-wrap">
                <div className="token-overview">
                  <div className="row">
                    <div className="col-md-4 col-sm-6">
                      <div className="token-bonus token-bonus-sale">
                        <span className="token-overview-title">
                          + 20% Sale Bonus
                        </span>
                        <span className="token-overview-value bonus-on-sale">
                          15,000.00
                        </span>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-6">
                      <div className="token-bonus token-bonus-amount">
                        <span className="token-overview-title">
                          + 30% Amount Bonus
                        </span>
                        <span className="token-overview-value bonus-on-amount">
                          5,000.00
                        </span>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="token-total">
                        <span className="token-overview-title font-bold">
                          Total ZIN
                        </span>
                        <span className="token-overview-value token-total-amount text-primary">
                          1,823,500.84
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="note note-plane note-danger note-sm pdt-1x pl-0">
                  <p>
                    Your Contribution will be calculated based on exchange rate
                    at the moment your transaction is confirm.
                  </p>
                </div>
              </div>
              <div className="card-head">
                <span className="card-sub-title text-primary font-mid">
                  Step 2
                </span>
                <h4 className="card-title">Make a payment</h4>
              </div>
              <div className="card-text">
                <p>
                  To get tokens please make a payment. You can send payment
                  directly to our address. Once paid, you will receive an email
                  about the successfull deposit.{" "}
                </p>
              </div>
              <div className="pay-buttons">
                <div className="pay-button">
                  <button
                    {...disabled}
                    data-toggle="modal"
                    data-target="#get-pay-address"
                    className="btn btn-light-alt btn-between w-100"
                  >
                    Get Address for Payment <em className="ti ti-wallet" />
                  </button>
                </div>
                <div className="pay-button-sap">or</div>
                {/* <div className="pay-button">
                  <button
                    {...disabled}
                    data-toggle="modal"
                    data-target="#pay-online"
                    className="btn btn-primary btn-between w-100"
                  >
                    Make Online Payment <em className="ti ti-arrow-right" />
                  </button>
                </div> */}
              </div>
              <div className="pay-notes">
                <div className="note note-plane note-light note-md font-italic">
                  <em className="fas fa-info-circle" />
                  <p>
                    Tokens will appear in your account after payment
                    successfully made and approved by our team.{" "}
                    <br className="d-none d-lg-block" /> Please note that, ZIN
                    tokens will distributed end of ICO Token Sales.{" "}
                  </p>
                </div>
              </div>
            </div>{" "}
            {/* .card-innr */}
          </div>{" "}
          {/* .content-area */}
        </div>
        {/* .col */}
        <div className="aside sidebar-right col-lg-4">
          <div className="d-none d-lg-block">
            <button
              {...disabled}
              data-toggle="modal"
              data-target="#edit-wallet"
              className="btn btn-danger btn-xl btn-between w-100"
            >
              Add your wallet address before buying{" "}
              <em className="ti ti-arrow-right" />
            </button>
            <div className="gaps-3x" />
          </div>
          <div className="token-statistics card card-token height-auto">
            <div className="card-innr">
              <div className="token-balance">
                <div className="token-balance-text">
                  <h6 className="card-sub-title">Tokens Balance</h6>
                  <span className="lead">
                    {getPrettyValue(tokenInfo.tokenBalance)} <span>ZIN</span>
                  </span>
                </div>
              </div>
              <div className="token-balance token-balance-s2">
                <h6 className="card-sub-title">Your Contribution</h6>
                <ul className="token-balance-list">
                  <li className="token-balance-sub">
                    <span className="lead">
                      {getPrettyValue(
                        bigDecimal.divide(
                          tokenInfo.tokenBalance,
                          tokenInfo.tokenRate
                        )
                      )}
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
          <div className="token-sales card">
            <div className="card-innr">
              <div className="card-head">
                <h5 className="card-title card-title-sm">
                  Pre-Sale Token Sales
                </h5>
              </div>
              <div className="token-rate-wrap row">
                <div className="token-rate col-md-6 col-lg-12">
                  <span className="card-sub-title">ZIN Token Price</span>
                  <h4 className="font-mid text-dark">
                    1 ETH = <span>{tokenInfo.tokenRate} ZIN</span>
                  </h4>
                </div>
                <div className="token-rate col-md-6 col-lg-12">
                  <span className="card-sub-title">Exchange Rate</span>
                  <span>1 ETH = 196.98 USD = 0.032 BTC</span>
                </div>
              </div>
              <div className="token-bonus-current">
                <div className="fake-class">
                  <span className="card-sub-title">Current Bonus</span>
                  <div className="h3 mb-0">20 %</div>
                </div>
                <div className="token-bonus-date">
                  End at <br /> 10 Jan, 2019
                </div>
              </div>
            </div>
            <div className="sap" />
            <div className="card-innr">
              <div className="card-head">
                <h5 className="card-title card-title-sm">
                  Token Sales Progress
                </h5>
              </div>
              <ul className="progress-info">
                <li>
                  <span>Raised</span> 2,758 ZIN
                </li>
                <li className="text-right">
                  <span>TOTAL</span> 1,500,000 ZIN
                </li>
              </ul>
              <div className="progress-bar">
                <div className="progress-hcap" data-percent={83}>
                  <div>
                    Hard cap <span>1,400,000</span>
                  </div>
                </div>
                <div className="progress-scap" data-percent={24}>
                  <div>
                    Soft cap <span>40,000</span>
                  </div>
                </div>
                <div className="progress-percent" data-percent={28} />
              </div>
              <span className="card-sub-title mgb-0-5x">Sales END IN</span>
              <div className="countdown-clock" data-date="2019/02/05" />
            </div>
          </div>
        </div>
        {/* .col */}
      </div>
      {/* .container */}
    </div>
  );
}

export default BuyToken;
