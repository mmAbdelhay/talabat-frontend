import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Header from "./views/partials/header";
import Routes from "./routes/routes";
import { BrowserRouter as Router } from "react-router-dom";
import Footer from "./views/partials/footer";

ReactDOM.render(
  <Router>
    <Header />
    <Routes ></Routes>
    <Footer />
  </Router>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
