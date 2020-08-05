import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import AppContent from "./components/appContent";
import NonAuthContent from "./components/nonAuthContent";

import AuthRoutes from "./routes/authRoutes";
import NonAuthRoutes from "./routes/nonAuthRoutes";

function App() {
  const user = useSelector((state) => state.userReducer.user);
  const location = useLocation();

  useEffect(() => {
    console.log("location changed");
    const script = document.createElement("script");
    script.id = "_themeScript";
    script.src = "/assets/js/script.js?ver=104";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [location]);

  // useEffect(() => {
  //   console.log("user changed");
  //   let actions = document.getElementsByClassName("_action");
  //   if (user && !user.emailVerified && !setActions && actions.length > 0) {
  //     setActions = true;
  //     for (let action of actions) {
  //       action.setAttribute("disabled", true);
  //       action.style["cursor"] = "not-allowed";
  //     }
  //   }
  // });

  if (user) {
    return (
      <AppContent>
        <AuthRoutes />
      </AppContent>
    );
  } else {
    return (
      <NonAuthContent>
        <NonAuthRoutes />
      </NonAuthContent>
    );
  }
}

export default App;
