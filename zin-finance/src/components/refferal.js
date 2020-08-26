import React from "react";
import TransactionDetailsModal from "./transactionDetailsModal";
import { useSelector } from "react-redux";
import ReferralCard from "./referralCard";
import { getPrettyValue } from "../utility";
import PageLoader from "./pageLoader";

function Referral() {
  const user = useSelector((state) => state.userReducer.user);
  const bonusTransactions = useSelector(
    (state) => state.transactionReducer.bonusTransactions
  );
  if (!bonusTransactions) {
    return <PageLoader containerHeight="50vh" />;
  }
  return (
    <div className="container">
      <TransactionDetailsModal />
      <div className="content-area card card-primary card-text-light">
        <div className="card-innr text-center">
          <div className="card-head">
            <h6 className="card-title">
              {" "}
              20% Presale Bonus until 15th September 2020 or first 50 million
              tokens (whichever comes first)
            </h6>
          </div>
          <p style={{ whiteSpace: "pre-line" }}>
            10% Inviter Bonus*{"\n"}
            10% Invitee Bonus
          </p>

          <p>*10% of the amount bought by the invitee.</p>

          <p>
            Bonus tokens will be distributed one week after the token sale ends.
          </p>
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
                {getPrettyValue(
                  user.referralZinTokens +
                    user.bonusZinTokens +
                    user.presaleZinTokens
                )}{" "}
                <span>ZIN</span>
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
                <th className="data-col dt-bonusid">Bonus ID</th>
                <th className="data-col dt-tnxno">Transaction ID</th>
                <th className="data-col dt-token">Bonus Tokens Received</th>
                <th className="data-col dt-type">
                  <div className="dt-type-text">Type</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* .data-item */}
              {bonusTransactions.map((tx, index) => (
                <tr key={index} className="data-item">
                  <td className="data-col dt-bonusid">
                    <div className="d-flex align-items-center">
                      <div className="data-state data-state-approved">
                        <span className="d-none">Approved</span>
                      </div>
                      <div className="fake-class">
                        <span className="lead tnx-id">{tx.internalId}</span>
                        <span className="sub sub-date">
                          {tx.createDateTimeOffset}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="data-col dt-tnxno">
                    <div className="d-flex align-items-center">
                      <div className="fake-class">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={`https://etherscan.io/tx/${tx.txId}`}
                          className="lead tnx-id"
                        >
                          {tx.txId}
                        </a>
                      </div>
                    </div>
                  </td>
                  <td className="data-col dt-token">
                    <span className="lead token-amount">
                      {tx.bonusTokensGenerated}
                    </span>
                    <span className="sub sub-symbol">ZIN</span>
                  </td>
                  {tx.bonusType === 0 && (
                    <td className="data-col dt-type">
                      <span className="dt-type-md badge badge-outline badge-success badge-md">
                        Inviter Bonus
                      </span>
                      <span className="dt-type-sm badge badge-sq badge-outline badge-success badge-md">
                        I
                      </span>
                    </td>
                  )}
                  {tx.bonusType === 1 && (
                    <td className="data-col dt-type">
                      <span className="dt-type-md badge badge-outline badge-success badge-md">
                        Invitee Bonus
                      </span>
                      <span className="dt-type-sm badge badge-sq badge-outline badge-success badge-md">
                        I
                      </span>
                    </td>
                  )}
                  {tx.bonusType === 2 && (
                    <td className="data-col dt-type">
                      <span className="dt-type-md badge badge-outline badge-success badge-md">
                        Presale Bonus
                      </span>
                      <span className="dt-type-sm badge badge-sq badge-outline badge-success badge-md">
                        P
                      </span>
                    </td>
                  )}
                </tr>
              ))}
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
