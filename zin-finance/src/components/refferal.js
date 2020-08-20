import React from "react";
import TransactionDetailsModal from "./transactionDetailsModal";
import { useSelector } from "react-redux";
import ReferralCard from "./referralCard";

function Referral() {
  const user = useSelector((state) => state.userReducer.user);
  return (
    <div className="container">
      <TransactionDetailsModal />
      <div className="content-area card card-primary card-text-light">
        <div className="card-innr text-center">
          <div className="card-head">
            <h6 className="card-title">
              {" "}
              20% Presale Bonus until 10th September 2020 or first 50 million
              tokens (whichever comes first)
            </h6>
          </div>
          <p style={{ whiteSpace: "pre-line" }}>
            10% Inviter Bonus*{"\n"}
            10% Invitee Bonus
          </p>

          <p>*10% of the amount bought by the invitee.</p>

          <p>Bonus tokens will be distributed by the end of the token sale.</p>
        </div>
        {/* .card-innr */}
      </div>

      <div className="token-statistics card card-token height-auto">
        <div className="card-innr">
          <div className="token-balance token-balance-with-icon">
            <div className="token-balance-icon">
              <img src="/images/logo-light-sm.png" alt="logo" />
            </div>
            <div className="token-balance-text">
              <h6 className="card-sub-title">
                Total Tokens Earned through Referrals
              </h6>
              <span className="lead">
                {user.totalBonusGenerated} <span>ZIN</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <ReferralCard />
      <div className="card content-area">
        <div className="card-innr">
          <div className="card-head">
            <h4 className="card-title">Referral Transactions</h4>
          </div>
          <table className="data-table dt-init user-tnx">
            <thead>
              <tr className="data-item data-head">
                <th className="data-col dt-tnxno">Tranx NO</th>
                <th className="data-col dt-token">Bonus Tokens Received</th>
                <th className="data-col dt-type">
                  <div className="dt-type-text">Type</div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="data-item">
                <td className="data-col dt-tnxno">
                  <div className="d-flex align-items-center">
                    <div className="data-state data-state-pending">
                      <span className="d-none">Pending</span>
                    </div>
                    <div className="fake-class">
                      <span className="lead tnx-id">TNX1002</span>
                      <span className="sub sub-date">2018-08-24 10:45PM</span>
                    </div>
                  </div>
                </td>
                <td className="data-col dt-token">
                  <span className="lead token-amount">20,000</span>
                  <span className="sub sub-symbol">ZIN</span>
                </td>
                <td className="data-col dt-type">
                  <span className="dt-type-md badge badge-outline badge-success badge-md">
                    Purchase
                  </span>
                  <span className="dt-type-sm badge badge-sq badge-outline badge-success badge-md">
                    P
                  </span>
                </td>
              </tr>
              {/* .data-item */}
              <tr className="data-item">
                <td className="data-col dt-tnxno">
                  <div className="d-flex align-items-center">
                    <div className="data-state data-state-approved">
                      <span className="d-none">Approved</span>
                    </div>
                    <div className="fake-class">
                      <span className="lead tnx-id">TNX1002</span>
                      <span className="sub sub-date">2018-08-24 10:45PM</span>
                    </div>
                  </div>
                </td>
                <td className="data-col dt-token">
                  <span className="lead token-amount">18,750</span>
                  <span className="sub sub-symbol">ZIN</span>
                </td>
                <td className="data-col dt-type">
                  <span className="dt-type-md badge badge-outline badge-success badge-md">
                    Purchase
                  </span>
                  <span className="dt-type-sm badge badge-sq badge-outline badge-success badge-md">
                    P
                  </span>
                </td>
              </tr>
              {/* .data-item */}
              <tr className="data-item">
                <td className="data-col dt-tnxno">
                  <div className="d-flex align-items-center">
                    <div className="data-state data-state-canceled">
                      <span className="d-none">Canceled</span>
                    </div>
                    <div className="fake-class">
                      <span className="lead tnx-id">TNX1002</span>
                      <span className="sub sub-date">2018-08-24 10:45PM</span>
                    </div>
                  </div>
                </td>
                <td className="data-col dt-token">
                  <span className="lead token-amount">18,750</span>
                  <span className="sub sub-symbol">ZIN</span>
                </td>
                <td className="data-col dt-type">
                  <span className="dt-type-md badge badge-outline badge-success badge-md">
                    Purchase
                  </span>
                  <span className="dt-type-sm badge badge-sq badge-outline badge-success badge-md">
                    P
                  </span>
                </td>
              </tr>
              {/* .data-item */}
              <tr className="data-item">
                <td className="data-col dt-tnxno">
                  <div className="d-flex align-items-center">
                    <div className="data-state data-state-progress">
                      <span className="d-none">Progress</span>
                    </div>
                    <div className="fake-class">
                      <span className="lead tnx-id">TNX1002</span>
                      <span className="sub sub-date">2018-08-24 10:45PM</span>
                    </div>
                  </div>
                </td>
                <td className="data-col dt-token">
                  <span className="lead token-amount">18,750</span>
                  <span className="sub sub-symbol">ZIN</span>
                </td>
                <td className="data-col dt-type">
                  <span className="dt-type-md badge badge-outline badge-success badge-md">
                    Purchase
                  </span>
                  <span className="dt-type-sm badge badge-sq badge-outline badge-success badge-md">
                    P
                  </span>
                </td>
              </tr>
              {/* .data-item */}
              <tr className="data-item">
                <td className="data-col dt-tnxno">
                  <div className="d-flex align-items-center">
                    <div className="data-state data-state-approved">
                      <span className="d-none">Approved</span>
                    </div>
                    <div className="fake-class">
                      <span className="lead tnx-id">TNX1002</span>
                      <span className="sub sub-date">2018-08-24 10:45PM</span>
                    </div>
                  </div>
                </td>
                <td className="data-col dt-token">
                  <span className="lead token-amount">1,050</span>
                  <span className="sub sub-symbol">ZIN</span>
                </td>
                <td className="data-col dt-type">
                  <span className="dt-type-md badge badge-outline badge-info badge-md">
                    Bonus
                  </span>
                  <span className="dt-type-sm badge badge-sq badge-outline badge-info badge-md">
                    B
                  </span>
                </td>
              </tr>
              {/* .data-item */}
              <tr className="data-item">
                <td className="data-col dt-tnxno">
                  <div className="d-flex align-items-center">
                    <div className="data-state data-state-progress">
                      <span className="d-none">Progress</span>
                    </div>
                    <div className="fake-class">
                      <span className="lead tnx-id">TNX1002</span>
                      <span className="sub sub-date">2018-08-24 10:45PM</span>
                    </div>
                  </div>
                </td>
                <td className="data-col dt-token">
                  <span className="lead token-amount">18,750</span>
                  <span className="sub sub-symbol">ZIN</span>
                </td>
                <td className="data-col dt-type">
                  <span className="dt-type-md badge badge-outline badge-success badge-md">
                    Purchase
                  </span>
                  <span className="dt-type-sm badge badge-sq badge-outline badge-success badge-md">
                    P
                  </span>
                </td>
              </tr>
              {/* .data-item */}
              <tr className="data-item">
                <td className="data-col dt-tnxno">
                  <div className="d-flex align-items-center">
                    <div className="data-state data-state-canceled">
                      <span className="d-none">Canceled</span>
                    </div>
                    <div className="fake-class">
                      <span className="lead tnx-id">TNX1002</span>
                      <span className="sub sub-date">2018-08-24 10:45PM</span>
                    </div>
                  </div>
                </td>
                <td className="data-col dt-token">
                  <span className="lead token-amount">18,750</span>
                  <span className="sub sub-symbol">ZIN</span>
                </td>
                <td className="data-col dt-type">
                  <span className="dt-type-md badge badge-outline badge-success badge-md">
                    Purchase
                  </span>
                  <span className="dt-type-sm badge badge-sq badge-outline badge-success badge-md">
                    P
                  </span>
                </td>
              </tr>
              {/* .data-item */}
              <tr className="data-item">
                <td className="data-col dt-tnxno">
                  <div className="d-flex align-items-center">
                    <div className="data-state data-state-progress">
                      <span className="d-none">Progress</span>
                    </div>
                    <div className="fake-class">
                      <span className="lead tnx-id">TNX1002</span>
                      <span className="sub sub-date">2018-08-24 10:45PM</span>
                    </div>
                  </div>
                </td>
                <td className="data-col dt-token">
                  <span className="lead token-amount">18,750</span>
                  <span className="sub sub-symbol">ZIN</span>
                </td>
                <td className="data-col dt-type">
                  <span className="dt-type-md badge badge-outline badge-success badge-md">
                    Purchase
                  </span>
                  <span className="dt-type-sm badge badge-sq badge-outline badge-success badge-md">
                    P
                  </span>
                </td>
              </tr>
              {/* .data-item */}
            </tbody>
          </table>
        </div>
        {/* .card-innr */}
      </div>
      {/* .card */}
    </div>
  );
}

export default Referral;
