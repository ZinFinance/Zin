import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useCheckEmailVerified, useEthToUSDValue } from "../utility";
import WalletModal from "./walletModal";
import GetPaymentAddressModal from "./getPaymentAddressModal";
import TransactionResultModal from "./transactionResultModal";
import { saveTransaction } from "../redux/actions/transactionActions";
import EthService from "../ethService";

function BuyToken() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const tokenInfo = useSelector((state) => state.tokenReducer);
  const disabled = useCheckEmailVerified();
  const kycApplicationStatus = useSelector(
    (state) => state.kycReducer.applicationStatus
  );
  const [ethCalculation, setEthCalculation] = useState(1);
  const ethToUSDValue = useEthToUSDValue();
  const [txResult, setTxResult] = useState({});
  const [referralCode, setReferralCode] = useState("");
  const [buyTokenLoading, setBuyTokenLoading] = useState(false);

  let walletToggle = null;
  let paymentToggle = null;
  let transactionResultToggle = null;
  let closePaymentModal = null;

  const buyTokens = () => {
    if (!user.ethAddress && walletToggle) {
      walletToggle.click();
    } else if (paymentToggle) {
      paymentToggle.click();
    }
  };

  const confirmBuyToken = async () => {
    let ethService = new EthService();
    let txId = await ethService.buyToken(ethCalculation, user.ethAddress);
    setBuyTokenLoading(true);
    setTimeout(() => {
      if (txId) {
        dispatch(
          saveTransaction(
            {
              txId,
              amountTransferredInEther: ethService.convertToWei(ethCalculation),
              amountTransferredInToken: ethService.convertToWei(
                ethCalculation * tokenInfo.tokenRate
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
    }, 1000);
  };

  const checkBuyTokenCondition = () => {
    let userReachedThreshold =
      (user.totalTokenBought / tokenInfo.tokenRate) * ethToUSDValue > 2000;
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
      if (closePaymentModal) {
        closePaymentModal.click();
      }
      transactionResultToggle.click();
    }
  }, [txResult, closePaymentModal, transactionResultToggle]);

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
        ref={(el) => (paymentToggle = el)}
        style={{ display: "none" }}
        data-toggle="modal"
        data-target="#get-pay-address"
      >
        Get Address for Payment
      </button>
      <GetPaymentAddressModal
        contribution={ethCalculation}
        tokenRate={tokenInfo.tokenRate}
        referralCode={referralCode}
        setReferralCode={setReferralCode}
        confirmBuyToken={confirmBuyToken}
        loading={buyTokenLoading}
        closeRef={(el) => (closePaymentModal = el)}
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
                <h5 className="token-amount">
                  {ethCalculation * tokenInfo.tokenRate}
                </h5>
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
              <button
                onClick={buyTokens}
                {...disabled}
                className="btn btn-primary"
              >
                Buy Tokens
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyToken;
