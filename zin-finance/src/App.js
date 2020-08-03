import React, { useEffect } from "react";
import "./App.css";
import AppContent from "./components/appContent";
import AuthContent from "./components/authContent";
import Routes from "./routes";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    console.log("App user changed");
    const script = document.createElement("script");
    script.src = "assets/js/script.js?ver=104";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [user]);

  if (user) {
    return (
      <AppContent>
        <Routes />
      </AppContent>
    );
  } else {
    return (
      <AuthContent>
        <Routes />
      </AuthContent>
    );
  }
}

export default App;
