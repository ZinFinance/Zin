import React from "react";
import TransactionDetailsModal from "./transactionDetailsModal";
import { useSelector } from "react-redux";
import { useEthToUSDValue } from "../utility";

function Transactions() {
  const transactions = useSelector(
    (state) => state.transactionReducer.transactions
  );
  const tokenRate = useSelector((state) => state.tokenReducer.tokenRate);
  const ethToUSDValue = useEthToUSDValue();

  return (
    <div className="container">
      <TransactionDetailsModal />
      <div className="card content-area">
        <div className="card-innr">
          <div className="card-head">
            <h4 className="card-title">User Transactions</h4>
          </div>
          <table className="data-table dt-init user-tnx">
            <thead>
              <tr className="data-item data-head">
                <th className="data-col dt-tnxno">Tranx NO</th>
                <th className="data-col dt-token">Tokens</th>
                <th className="data-col dt-amount">Amount</th>
                <th className="data-col dt-usd-amount">USD Amount</th>
              </tr>
            </thead>
            <tbody>
              {/* .data-item */}
              {transactions.map((transaction) => (
                <tr className="data-item">
                  <td className="data-col dt-tnxno">
                    <div className="d-flex align-items-center">
                      <div className="data-state data-state-approved">
                        <span className="d-none">Approved</span>
                      </div>
                      <div className="fake-class">
                        <span className="lead tnx-id">{transaction.txId}</span>
                        <span className="sub sub-date">{transaction.date}</span>
                      </div>
                    </div>
                  </td>
                  <td className="data-col dt-token">
                    <span className="lead token-amount">
                      {transaction.amountTransferredInToken}
                    </span>
                    <span className="sub sub-symbol">ZIN</span>
                  </td>
                  <td className="data-col dt-amount">
                    <span className="lead amount-pay">
                      {transaction.amountTransferredInEther}
                    </span>
                    <span className="sub sub-symbol">
                      ETH{" "}
                      <em
                        className="fas fa-info-circle"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title={`1 ETH = ${tokenRate} ZIN`}
                      />
                    </span>
                  </td>
                  <td className="data-col dt-usd-amount">
                    <span className="lead amount-pay">
                      {transaction.amountTransferredInEther * ethToUSDValue}
                    </span>
                    <span className="sub sub-symbol">
                      USD{" "}
                      <em
                        className="fas fa-info-circle"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title={`1 ETH = ${ethToUSDValue} USD`}
                      />
                    </span>
                  </td>
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

export default Transactions;
