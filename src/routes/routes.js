import React from "react";
import { Redirect, Route } from "react-router-dom";
import { checkIfLoggedIn } from "../services/CheckUserStatus";
import App from "../App";
import Signup from "../views/signup/SignUpTabs";
import Login from "../views/login/loginForm/loginForm";
import ContactUsForm from "../views/contactUs/contactUsForm";
import AllResturants from "../views/providers/allRestaurants";
import Feedback from "../views/feedback/feedback"
import Privacy from "../views/privacy/privacy"
import FAQ from "../views/FAQ/FAQ"
import Terms from "../views/terms/Terms"

import ClinetProfile from "../views/profiles/ClientProfile"

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
<<<<<<< HEAD
      <Route path="/allRestaurants" exact>
        <AllResturants />
=======
      <Route path="/feedback" exact>
        <Feedback />
      </Route>
      <Route path="/privacy" exact>
        <Privacy />
      </Route>
      <Route path="/faq" exact>
        <FAQ />
      </Route>
      <Route path="/terms" exact>
        <Terms />
      </Route>
      <Route path="/myprofile" exact>
        <ClinetProfile />
>>>>>>> 18b9d21056da252170144c9296ffb7b3a40fc492
      </Route>
    </div>
  );
}
