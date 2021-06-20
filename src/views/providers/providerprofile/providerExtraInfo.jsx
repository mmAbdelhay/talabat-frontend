import React from "react";
import { Card } from "antd";

export default function ProviderExtraInfo(props) {
  if (props.provider) {
    return (
      <Card style={{ margin: "5px" }}>
        <p>Email : {props.provider.email}</p>
        <p>Country : {props.provider.country}</p>
        <p>Type : {props.provider.provider_type}</p>
        <p>Opening hour : {props.provider.opening_hour}</p>
        <p>Closing hour : {props.provider.closing_hour}</p>
        <p>Delivery time : {props.provider.delivery_time}</p>
        <p>Latitude : {props.provider.latitude}</p>
        <p>Longitude : {props.provider.longitude}</p>
        {props.provider.rating > 0 && <p>Rating : {props.provider.rating}</p>}
      </Card>
    );
  }
}
