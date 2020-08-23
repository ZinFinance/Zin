import React from "react";

function InfoModal({ title, description }) {
  return (
    <div className="modal fade" id="info-modal" tabIndex={-1}>
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
            <div>
              <h4 className="popup-title text-primary">{title}</h4>
              <p className="lead text-primary">{description}</p>
            </div>
          </div>
        </div>
        {/* .modal-content */}
      </div>
      {/* .modal-dialog */}
    </div>
  );
}

export default InfoModal;
