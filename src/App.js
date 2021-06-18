import "./App.css";
import React, { useState, useEffect } from "react";
import { checkIfLoggedIn } from "./services/CheckUserStatus";
import { checkRole } from "./services/CheckUserRole";
import GetAllMessages from "./views/contactUs/GetAllMessages";
import MapModal from "./views/map/MapModal";
import { Link } from "react-router-dom";
import PlacesAutocomplete from "./views/map/PlacesAutocomplete";
import { Button } from "antd";

function App() {
  const [token, setToken] = useState("");
  const [isSuperUser, setSuperUser] = useState(false);

  useEffect(() => {
    const [loginStatus, loginToken] = checkIfLoggedIn();
    const role = checkRole();
    if (loginStatus) setToken(loginToken);
    if (role === "superuser") setSuperUser(true);
  }, []);

  if (isSuperUser) {
    return (
      <div className="container">
        <Link to="/getAllMessages">
          <Button type="primary" style={{ margin: "5px" }}>
            get all Messages
          </Button>
        </Link>
        <Link to="/allDrivers">
          <Button type="primary" style={{ margin: "5px" }}>
            get all Drivers
          </Button>
        </Link>
      </div>
    );
  } else {
    return (
      <div className="container">
        <PlacesAutocomplete />
        <MapModal operation={"nearprovider"} />
      </div>
    );
  }
}

export default App;
