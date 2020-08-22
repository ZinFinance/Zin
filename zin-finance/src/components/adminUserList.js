import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ExportToCsv } from "export-to-csv";

function AdminUserList() {
  const users = useSelector((state) => state.adminReducer.users);

  const exportData = () => {
    const options = {
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalSeparator: ".",
      showLabels: true,
      filename: "zin-user-list",
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(users);
  };

  return (
    <div className="container">
      <div style={{ overflow: "auto" }} className="card content-area">
        <div className="card-innr">
          <div className="card-head d-flex justify-content-between align-items-center">
            <h4 className="card-title">User List</h4>
            <div className="d-flex align-items-center guttar-20px">
              <div className="flex-col d-sm-block d-none">
                <span
                  onClick={exportData}
                  className="btn btn-sm btn-auto btn-primary"
                >
                  {/* <em className="fas fa-arrow-left mr-3" /> */}
                  Export to CSV
                </span>
              </div>
            </div>
          </div>
          <table className="data-table dt-filter-init user-list">
            <thead>
              <tr className="data-item data-head">
                <th className="data-col dt-user">User</th>
                <th className="data-col dt-email">Email</th>
                <th className="data-col dt-verify">Status</th>
                <th className="data-col dt-referral">Referral</th>
                <th className="data-col dt-ethaddress">Wallet</th>
                <th className="data-col dt-token">Tokens Purchased</th>
                <th className="data-col dt-referralzin">Referral Tokens</th>
                <th className="data-col dt-bonuszin">Bonus Tokens</th>
                <th className="data-col dt-presalezin">Pre-sale Tokens</th>
                <th className="data-col" />
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="data-item">
                  <td
                    style={{ paddingRight: "100px" }}
                    className="data-col dt-user"
                  >
                    {user.firstName || user.lastName ? (
                      <span
                        style={{ whiteSpace: "nowrap" }}
                        className="lead user-name"
                      >
                        {`${user.firstName ? user.firstName : ""} 
                        ${user.lastName ? user.lastName : ""}`}
                      </span>
                    ) : (
                      <span
                        style={{ whiteSpace: "nowrap" }}
                        className="sub sub-s2"
                      >
                        No Name Set
                      </span>
                    )}
                    {/* <span className="sub user-id">UD102001</span> */}
                  </td>
                  <td
                    style={{ paddingRight: "100px" }}
                    className="data-col dt-email"
                  >
                    <span className="sub sub-s2 sub-email">{user.email}</span>
                  </td>
                  <td
                    style={{ paddingRight: "100px" }}
                    className="data-col dt-verify"
                  >
                    <ul className="data-vr-list">
                      <li>
                        {user.isEmailVerified ? (
                          <div className="data-state data-state-sm data-state-approved" />
                        ) : (
                          <div className="data-state data-state-sm data-state-pending" />
                        )}{" "}
                        Email
                      </li>
                      {user.kycStatus && (
                        <li>
                          <div className="data-state data-state-sm data-state-pending" />{" "}
                          KYC
                        </li>
                      )}
                    </ul>
                  </td>
                  <td
                    style={{ paddingRight: "100px" }}
                    className="data-col dt-referral"
                  >
                    <span className="sub sub-s2">{user.referralCode}</span>
                  </td>
                  <td
                    style={{ paddingRight: "100px" }}
                    className="data-col dt-ethaddress"
                  >
                    <span className="sub sub-s2">
                      {user.ethAddress ? user.ethAddress : "No Address Set"}
                    </span>
                  </td>
                  <td
                    style={{ paddingRight: "100px" }}
                    className="data-col dt-token"
                  >
                    <span className="sub sub-s2">{user.zinTokens}</span>
                  </td>
                  <td
                    style={{ paddingRight: "100px" }}
                    className="data-col dt-referralzin"
                  >
                    <span className="sub sub-s2">{user.referralZinTokens}</span>
                  </td>
                  <td
                    style={{ paddingRight: "100px" }}
                    className="data-col dt-bonuszin"
                  >
                    <span className="sub sub-s2">{user.bonusZinTokens}</span>
                  </td>
                  <td
                    style={{ paddingRight: "100px" }}
                    className="data-col dt-presalezin"
                  >
                    <span className="sub sub-s2">{user.presaleZinTokens}</span>
                  </td>
                  <td
                    style={{ paddingRight: "30px" }}
                    className="data-col text-right"
                  >
                    <div className="relative d-inline-block">
                      <span className="btn btn-light-alt btn-xs btn-icon toggle-tigger">
                        <em className="ti ti-more-alt" />
                      </span>
                      <div className="toggle-class dropdown-content dropdown-content-top-left">
                        <ul className="dropdown-list">
                          <li>
                            <Link to={`/user-transactions/${user.email}`}>
                              <em className="ti ti-eye" /> View Transactions
                            </Link>
                          </li>
                          <li>
                            <Link to={`/user-bonus-transactions/${user.email}`}>
                              <em className="ti ti-eye" /> View Bonus
                              Transactions
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
              {/* .data-item */}
            </tbody>
          </table>
          {/* <div className="d-flex align-items-center guttar-20px">
            <div className="flex-col d-sm-block d-none">
              <Link to="/admin-dashboard">
                <span className="btn btn-sm btn-auto btn-primary">
                  Export to CSV
                </span>
              </Link>
            </div>
          </div> */}
        </div>
        {/* .card-innr */}
      </div>
      {/* .card */}
    </div>
  );
}

export default AdminUserList;
