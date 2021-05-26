import React from "react";
import { Form, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";

export default function EmailInput(props) {
  const changeHandler = (value) => {
    props.onEmailInputChange(value.target.value);
  };

  return (
    <Form.Item
      name="email"
      rules={[
        {
          required: true,
          message: "Please input your email!",
        },
        {
          type: "email",
          message: "The input is not valid E-mail!",
        },
      ]}
      onChange={changeHandler}
    >
      <Input prefix={<UserOutlined />} placeholder="Email" />
    </Form.Item>
  );
}
