import React from "react";

function TransactionResultModal({ txResult }) {
  return (
    <div className="modal fade" id="pay-confirm" tabIndex={-1}>
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
            {txResult.success ? (
              <div>
                <h4 className="popup-title">Payment successful</h4>
                <p className="lead text-success">
                  Your Transaction ID{" "}
                  <a
                    href={`https://etherscan.io/tx/${txResult}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <strong>
                      {txResult.substr(0, 8) +
                        "....." +
                        txResult.substr(txResult.length - 8)}
                    </strong>{" "}
                  </a>
                  has been placed successfully.{" "}
                </p>
                {/* <p>
                  The token balance will appear in your account after your
                  transaction gets approved by our team.
                </p> */}
              </div>
            ) : (
              <div>
                <h4 className="popup-title text-danger">Error Occurred</h4>
                <p className="lead text-danger">{txResult.err}</p>
              </div>
            )}
          </div>
        </div>
        {/* .modal-content */}
      </div>
      {/* .modal-dialog */}
    </div>
  );
}

export default TransactionResultModal;
