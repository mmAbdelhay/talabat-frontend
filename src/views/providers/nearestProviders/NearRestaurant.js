import React from "react";
import { Row, Col, Card, Grid } from "antd";
import {
  FieldTimeOutlined,
  PoundOutlined,
  StarTwoTone,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Meta } = Card;

class NearRestaurant extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card.Grid
        className="container "
        style={{ cursor: "pointer", width: 800 }}
      >
        <Row className=" card p-3 " gutter={16}>
          <Col className=" m-1" span={8}>
            <img
              src={`http://localhost:5000${this.props.logo}`}
              style={{ width: 200 }}
              alt="..."
            ></img>
          </Col>
          <Col span={8}>
            <Link to={`providerprofile/${this.props.id}`}>
              <h5 className="card-title">{this.props.name}</h5>
            </Link>

            <p className="card-text text-muted">
              Delivery time: {this.props.delivertime} Min{" "}
              <FieldTimeOutlined style={{ fontSize: "16px", color: "#08c" }} />
            </p>
            <p className="card-text text-muted">
              Delivery fee: {this.props.fee}{" "}
              <PoundOutlined style={{ fontSize: "16px", color: "#08c" }} />
            </p>
            <p className="card-text text-muted">
              Minimum order: {this.props.minimum}{" "}
              <PoundOutlined style={{ fontSize: "16px", color: "#08c" }} />
            </p>
          </Col>
        </Row>
      </Card.Grid>
    );
  }
}

export default NearRestaurant;
