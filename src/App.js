import "./App.css";
import React, { useState, useEffect } from "react";
import { checkIfLoggedIn } from "./services/CheckUserStatus";
import { checkRole } from "./services/CheckUserRole";
import GetAllMessages from "./views/contactUs/GetAllMessages";
import MapModal from './views/map/MapModal';

import PlacesAutocomplete from './views/map/PlacesAutocomplete';
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
      
      <PlacesAutocomplete />
      <MapModal />
      {isSuperUser && <GetAllMessages />}
    </div>
  );
}

export default App;
