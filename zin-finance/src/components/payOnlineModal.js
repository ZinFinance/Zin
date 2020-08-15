import React from "react";

function PayOnlineModal() {
  return (
    <div className="modal fade" id="pay-online" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-md modal-dialog-centered">
        <div className="modal-content pb-0">
          <div className="popup-body">
            <h4 className="popup-title">Buy Tokens and Payment</h4>
            <p className="lead">
              To receiving <strong>18,750 TWZ</strong> tokens including{" "}
              <strong>bonus 1,540 TWZ</strong> require payment amount of{" "}
              <strong>1.0 ETH</strong>.
            </p>
            <p>
              You can choose any of following payment method to make your
              payment. The tokens balance will appear in your account after
              successfull payment.
            </p>
            <h5 className="mgt-1-5x font-mid">Select payment method:</h5>
            <ul className="pay-list guttar-20px">
              <li className="pay-item">
                <input
                  type="radio"
                  className="pay-check"
                  name="pay-option"
                  id="pay-coin"
                />
                <label className="pay-check-label" htmlFor="pay-coin">
                  <img src="/images/pay-a.png" alt="pay-logo" />
                </label>
              </li>
              <li className="pay-item">
                <input
                  type="radio"
                  className="pay-check"
                  name="pay-option"
                  id="pay-coinpay"
                />
                <label className="pay-check-label" htmlFor="pay-coinpay">
                  <img src="/images/pay-b.png" alt="pay-logo" />
                </label>
              </li>
              <li className="pay-item">
                <input
                  type="radio"
                  className="pay-check"
                  name="pay-option"
                  id="pay-paypal"
                />
                <label className="pay-check-label" htmlFor="pay-paypal">
                  <img src="/images/pay-c.png" alt="pay-logo" />
                </label>
              </li>
            </ul>
            <span className="text-light font-italic mgb-2x">
              <small>
                * Payment gateway company may charge you a processing fees.
              </small>
            </span>
            <div className="pdb-2-5x pdt-1-5x">
              <input
                type="checkbox"
                className="input-checkbox input-checkbox-md"
                id="agree-term-3"
              />
              <label htmlFor="agree-term-3">
                I hereby agree to the{" "}
                <strong>token purchase aggrement &amp; token sale term</strong>.
              </label>
            </div>
            <ul className="d-flex flex-wrap align-items-center guttar-30px">
              <li>
                <a
                  href="#"
                  data-dismiss="modal"
                  data-toggle="modal"
                  data-target="#pay-review"
                  className="btn btn-primary"
                >
                  Buy Tokens &amp; Process to Pay{" "}
                  <em className="ti ti-arrow-right mgl-2x" />
                </a>
              </li>
              <li className="pdt-1x pdb-1x">
                <a
                  href="#"
                  data-dismiss="modal"
                  data-toggle="modal"
                  data-target="#get-pay-address"
                  className="link link-primary"
                >
                  Make Manual Payment
                </a>
              </li>
            </ul>
            <div className="gaps-2x" />
            <div className="gaps-1x d-none d-sm-block" />
            <div className="note note-plane note-light mgb-1x">
              <em className="fas fa-info-circle" />
              <p className="text-light">
                You will automatically redirect for payment after your order
                placing.
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

export default PayOnlineModal;
