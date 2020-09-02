import React, { useState } from "react";
import AsyncButton from "./AsyncButton";

function BuyWithMetaMask({
  confirmBuyToken,
  tokenRate,
  loading,
  closeRef,
  contribution,
}) {
  const [referralCode, setReferralCode] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    confirmBuyToken(referralCode);
  };

  return (
    <div className="modal fade" id="buy-with-metamask" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-md modal-dialog-centered">
        <div className="modal-content">
          <span
            ref={closeRef}
            style={{ cursor: "pointer" }}
            className="modal-close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <em className="ti ti-close" />
          </span>
          <div className="popup-body">
            <h4 className="popup-title">Buy ZIN with MetaMask</h4>
            <p>
              Please approve the transaction on your MetaMask after clicking the
              'Buy Tokens Now' button. You will get the rate of{" "}
              <strong>
                {contribution} ETH = {tokenRate * contribution} ZIN
              </strong>
              . Your bonus tokens will show in your dashboard.
            </p>
            <div className="gaps-1x" />
            <h6 className="font-bold">Payment to the following Address</h6>
            <div className="copy-wrap mgb-0-5x">
              <span className="copy-feedback" />
              <em className="fab fa-ethereum" />
              <input
                required
                type="text"
                className="copy-address"
                defaultValue={process.env.REACT_APP_Crowdsale_Contract_Address}
                disabled
              />
            </div>
            {/* .copy-wrap */}
            <form onSubmit={onSubmit}>
              <div className="input-item input-with-labe pdb-1-5x pdt-1-5x">
                <label htmlFor="token-address" className="input-item-label">
                  Referral Code:
                </label>
                <input
                  className="input-bordered"
                  type="text"
                  id="referralCodeMetaMask"
                  name="referralCodeMetaMask"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                />
              </div>
              <div className="pdb-2-5x pdt-1-5x">
                <input
                  required
                  type="checkbox"
                  className="input-checkbox input-checkbox-md"
                  id="agree-term-buy-with-metamask"
                />
                <label
                  style={{ textTransform: "none" }}
                  htmlFor="agree-term-buy-with-metamask"
                >
                  I hereby agree to the{" "}
                  <strong>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.zin.finance/terms-and-conditions/"
                    >
                      terms and conditions{" "}
                    </a>
                  </strong>
                  of the token sale.
                </label>
              </div>
              <AsyncButton
                loading={loading}
                loadingText={"Buying Tokens..."}
                defaultText={"Buy Tokens Now"}
                buttonClasses="btn-primary"
              />
            </form>
            <div className="gaps-3x" />
            <div className="note note-plane note-danger">
              <em className="fas fa-info-circle" />
              <p>
                In case you send a different amount, number of ZIN tokens will
                update accordingly.
              </p>
            </div>
          </div>
        </div>
        {/* .modal-content */}
      </div>
      {/* .modal-dialog */}
    </div>
  );
}

export default BuyWithMetaMask;
