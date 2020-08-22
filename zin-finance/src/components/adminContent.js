import React from "react";
import Footer from "./footer";
import AdminNavbar from "./adminNavbar";

function AdminContent(props) {
  return (
    <div className="page-user">
      <AdminNavbar />
      <div id="page-content" className="page-content">
        {props.children}
      </div>
      <Footer />
    </div>
  );
}

export default AdminContent;
