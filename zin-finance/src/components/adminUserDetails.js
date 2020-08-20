import React from "react";

function AdminUserDetails() {
  return (
    <div className="container">
      <div className="card content-area">
        <div className="card-innr card-innr-fix">
          <div className="card-head d-flex justify-content-between align-items-center">
            <h4 className="card-title mb-0">User Details</h4>
            <div className="d-flex align-items-center guttar-20px">
              <div className="flex-col d-sm-block d-none">
                <a
                  href="user-list.html"
                  className="btn btn-sm btn-auto btn-primary"
                >
                  <em className="fas fa-arrow-left mr-3" />
                  Back
                </a>
              </div>
              <div className="flex-col d-sm-none">
                <a
                  href="user-list.html"
                  className="btn btn-icon btn-sm btn-primary"
                >
                  <em className="fas fa-arrow-left" />
                </a>
              </div>
              <div className="relative d-inline-block">
                <a
                  href="#"
                  className="btn btn-dark btn-sm btn-icon toggle-tigger"
                >
                  <em className="ti ti-more-alt" />
                </a>
                <div className="toggle-class dropdown-content dropdown-content-top-left">
                  <ul className="dropdown-list">
                    <li>
                      <a href="#">
                        <em className="far fa-envelope" /> Send Mail
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <em className="fas fa-shield-alt" /> Reset Pass
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <em className="fas fa-ban" /> Suspend
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="gaps-1-5x" />
          <div className="data-details d-md-flex">
            <div className="fake-class">
              <span className="data-details-title">Token Balance</span>
              <span className="data-details-info large">10,000</span>
            </div>
            <div className="fake-class">
              <span className="data-details-title">Contributed</span>
              <span className="data-details-info large">
                10 <small>ETH</small>
              </span>
            </div>
            <div className="fake-class">
              <span className="data-details-title">Tranx Status</span>
              <span className="badge badge-success ucap">Approved</span>
            </div>
            <ul className="data-vr-list">
              <li>
                <div className="data-state data-state-sm data-state-approved" />{" "}
                Email
              </li>
              <li>
                <div className="data-state data-state-sm data-state-pending" />{" "}
                KYC
              </li>
              <li>
                <div className="data-state data-state-sm data-state-approved" />{" "}
                WL
              </li>
            </ul>
          </div>
          <div className="gaps-3x" />
          <h6 className="card-sub-title">User Information</h6>
          <ul className="data-details-list">
            <li>
              <div className="data-details-head">Full Name</div>
              <div className="data-details-des">Abu Bin Ishtiyak</div>
            </li>
            {/* li */}
            <li>
              <div className="data-details-head">Surname</div>
              <div className="data-details-des">iO</div>
            </li>
            {/* li */}
            <li>
              <div className="data-details-head">Email Address</div>
              <div className="data-details-des">info@softnio.com</div>
            </li>
            {/* li */}
            <li>
              <div className="data-details-head">Mobile Number</div>
              <div className="data-details-des">01713040400</div>
            </li>
            {/* li */}
            <li>
              <div className="data-details-head">Date of Birth</div>
              <div className="data-details-des">10 Aug, 1980</div>
            </li>
            {/* li */}
          </ul>
          <div className="gaps-3x" />
          <h6 className="card-sub-title">More Information</h6>
          <ul className="data-details-list">
            <li>
              <div className="data-details-head">Joining Date</div>
              <div className="data-details-des">08-16-2018 09:04PM</div>
            </li>
            {/* li */}
            <li>
              <div className="data-details-head">Reg Method</div>
              <div className="data-details-des">Email</div>
            </li>
            {/* li */}
            <li>
              <div className="data-details-head">Last Login</div>
              <div className="data-details-des">08-16-2018 09:04PM</div>
            </li>
            {/* li */}
            <li>
              <div className="data-details-head">Newsleter Subscription</div>
              <div className="data-details-des">Yes</div>
            </li>
            {/* li */}
          </ul>
        </div>
        {/* .card-innr */}
      </div>
      {/* .card */}
    </div>
  );
}

export default AdminUserDetails;
