import React from "react";

function NonAuthContent(props) {
  return (
    <div className="page-ath">
      <div className="page-ath-wrap">
        <div className="page-ath-content">
          <div className="page-ath-header">
            <a href="./" className="page-ath-logo">
              <img
                src="images/logo.png"
                srcSet="images/logo2x.png 2x"
                alt="logo"
              />
            </a>
          </div>
          {props.children}
          <div className="page-ath-footer">
            <ul className="footer-links">
              <li>
                <a href="regular-page.html">Privacy Policy</a>
              </li>
              <li>
                <a href="regular-page.html">Terms</a>
              </li>
              <li>© {new Date().getFullYear()} Zin.</li>
            </ul>
          </div>
        </div>
        <div className="page-ath-gfx">
          <div className="w-100 d-flex justify-content-center">
            <div className="col-md-8 col-xl-5">
              <img src="images/ath-gfx.png" alt="gfx" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NonAuthContent;
