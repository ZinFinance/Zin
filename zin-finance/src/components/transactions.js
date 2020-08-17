import React from "react";
import TransactionDetailsModal from "./transactionDetailsModal";

function Transactions() {
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
                <th className="data-col dt-account">From</th>
                <th className="data-col dt-type">
                  <div className="dt-type-text">Type</div>
                </th>
                <th className="data-col" />
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
                  <span className="lead token-amount">18,750</span>
                  <span className="sub sub-symbol">TWZ</span>
                </td>
                <td className="data-col dt-amount">
                  <span className="lead amount-pay">50.00</span>
                  <span className="sub sub-symbol">
                    ETH{" "}
                    <em
                      className="fas fa-info-circle"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="1 ETH = 1250 TWZ"
                    />
                  </span>
                </td>
                <td className="data-col dt-usd-amount">
                  <span className="lead amount-pay">245.52</span>
                  <span className="sub sub-symbol">
                    USD{" "}
                    <em
                      className="fas fa-info-circle"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="1 ETH = 350.54 USD"
                    />
                  </span>
                </td>
                <td className="data-col dt-account">
                  <span className="lead user-info">1F1T....4XQX</span>
                  <span className="sub sub-date">08 Jul, 18 10:20PM</span>
                </td>
                <td className="data-col dt-type">
                  <span className="dt-type-md badge badge-outline badge-success badge-md">
                    Purchase
                  </span>
                  <span className="dt-type-sm badge badge-sq badge-outline badge-success badge-md">
                    P
                  </span>
                </td>
                <td className="data-col text-right">
                  <div className="relative d-inline-block d-md-none">
                    <span className="btn btn-light-alt btn-xs btn-icon toggle-tigger">
                      <em className="ti ti-more-alt" />
                    </span>
                    <div className="toggle-class dropdown-content dropdown-content-center-left pd-2x">
                      <ul className="data-action-list">
                        <li>
                          <span className="btn btn-auto btn-primary btn-xs">
                            <span>
                              Pay{" "}
                              <span className="d-none d-xl-inline-block">
                                Now
                              </span>
                            </span>
                            <em className="ti ti-wallet" />
                          </span>
                        </li>
                        <li>
                          <span className="btn btn-danger-alt btn-xs btn-icon">
                            <em className="ti ti-trash" />
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <ul className="data-action-list d-none d-md-inline-flex">
                    <li>
                      <span className="btn btn-auto btn-primary btn-xs">
                        <span>
                          Pay{" "}
                          <span className="d-none d-xl-inline-block">Now</span>
                        </span>
                        <em className="ti ti-wallet" />
                      </span>
                    </li>
                    <li>
                      <span
                        href="#"
                        className="btn btn-danger-alt btn-xs btn-icon"
                      >
                        <em className="ti ti-trash" />
                      </span>
                    </li>
                  </ul>
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
                  <span className="sub sub-symbol">TWZ</span>
                </td>
                <td className="data-col dt-amount">
                  <span className="lead amount-pay">50.00</span>
                  <span className="sub sub-symbol">
                    ETH{" "}
                    <em
                      className="fas fa-info-circle"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="1 ETH = 1250 TWZ"
                    />
                  </span>
                </td>
                <td className="data-col dt-usd-amount">
                  <span className="lead amount-pay">245.52</span>
                  <span className="sub sub-symbol">
                    USD{" "}
                    <em
                      className="fas fa-info-circle"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="1 ETH = 350.54 USD"
                    />
                  </span>
                </td>
                <td className="data-col dt-account">
                  <span className="lead user-info">1F1T....4XQX</span>
                  <span className="sub sub-date">08 Jul, 18 10:20PM</span>
                </td>
                <td className="data-col dt-type">
                  <span className="dt-type-md badge badge-outline badge-success badge-md">
                    Purchase
                  </span>
                  <span className="dt-type-sm badge badge-sq badge-outline badge-success badge-md">
                    P
                  </span>
                </td>
                <td className="data-col text-right">
                  <span
                    style={{ cursor: "pointer" }}
                    data-toggle="modal"
                    data-target="#transaction-details"
                    className="btn btn-light-alt btn-xs btn-icon"
                  >
                    <em className="ti ti-eye" />
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
                  <span className="sub sub-symbol">TWZ</span>
                </td>
                <td className="data-col dt-amount">
                  <span className="lead amount-pay">50.00</span>
                  <span className="sub sub-symbol">
                    ETH{" "}
                    <em
                      className="fas fa-info-circle"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="1 ETH = 1250 TWZ"
                    />
                  </span>
                </td>
                <td className="data-col dt-usd-amount">
                  <span className="lead amount-pay">245.52</span>
                  <span className="sub sub-symbol">
                    USD{" "}
                    <em
                      className="fas fa-info-circle"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="1 ETH = 350.54 USD"
                    />
                  </span>
                </td>
                <td className="data-col dt-account">
                  <span className="lead user-info">1F1T....4XQX</span>
                  <span className="sub sub-date">08 Jul, 18 10:20PM</span>
                </td>
                <td className="data-col dt-type">
                  <span className="dt-type-md badge badge-outline badge-success badge-md">
                    Purchase
                  </span>
                  <span className="dt-type-sm badge badge-sq badge-outline badge-success badge-md">
                    P
                  </span>
                </td>
                <td className="data-col text-right">
                  <a
                    href="transaction-details.html"
                    className="btn btn-light-alt btn-xs btn-icon"
                  >
                    <em className="ti ti-eye" />
                  </a>
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
                  <span className="sub sub-symbol">TWZ</span>
                </td>
                <td className="data-col dt-amount">
                  <span className="lead amount-pay">50.00</span>
                  <span className="sub sub-symbol">
                    ETH{" "}
                    <em
                      className="fas fa-info-circle"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="1 ETH = 1250 TWZ"
                    />
                  </span>
                </td>
                <td className="data-col dt-usd-amount">
                  <span className="lead amount-pay">245.52</span>
                  <span className="sub sub-symbol">
                    USD{" "}
                    <em
                      className="fas fa-info-circle"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="1 ETH = 350.54 USD"
                    />
                  </span>
                </td>
                <td className="data-col dt-account">
                  <span className="lead user-info">1F1T....4XQX</span>
                  <span className="sub sub-date">08 Jul, 18 10:20PM</span>
                </td>
                <td className="data-col dt-type">
                  <span className="dt-type-md badge badge-outline badge-success badge-md">
                    Purchase
                  </span>
                  <span className="dt-type-sm badge badge-sq badge-outline badge-success badge-md">
                    P
                  </span>
                </td>
                <td className="data-col text-right">
                  <a
                    href="transaction-details.html"
                    className="btn btn-light-alt btn-xs btn-icon"
                  >
                    <em className="ti ti-eye" />
                  </a>
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
                  <span className="sub sub-symbol">TWZ</span>
                </td>
                <td className="data-col dt-amount">
                  <span className="lead amount-pay">0.85</span>
                  <span className="sub sub-symbol">
                    ETH{" "}
                    <em
                      className="fas fa-info-circle"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="1 ETH = 1250 TWZ"
                    />
                  </span>
                </td>
                <td className="data-col dt-usd-amount">
                  <span className="lead amount-pay">2.54</span>
                  <span className="sub sub-symbol">
                    USD{" "}
                    <em
                      className="fas fa-info-circle"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="1 ETH = 350.54 USD"
                    />
                  </span>
                </td>
                <td className="data-col dt-account">
                  <span className="lead user-info">Bounty Bonus</span>
                  <span className="sub sub-date">Campaign Name</span>
                </td>
                <td className="data-col dt-type">
                  <span className="dt-type-md badge badge-outline badge-info badge-md">
                    Bonus
                  </span>
                  <span className="dt-type-sm badge badge-sq badge-outline badge-info badge-md">
                    B
                  </span>
                </td>
                <td className="data-col text-right">
                  <a
                    href="transaction-details.html"
                    className="btn btn-light-alt btn-xs btn-icon"
                  >
                    <em className="ti ti-eye" />
                  </a>
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
                  <span className="sub sub-symbol">TWZ</span>
                </td>
                <td className="data-col dt-amount">
                  <span className="lead amount-pay">50.00</span>
                  <span className="sub sub-symbol">
                    ETH{" "}
                    <em
                      className="fas fa-info-circle"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="1 ETH = 1250 TWZ"
                    />
                  </span>
                </td>
                <td className="data-col dt-usd-amount">
                  <span className="lead amount-pay">245.52</span>
                  <span className="sub sub-symbol">
                    USD{" "}
                    <em
                      className="fas fa-info-circle"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="1 ETH = 350.54 USD"
                    />
                  </span>
                </td>
                <td className="data-col dt-account">
                  <span className="lead user-info">1F1T....4XQX</span>
                  <span className="sub sub-date">08 Jul, 18 10:20PM</span>
                </td>
                <td className="data-col dt-type">
                  <span className="dt-type-md badge badge-outline badge-success badge-md">
                    Purchase
                  </span>
                  <span className="dt-type-sm badge badge-sq badge-outline badge-success badge-md">
                    P
                  </span>
                </td>
                <td className="data-col text-right">
                  <a
                    href="transaction-details.html"
                    className="btn btn-light-alt btn-xs btn-icon"
                  >
                    <em className="ti ti-eye" />
                  </a>
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
                  <span className="sub sub-symbol">TWZ</span>
                </td>
                <td className="data-col dt-amount">
                  <span className="lead amount-pay">50.00</span>
                  <span className="sub sub-symbol">
                    ETH{" "}
                    <em
                      className="fas fa-info-circle"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="1 ETH = 1250 TWZ"
                    />
                  </span>
                </td>
                <td className="data-col dt-usd-amount">
                  <span className="lead amount-pay">245.52</span>
                  <span className="sub sub-symbol">
                    USD{" "}
                    <em
                      className="fas fa-info-circle"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="1 ETH = 350.54 USD"
                    />
                  </span>
                </td>
                <td className="data-col dt-account">
                  <span className="lead user-info">1F1T....4XQX</span>
                  <span className="sub sub-date">08 Jul, 18 10:20PM</span>
                </td>
                <td className="data-col dt-type">
                  <span className="dt-type-md badge badge-outline badge-success badge-md">
                    Purchase
                  </span>
                  <span className="dt-type-sm badge badge-sq badge-outline badge-success badge-md">
                    P
                  </span>
                </td>
                <td className="data-col text-right">
                  <a
                    href="transaction-details.html"
                    className="btn btn-light-alt btn-xs btn-icon"
                  >
                    <em className="ti ti-eye" />
                  </a>
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
                  <span className="sub sub-symbol">TWZ</span>
                </td>
                <td className="data-col dt-amount">
                  <span className="lead amount-pay">50.00</span>
                  <span className="sub sub-symbol">
                    ETH{" "}
                    <em
                      className="fas fa-info-circle"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="1 ETH = 1250 TWZ"
                    />
                  </span>
                </td>
                <td className="data-col dt-usd-amount">
                  <span className="lead amount-pay">245.52</span>
                  <span className="sub sub-symbol">
                    USD{" "}
                    <em
                      className="fas fa-info-circle"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="1 ETH = 350.54 USD"
                    />
                  </span>
                </td>
                <td className="data-col dt-account">
                  <span className="lead user-info">1F1T....4XQX</span>
                  <span className="sub sub-date">08 Jul, 18 10:20PM</span>
                </td>
                <td className="data-col dt-type">
                  <span className="dt-type-md badge badge-outline badge-success badge-md">
                    Purchase
                  </span>
                  <span className="dt-type-sm badge badge-sq badge-outline badge-success badge-md">
                    P
                  </span>
                </td>
                <td className="data-col text-right">
                  <a
                    href="transaction-details.html"
                    className="btn btn-light-alt btn-xs btn-icon"
                  >
                    <em className="ti ti-eye" />
                  </a>
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

export default Transactions;
