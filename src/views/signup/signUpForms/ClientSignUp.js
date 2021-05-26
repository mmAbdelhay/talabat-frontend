import { ServerIP } from "../../../assets/config";
import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Typography, Space } from "antd";
import "antd/dist/antd.css";
import CountrySelector from "../../sharedComponents/CountrySelector";
import MobileInput from "../../sharedComponents/FormInputs/MobileInput";
import NameInput from "../../sharedComponents/FormInputs/NameInput";
import PasswordInput from "../../sharedComponents/FormInputs/PasswordInput";
import EmailInput from "../../sharedComponents/FormInputs/EmailInput";
import DateOfBirth from "../../sharedComponents/FormInputs/DateOfBirth";
import GenderInput from "../../sharedComponents/FormInputs/GenderInput";

const { Title } = Typography;

export default function ClientSignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [country, setCountry] = useState("");
  const [mobile, setMobile] = useState("");

  const signUp = () => {
    console.log("inside signUp");
    console.log(name, email, password, gender, country, mobile, dateOfBirth);
    axios
      .post(`${ServerIP}/api/v1/client/authenticate/register`, {
        name: name,
        email: email,
        password: password,
        gender: gender,
        country: country,
        mobile: mobile,
        date_of_birth: dateOfBirth,
      })
      .then((res) => {
        console.log(res.data);
        alert(res.data.Message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Title level={5}>Client signup</Title>
      <Form name="basic">
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
        <Form.Item>
          <Space direction="vertical">
            <Button type="primary" htmlType="submit" onClick={signUp}>
              SignUp
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
}
