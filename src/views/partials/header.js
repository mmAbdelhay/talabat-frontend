import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { checkIfLoggedIn } from "../../services/CheckUserStatus";

export default function Header() {
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    const [isLoggedIn] = checkIfLoggedIn();
    if (isLoggedIn) setLoginStatus(true);
  }, []);

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/login";
  };
  return (
    <Navbar bg="primary" variant="dark" className="mb-4">
      <Navbar.Brand href="/">Talabat</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Link className="nav-link text-white" to="/">Home</Link>
          <Link className="nav-link text-white" to="/feedback">Feedback</Link>
          <Link className="nav-link text-white" to="/privacy"> Privacy</Link>
          <Link className="nav-link text-white" to="/terms"> Terms and Conditions</Link>
          <Link className="nav-link text-white" to="/faq"> FAQ</Link>          
          <Nav.Link href="/contactus">Contact us</Nav.Link>
          <Nav.Link href="/allRestaurants">all Restaurants</Nav.Link>
        </Nav>
        <Nav>
          {!loginStatus ? (
            <>
             
              <Link to="/login" className="nav-item nav-link">
                Login
              </Link>
              <Link to="/signup" className="nav-item nav-link">
                Signup
              </Link>
            </>
          ) : (
            <>
            <Link to="/myprofile" className="nav-item nav-link">
                account
              </Link>
            <Link className="nav-item nav-link float-right" onClick={logout}>
              logout
            </Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
