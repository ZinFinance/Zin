import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useCheckEmailVerified, useEthToUSDValue } from "../utility";
import WalletModal from "./walletModal";
import BuyWithOtherModal from "./buyWithOtherModal";
import BuyWithMetaMaskModal from "./buyWithMetaMaskModal";
import TransactionResultModal from "./transactionResultModal";
import { saveTransaction } from "../redux/actions/transactionActions";
import EthService from "../ethService";

const tokenRate = process.env.REACT_APP_API_TOKEN_RATE;

function BuyToken() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const disabled = useCheckEmailVerified();
  const kycApplicationStatus = useSelector(
    (state) => state.kycReducer.applicationStatus
  );
  const ethToUSDValue = useEthToUSDValue();

  const [ethCalculation, setEthCalculation] = useState(1);
  const [txResult, setTxResult] = useState({});
  const [buyTokenLoading, setBuyTokenLoading] = useState(false);

  let walletToggle = null;
  let buyWithOtherToggle = null;
  let buyWithMetaMaskToggle = null;
  let closeBuyWithOtherModal = null;
  let closeBuyWithMetaMaskModal = null;
  let transactionResultToggle = null;

  const buyTokensWithOther = () => {
    if (!user.ethAddress && walletToggle) {
      walletToggle.click();
    } else if (buyWithOtherToggle) {
      buyWithOtherToggle.click();
    }
  };

  const buyTokensWithMetaMask = () => {
    if (!user.ethAddress && walletToggle) {
      walletToggle.click();
    } else if (buyWithMetaMaskToggle) {
      buyWithMetaMaskToggle.click();
    }
  };

  const confirmBuyTokenWithOther = async (txId, referralCode) => {
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
        err: "Your Wallet address doesn't match MetaMask address",
      });
    }
  };

  const checkBuyTokenCondition = () => {
    let userReachedThreshold =
      (user.totalTokenBought / tokenRate) * ethToUSDValue > 2000;
    let kycStatus =
      kycApplicationStatus &&
      kycApplicationStatus.reviewStatus === "completed" &&
      kycApplicationStatus.reviewResult.reviewAnswer !== "RED";
    if (userReachedThreshold) {
      if (kycStatus) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  useEffect(() => {
    if (txResult.success || txResult.err) {
      setBuyTokenLoading(false);
      if (closeBuyWithMetaMaskModal) {
        closeBuyWithMetaMaskModal.click();
      }
      if (closeBuyWithOtherModal) {
        closeBuyWithOtherModal.click();
      }
      transactionResultToggle.click();
    }
  }, [
    txResult,
    closeBuyWithMetaMaskModal,
    closeBuyWithOtherModal,
    transactionResultToggle,
  ]);

  return (
    <div className="col-lg-12">
      <button
        ref={(el) => (walletToggle = el)}
        style={{ display: "none" }}
        data-toggle="modal"
        data-target="#edit-wallet"
      >
        Add Wallet
      </button>
      <WalletModal />

      <button
        ref={(el) => (buyWithMetaMaskToggle = el)}
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
        closeRef={(el) => (closeBuyWithMetaMaskModal = el)}
      />

      <button
        ref={(el) => (buyWithOtherToggle = el)}
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
        closeRef={(el) => (closeBuyWithOtherModal = el)}
      />

      <button
        ref={(el) => (transactionResultToggle = el)}
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
            </div>
          </div>
          <div className="token-calc-note note note-plane">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://zinlandingpage.azurewebsites.net/how-to-buy-ethereum/"
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
                  Complete KYC in order to purchase more tokens
                </button>
              </Link>
            ) : (
              <div>
                <button
                  onClick={buyTokensWithMetaMask}
                  {...disabled}
                  style={{ marginRight: "10px", marginBottom: "10px" }}
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
                  {...disabled}
                  style={{ marginBottom: "10px" }}
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
