import React from "react";

function AddWalletModal() {
  return (
    <div className="modal fade" id="add-wallet" tabIndex={-1}>
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
            <h4 className="popup-title">Wallet Address</h4>
            <p>
              In order to receive your{" "}
              <a href="#">
                <strong>ZIN Tokens</strong>
              </a>
              , please select your wallet address and you have to put the
              address below input box.{" "}
              <strong>
                You will receive ZIN tokens to this address after the Token Sale
                end.
              </strong>
            </p>
            <form action="#">
              <div className="row">
                <div className="col-md-6">
                  <div className="input-item input-with-label">
                    <label htmlFor="swalllet" className="input-item-label">
                      Select Wallet{" "}
                    </label>
                    <select
                      className="select-bordered select-block"
                      name="swalllet"
                      id="swalllet"
                    >
                      <option value="eth">Ethereum</option>
                      <option value="dac">DashCoin</option>
                      <option value="bic">BitCoin</option>
                    </select>
                  </div>
                  {/* .input-item */}
                </div>
                {/* .col */}
              </div>
              {/* .row */}
              <div className="input-item input-with-label">
                <label htmlFor="token-address" className="input-item-label">
                  Your Address for tokens:
                </label>
                <input
                  className="input-bordered"
                  type="text"
                  id="token-address"
                  name="token-address"
                  defaultValue="0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae"
                />
                <span className="input-note">
                  Note: Address should be ERC20-compliant.
                </span>
              </div>
              {/* .input-item */}
              <div className="note note-plane note-danger">
                <em className="fas fa-info-circle" />
                <p>
                  DO NOT USE your exchange wallet address such as Kraken,
                  Bitfinex, Bithumb, Binance etc. You can use MetaMask,
                  MyEtherWallet, Mist wallets etc. Do not use the address if you
                  don’t have a private key of the your address. You WILL NOT
                  receive ZIN Tokens and WILL LOSE YOUR FUNDS if you do.
                </p>
              </div>
              <div className="gaps-3x" />
              <div className="d-sm-flex justify-content-between align-items-center">
                <button className="btn btn-primary">Add Wallet</button>
                <div className="gaps-2x d-sm-none" />
                <span className="text-success">
                  <em className="ti ti-check-box" /> Added wallet address
                </span>
              </div>
            </form>
            {/* form */}
          </div>
        </div>
        {/* .modal-content */}
      </div>
      {/* .modal-dialog */}
    </div>
  );
}

export default AddWalletModal;
