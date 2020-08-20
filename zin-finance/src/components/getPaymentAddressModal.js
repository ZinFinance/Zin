import React from "react";
import AsyncButton from "./AsyncButton";

function GetPaymentAddressModal({
  confirmBuyToken,
  contribution,
  tokenRate,
  referralCode,
  setReferralCode,
  loading,
  closeRef,
}) {
  const onSubmit = (e) => {
    e.preventDefault();
    confirmBuyToken();
  };

  return (
    <div className="modal fade" id="get-pay-address" tabIndex={-1}>
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
            <h4 className="popup-title">Payment Address for Deposit</h4>
            <p>
              Please make deposit amount of <strong>{contribution} ETH</strong>{" "}
              to our address and receive{" "}
              <strong>{contribution * tokenRate} ZIN</strong> tokens including{" "}
              <strong>bonus 1,540 ZIN</strong> once we recevied payment.
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
                defaultValue="0x4156d3342d5c385a87d264f90653733592000581"
                disabled
              />
              <button
                type="submit"
                className="copy-trigger copy-clipboard"
                data-clipboard-text="0x4156d3342d5c385a87d264f90653733592000581"
              >
                <em className="ti ti-files" />
              </button>
            </div>
            {/* .copy-wrap */}
            <form onSubmit={onSubmit}>
              <div className="input-item input-with-labe pdb-2-5x pdt-1-5x">
                <label htmlFor="token-address" className="input-item-label">
                  Referral Code:
                </label>
                <input
                  className="input-bordered"
                  type="text"
                  id="referralCode"
                  name="referralCode"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                />
              </div>
              <div className="pdb-2-5x pdt-1-5x">
                <input
                  required
                  type="checkbox"
                  className="input-checkbox input-checkbox-md"
                  id="agree-term"
                />
                <label htmlFor="agree-term">
                  I hereby agree to the{" "}
                  <strong>
                    token purchase aggrement &amp; token sale term
                  </strong>
                  .
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
            <div className="note note-plane note-light mgb-1x">
              <em className="fas fa-info-circle" />
              <p>
                Do not make payment through exchange (Kraken, Bitfinex). You can
                use MayEtherWallet, MetaMask, Mist wallets etc.
              </p>
            </div>
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

export default GetPaymentAddressModal;
