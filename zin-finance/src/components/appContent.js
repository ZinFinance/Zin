import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import { Link } from "react-router-dom";

function AppContent(props) {
  return (
    <div className="page-user">
      {/* <div
        style={{
          position: "fixed",
          top: "0px",
          left: "0px",
          width: "100%",
          zIndex: "9999",
          borderRadius: "0px",
          // height: "66px",
          // fontSize: "25px",
          // textAlign: "center",
        }}
        class="alert alert-danger"
      >
        Please verify your email and refresh in order to perform any actions
      </div> */}
      <Navbar />
      <div className="page-content">{props.children}</div>
      <Footer />
    </div>
  );
}

export default AppContent;
