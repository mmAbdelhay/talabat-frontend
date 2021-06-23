import "./App.css";
import React, { useState, useEffect } from "react";
import {Row,CardDeck,Card,Image} from "react-bootstrap";
import { checkIfLoggedIn } from "./services/CheckUserStatus";
import { checkRole } from "./services/CheckUserRole";
import GetAllMessages from "./views/contactUs/GetAllMessages";
import MapModal from "./views/map/MapModal";
import { Link } from "react-router-dom";
import PlacesAutocomplete from "./views/map/PlacesAutocomplete";
import { Button } from "antd";
import AllResturants from './views/providers/allRestaurants';

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
      <div
        style={{
          height: 500,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
        <Link to="/addDriver">
          <Button type="primary" style={{ margin: "5px" }}>
            Add Driver
          </Button>
        </Link>
      </div>
    );
  } else {
    return (
      <div  >
     
     
      <div
      style={{ 
      display: "flex",
      minHeight:"600px",
      justifyContent: "center",
      alignItems: "center", 
      marginBottom:80,}} id='main' >
        
      
        
        <PlacesAutocomplete />
        <MapModal operation={"nearprovider"} />
      </div>
     <div >
      <div className="row" style={{ display: "flex",
      justifyContent: "center",
      marginBottom:40}}>
  <Card className="col-sm-4" style={{marginRight:30,color:'black'}}>
    
    <Card.Body className="row">
      <div className="col">
      <Card.Title>Resturant</Card.Title>
      <Card.Text>
      Find deals, free delivery, and more from our restaurant partners.
      </Card.Text>
      <div>
        <img src="./assets/imgs/flower.jpg" alt="ffff"/>
      </div>
      </div>
    </Card.Body>
  </Card>
  <Card className="col-sm-4" style={{marginRight:30,color:'black'}}>
   
    <Card.Body>
      <Card.Title>Grocery</Card.Title>
      <Card.Text>
      Don’t stand in line - order online! Choose from top stores delivering groceries to you.
      </Card.Text>
    </Card.Body>
  </Card>
  </div>
  <div className="row" style={{ display: "flex",
      justifyContent: "center",
     }}>
  <Card className="col-sm-4" style={{marginRight:30,color:'black'}}>
    
    <Card.Body>
      <Card.Title>Flowers</Card.Title>
      <Card.Text>
      Show them you care. We're ready to deliver flowers and chocolates to your loved one.
      </Card.Text>
    </Card.Body>
  </Card>
  <Card className="col-sm-4" style={{marginRight:30,color:'black'}}>
    <Card.Body>
      <Card.Title>Pharmacy</Card.Title>
      <Card.Text>
      Got the sniffles? We’ve got you. Get medicine delivered to you quickly and easily. 
      </Card.Text>
    </Card.Body>
  </Card>
  </div>
  </div>
      </div>
    );
  }
}

export default App;
