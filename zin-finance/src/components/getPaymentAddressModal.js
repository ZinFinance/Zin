import React from "react";

function GetPaymentAddressModal() {
  return (
    <div className="modal fade" id="get-pay-address" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-md modal-dialog-centered">
        <div className="modal-content">
          <span
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
              Please make deposit amount of <strong>1.0 ETH</strong> to our
              address and receive <strong>18,750 ZIN</strong> tokens including{" "}
              <strong>bonus 1,540 ZIN</strong> once we recevied payment.
            </p>
            <div className="gaps-1x" />
            <h6 className="font-bold">Payment to the following Address</h6>
            <div className="copy-wrap mgb-0-5x">
              <span className="copy-feedback" />
              <em className="fab fa-ethereum" />
              <input
                type="text"
                className="copy-address"
                defaultValue="0x4156d3342d5c385a87d264f90653733592000581"
                disabled
              />
              <button
                className="copy-trigger copy-clipboard"
                data-clipboard-text="0x4156d3342d5c385a87d264f90653733592000581"
              >
                <em className="ti ti-files" />
              </button>
            </div>
            {/* .copy-wrap */}
            <ul className="pay-info-list row">
              <li className="col-sm-6">
                <span>SET GAS LIMIT:</span> 120 000
              </li>
              <li className="col-sm-6">
                <span>SET GAS PRICE:</span> 95 Gwei
              </li>
            </ul>
            {/* .pay-info-list */}
            <div className="pdb-2-5x pdt-1-5x">
              <input
                type="checkbox"
                className="input-checkbox input-checkbox-md"
                id="agree-term"
              />
              <label htmlFor="agree-term">
                I hereby agree to the{" "}
                <strong>token purchase aggrement &amp; token sale term</strong>.
              </label>
            </div>
            <button
              className="btn btn-primary"
              data-dismiss="modal"
              data-toggle="modal"
              data-target="#pay-confirm"
            >
              Buy Tokens Now <em className="ti ti-arrow-right mgl-4-5x" />
            </button>
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
