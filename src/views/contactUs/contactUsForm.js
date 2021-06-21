import { ServerIP } from "../../assets/config";
import React, { useState } from "react";
import axios from "axios";
import { Form, Input, Button, Typography, message } from "antd";
import "antd/dist/antd.css";
import NameInput from "../sharedComponents/FormInputs/NameInput";
import EmailInput from "../sharedComponents/FormInputs/EmailInput";
import MobileInput from "../sharedComponents/FormInputs/MobileInput";

const { TextArea } = Input;
const { Title } = Typography;

export default function ContactUsForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [msg, setMsg] = useState("");

  const contactus = () => {
    axios
      .post(`${ServerIP}/api/v1/forms/contactus`, {
        name: name,
        email: email,
        mobile: mobile,
        message: msg,
      })
      .then((res) => {
        message.success("your message sent successfully");
      })
      .catch((err) => {
        message.error(`form is invalid ${err.response.data.Message}`);
      });
  };

  return (
    <div>
      <Title level={4}>Contact us</Title>
      <Form>
        <NameInput onNameInputChange={(value) => setName(value)} />
        <EmailInput onEmailInputChange={(value) => setEmail(value)} />
        <MobileInput onMobileInputChange={(value) => setMobile(value)} />
        <Form.Item label="Message">
          <TextArea
            placeholder="Fell free to tell us what you want"
            rows={4}
            onChange={(value) => setMsg(value.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={contactus}>
            send
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
