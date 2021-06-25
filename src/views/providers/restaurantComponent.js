import React from "react";
import { Row, Col, Card } from "antd";
import { ServerIP } from "../../assets/config";
import { Link } from "react-router-dom";


const { Meta } = Card;

class RestaurantComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className="col col-lg-2 col-md-3 col-sm-4 mb-3 "
        style={{ cursor: "pointer" }}
      >
        <div className="card h-100 shadow shadow-primary">
          <div className="container h-100  d-flex align-items-center">
            <img
              src={`${ServerIP}${this.props.logo}`}
              className="card-img-top"
              alt="..."
            ></img>
          </div>
          <div className="card-body mb-4 border-top">
            <Link to={`/providerprofile/${this.props.id}`}>
              <h5 className="card-title" style={{ textAlign: "center" }}>
                {this.props.name}
              </h5>
            </Link>
            <p className="card-text" style={{ textAlign: "center" }}>
              {this.props.type}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default RestaurantComponent;
