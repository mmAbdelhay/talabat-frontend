import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { checkIfLoggedIn } from "../../services/CheckUserStatus";
import { checkRole } from "../../services/CheckUserRole";
import jwt_decode from "jwt-decode";
export default function Header() {
  const [loginStatus, setLoginStatus] = useState(false);
  const [isSuperUser, setSuperUser] = useState(false);
  const [isProvider, setProvider] = useState(false);
  const [isClient, setClient] = useState(false);
  const [id, setId] = useState("");
  useEffect(() => {
    const [isLoggedIn,token] = checkIfLoggedIn();
    if(token){
    let provider_id = jwt_decode(token)._id;
    console.log(provider_id);
    setId(provider_id);
    }
    const role = checkRole();
    if (isLoggedIn) setLoginStatus(true);
    if (role === "superuser") setSuperUser(true);
    if (role === "provider") setProvider(true);
    if (role === "client") setClient(true);
  }, []);

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/login";
  };
  return (
    <Navbar bg="primary" variant="dark"  expand="lg">
      <Navbar.Brand href="/">Talabatak</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Link className="nav-link text-white " to="/allProviders/Restaurant">
            all Restaurants
          </Link>
          {isSuperUser ? (
            <>
              <Link to="/unapproved" className=" nav-link text-white">
                nonapproved providers
              </Link>
              <Link to="/coupon/panel" className=" nav-link text-white">
                All Coupons
              </Link>
              <Link to="/coupon/create" className=" nav-link text-white">
                Create Coupon
              </Link>
            </>
          ) : (
            ""
          )}
          {isClient ? (
            <Link to="/myorders" className=" nav-link text-white">
              my orders
            </Link>
          ) : (
            ""
          )}
          {isProvider ? (
            <>
              <Link to="/orderstate" className=" nav-link text-white">
                order state
              </Link>
              <NavDropdown title="Create Menu" className="text-white">
                <NavDropdown.Item href="/addcategory">
                  Add Category
                </NavDropdown.Item>
                <NavDropdown.Item href="/additem">add item</NavDropdown.Item>
                <NavDropdown.Item href="additemoption">
                  item option
                </NavDropdown.Item>
                <NavDropdown.Item href="/additionaloption">
                  additional options
                </NavDropdown.Item>
              </NavDropdown>
              <Link to="/menu/edit" className=" nav-link text-white">
                Edit Menu
              </Link>
            </>
          ) : (
            ""
          )}
          <Link className="nav-link" to="/careers">
            Careers
          </Link>
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

            {isProvider ? (
            <>
              <Link  to={`/providerprofile/${id}`} className="nav-item nav-link">
                account
              </Link>
            </>
          ): (
            <>
              <Link  to="/myprofile" className="nav-item nav-link">
                account
              </Link>
            </>
          )}
              <Link
                to="/logout"
                className="nav-item nav-link float-right"
                onClick={logout}
              >
                logout
              </Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
