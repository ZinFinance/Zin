import React, { useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../redux/actions/userActions";
import AsyncButton from "./AsyncButton";

function WalletModal() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const [state, setState] = useReducer(reducer, {
    ethAddress: user.ethAddress,
    success: false,
    error: false,
    loading: false,
  });

  function reducer(state, newState) {
    return {
      ...state,
      ...newState,
    };
  }

  const { ethAddress, error, success, loading } = state;

  const onChange = (e) => {
    setState({ [e.target.name]: e.target.value, success: false, error: false });
  };

  const updateWallet = (e) => {
    e.preventDefault();
    setState({ loading: true });

    dispatch(
      updateUser(
        {
          ...user,
          ethAddress,
        },
        (error) => {
          if (error) {
            setState({ error, loading: false });
          } else {
            setState({ success: true, loading: false });
          }
        }
      )
    );
  };

  return (
    <div className="modal fade" id="edit-wallet" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-md modal-dialog-centered">
        <div className="modal-content">
          <span className="modal-close" data-dismiss="modal" aria-label="Close">
            <em className="ti ti-close" />
          </span>
          <div className="popup-body">
            <h4 className="popup-title">Wallet Address</h4>
            <p>
              In order to receive your <strong>ZIN Tokens</strong>, please
              select your wallet address and you have to put the address below
              input box.{" "}
              <strong>
                You will receive ZIN tokens to this address after the Token Sale
                end.
              </strong>
            </p>
            <form onSubmit={updateWallet}>
              <div className="input-item input-with-label">
                <label htmlFor="token-address" className="input-item-label">
                  Your Ethereum Address for tokens:
                </label>
                <input
                  required
                  className="input-bordered"
                  type="text"
                  id="ethAddress"
                  name="ethAddress"
                  value={ethAddress}
                  onChange={onChange}
                  placeholder="Your Ethereum Address for tokens"
                  pattern="^0x[a-fA-F0-9]{40}$"
                  title="Address should be ERC20-compliant."
                />
                <span className="input-note">
                  Note: Address should be ERC20-compliant.
                </span>
              </div>
              {/* .input-item */}
              <div className="note note-plane note-danger">
                <em className="fas fa-info-circle" />
                <p style={{ fontWeight: "bold" }}>
                  DO NOT USE your exchange wallet address such as Kraken,
                  Bitfinex, Bithumb, Binance etc. You can use MetaMask,
                  MayEtherWallet, Mist wallets etc. Do not use the address if
                  you don’t have a private key of the your address. You WILL NOT
                  receive ZIN Tokens and WILL LOSE YOUR FUNDS if you do.
                </p>
              </div>
              <div className="gaps-3x" />
              <div className="d-sm-flex justify-content-between align-items-center">
                <AsyncButton
                  loading={loading}
                  defaultText="Update Wallet"
                  loadingText="Updating Wallet..."
                  buttonClasses="btn-primary"
                />
                <div className="gaps-2x d-sm-none" />
                {error && <span className="text-danger">{error}</span>}
                {success && (
                  <span className="text-success">
                    <em className="ti ti-check-box" /> Updated Wallet Address
                  </span>
                )}
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

export default WalletModal;
