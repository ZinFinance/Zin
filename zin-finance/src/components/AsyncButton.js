import React from "react";
import Loader from "react-loader-spinner";

function AsyncButton(props) {
  if (props.loading) {
    return (
      <button
        {...props.buttonProps}
        disabled
        className={"btn " + props.buttonClasses}
      >
        <Loader
          style={{
            display: "inline-block",
            marginRight: "10px",
          }}
          type="TailSpin"
          color="white"
          height={15}
          width={15}
        />
        <span>{props.loadingText}</span>
      </button>
    );
  } else {
    return (
      <button {...props.buttonProps} className={"btn " + props.buttonClasses}>
        {props.defaultText}
      </button>
    );
  }
}

export default AsyncButton;
