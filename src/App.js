import "./App.css";
import React, { useState, useEffect } from "react";
import { checkIfLoggedIn } from "./services/CheckUserStatus";
import { checkRole } from "./services/CheckUserRole";
import GetAllMessages from "./views/contactUs/GetAllMessages";

function App() {
  const [token, setToken] = useState("");
  const [isSuperUser, setSuperUser] = useState(false);

  useEffect(() => {
    const [loginStatus, loginToken] = checkIfLoggedIn();
    const role = checkRole();
    if (loginStatus) setToken(loginToken);
    if (role === "superuser") setSuperUser(true);
  }, []);
  return (
    <div className="container">
      <h1 style={{ textAlign: "center" }}>Our fu*** App component</h1>
      {isSuperUser && <GetAllMessages />}
    </div>
  );
}

export default App;
