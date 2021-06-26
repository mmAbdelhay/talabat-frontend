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
import {ServerIP} from './assets/config'

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
  <Card className="col-sm-4" style={{marginRight:30,color:'black'}} >
        <Link to="/allProviders/Restaurant" style={{color:'black'}}>
    
    <Card.Body className="container">
      <div className="row">
      <div className="col-4">
        <img src={`${ServerIP}/homepage/images/restaurants.jpg`} alt="ffff" style={{height:"100%",width:"100%"}} />
      </div>
      <div className="col-8">
      <Card.Title>Resturant</Card.Title>
      <Card.Text>
      Find deals, free delivery, and more from our restaurant partners.
      </Card.Text>
      </div>
      </div>
    </Card.Body>
  </Link>
  </Card>

  <Card className="col-sm-4" style={{marginRight:30,color:'black'}}>
  <Link to="/allProviders/Store" style={{color:'black'}}>
    <Card.Body>
    <div className="row">
      <div className="col-4">
        <img src={`${ServerIP}/homepage/images/grocery.jpg`} alt="ffff" style={{height:"100%",width:"100%"}} />
      </div>
      <div className="col-8">
      <Card.Title>Grocery</Card.Title>
      <Card.Text>
      Don’t stand in line - order online! Choose from top stores delivering groceries to you.
      </Card.Text>
      </div>
      </div>
    </Card.Body>
    </Link>
  </Card>
  </div>
  <div className="row" style={{ display: "flex",
      justifyContent: "center",
     }}>
  <Card className="col-sm-4" style={{marginRight:30,color:'black'}}>
    
    <Card.Body>
    <div className="row">
      <div className="col-4">
        <img src={`${ServerIP}/homepage/images/flowers.jpg`} alt="ffff" style={{height:"100%",width:"100%"}} />
      </div>
      <div className="col-8">
      <Card.Title>Flowers</Card.Title>
      <Card.Text>
      Show them you care. We're ready to deliver flowers and chocolates to your loved one.
      </Card.Text>
      </div>
      </div>
    </Card.Body>
  </Card>
  <Card className="col-sm-4" style={{marginRight:30,color:'black'}}>
  <Link to="/allProviders/Pharmacy" style={{color:'black'}}>
    <Card.Body>
    <div className="row">
      <div className="col-4">
        <img src={`${ServerIP}/homepage/images/pharmacy.jpg`} alt="ffff" style={{height:"100%",width:"100%"}} />
      </div>
      <div className="col-8">
      <Card.Title>Pharmacy</Card.Title>
      <Card.Text>
      Got the sniffles? We’ve got you. Get medicine delivered to you quickly and easily. 
      </Card.Text>
      </div>
      </div>
    </Card.Body>
    </Link>
  </Card>
  </div>
  </div>
  <h1 className="mx-auto" style={{width: "fit-content",marginTop:"150px",textAlign:'center'}}>Join us</h1>
  <div className="mx-auto" style={{width: "fit-content",color:"black",textAlign:'center'}}>Be a part of Talabatak story</div>


  <div className="row mt-5" style={{ display: "flex",
      justifyContent: "center",
      marginBottom:40}}>
  <Card className="col-sm-4" style={{marginRight:30,color:'black'}}>
  <Link to="/signup" style={{color:'black'}}>
    <Card.Body className="container">
      
      <div className="row">
      <div className="col-4">
        <img src={`${ServerIP}/homepage/images/partner.jpg`} alt="ffff" style={{height:"100%",width:"100%"}} />
      </div>
      <div className="col-8">
      <Card.Title>Become a partner</Card.Title>
      <Card.Text>
      Reach more customers and achieve growth with us
      </Card.Text>
      </div>
      </div>
    </Card.Body>
    </Link>
  </Card>

  <Card className="col-sm-4" style={{marginRight:30,color:'black'}}>
  <Link to="/careers" style={{color:'black'}}>
    <Card.Body>
    <div className="row">
      <div className="col-4">
        <img src={`${ServerIP}/homepage/images/career.jpg`} alt="ffff" style={{height:"100%",width:"100%"}} />
      </div>
      <div className="col-8">
      <Card.Title>Build your career</Card.Title>
      <Card.Text>
      Join the dynamic team that makes it all happen
      </Card.Text>
      </div>
      </div>
    </Card.Body>
    </Link>
  </Card>
  </div>

  <div className="container" style={{marginBottom:"-250px",marginTop:"150px"}}>
  <div className="row">
     <div className="col-6" style={{marginRight:30,color:'black'}}>
      <h1>Discover the new talabat app</h1>
      <div>Get what you need, when you need it.</div>
      <div class="d-flex justify-content-between " style={{marginTop:30}}>
        <div style={{width:"30%"}}><img src={`${ServerIP}/homepage/images/logo_appstore.svg`} alt="ffff" style={{height:"100%",width:"100%"}} /></div>
        <div style={{width:"30%"}}><img src={`${ServerIP}/homepage/images/logo_playstore.svg`} alt="ffff" style={{height:"100%",width:"100%"}} /></div>
        <div style={{width:"30%"}}><img src={`${ServerIP}/homepage/images/logo_huaweistore1.svg`} alt="ffff" style={{height:"100%",width:"100%"}} /></div>
      </div>
     </div>
     <div className="col-5" style={{marginRight:30,color:'black'}}>
     <img src={`${ServerIP}/homepage/images/mobile.jpg`} alt="ffff" style={{height:"100%",width:"100%"}} />
     </div>
  </div>
  </div>
  

      </div>
    );
  }
}

export default App;
