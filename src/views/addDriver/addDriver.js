import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, message, Typography } from "antd";
import { useHistory } from "react-router-dom";
import { ServerIP } from "../../assets/config";
import NameInput from "../sharedComponents/FormInputs/NameInput";
import PasswordInput from "../sharedComponents/FormInputs/PasswordInput";
import EmailInput from "../sharedComponents/FormInputs/EmailInput";
import MobileInput from "../sharedComponents/FormInputs/MobileInput";
import { checkIfLoggedIn } from "../../services/CheckUserStatus";

const { Title } = Typography;

export default function AddDriver() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [token, setToken] = useState("");
  const history = useHistory();

  useEffect(() => {
    const [isLoggedIn, token] = checkIfLoggedIn();
    if (isLoggedIn) setToken(token);
  });

  const addDriver = async () => {
    const payload = {
      name: name,
      email: email,
      password: password,
      mobile: mobile,
      work_state: "OffCall",
    };
    let res = await axios.post(
      `${ServerIP}/api/v1/driver/authenticate/add`,
      payload,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    if (res.status === 200) {
      message.success("Driver added successfully");
      history.push("/");
    } else {
      message.error("something went wrong");
    }
  };

  return (
    <div className="container">
      <Title level={5} style={{ textAlign: "center" }}>
        Add Driver page
      </Title>
      <Form name="basic">
        <NameInput onNameInputChange={(value) => setName(value)} />
        <EmailInput onEmailInputChange={(value) => setEmail(value)} />
        <PasswordInput onPasswordInputChange={(value) => setPassword(value)} />
        <MobileInput onMobileInputChange={(value) => setMobile(value)} />
        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            style={{ float: "right", margin: "10px" }}
            onClick={addDriver}
          >
            Add Driver
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
