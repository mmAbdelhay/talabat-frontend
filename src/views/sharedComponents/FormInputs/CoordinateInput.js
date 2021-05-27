import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "antd";
import { AimOutlined } from "@ant-design/icons";

export default function CoordinateInput(props) {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [index, setIndex] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLongitude(position.coords.longitude);
      setLatitude(position.coords.latitude);
    });
  }, []);

  const useMyLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLongitude(position.coords.longitude);
      props.onLongitudeInputChange(longitude);
      setLatitude(position.coords.latitude);
      props.onLatitudeInputChange(latitude);
    });
    setIndex(true);
  };

  const onLatitudeChange = (value) => {
    setLatitude(value.target.value);
    props.onLatitudeInputChange(latitude);
  };

  const onLongitudeChange = (value) => {
    setLongitude(value.target.value);
    props.onLongitudeInputChange(longitude);
  };

  return (
    <Form layout="inline">
      <Form.Item
        name="latitude"
        label="input ypur location :"
        rules={[
          {
            required: true,
            message: "Please input your latitude!",
          },
        ]}
        onChange={onLatitudeChange}
      >
        <Input
          prefix={<AimOutlined />}
          disabled={index}
          value={latitude}
          placeholder="Latitude"
        />
      </Form.Item>
      <Form.Item
        name="longitude"
        rules={[
          {
            required: true,
            message: "Please input your longitude!",
          },
        ]}
        onChange={onLongitudeChange}
      >
        <Input
          prefix={<AimOutlined />}
          disabled={index}
          value={longitude}
          placeholder="Longitude"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={useMyLocation}>
          Use my location
        </Button>
      </Form.Item>
    </Form>
  );
}
