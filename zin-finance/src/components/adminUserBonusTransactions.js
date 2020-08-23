import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";
import { fetchUserBonusTransactions } from "../redux/actions/adminActions";
import PageLoader from "./pageLoader";
import { ExportToCsv } from "export-to-csv";

function AdminUserBonusTransactions() {
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  const userBonusTransactions = useSelector(
    (state) => state.adminReducer.userBonusTransactions
  );
  const [userTransactions, setUserTransactions] = useState(null);

  const exportData = () => {
    const options = {
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalSeparator: ".",
      showLabels: true,
      filename: `${params.userId}-bonus-transactions`,
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(userTransactions);
  };

  useEffect(() => {
    if (params.userId && !userTransactions) {
      dispatch(
        fetchUserBonusTransactions(params.userId, (err) => {
          if (err) {
            setUserTransactions([]);
          }
        })
      );
    }
  }, [userTransactions, params.userId, dispatch]);

  useEffect(() => {
    if (params.userId) {
      if (userBonusTransactions[params.userId]) {
        setUserTransactions(userBonusTransactions[params.userId]);
      }
    } else {
      history.push("/user-list");
    }
  }, [userBonusTransactions, params.userId, history]);

  if (!userTransactions) {
    return <PageLoader containerHeight="50vh" />;
  }
  return (
    <div className="container">
      <div className="card content-area">
        <div className="card-innr">
          <div className="card-head d-flex justify-content-between align-items-center">
            <h4 className="card-title">Referral Transactions</h4>
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
              {userTransactions.map((tx, index) => (
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
    </div>
  );
}

export default AdminUserBonusTransactions;
