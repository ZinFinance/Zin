import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";

function AppContent(props) {
  return (
    <div className="page-user">
      <Navbar />
      <div id="page-content" className="page-content">
        {props.children}
      </div>
      <Footer />
    </div>
  );
}

export default AppContent;
