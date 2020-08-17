import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

function SignUpSuccess(props) {
  const history = useHistory();

  const checkIfRegistered = () => {
    if (!props.location.state || !props.location.state.justRegistered) {
      history.push("/sign-in");
    } else {
      history.replace("/sign-up-success", null);
    }
  };

  useEffect(checkIfRegistered, []);

  return (
    <div className="page-ath-text">
      <h2 className="page-ath-heading">
        Thank you! <small>Your singup process is almost done.</small>{" "}
        <span className="text-success">Please check your mail and verify.</span>
      </h2>
    </div>
  );
}

export default SignUpSuccess;
