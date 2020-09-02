import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useCheckEmailVerified } from "../utility";
import WalletModal from "./walletModal";
import BuyWithOtherModal from "./buyWithOtherModal";
import BuyWithMetaMaskModal from "./buyWithMetaMaskModal";
import TransactionResultModal from "./transactionResultModal";
import { saveTransaction } from "../redux/actions/transactionActions";
import InfoModal from "./infoModal";
import EthService from "../ethService";

const tokenRate = process.env.REACT_APP_API_TOKEN_RATE;

function BuyToken() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const disabled = useCheckEmailVerified();
  const kycApplicationStatus = useSelector(
    (state) => state.kycReducer.applicationStatus
  );
  const ethToUSDValue = useSelector((state) => state.userReducer.ethToUSDValue);

  const [ethCalculation, setEthCalculation] = useState(1);
  const [txResult, setTxResult] = useState({});
  const [buyTokenLoading, setBuyTokenLoading] = useState(false);
  const [buyType, setBuyType] = useState("");

  let walletToggle = useRef();
  let buyWithOtherToggle = useRef();
  let buyWithMetaMaskToggle = useRef();
  let closeBuyWithOtherModal = useRef();
  let closeBuyWithMetaMaskModal = useRef();
  let transactionResultToggle = useRef();
  let infoModalToggle = useRef();
  let closeWalletModal = useRef();

  const initiateMetaMask = async () => {
    try {
      let ethService = new EthService();
      await ethService.setMetaMaskAccount();
      buyWithMetaMaskToggle.current.click();
    } catch (err) {
      console.warn("metamask error", err);
      setTxResult({
        err:
          "Please connect a MetaMask account first in order to buy tokens through MetaMask.",
        success: false,
      });
    }
  };

  const onWalletSet = () => {
    if (closeWalletModal.current) {
      closeWalletModal.current.click();
      if (buyType === "metamask" && buyWithMetaMaskToggle.current) {
        initiateMetaMask();
      } else if (buyType === "other" && buyWithOtherToggle.current) {
        buyWithOtherToggle.current.click();
      }
    }
  };

  const checkIfTransactionsOpened = () => {
    let transactionsOpenDate = new Date("2020-09-01T12:00:00.000Z");
    return new Date() > transactionsOpenDate;
  };

  const buyTokensWithOther = () => {
    setBuyType("other");
    if (!checkIfTransactionsOpened()) {
      infoModalToggle.current.click();
    } else if (!user.ethAddress && walletToggle.current) {
      walletToggle.current.click();
    } else if (buyWithOtherToggle.current) {
      buyWithOtherToggle.current.click();
    }
  };

  const buyTokensWithMetaMask = () => {
    setBuyType("metamask");
    if (!checkIfTransactionsOpened()) {
      infoModalToggle.current.click();
    } else if (!user.ethAddress && walletToggle.current) {
      walletToggle.current.click();
    } else if (buyWithMetaMaskToggle.current) {
      initiateMetaMask();
    }
  };

  const confirmBuyTokenWithOther = (txId, referralCode) => {
    let ethService = new EthService();
    setBuyTokenLoading(true);
    dispatch(
      saveTransaction(
        {
          txId,
          amountTransferredInEther: ethService.convertToWei(ethCalculation),
          amountTransferredInToken: ethService.convertToWei(
            ethCalculation * tokenRate
          ),
          etherToUsdRateAtThatTime: "" + ethToUSDValue,
          referralCode: referralCode,
        },
        (err) => {
          if (err) {
            setTxResult({ err, success: false });
          } else {
            setTxResult({ success: txId, err: false });
          }
        }
      )
    );
  };

  const confirmBuyTokenWithMetaMask = async (referralCode) => {
    let ethService = new EthService();
    let txId = await ethService.buyToken(ethCalculation, user.ethAddress);
    setBuyTokenLoading(true);
    if (txId) {
      dispatch(
        saveTransaction(
          {
            txId,
            amountTransferredInEther: ethService.convertToWei(ethCalculation),
            amountTransferredInToken: ethService.convertToWei(
              ethCalculation * tokenRate
            ),
            etherToUsdRateAtThatTime: "" + ethToUSDValue,
            referralCode: referralCode,
          },
          (err) => {
            if (err) {
              setTxResult({ err });
            } else {
              setTxResult({ success: txId });
            }
          }
        )
      );
    } else {
      setTxResult({
        err:
          "Metamask Wallet mismatch! - Please Update your connected metamask wallet address in your Zin Profile tab (Receiving wallet). This is to ensure that you receive your bonus transactions at the end of the crowdsale.",
      });
    }
  };

  const checkBuyTokenCondition = () => {
    let kycStatus =
      kycApplicationStatus &&
      kycApplicationStatus.reviewStatus === "completed" &&
      kycApplicationStatus.reviewResult.reviewAnswer !== "RED";
    if (kycStatus) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (txResult.success || txResult.err) {
      setBuyTokenLoading(false);
      if (closeBuyWithMetaMaskModal.current) {
        closeBuyWithMetaMaskModal.current.click();
      }
      if (closeBuyWithOtherModal.current) {
        closeBuyWithOtherModal.current.click();
      }
      transactionResultToggle.current.click();
    }
  }, [txResult]);

  return (
    <div className="col-lg-12">
      <button
        ref={(el) => (infoModalToggle.current = el)}
        style={{ display: "none" }}
        data-toggle="modal"
        data-target="#info-modal"
      >
        Info Modal
      </button>
      <InfoModal
        title="Transactions will open soon"
        description="You should only make the transaction after our token sale starts on 1st September 2020 12:00:00 (UTC)"
      />

      <button
        ref={(el) => (walletToggle.current = el)}
        style={{ display: "none" }}
        data-toggle="modal"
        data-target="#edit-wallet"
      >
        Add Wallet
      </button>
      <WalletModal
        successCallback={onWalletSet}
        closeRef={(el) => {
          closeWalletModal.current = el;
        }}
      />

      <button
        ref={(el) => (buyWithMetaMaskToggle.current = el)}
        style={{ display: "none" }}
        data-toggle="modal"
        data-target="#buy-with-metamask"
      >
        Pay with MetaMask
      </button>
      <BuyWithMetaMaskModal
        contribution={ethCalculation}
        tokenRate={tokenRate}
        confirmBuyToken={confirmBuyTokenWithMetaMask}
        loading={buyTokenLoading}
        closeRef={(el) => (closeBuyWithMetaMaskModal.current = el)}
      />

      <button
        ref={(el) => (buyWithOtherToggle.current = el)}
        style={{ display: "none" }}
        data-toggle="modal"
        data-target="#buy-with-other"
      >
        Buy with other
      </button>
      <BuyWithOtherModal
        contribution={ethCalculation}
        tokenRate={tokenRate}
        confirmBuyToken={confirmBuyTokenWithOther}
        loading={buyTokenLoading}
        closeRef={(el) => (closeBuyWithOtherModal.current = el)}
      />

      <button
        ref={(el) => (transactionResultToggle.current = el)}
        style={{ display: "none" }}
        data-toggle="modal"
        data-target="#pay-confirm"
      >
        Transaction Result
      </button>
      <TransactionResultModal txResult={txResult} />
      <div className="token-calculator card card-full-height">
        <div className="card-innr text-center">
          <div className="card-head">
            <h4 className="card-title">Token Calculation</h4>
            <p className="card-title-text">Enter amount to contribute.</p>
          </div>
          <div style={{ justifyContent: "center" }} className="token-calc">
            <div style={{ width: "200px" }} className="token-pay-amount">
              <input
                id="token-base-amount"
                className="input-bordered input-with-hint"
                type="number"
                value={ethCalculation}
                onChange={(e) => setEthCalculation(e.target.value)}
                min="1"
              />
              <div className="token-pay-currency">
                {/* toggle-tigger toggle-caret */}
                <span className="link ucap link-light">ETH</span>
                {/* <div className="toggle-class dropdown-content">
                      <ul className="dropdown-list">
                        <li>
                          <a href="#/">BTC</a>
                        </li>
                        <li>
                          <a href="#/">LTC</a>
                        </li>
                        <li>
                          <a href="#/">USD</a>
                        </li>
                      </ul>
                    </div> */}
              </div>
            </div>
            <div className="token-received">
              <div className="token-eq-sign">=</div>
              <div className="token-received-amount">
                <h5 className="token-amount">{ethCalculation * tokenRate}</h5>
                <div className="token-symbol">ZIN</div>
              </div>
              {/* show presale bonus amount if presale is on (up till sep 15 2020) */}
              {new Date() < new Date("2020-09-15T12:00:00.000Z") && (
                <>
                  <div className="token-eq-sign">+</div>
                  <div className="token-received-amount">
                    <h5 className="token-amount">
                      {ethCalculation * tokenRate * 0.2}
                    </h5>
                    <div className="token-symbol">ZIN</div>
                  </div>
                  <div
                    style={{ marginLeft: "5px" }}
                    className="token-received-amount"
                  >
                    <div className="token-symbol">(Presale bonus)</div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="token-calc-note note note-plane">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://zin.finance/how-to-buy-ethereum/"
              className="note-text text-light"
            >
              <em
                style={{ display: "contents" }}
                className="fas fa-info-circle text-light"
              />{" "}
              How to buy Ethereum (ETH)?
            </a>
          </div>
          <div className="token-buy">
            {!checkBuyTokenCondition() ? (
              <Link to="/kyc-application">
                <button className="btn btn-primary">
                  Complete KYC in order to purchase tokens
                </button>
              </Link>
            ) : (
              <div>
                <button
                  onClick={buyTokensWithMetaMask}
                  disabled={disabled.disabled}
                  style={{
                    marginRight: "10px",
                    marginBottom: "10px",
                    ...disabled.style,
                  }}
                  className="btn btn-primary"
                >
                  <img
                    alt="metamask-logo"
                    style={{ height: "20px", marginRight: "10px" }}
                    src="/images/metamask-logo.png"
                  />
                  Buy with MetaMask
                </button>{" "}
                <button
                  onClick={buyTokensWithOther}
                  disabled={disabled.disabled}
                  style={{ marginBottom: "10px", ...disabled.style }}
                  className="btn btn-primary"
                >
                  Buy with other Ethereum Wallets
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyToken;
