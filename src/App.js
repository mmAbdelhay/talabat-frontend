import "./App.css";
import React, { useState, useEffect } from "react";
import { checkIfLoggedIn } from "./services/CheckUserStatus";

function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const [loginStatus, loginToken] = checkIfLoggedIn();
    if (loginStatus) {
      setToken(loginToken);
    }
  }, []);
  return (
    <div className="container">
      <h1 style={{ textAlign: "center" }}>Our fu*** App component</h1>
    </div>
  );
}

export default App;
