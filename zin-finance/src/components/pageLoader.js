import React from "react";
import Loader from "react-loader-spinner";

function PageLoader(props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: props.containerHeight ? props.containerHeight : "100vh",
      }}
    >
      <Loader
        type="Puff"
        color="#165e50"
        height={props.height ? props.height : 100}
        width={props.width ? props.width : 100}
      />
    </div>
  );
}

export default PageLoader;
