import { ServerIP } from "../../../assets/config";
import React, { useState } from "react";
import axios from "axios";
import { Form, Button, message } from "antd";
import "antd/dist/antd.css";
import CountrySelector from "../../sharedComponents/CountrySelector";
import MobileInput from "../../sharedComponents/FormInputs/MobileInput";
import NameInput from "../../sharedComponents/FormInputs/NameInput";
import PasswordInput from "../../sharedComponents/FormInputs/PasswordInput";
import EmailInput from "../../sharedComponents/FormInputs/EmailInput";
import DateOfBirth from "../../sharedComponents/FormInputs/DateOfBirth";
import GenderInput from "../../sharedComponents/FormInputs/GenderInput";
import PlacesAutocomplete from "../../map/PlacesAutocomplete";
import MapModal from "../../map/MapModal";

export default function ClientSignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [country, setCountry] = useState("");
  const [mobile, setMobile] = useState("");

  const signUp = () => {
    axios
      .post(`${ServerIP}/api/v1/client/authenticate/register`, {
        name: name,
        email: email,
        password: password,
        gender: gender,
        country: country,
        mobile: mobile,
        date_of_birth: dateOfBirth,
        type: "Home",
        clientLAt: 10.1,
        clientLng: 10.1,
      })
      .then((res) => {
        console.log(res.data);
        alert(res.data.Message);
        window.location.href = "/login";
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
        <MobileInput onMobileInputChange={(value) => setMobile(value)} />
        <CountrySelector
          onSelectCountry={(value) => {
            setCountry(value.label);
          }}
        />
        <DateOfBirth onSelectDateOfBirth={(value) => setDateOfBirth(value)} />
        <GenderInput onGenderChange={(value) => setGender(value)} />
        <div style={{ marginTop: 10, marginBottom: 10 }}>
          <PlacesAutocomplete />
          <MapModal operation={"register"} />
        </div>
        <Form.Item style={{ marginTop: "10px" }}>
          <Button block type="primary" htmlType="submit" onClick={signUp}>
            SignUp
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
