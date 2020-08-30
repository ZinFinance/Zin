import React from "react";

function RestrictedPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <h3>Unfortunately we don’t provide service for your region.</h3>
    </div>
  );
}

export default RestrictedPage;
