import "./App.css";
import React, { useState, useEffect } from "react";
import {Row,CardDeck,Card} from "react-bootstrap";
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
      <div className="container-fluid" >
     
     
      <div
      style={{ marginTop:'250px',
      display: "flex",
      marginBottom:'200px',
      justifyContent: "center",
      alignItems: "center"}}>
        
      
        
        <PlacesAutocomplete />
        <MapModal operation={"nearprovider"} />
      </div>
     
      <Row >
      <CardDeck>
  <Card>
    <Card.Img variant="top" src="holder.js/100px160" />
    <Card.Body>
      <Card.Title>Card title</Card.Title>
      <Card.Text>
        This is a wider card with supporting text below as a natural lead-in to
        additional content. This content is a little bit longer.
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">Last updated 3 mins ago</small>
    </Card.Footer>
  </Card>
  <Card>
    <Card.Img variant="top" src="holder.js/100px160" />
    <Card.Body>
      <Card.Title>Card title</Card.Title>
      <Card.Text>
        This card has supporting text below as a natural lead-in to additional
        content.{' '}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">Last updated 3 mins ago</small>
    </Card.Footer>
  </Card>
  <Card>
    <Card.Img variant="top" src="holder.js/100px160" />
    <Card.Body>
      <Card.Title>Card title</Card.Title>
      <Card.Text>
        This is a wider card with supporting text below as a natural lead-in to
        additional content. This card has even longer content than the first to
        show that equal height action.
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">Last updated 3 mins ago</small>
    </Card.Footer>
  </Card>
        </CardDeck>
      </Row>
      </div>
    );
  }
}

export default App;
