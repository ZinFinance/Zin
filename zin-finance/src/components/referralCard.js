import React from "react";
import { useSelector } from "react-redux";

function ReferralCard() {
  const referralCode = useSelector(
    (state) => state.userReducer.user.referralCode
  );
  return (
    <div className="referral-info card">
      <div className="card-innr">
        <h6 className="card-title card-title-sm">Earn with Referral</h6>
        <p className=" pdb-0-5x">
          Invite your friends and family and both you and your friend will get a{" "}
          <strong>
            <span className="text-primary">10% bonus</span> each!
          </strong>
        </p>
        <div className="copy-wrap mgb-0-5x">
          <span className="copy-feedback" />
          <em className="fas fa-link" />
          <input
            type="text"
            className="copy-address"
            value={referralCode}
            disabled
          />
          <button
            className="copy-trigger copy-clipboard"
            data-clipboard-text={referralCode}
          >
            <em className="ti ti-files" />
          </button>
        </div>
        {/* .copy-wrap */}
      </div>
    </div>
  );
}

export default ReferralCard;
