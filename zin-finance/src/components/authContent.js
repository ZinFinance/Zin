import React from "react";

function AuthContent(props) {
  return (
    <div className="page-ath">
      <div className="page-ath-wrap">
        {props.children}
        <div className="page-ath-gfx">
          <div className="w-100 d-flex justify-content-center">
            <div className="col-md-8 col-xl-5">
              <img src="images/ath-gfx.png" alt="image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthContent;
