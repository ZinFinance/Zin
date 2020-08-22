import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEthToUSDValue } from "../utility";
import { useParams, useHistory, Link } from "react-router-dom";
import { fetchUserTransactions } from "../redux/actions/adminActions";
import PageLoader from "./pageLoader";
import { ExportToCsv } from "export-to-csv";

const tokenRate = process.env.REACT_APP_API_TOKEN_RATE;

function AdminUserTransactions() {
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  const adminUserTransactions = useSelector(
    (state) => state.adminReducer.userTransactions
  );
  const [userTransactions, setUserTransactions] = useState(null);
  const ethToUSDValue = useEthToUSDValue();

  useEffect(() => {
    if (params.email) {
      if (adminUserTransactions[params.email]) {
        setUserTransactions(adminUserTransactions[params.email]);
      } else {
        dispatch(
          fetchUserTransactions(params.email, (err) => {
            if (err) {
              setUserTransactions([]);
            }
          })
        );
      }
    } else {
      history.push("/user-list");
    }
  }, [adminUserTransactions, params.email, history, dispatch]);

  const exportData = () => {
    const options = {
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalSeparator: ".",
      showLabels: true,
      filename: `${params.email}-transactions`,
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(userTransactions);
  };

  return (
    <div className="container">
      {!userTransactions && <PageLoader containerHeight="50vh" />}
      <div
        style={{ display: !userTransactions ? "none" : "flex" }}
        className="card content-area"
      >
        <div className="card-innr">
          <div className="card-head d-flex justify-content-between align-items-center">
            <h4 className="card-title">User Transactions</h4>

            <div className="d-flex align-items-center guttar-20px">
              {userTransactions && userTransactions.length > 0 && (
                <div className="flex-col d-sm-block d-none">
                  <span
                    onClick={exportData}
                    className="btn btn-sm btn-auto btn-primary"
                  >
                    Export to CSV
                  </span>
                </div>
              )}
              <div className="flex-col d-sm-block d-none">
                <Link to="/user-list">
                  <span className="btn btn-sm btn-auto btn-primary">
                    <em className="fas fa-arrow-left mr-3" />
                    Back
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <table className="data-table dt-filter-init user-tnx">
            <thead>
              <tr className="data-item data-head">
                <th className="data-col dt-tnxno">Transaction ID</th>
                <th className="data-col dt-token">Tokens</th>
                <th className="data-col dt-amount">Amount</th>
                <th className="data-col dt-usd-amount">USD Amount</th>
              </tr>
            </thead>
            <tbody>
              {/* .data-item */}
              {(userTransactions ? userTransactions : []).map(
                (transaction, index) => (
                  <tr key={index} className="data-item">
                    <td className="data-col dt-tnxno">
                      <div className="d-flex align-items-center">
                        <div className="data-state data-state-approved">
                          <span className="d-none">Approved</span>
                        </div>
                        <div className="fake-class">
                          <a
                            href={`https://etherscan.io/tx/${transaction.txId}`}
                            className="lead tnx-id"
                          >
                            {transaction.txId}
                          </a>
                          <span className="sub sub-date">
                            {transaction.createDateTimeOffset}
                          </span>
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
                )
              )}
            </tbody>
          </table>
        </div>
        {/* .card-innr */}
      </div>
      {/* .card */}
    </div>
  );
}

export default AdminUserTransactions;
