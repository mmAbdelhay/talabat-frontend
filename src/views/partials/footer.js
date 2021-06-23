import React, { Component } from "react";
import "./footer.css";
import { Link } from "react-router-dom";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {

    return (

      <footer style={{marginTop:250}}>
        <div className="column">
        <a className="footer_title">Talabatak</a>
        <a>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</a>
        </div>
        <div className="column">
        <a className="footer_title">OTHER LINKS</a>
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/terms">Terms & Conditions</Link>
        <Link to="/faq">FAQ</Link>
        <Link to="/feedback">FeedBack</Link>
        <Link to="/contactus">Contact Us</Link>
        </div>
        
        <div className="column">
        <a className="footer_title">LATEST NEWS</a>
        <a href="" title="Lorem ipsum dolor sit amet"><img src="https://source.unsplash.com/50x50/?green,trees"></img></a>

        </div>
        <div className="column">
        <a className="footer_title">GET IN TOUCH</a>
        <a title="Address"><i className="fa fa-map-marker"></i> 007, street, province/state, country - zipcode</a>
        <a href="emailto:" title="Email"><i className="fa fa-envelope"></i> email@serviceprovider.domain</a>
        <a href="tel:" title="Contact"><i className="fa fa-phone"></i> +(x)-xxxx-xxxxx</a>
        </div>

        <div className="sub-footer">
        © CopyRights 2021 Company_name || All rights reserved
        </div>
      </footer>
    );
  }
}

export default Footer;

