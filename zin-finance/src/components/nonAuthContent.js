import React from "react";
import { Link } from "react-router-dom";

function NonAuthContent(props) {
  return (
    <div className="page-ath">
      <div className="page-ath-wrap">
        <div className="page-ath-content">
          <div className="page-ath-header">
            <Link to="/sign-in" className="page-ath-logo">
              <img
                src="/images/logo.png"
                srcSet="/images/logo2x.png 2x"
                alt="logo"
              />
            </Link>
          </div>
          {props.children}
          <div className="page-ath-footer">
            <ul className="footer-links">
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.zin.finance/privacy-policy/"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.zin.finance/terms-and-conditions/"
                >
                  Terms and Conditions
                </a>
              </li>
              <li>© {new Date().getFullYear()} Zin.</li>
            </ul>
          </div>
        </div>
        <div style={{ alignItems: "inherit" }} className="page-ath-gfx">
          <div className="w-100 d-flex justify-content-center">
            <img
              style={{ width: "100%" }}
              src="/images/screen-gif.gif"
              alt="gfx"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NonAuthContent;
