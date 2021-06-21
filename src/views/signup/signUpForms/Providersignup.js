import { ServerIP } from "../../../assets/config";
import React, { useState } from "react";
import axios from "axios";
import { Form, InputNumber, Button, TimePicker, message } from "antd";
import "antd/dist/antd.css";
import CountrySelector from "../../sharedComponents/CountrySelector";
import NameInput from "../../sharedComponents/FormInputs/NameInput";
import PasswordInput from "../../sharedComponents/FormInputs/PasswordInput";
import EmailInput from "../../sharedComponents/FormInputs/EmailInput";
import CoordinateInput from "../../sharedComponents/FormInputs/CoordinateInput";
import UploadLogoInput from "../../sharedComponents/FormInputs/UploadLogoInput";
import ProviderTypeInput from "../../sharedComponents/FormInputs/ProviderTypeInput";

export default function ProviderSignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [provider_type, setProvider_type] = useState("");
  const [coverage_zone, setCoverage_zone] = useState("");
  const [opening_hour, setOpening_hour] = useState("");
  const [closing_hour, setClosing_hour] = useState("");
  const [logo, setLogo] = useState("");
  const [minimum_order, setMinimum_order] = useState("");
  const [delivery_time, setDelivery_time] = useState("");
  const [delivery_fee, setDelivery_fee] = useState("");

  const signUp = () => {
    const payload = {
      email: email,
      password: password,
      name: name,
      latitude: latitude,
      longitude: longitude,
      provider_type: provider_type,
      coverage_zone: coverage_zone,
      opening_hour: opening_hour,
      closing_hour: closing_hour,
      delivery_fee: delivery_fee,
      logo: logo,
      minimum_order: minimum_order,
      country: country,
      delivery_time: delivery_time,
    };
    console.log(payload);
    axios
      .post(`${ServerIP}/api/v1/provider/authenticate/register`, payload)
      .then((res) => {
        console.log(res, res.data.token);
        alert(res.data.Message);
      })
      .catch((err) => {
        message.error(`form is invalid ${err.response.data.Message}`);
      });
  };

  return (
    <div>
      <Form name="basic" style={{ width: "70%" }}>
        <NameInput onNameInputChange={(value) => setName(value)} />
        <EmailInput onEmailInputChange={(value) => setEmail(value)} />
        <PasswordInput onPasswordInputChange={(value) => setPassword(value)} />

        <Form.Item label="opening and closing times :" style={{ width: "75%" }}>
          <TimePicker.RangePicker
            onChange={(value, valueString) => {
              setOpening_hour(valueString[0]);
              setClosing_hour(valueString[1]);
            }}
          />
        </Form.Item>

        <Form.Item>
          <CoordinateInput
            onLatitudeInputChange={(value) => setLatitude(value)}
            onLongitudeInputChange={(value) => setLongitude(value)}
          />
        </Form.Item>
        <CountrySelector onSelectCountry={(value) => setCountry(value.label)} />
        <ProviderTypeInput
          onProviderChange={(value) => setProvider_type(value)}
        />
        <Form layout="inline">
          <Form.Item label="minimun order">
            <InputNumber
              min={1}
              max={100}
              onChange={(value) => setMinimum_order(value)}
            />
          </Form.Item>
          <Form.Item label="delivery fee">
            <InputNumber
              min={1}
              max={100}
              onChange={(value) => setDelivery_fee(value)}
            />
          </Form.Item>
          <Form.Item label="coverage zone">
            <InputNumber
              min={1}
              onChange={(value) => setCoverage_zone(value)}
            />
          </Form.Item>
        </Form>

        <Form.Item label="Set your delivery time">
          <TimePicker
            onChange={(value, valueString) => setDelivery_time(valueString)}
          />
        </Form.Item>

        <Form.Item>
          <UploadLogoInput
            onUploadLogoInputChange={(value) => setLogo(value)}
          />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" onClick={signUp} style={{ top: 20 }}>
            SignUp
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
