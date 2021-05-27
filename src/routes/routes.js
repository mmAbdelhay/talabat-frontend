import React from "react";
import { Redirect, Route } from "react-router-dom";
import { checkIfLoggedIn } from "../services/CheckUserStatus";
import App from "../App";
import Signup from "../views/signup/SignUpTabs";
import Login from "../views/login/loginForm/loginForm";
import ContactUsForm from "../views/contactUs/contactUsForm";

export default function Routes() {
  const [status] = checkIfLoggedIn();
  return (
    <div className="container">
      <Route path="/" exact>
        {status ? <App /> : <Redirect to="/login" />}
      </Route>
      <Route path="/login" exact>
        <Login />
      </Route>
      <Route path="/signup" exact>
        <Signup />
      </Route>
      <Route path="/contactus" exact>
        <ContactUsForm />
      </Route>
    </div>
  );
}
