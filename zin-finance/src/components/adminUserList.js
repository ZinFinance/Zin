import React from "react";

function AdminUserList() {
  return (
    <div className="container">
      <div className="card content-area">
        <div className="card-innr">
          <div className="card-head">
            <h4 className="card-title">User List</h4>
          </div>
          <table className="data-table dt-init user-list">
            <thead>
              <tr className="data-item data-head">
                <th className="data-col dt-user">User</th>
                <th className="data-col dt-email">Email</th>
                <th className="data-col dt-token">Tokens</th>
                <th className="data-col dt-verify">Verified Status</th>
                <th className="data-col dt-login">Last Login</th>
                <th className="data-col dt-status">
                  <div className="dt-status-text">Status</div>
                </th>
                <th className="data-col" />
              </tr>
            </thead>
            <tbody>
              <tr className="data-item">
                <td className="data-col dt-user">
                  <span className="lead user-name">Abu Bin Ishtiyak</span>
                  <span className="sub user-id">UD102001</span>
                </td>
                <td className="data-col dt-email">
                  <span className="sub sub-s2 sub-email">
                    info(at)softnio.com
                  </span>
                </td>
                <td className="data-col dt-token">
                  <span className="lead lead-btoken">35,040</span>
                </td>
                <td className="data-col dt-verify">
                  <ul className="data-vr-list">
                    <li>
                      <div className="data-state data-state-sm data-state-approved" />{" "}
                      Email
                    </li>
                    <li>
                      <div className="data-state data-state-sm data-state-pending" />{" "}
                      KYC
                    </li>
                  </ul>
                </td>
                <td className="data-col dt-login">
                  <span className="sub sub-s2 sub-time">
                    2018-08-24 10:20 PM
                  </span>
                </td>
                <td className="data-col dt-status">
                  <span className="dt-status-md badge badge-outline badge-success badge-md">
                    Active
                  </span>
                  <span className="dt-status-sm badge badge-sq badge-outline badge-success badge-md">
                    A
                  </span>
                </td>
                <td className="data-col text-right">
                  <div className="relative d-inline-block">
                    <a
                      href="#"
                      className="btn btn-light-alt btn-xs btn-icon toggle-tigger"
                    >
                      <em className="ti ti-more-alt" />
                    </a>
                    <div className="toggle-class dropdown-content dropdown-content-top-left">
                      <ul className="dropdown-list">
                        <li>
                          <a href="#">
                            <em className="ti ti-eye" /> View Details
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <em className="ti ti-na" /> Suspend
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <em className="ti ti-trash" /> Delete
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </td>
              </tr>
              {/* .data-item */}
              <tr className="data-item">
                <td className="data-col dt-user">
                  <span className="lead user-name">Helena Walz</span>
                  <span className="sub user-id">UD102005</span>
                </td>
                <td className="data-col dt-email">
                  <span className="sub sub-s2 sub-email">
                    info(at)softnio.com
                  </span>
                </td>
                <td className="data-col dt-token">
                  <span className="lead lead-btoken">40</span>
                </td>
                <td className="data-col dt-verify">
                  <ul className="data-vr-list">
                    <li>
                      <div className="data-state data-state-sm data-state-approved" />{" "}
                      Email
                    </li>
                    <li>
                      <div className="data-state data-state-sm data-state-approved" />{" "}
                      KYC
                    </li>
                  </ul>
                </td>
                <td className="data-col dt-login">
                  <span className="sub sub-s2 sub-time">
                    2018-10-11 10:54 AM
                  </span>
                </td>
                <td className="data-col dt-status">
                  <span className="dt-status-md badge badge-outline badge-success badge-md">
                    Active
                  </span>
                  <span className="dt-status-sm badge badge-sq badge-outline badge-success badge-md">
                    A
                  </span>
                </td>
                <td className="data-col text-right">
                  <div className="relative d-inline-block">
                    <a
                      href="#"
                      className="btn btn-light-alt btn-xs btn-icon toggle-tigger"
                    >
                      <em className="ti ti-more-alt" />
                    </a>
                    <div className="toggle-class dropdown-content dropdown-content-top-left">
                      <ul className="dropdown-list">
                        <li>
                          <a href="#">
                            <em className="ti ti-eye" /> View Details
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <em className="ti ti-na" /> Suspend
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <em className="ti ti-trash" /> Delete
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </td>
              </tr>
              {/* .data-item */}
              <tr className="data-item">
                <td className="data-col dt-user">
                  <span className="lead user-name">Sherice Digangi</span>
                  <span className="sub user-id">UD102023</span>
                </td>
                <td className="data-col dt-email">
                  <span className="sub sub-s2 sub-email">
                    info@shericedigangi.com
                  </span>
                </td>
                <td className="data-col dt-token">
                  <span className="lead lead-btoken">0</span>
                </td>
                <td className="data-col dt-verify">
                  <ul className="data-vr-list">
                    <li>
                      <div className="data-state data-state-sm data-state-approved" />{" "}
                      Email
                    </li>
                    <li>
                      <div className="data-state data-state-sm data-state-missing" />{" "}
                      KYC
                    </li>
                  </ul>
                </td>
                <td className="data-col dt-login">
                  <span className="sub sub-s2 sub-time">
                    2018-11-15 05:20 AM
                  </span>
                </td>
                <td className="data-col dt-status">
                  <span className="dt-status-md badge badge-outline badge-danger badge-md">
                    Suspended
                  </span>
                  <span className="dt-status-sm badge badge-sq badge-outline badge-danger badge-md">
                    s
                  </span>
                </td>
                <td className="data-col text-right">
                  <div className="relative d-inline-block">
                    <a
                      href="#"
                      className="btn btn-light-alt btn-xs btn-icon toggle-tigger"
                    >
                      <em className="ti ti-more-alt" />
                    </a>
                    <div className="toggle-class dropdown-content dropdown-content-top-left">
                      <ul className="dropdown-list">
                        <li>
                          <a href="#">
                            <em className="ti ti-eye" /> View Details
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <em className="ti ti-na" /> Suspend
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <em className="ti ti-trash" /> Delete
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </td>
              </tr>
              {/* .data-item */}
              <tr className="data-item">
                <td className="data-col dt-user">
                  <span className="lead user-name">Darren Square</span>
                  <span className="sub user-id">UD102028</span>
                </td>
                <td className="data-col dt-email">
                  <span className="sub sub-s2 sub-email">
                    info@darrensq.com
                  </span>
                </td>
                <td className="data-col dt-token">
                  <span className="lead lead-btoken">4,501</span>
                </td>
                <td className="data-col dt-verify">
                  <ul className="data-vr-list">
                    <li>
                      <div className="data-state data-state-sm data-state-approved" />{" "}
                      Email
                    </li>
                    <li>
                      <div className="data-state data-state-sm data-state-pending" />{" "}
                      KYC
                    </li>
                  </ul>
                </td>
                <td className="data-col dt-login">
                  <span className="sub sub-s2 sub-time">
                    2018-09-28 11:43 AM
                  </span>
                </td>
                <td className="data-col dt-status">
                  <span className="dt-status-md badge badge-outline badge-success badge-md">
                    Active
                  </span>
                  <span className="dt-status-sm badge badge-sq badge-outline badge-success badge-md">
                    A
                  </span>
                </td>
                <td className="data-col text-right">
                  <div className="relative d-inline-block">
                    <a
                      href="#"
                      className="btn btn-light-alt btn-xs btn-icon toggle-tigger"
                    >
                      <em className="ti ti-more-alt" />
                    </a>
                    <div className="toggle-class dropdown-content dropdown-content-top-left">
                      <ul className="dropdown-list">
                        <li>
                          <a href="#">
                            <em className="ti ti-eye" /> View Details
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <em className="ti ti-na" /> Suspend
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <em className="ti ti-trash" /> Delete
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </td>
              </tr>
              {/* .data-item */}
              <tr className="data-item">
                <td className="data-col dt-user">
                  <span className="lead user-name">Patrick Reader</span>
                  <span className="sub user-id">UD102037</span>
                </td>
                <td className="data-col dt-email">
                  <span className="sub sub-s2 sub-email">
                    patrick-94@example.com
                  </span>
                </td>
                <td className="data-col dt-token">
                  <span className="lead lead-btoken">3,240</span>
                </td>
                <td className="data-col dt-verify">
                  <ul className="data-vr-list">
                    <li>
                      <div className="data-state data-state-sm data-state-approved" />{" "}
                      Email
                    </li>
                    <li>
                      <div className="data-state data-state-sm data-state-approved" />{" "}
                      KYC
                    </li>
                  </ul>
                </td>
                <td className="data-col dt-login">
                  <span className="sub sub-s2 sub-time">
                    2018-11-15 05:13 AM
                  </span>
                </td>
                <td className="data-col dt-status">
                  <span className="dt-status-md badge badge-outline badge-success badge-md">
                    Active
                  </span>
                  <span className="dt-status-sm badge badge-sq badge-outline badge-success badge-md">
                    A
                  </span>
                </td>
                <td className="data-col text-right">
                  <div className="relative d-inline-block">
                    <a
                      href="#"
                      className="btn btn-light-alt btn-xs btn-icon toggle-tigger"
                    >
                      <em className="ti ti-more-alt" />
                    </a>
                    <div className="toggle-class dropdown-content dropdown-content-top-left">
                      <ul className="dropdown-list">
                        <li>
                          <a href="#">
                            <em className="ti ti-eye" /> View Details
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <em className="ti ti-na" /> Suspend
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <em className="ti ti-trash" /> Delete
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </td>
              </tr>
              {/* .data-item */}
              <tr className="data-item">
                <td className="data-col dt-user">
                  <span className="lead user-name">Abu Bin Ishtiyak</span>
                  <span className="sub user-id">UD102001</span>
                </td>
                <td className="data-col dt-email">
                  <span className="sub sub-s2 sub-email">
                    info(at)softnio.com
                  </span>
                </td>
                <td className="data-col dt-token">
                  <span className="lead lead-btoken">50,000</span>
                </td>
                <td className="data-col dt-verify">
                  <ul className="data-vr-list">
                    <li>
                      <div className="data-state data-state-sm data-state-approved" />{" "}
                      Email
                    </li>
                    <li>
                      <div className="data-state data-state-sm data-state-approved" />{" "}
                      KYC
                    </li>
                  </ul>
                </td>
                <td className="data-col dt-login">
                  <span className="sub sub-s2 sub-time">
                    2018-08-24 10:20 PM
                  </span>
                </td>
                <td className="data-col dt-status">
                  <span className="dt-status-md badge badge-outline badge-warning badge-md">
                    Pending
                  </span>
                  <span className="dt-status-sm badge badge-sq badge-outline badge-warning badge-md">
                    p
                  </span>
                </td>
                <td className="data-col text-right">
                  <div className="relative d-inline-block">
                    <a
                      href="#"
                      className="btn btn-light-alt btn-xs btn-icon toggle-tigger"
                    >
                      <em className="ti ti-more-alt" />
                    </a>
                    <div className="toggle-class dropdown-content dropdown-content-top-left">
                      <ul className="dropdown-list">
                        <li>
                          <a href="#">
                            <em className="ti ti-eye" /> View Details
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <em className="ti ti-na" /> Suspend
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <em className="ti ti-trash" /> Delete
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </td>
              </tr>
              {/* .data-item */}
              <tr className="data-item">
                <td className="data-col dt-user">
                  <span className="lead user-name">Abu Bin Ishtiyak</span>
                  <span className="sub user-id">UD102001</span>
                </td>
                <td className="data-col dt-email">
                  <span className="sub sub-s2 sub-email">
                    info(at)softnio.com
                  </span>
                </td>
                <td className="data-col dt-token">
                  <span className="lead lead-btoken">50,000</span>
                </td>
                <td className="data-col dt-verify">
                  <ul className="data-vr-list">
                    <li>
                      <div className="data-state data-state-sm data-state-approved" />{" "}
                      Email
                    </li>
                    <li>
                      <div className="data-state data-state-sm data-state-approved" />{" "}
                      KYC
                    </li>
                  </ul>
                </td>
                <td className="data-col dt-login">
                  <span className="sub sub-s2 sub-time">
                    2018-08-24 10:20 PM
                  </span>
                </td>
                <td className="data-col dt-status">
                  <span className="dt-status-md badge badge-outline badge-danger badge-md">
                    Suspended
                  </span>
                  <span className="dt-status-sm badge badge-sq badge-outline badge-danger badge-md">
                    s
                  </span>
                </td>
                <td className="data-col text-right">
                  <div className="relative d-inline-block">
                    <a
                      href="#"
                      className="btn btn-light-alt btn-xs btn-icon toggle-tigger"
                    >
                      <em className="ti ti-more-alt" />
                    </a>
                    <div className="toggle-class dropdown-content dropdown-content-top-left">
                      <ul className="dropdown-list">
                        <li>
                          <a href="#">
                            <em className="ti ti-eye" /> View Details
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <em className="ti ti-na" /> Suspend
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <em className="ti ti-trash" /> Delete
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
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

export default AdminUserList;
